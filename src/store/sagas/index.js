import { genericLoadingHandlerWatcher } from "screens/generic/redux";
import { fetchApiDataWatcher } from "./appSaga";
import { call, all, spawn } from "@redux-saga/core/effects";
import { forgotPasswordWatcher } from "screens/generic/FogotPassword/redux";
import { fetchRoutesDataWatcher } from "router/redux";
import {
  deletePageHandlerWatcher,
  getModuleHandlerWatcher,
  getPageTypeHandlerWatcher,
  pageSetupLoadingHandlerWatcher,
} from "screens/Setup/UserSetup/PageSetup/redux";

export function* rootSaga() {
  /**
   *
   *  Register watchers
   *
   */
  const sagas = [
    fetchApiDataWatcher,
    forgotPasswordWatcher,
    genericLoadingHandlerWatcher,
    fetchRoutesDataWatcher,
    getModuleHandlerWatcher,
    getPageTypeHandlerWatcher,
    deletePageHandlerWatcher,
  ];

  /**
   * keep everything (e.g., child tasks) alive
   *
   **/
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {}
        }
      })
    )
  );
}
