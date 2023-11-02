import {
  appSliceActions,
  fetchApiDataCreatorTypeName,
} from "store/reducers/appSlice";
import { call, takeLatest, put } from "@redux-saga/core/effects";
import NetworkService from "services/network/NetworkService";
/**
 * Employee Details Watcher
 */
export function* fetchApiDataWatcher() {
  yield takeLatest(fetchApiDataCreatorTypeName, fetchApiDataWatcherWorker);
}

/**
 * Employee Details Worker
 */
export function* fetchApiDataWatcherWorker() {
  try {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const apiData = yield call(NetworkService.get, url, {});
    if (apiData.status === 200) {
      yield put(
        appSliceActions.setApiData((apiData?.data && apiData?.data) || {})
      );
    }
  } catch (error) {
    console.log("error" + error);
  }
}
