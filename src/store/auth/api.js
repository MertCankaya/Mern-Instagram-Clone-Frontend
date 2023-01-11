import axios from "axios";
import Cookies from "js-cookie";

const URL = process.env.REACT_APP_BACKEND_URL;

const userId = Cookies.get("userId");
const token = Cookies.get("token");

export const userLogin = ({ email, password }) => {
  return axios({
    method: "POST",
    url: `${URL}/auth/login`,
    headers: { "Content-Type": "application/json" },
    data: { email, password },
  });
};

export const userSignup = ({ email, password, profilePic, sxa }) => {
  return axios({
    method: "POST",
    url: `${URL}/auth/signup`,
    headers: { "Content-Type": "application/json" },
    data: {
      email,
      password,
      profilePic,
      name: sxa,
    },
  });
};

export const getLoggedUser = () => {
  return axios({
    method: "POST",
    url: `${URL}/user/user`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    data: {
      userId,
    },
  });
};
