import { call, put } from "redux-saga/effects";
import {
  commentPostSuccess,
  getExplorePostsSuccess,
  getModalPostSuccess,
  getPostRequest,
  getPostsSuccess,
  getPostSuccess,
  likePostSuccess,
  uploadPostSuccess,
} from "./slice";
import * as api from "./api";

export function* getPostsWorker() {
  const response = yield call(api.getPosts);
  yield put(getPostsSuccess(response.data));
}

export function* getPostWorker(action) {
  const response = yield call(api.getPost, action.payload);
  yield put(getPostSuccess(response.data));
}

export function* getModalPostWorker(action) {
  if (action.payload.userId && action.payload.postId) {
    const response = yield call(api.getModalPost, action.payload);
    yield put(getModalPostSuccess(response.data));
  }
}

export function* getExplorePostsWorker() {
  const response = yield call(api.getExplorePosts);
  yield put(getExplorePostsSuccess(response.data));
}

export function* uploadPostWorker(action) {
  yield call(api.uploadPost, action.payload);
  yield put(uploadPostSuccess());
}

export function* likePostWorker({ payload: { postId, dispatch } }) {
  yield call(api.likePost, postId);
  yield put(likePostSuccess());
  dispatch(getPostRequest(postId));
}

export function* commentPostWorker({ payload: { comment, postId, dispatch } }) {
  yield call(api.commentPost, { comment, postId });
  yield put(commentPostSuccess());
  dispatch(getPostRequest(postId));
}
