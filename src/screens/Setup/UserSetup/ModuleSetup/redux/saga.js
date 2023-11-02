import { takeLatest, put, call } from "@redux-saga/core/effects";
import {
  getModuleHandlerCreatorTypeName,
  ModuleSetupActions,
  moduleSetupLoadingHandlerCreatorTypeName,
  getPageTypeHandlerCreatorTypeName,
  deleteModuleHandlerCreatorTypeName,
} from "./slice";
import { API_PATH, HTTP_OK } from "common/constants";
import NetworkService from "services/network/NetworkService";
import { ErrorToaster, SuccessToaster } from "components/Toaster";

export function* moduleSetupLoadingHandlerWatcher() {
  yield takeLatest(
    moduleSetupLoadingHandlerCreatorTypeName,
    moduleSetupLoadingHandlerWorker
  );
}

function* moduleSetupLoadingHandlerWorker(action) {
  yield put(ModuleSetupActions.updateLoading(action.payload));
}

export function* getModuleHandlerWatcher() {
  yield takeLatest(getModuleHandlerCreatorTypeName, getModuleHandlerWorker);
}

function* getModuleHandlerWorker(action) {
  yield put(
    ModuleSetupActions.updateLoading(API_PATH.UserSetup.PageSetup.GetModule)
  );
  try {
    const response = yield call(
      NetworkService.post,
      API_PATH.UserSetup.PageSetup.GetModule,
      {}
    );
    yield put(ModuleSetupActions.setModule(response.data._lstModuleData));
    yield put(ModuleSetupActions.updateLoading(null));
  } catch (error) {
    yield put(ModuleSetupActions.updateLoading(null));
    ErrorToaster(error.response.data || error.message || "Error Occured");
  }
}

export function* getPageTypeHandlerWatcher() {
  yield takeLatest(getPageTypeHandlerCreatorTypeName, getPageTypeHandlerWorker);
}

function* getPageTypeHandlerWorker(action) {
  yield put(
    ModuleSetupActions.updateLoading(API_PATH.UserSetup.PageSetup.GetPageType)
  );
  try {
    const response = yield call(
      NetworkService.post,
      API_PATH.UserSetup.PageSetup.GetPageType,
      {}
    );
    yield put(ModuleSetupActions.setPageType(response.data._lstPageTypeData));
    yield put(ModuleSetupActions.updateLoading(null));
  } catch (error) {
    yield put(ModuleSetupActions.updateLoading(null));
    ErrorToaster(error.response.data || error.message || "Error Occured");
  }
}

export function* deleteModuleHandlerWatcher() {
  yield takeLatest(deleteModuleHandlerCreatorTypeName, deleteModuleHandlerWorker);
}

function* deleteModuleHandlerWorker(action) {
  const { deletePageData } = action.payload;
  yield put(
    ModuleSetupActions.updateLoading(API_PATH.UserSetup.PageSetup.DeletePage)
  );
  try {
    const response = yield call(
      NetworkService.post,
      API_PATH.UserSetup.PageSetup.DeletePage,
      deletePageData,
      {}
    );
    if (response.status === HTTP_OK) {
      SuccessToaster(response.data.message || "Page Deleted");
    } else {
      ErrorToaster(response.data || "Error Occured");
    }
    yield put(ModuleSetupActions.deletePage(response.data));
    yield put(ModuleSetupActions.updateLoading(null));
  } catch (error) {
    yield put(ModuleSetupActions.updateLoading(null));
    ErrorToaster(error.response.data || error.message || "Error Occured");
  }
}
