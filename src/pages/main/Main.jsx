import React, { useEffect } from "react";
import "./Main.css";
import Post from "../../components/main/Post";
import { getPostsRequest } from "../../store/post/slice";
import { useDispatch, useSelector } from "react-redux";
import Right from "../../components/main/Right";
import Suggestion from "../suggestion/Suggestion";
import PostViewer from "../../components/image/PostViewer";
import Spinner from "../../components/spinner/Spinner";

const Main = () => {
  const dispatch = useDispatch();

  const posts = useSelector(({ posts: { posts } }) => posts);
  const loading = useSelector(({ posts: { loading } }) => loading);
  const postFinished = useSelector(
    ({ posts: { postFinished } }) => postFinished
  );

  useEffect(() => {
    dispatch(getPostsRequest());
  }, [dispatch, postFinished]);

  return (
    <div className="main__wrapper">
      {loading ? (
        <Spinner size={"6rem"} />
      ) : (
        <>
          <div>
            <PostViewer />
            {posts.length > 0 ? (
              posts?.map((post, index) => (
                <Post
                  key={index}
                  _id={post.post._id}
                  createdAt={post.post.createdAt}
                  comments={post.post.comments}
                  creator={post.creator}
                  likes={post.post.likes}
                  description={post.post.description}
                  image={post.post.image}
                />
              ))
            ) : (
              <Suggestion />
            )}
          </div>
          <Right />
        </>
      )}
    </div>
  );
};

export default Main;
