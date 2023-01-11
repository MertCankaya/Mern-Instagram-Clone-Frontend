import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import { TbBadge } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  getModalPostRequest,
  likePostRequest,
  postModalOpenHandler,
} from "../../store/post/slice";
import "./Icons.css";

const Icons = ({ _id, likes, creator, hideCommentButton }) => {
  const dispatch = useDispatch();

  const likeHandler = () => {
    dispatch(likePostRequest({ postId: _id, dispatch }));
  };

  const loggedUser = useSelector(({ auth: { user } }) => user);

  return (
    <div className="icons__wrapper">
      <div>
        {likes?.includes(loggedUser?._id) ? (
          <AiFillHeart
            className="icon"
            style={{ marginRight: "0.5rem" }}
            size={32}
          />
        ) : (
          <AiOutlineHeart
            className="icon"
            style={{ marginRight: "0.5rem" }}
            size={32}
            onClick={likeHandler}
          />
        )}

        {!hideCommentButton && (
          <FiMessageCircle
            onClick={() => {
              dispatch(
                getModalPostRequest({ postId: _id, userId: creator._id })
              );
              dispatch(postModalOpenHandler());
            }}
            className="icon"
            size={32}
          />
        )}
      </div>
      <div>
        <TbBadge className="icon" size={32} />
      </div>
    </div>
  );
};

export default Icons;
