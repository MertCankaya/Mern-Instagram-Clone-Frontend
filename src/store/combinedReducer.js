import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth/slice";
import posts from "./post/slice";
import users from "./user/slice";
import messages from "./message/slice";
import error from "./errorSlice";

const combinedReducer = combineReducers({
  auth,
  posts,
  users,
  messages,
  error,
});

export default combinedReducer;
