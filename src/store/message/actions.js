import { call, put } from "redux-saga/effects";
import { getMessagesSuccess } from "./slice";
import * as api from "./api";

export function* getMessagesWorker(action) {
  const response = yield call(api.getMessages, action.payload);
  yield put(getMessagesSuccess(response.data));
}

export function* uploadMessagesWorker(action) {
  yield call(api.uploadMessages, action.payload);
}
