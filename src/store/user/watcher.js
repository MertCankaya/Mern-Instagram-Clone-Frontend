import { all, call, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";

const safe = (handler, saga, ...args) =>
  function* (action) {
    try {
      yield call(saga, ...args, action);
    } catch (err) {
      yield call(handler, ...args, err);
    }
  };

const onError = (err) => {};

export function* getAllUsersWatcher() {
  yield takeLatest(
    types.GET_POSTS_REQUEST,
    safe(onError, actions.getAllUsersWorker)
  );
}

export function* getSuggestedUserWatcher() {
  yield takeLatest(
    types.GET_SUGGESTED_USERS_REQUEST,
    safe(onError, actions.getSuggestedUsersWorker)
  );
}

export function* followUserWatcher() {
  yield takeLatest(
    types.FOLLOW_USER_REQUEST,
    safe(onError, actions.followUserWorker)
  );
}

export function* getUserWatcher() {
  yield takeLatest(
    types.GET_USER_REQUEST,
    safe(onError, actions.getUserWorker)
  );
}

export function* getFollowingUsersWatcher() {
  yield takeLatest(
    types.GET_FOLLOWING_USERS,
    safe(onError, actions.getFollowingUsersWorker)
  );
}

export default function* postSaga() {
  yield all([
    getAllUsersWatcher(),
    getSuggestedUserWatcher(),
    followUserWatcher(),
    getUserWatcher(),
    getFollowingUsersWatcher(),
  ]);
}
