import { takeLatest, put } from "@redux-saga/core/effects";
import { genericActions, genericLoadingHandlerCreatorTypeName } from "./slice";

export function* genericLoadingHandlerWatcher() {
  yield takeLatest(
    genericLoadingHandlerCreatorTypeName,
    genericLoadingHandlerWorker
  );
}

function* genericLoadingHandlerWorker(action) {
  yield put(genericActions.updateLoading(action.payload));
}
