import axios from "axios";
import Cookies from "js-cookie";

const URL = process.env.REACT_APP_BACKEND_URL;

const userId = Cookies.get("userId");
const token = Cookies.get("token");

export const getMessages = (otherUserId) => {
  return axios({
    method: "POST",
    url: `${URL}/user/getMessages`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    data: {
      userId,
      otherUserId,
    },
  });
};

export const uploadMessages = (message) => {
  const otherUserId = Cookies.get("messagesUserId");
  return axios({
    method: "POST",
    url: `${URL}/user/uploadMessage`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    data: {
      userId,
      otherUserId,
      message,
    },
  });
};
