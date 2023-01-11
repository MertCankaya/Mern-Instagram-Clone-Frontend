import { Card } from "antd";
import React from "react";

import Icons from "../icons/Icons";
import EmojiInput from "../input/EmojiInput";

import "./Post.css";

const Post = ({
  _id,
  image,
  createdAt,
  description,
  comments,
  creator,
  likes,
}) => {
  const date = new Date(createdAt);

  return (
    <Card className="main__card">
      <div className="main__profile__wrapper">
        <img
          className="main__profile__pic__image"
          src={creator.profilePic}
          alt="profile_pic"
        />
        <div style={{fontWeight: 700, fontSize: "1rem"}}>{creator.name}</div>
      </div>
      <img className="main__image" src={image} alt="post__image" />
      <Icons likes={likes} _id={_id} creator={creator} />
      <div className="main__bottom__wrapper">
        <div className="main__flex__wrapper">
          <div style={{ marginRight: "0.5rem" }}>{likes?.length}</div>
          <div>likes</div>
        </div>
        <div>
          <div>
            <span style={{ marginRight: "0.5rem", fontWeight: 700 }}>
              {creator.name}
            </span>
            {description}
          </div>
        </div>
        <div>
          <span>{comments.length}</span> comment
        </div>
        <div>
          {comments?.map((comment) => (
            <div className="post__comment__info__wrapper">
              <div className="post__comment__username">
                {comment.owner.username}
              </div>
              <div className="post__comment">{comment.comment}</div>
            </div>
          ))}
        </div>
        <div>{date.toLocaleDateString("en-US")}</div>
      </div>
      <EmojiInput _id={_id} />
    </Card>
  );
};

export default Post;
