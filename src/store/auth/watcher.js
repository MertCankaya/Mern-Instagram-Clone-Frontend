import { all, call, put, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import { message } from "antd";
import { fail } from "./slice";

const safe = (handler, saga, ...args) =>
  function* (action) {
    try {
      yield call(saga, ...args, action);
    } catch (err) {
      yield call(handler, ...args, err);
      yield put(fail());
    }
  };

const onError = (err) => {
  if (err?.response?.status === 401) {
    message.error("Please Check Your Email or Password.");
  } else if (err?.response?.status === 422) {
    message.error("Email already exist!");
  }
};

export function* userLoginWatcher() {
  yield takeLatest(
    types.AUTH_LOGIN_REQUEST,
    safe(onError, actions.userLoginWorker)
  );
}

export function* userRegisterWatcher() {
  yield takeLatest(
    types.AUTH_REGISTER_REQUEST,
    safe(onError, actions.userSignupWorker)
  );
}

export function* getLoggedUserWatcher() {
  yield takeLatest(
    types.AUTH_GET_LOGGED_USER_REQUEST,
    safe(onError, actions.getLoggedUserWorker)
  );
}

export default function* authSaga() {
  yield all([
    userLoginWatcher(),
    userRegisterWatcher(),
    getLoggedUserWatcher(),
  ]);
}
