import { createSlice, createAction } from "@reduxjs/toolkit";

const pageSetupState = {
  loading: null,
  module: [],
  pageType: [],
  message: null,
};

/**
 * Page Setup Slice
 */

export const pageSetupLoadingHandlerCreator = createAction("PAGE_SETUP/LOADING_HANDLER");

export const pageSetupLoadingHandlerCreatorTypeName =
  pageSetupLoadingHandlerCreator(null).type;
  
export const getModuleHandlerCreator = createAction("PAGE_SETUP/MODULE_HANDLER");

export const getModuleHandlerCreatorTypeName =
  getModuleHandlerCreator(null).type;

export const getPageTypeHandlerCreator = createAction("PAGE_SETUP/PAGE_TYPE_HANDLER");

export const getPageTypeHandlerCreatorTypeName =
  getPageTypeHandlerCreator(null).type;

export const deletePageHandlerCreator = createAction("PAGE_SETUP/DELETE_PAGE_HANDLER");

export const deletePageHandlerCreatorTypeName =
deletePageHandlerCreator(null).type;

const pageSetupSlice = createSlice({
  name: "pageSetup",
  initialState: pageSetupState,
  reducers: {
    updateLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setModule: (state, action) => {
      return {
        ...state,
        module: action.payload,
      };
    },
    setPageType: (state, action) => {
      return {
        ...state,
        pageType: action.payload,
      };
    },
    deletePage: (state, action) => {
      return {
        ...state,
        message: action.payload,
      };
    },
  },
});

export const PageSetupActions = pageSetupSlice.actions;
export const PageSetupReducer = pageSetupSlice.reducer;
