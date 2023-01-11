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

export function* getPostsWatcher() {
  yield takeLatest(
    types.GET_POSTS_REQUEST,
    safe(onError, actions.getPostsWorker)
  );
}

export function* getPostWatcher() {
  yield takeLatest(
    types.GET_POST_REQUEST,
    safe(onError, actions.getPostWorker)
  );
}

export function* getModalPostWatcher() {
  yield takeLatest(
    types.GET_MODAL_POST_REQUEST,
    safe(onError, actions.getModalPostWorker)
  );
}

export function* getExplorePostsWatcher() {
  yield takeLatest(
    types.GET_EXPLORE_POSTS,
    safe(onError, actions.getExplorePostsWorker)
  );
}

export function* uploadPostWatcher() {
  yield takeLatest(
    types.UPLOAD_POST_REQUEST,
    safe(onError, actions.uploadPostWorker)
  );
}

export function* likePostWatcher() {
  yield takeLatest(
    types.LIKE_POST_REQUEST,
    safe(onError, actions.likePostWorker)
  );
}

export function* commentPostWatcher() {
  yield takeLatest(
    types.COMMENT_POST_REQUEST,
    safe(onError, actions.commentPostWorker)
  );
}

export default function* postSaga() {
  yield all([
    getPostsWatcher(),
    uploadPostWatcher(),
    likePostWatcher(),
    commentPostWatcher(),
    getExplorePostsWatcher(),
    getPostWatcher(),
    getModalPostWatcher(),
  ]);
}
