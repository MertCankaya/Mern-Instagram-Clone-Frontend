import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostViewer from "../../components/image/PostViewer";
import Spinner from "../../components/spinner/Spinner";
import {
  getExplorePostsRequest,
  getModalPostRequest,
  postModalOpenHandler,
} from "../../store/post/slice";

import "./Explore.css";

const Explore = () => {
  const dispatch = useDispatch();

  const explorePosts = useSelector(
    ({ posts: { explorePosts } }) => explorePosts
  );
  const loading = useSelector(({ posts: { loading } }) => loading);

  useEffect(() => {
    dispatch(getExplorePostsRequest());
  }, [dispatch]);

  return (
    <div className="explore__wrapper">
      {loading ? (
        <Spinner />
      ) : (
        <Row>
          <PostViewer />
          {explorePosts.map((post) => (
            <Col span={8}>
              <img
                onClick={() => {
                  dispatch(
                    getModalPostRequest({
                      postId: post?.post?._id,
                      userId: post?.postUser?._id,
                    })
                  );
                  dispatch(postModalOpenHandler());
                }}
                className="explore__image"
                src={post.post.image}
                alt="explore_image"
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Explore;
