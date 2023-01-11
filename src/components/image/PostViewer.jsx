import { Modal } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getModalPostRequest,
  postModalCloseHandler,
} from "../../store/post/slice";
import "./PostViewer.css";
import Icons from "../icons/Icons";
import EmojiInput from "../input/EmojiInput";

const PostViewer = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    ({ posts: { isPostModalOpen } }) => isPostModalOpen
  );

  const handleOk = () => {
    dispatch(postModalCloseHandler());
  };
  const handleCancel = () => {
    dispatch(postModalCloseHandler());
  };

  const modalPost = useSelector(({ posts: { modalPost } }) => modalPost);

  const likeLoading = useSelector(({ posts: { likeLoading } }) => likeLoading);
  const commentLoading = useSelector(
    ({ posts: { commentLoading } }) => commentLoading
  );

  useEffect(() => {
    dispatch(
      getModalPostRequest({
        postId: modalPost?.post?._id,
        userId: modalPost?.user?._id,
      })
    );
  }, [likeLoading, commentLoading]);

  return (
    <Modal
      className="post__viewer__modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="post__viewer__modal__inner__wrapper">
        <img
          className="modal__image"
          src={modalPost?.post?.image}
          alt="modal__image"
        />
        <div className="modal__post__wrapper">
          <div className="modal__post__owner">
            <img src={modalPost?.user?.profilePic} alt="post__image" />
            <div>{modalPost?.user?.name}</div>
          </div>

          <div className="post__viewer__comments__wrapper">
            {modalPost?.post?.comments?.map((comment) => (
              <div className="post__viewer__comments__inner__wrapper">
                <img
                  className="post__viewer__commentor__profile__pic"
                  src={comment.owner.profilePic}
                  alt="commentor__profile__pic"
                />
                <div>
                  <div className="post__viewer__comment__username">
                    {comment.owner.username}{" "}
                    <span className="post__viewer__comment">
                      {comment.comment}
                    </span>
                  </div>
                  <div></div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="post__viewer__icons__wrapper">
              <Icons
                hideCommentButton
                _id={modalPost?.post?._id}
                creator={modalPost?.creator}
                likes={modalPost?.post?.likes}
              />
            </div>
            <div style={{ paddingLeft: "8px" }}>
              {modalPost?.post?.likes?.length} <span>likes</span>
            </div>
          </div>
          <div>
            <EmojiInput _id={modalPost?.post?._id} fromPostViewer={modalPost} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostViewer;
