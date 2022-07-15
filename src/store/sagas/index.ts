import { all, takeLatest } from "redux-saga/effects";
import ReduxActionTypes from "../redux-action-types";
import ApplicationSaga from "./app-saga";
import PollingSaga from "./polling-saga";

export default function* initSaga() {
  yield all([
    takeLatest(ReduxActionTypes.INIT_APP, ApplicationSaga),
    takeLatest(ReduxActionTypes.POLLING_INIT, PollingSaga),
  ]);
}
