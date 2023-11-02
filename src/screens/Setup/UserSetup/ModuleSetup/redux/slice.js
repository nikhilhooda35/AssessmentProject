import { createSlice, createAction } from "@reduxjs/toolkit";

const moduleSetupState = {
  loading: null,
  module: [],
  displayName: [],
  message: null,
};

/**
 * Page Setup Slice
 */

export const moduleSetupLoadingHandlerCreator = createAction("MODULE_SETUP/LOADING_HANDLER");

export const moduleSetupLoadingHandlerCreatorTypeName =
  moduleSetupLoadingHandlerCreator(null).type;
  
export const getModuleHandlerCreator = createAction("MODULE_SETUP/MODULE_HANDLER");

export const getModuleHandlerCreatorTypeName =
  getModuleHandlerCreator(null).type;

export const getPageTypeHandlerCreator = createAction("MODULE_SETUP/PAGE_TYPE_HANDLER");

export const getPageTypeHandlerCreatorTypeName =
  getPageTypeHandlerCreator(null).type;

export const deleteModuleHandlerCreator = createAction("MODULE_SETUP/DELETE_MODULE_HANDLER");

export const deleteModuleHandlerCreatorTypeName =
deleteModuleHandlerCreator(null).type;

const moduleSetupSlice = createSlice({
  name: "moduleSetup",
  initialState: moduleSetupState,
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
    setDisplayName: (state, action) => {
      return {
        ...state,
        pageType: action.payload,
      };
    },
    deleteModule: (state, action) => {
      return {
        ...state,
        message: action.payload,
      };
    },
  },
});

export const ModuleSetupActions = moduleSetupSlice.actions;
export const ModuleSetupReducer = moduleSetupSlice.reducer;
