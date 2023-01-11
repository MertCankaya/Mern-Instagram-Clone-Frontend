import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostViewer from "../../components/image/PostViewer";
import Spinner from "../../components/spinner/Spinner";
import {
  getModalPostRequest,
  postModalOpenHandler,
} from "../../store/post/slice";
import { getUserProfileRequest } from "../../store/user/slice";
import "./Profile.css";

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(({ users: { profileUser } }) => profileUser);
  const loading = useSelector(({ users: { loading } }) => loading);
  useEffect(() => {
    dispatch(getUserProfileRequest(params.profileName));
  }, [dispatch, params.profileName]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="profile__top__wrapper">
            <PostViewer />
            <img
              className="profile__profile__pic"
              src={user?.profilePic}
              alt="profile_pic"
            />
            <div className="profile__top__info__wrapper">
              <div className="profile__flex">
                <div>{user?.name}</div>
              </div>
              <div className="profile__flex">
                <div>{user?.posts.length} posts</div>
                <div>{user?.followers.length} followers</div>
                <div>{user?.following.length} following</div>
              </div>
              <div>{user?.description}</div>
            </div>
          </div>
          <Row className="profile__image__wrapper">
            {user?.posts?.length > 0 ? (
              user?.posts
                .map((post) => {
                  return (
                    <Col span={8}>
                      <img
                        onClick={() => {
                          console.log(post);
                          dispatch(
                            getModalPostRequest({
                              postId: post?._id,
                              userId: post?.creator,
                            })
                          );
                          dispatch(postModalOpenHandler());
                        }}
                        className="profile__image"
                        src={post.image}
                        alt="post"
                      />
                    </Col>
                  );
                })
                .sort((a, b) => (a > b ? 1 : -1))
            ) : (
              <Col className="profile__no__image__text">
                There is no image yet!
              </Col>
            )}
          </Row>
        </>
      )}
    </div>
  );
};

export default Profile;
