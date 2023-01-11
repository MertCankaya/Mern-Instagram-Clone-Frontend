import axios from "axios";
import Cookies from "js-cookie";

const URL = process.env.REACT_APP_BACKEND_URL;
const userId = Cookies.get("userId");
const token = Cookies.get("token");

export const getAllUsers = () => {
  return axios({
    method: "GET",
    url: `${URL}/user/users`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSuggestedUsers = () => {
  return axios({
    method: "POST",
    url: `${URL}/user/suggestion`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId,
    },
  });
};

export const followUser = (followingUserId) => {
  return axios({
    method: "POST",
    url: `${URL}/user/followUser`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      loggedUserId: userId,
      followingUserId,
    },
  });
};

export const getUser = (userId) => {
  return axios({
    method: "POST",
    url: `${URL}/user/user`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId,
    },
  });
};
export const getFollowingUsers = () => {
  return axios({
    method: "POST",
    url: `${URL}/user/followingUsers`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId,
    },
  });
};
