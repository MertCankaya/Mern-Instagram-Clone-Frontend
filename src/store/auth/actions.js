import { message } from "antd";
import Cookies from "js-cookie";
import { call, put } from "redux-saga/effects";

import * as api from "./api";
import { getLoggedUserSuccess, loginUserSuccess } from "./slice";

export function* userLoginWorker(action) {
  const response = yield call(api.userLogin, action.payload);
  if (response.data.token) {
    Cookies.set("token", response.data.token);
    Cookies.set("userId", response.data.user);
  }
  yield put(loginUserSuccess(response));
  window.location.reload();
}

export function* userSignupWorker(action) {
  const response = yield call(api.userSignup, action.payload);
  if (response.status === 201) {
    message.success("User created!");
  }
}

export function* getLoggedUserWorker() {
  const response = yield call(api.getLoggedUser);
  yield put(getLoggedUserSuccess(response.data));
}
