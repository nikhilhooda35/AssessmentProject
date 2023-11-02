import { takeLatest, put, call } from "@redux-saga/core/effects";
import {
  getModuleHandlerCreatorTypeName,
  PageSetupActions,
  getPageTypeHandlerCreatorTypeName,
  deletePageHandlerCreatorTypeName,
} from "./slice";
import { API_PATH, HTTP_OK } from "common/constants";
import NetworkService from "services/network/NetworkService";
import { ErrorToaster, SuccessToaster } from "components/Toaster";



export function* getModuleHandlerWatcher() {
  yield takeLatest(getModuleHandlerCreatorTypeName, getModuleHandlerWorker);
}

function* getModuleHandlerWorker(action) {
  yield put(
    PageSetupActions.updateLoading(API_PATH.UserSetup.PageSetup.GetModule)
  );
  try {
    const response = yield call(
      NetworkService.post,
      API_PATH.UserSetup.PageSetup.GetModule,
      {}
    );
    yield put(PageSetupActions.setModule(response.data._lstModuleData));
    yield put(PageSetupActions.updateLoading(null));
  } catch (error) {
    yield put(PageSetupActions.updateLoading(null));
    ErrorToaster(error.response.data || error.message || "Error Occured");
  }
}

export function* getPageTypeHandlerWatcher() {
  yield takeLatest(getPageTypeHandlerCreatorTypeName, getPageTypeHandlerWorker);
}

function* getPageTypeHandlerWorker(action) {
  yield put(
    PageSetupActions.updateLoading(API_PATH.UserSetup.PageSetup.GetPageType)
  );
  try {
    const response = yield call(
      NetworkService.post,
      API_PATH.UserSetup.PageSetup.GetPageType,
      {}
    );
    yield put(PageSetupActions.setPageType(response.data._lstPageTypeData));
    yield put(PageSetupActions.updateLoading(null));
  } catch (error) {
    yield put(PageSetupActions.updateLoading(null));
    ErrorToaster(error.response.data || error.message || "Error Occured");
  }
}

export function* deletePageHandlerWatcher() {
  yield takeLatest(deletePageHandlerCreatorTypeName, deletePageHandlerWorker);
}

function* deletePageHandlerWorker(action) {
  const { deletePageData } = action.payload;
  yield put(
    PageSetupActions.updateLoading(API_PATH.UserSetup.PageSetup.DeletePage)
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
      yield put(PageSetupActions.deletePage(response.data));
    } else {
      ErrorToaster(response.data || "Error Occured");
    }
    yield put(PageSetupActions.updateLoading(null));
  } catch (error) {
    yield put(PageSetupActions.updateLoading(null));
    ErrorToaster(error.response.data || error.message || "Error Occured");
  }
}
