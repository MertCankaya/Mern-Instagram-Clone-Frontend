import { call, put } from "redux-saga/effects";
import { getLoggedUserRequest } from "../auth/slice";
import * as api from "./api";
import {
  getAllUsersSuccess,
  getFollowingUserSuccess,
  getSuggestedUsersSuccess,
  getUserProfileSuccess,
} from "./slice";

export function* getAllUsersWorker() {
  const response = yield call(api.getAllUsers);
  yield put(getAllUsersSuccess(response.data));
}

export function* getSuggestedUsersWorker() {
  const response = yield call(api.getSuggestedUsers);
  yield put(getSuggestedUsersSuccess(response.data));
}

export function* followUserWorker(action) {
  const { followingId, dispatch } = action.payload;
  yield call(api.followUser, followingId);
  dispatch(getLoggedUserRequest());
}
export function* getUserWorker(action) {
  const response = yield call(api.getUser, action.payload);
  yield put(getUserProfileSuccess(response.data));
}
export function* getFollowingUsersWorker() {
  const response = yield call(api.getFollowingUsers);
  yield put(getFollowingUserSuccess(response.data));
}
