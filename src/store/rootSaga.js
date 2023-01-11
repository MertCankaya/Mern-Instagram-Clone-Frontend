import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/watcher";
import postSaga from "./post/watcher";
import userSaga from "./user/watcher";
import messageSaga from "./message/watcher";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(postSaga),
    fork(userSaga),
    fork(messageSaga),
  ]);
}
