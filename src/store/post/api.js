import axios from "axios";
import Cookies from "js-cookie";

const URL = process.env.REACT_APP_BACKEND_URL;

const userId = Cookies.get("userId");
const token = Cookies.get("token");

export const getPosts = () => {
  return axios({
    method: "POST",
    url: `${URL}/feed/posts`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId,
    },
  });
};

export const getPost = (postId) => {
  return axios({
    method: "GET",
    url: `${URL}/feed/post/${postId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getModalPost = ({ postId, userId }) => {
  return axios({
    method: "POST",
    url: `${URL}/feed/postviewer/${postId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId,
    },
  });
};

export const getExplorePosts = () => {
  return axios({
    method: "POST",
    url: `${URL}/feed/explore`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId,
    },
  });
};

export const uploadPost = ({ image, description }) => {
  return axios({
    method: "POST",
    url: `${URL}/feed/post`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      image,
      description,
      creator: userId,
    },
  });
};

export const likePost = (postId) => {
  return axios({
    method: "POST",
    url: `${URL}/feed/like/${postId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId,
    },
  });
};

export const commentPost = ({ comment, postId }) => {
  return axios({
    method: "POST",
    url: `${URL}/feed/comment/${postId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId,
      comment,
    },
  });
};
