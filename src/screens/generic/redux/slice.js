import { createSlice, createAction } from "@reduxjs/toolkit";

const genericState = {
  loading: null,
};

/**
 * Generic Slice
 */

export const genericLoadingHandlerCreator = createAction(
  "GENERIC/LOADING_HANDLER"
);

export const genericLoadingHandlerCreatorTypeName =
  genericLoadingHandlerCreator(null).type;

const genericSlice = createSlice({
  name: "generic",
  initialState: genericState,
  reducers: {
    updateLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const genericActions = genericSlice.actions;
export const genericReducer = genericSlice.reducer;
