import { API_PATH } from "common/constants";
import NetworkService from "services/network/NetworkService";
import { call, takeLatest, put } from "@redux-saga/core/effects";
import {
  routeStateActions,
  fetchAppRoutesCreatorTypeName,
} from "./routerHandler";
import { ErrorToaster } from "components/Toaster";

/**
 * Employee Details Watcher
 */
export function* fetchRoutesDataWatcher() {
  yield takeLatest(fetchAppRoutesCreatorTypeName, fetchRoutesDataWatcherWorker);
}

/**
 * Employee Details Worker
 */
export function* fetchRoutesDataWatcherWorker() {
  try {
    yield put(routeStateActions.setRoutesLoading(true));
    const routes = yield call(NetworkService.post, API_PATH.leftMenu, {});
    yield put(routeStateActions.setAppRoutes(routes?.data || []));
    yield put(routeStateActions.setRoutesLoading(false));
  } catch (error) {
    yield put(routeStateActions.setRoutesRenderingError(true));
    yield put(routeStateActions.setRoutesRenderingErrorMessage(error));
    setTimeout(function* () {
      yield put(routeStateActions.clearError());
    }, 5000);
    ErrorToaster(error.response.data || error.message || "Error Occured")
  }
}
