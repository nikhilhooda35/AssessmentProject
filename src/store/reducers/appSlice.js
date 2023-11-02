import { createAction, createSlice } from "@reduxjs/toolkit";

export const appState = {
  apiData: {},
};

export const fetchApiDataCreator = createAction(
  "FETCH_API_DATA"
);

export const fetchApiDataCreatorTypeName = fetchApiDataCreator().type;

export const appSlice = createSlice({
  name: "app/appSlice",
  initialState: appState,
  reducers: {
    setApiData: (prevState, action) => {
       const { payload } = action;
      return {
        ...prevState,
        apiData: payload,
      };
    },
  },
});

export const appSliceReducer = appSlice.reducer;
export const appSliceActions = appSlice.actions;
