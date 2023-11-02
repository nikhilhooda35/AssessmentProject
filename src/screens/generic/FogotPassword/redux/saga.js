import { call, takeLatest, put } from "@redux-saga/core/effects";
import NetworkService from "services/network/NetworkService";
import { API_PATH } from "common/constants";
import { forgotPasswordCreatorTypeName } from "./slice";
import { genericActions } from "screens/generic/redux";
import { ErrorToaster } from "components/Toaster";
/**
 * Forgot Password Watcher
 */
export function* forgotPasswordWatcher() {
  yield takeLatest(forgotPasswordCreatorTypeName, forgotPasswordWatcherWorker);
}

/**
 * Forgot Password Worker
 */
export function* forgotPasswordWatcherWorker(action) {
  const data = action.payload;
  yield put(genericActions.updateLoading(API_PATH.forgotPassword));
  try {
    yield call(NetworkService.post, API_PATH.forgotPassword, data);
    yield put(genericActions.updateLoading(null));
  } catch (error) {
    yield put(genericActions.updateLoading(null));
    ErrorToaster(error.response.data || error.message || "Error Occured");
  }
}
