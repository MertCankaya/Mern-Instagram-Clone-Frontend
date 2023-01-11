import { all, call, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import { message } from "antd";

const safe = (handler, saga, ...args) =>
  function* (action) {
    try {
      yield call(saga, ...args, action);
    } catch (err) {
      yield call(handler, ...args, err);
    }
  };

const onError = (err) => {
  message.error("Something went wrong!");
};

export function* getMessagesWatcher() {
  yield takeLatest(
    types.GET_MESSAGES_REQUEST,
    safe(onError, actions.getMessagesWorker)
  );
}

export function* uploadMessageWatcher() {
  yield takeLatest(
    types.UPLOAD_MESSAGE_REQUEST,
    safe(onError, actions.uploadMessagesWorker)
  );
}

export default function* messageSaga() {
  yield all([getMessagesWatcher(), uploadMessageWatcher()]);
}
