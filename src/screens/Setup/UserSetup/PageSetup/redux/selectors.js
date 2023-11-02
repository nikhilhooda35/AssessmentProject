import { createSelector } from "@reduxjs/toolkit";

const loadingData = (state) => state.pageSetupState.loading;

const moduleData = (state) => state.pageSetupState.module;

const pageTypeData = (state) => state.pageSetupState.pageType;

const deletePageData = (state) => state.pageSetupState.message;

const getModuleData = createSelector([moduleData], (module) => module);

const getPageTypeData = createSelector([pageTypeData], (module) => module);

const getLoading = createSelector([loadingData], (loading) => loading);

const getDeletePageData = createSelector([deletePageData], (message) => message);

export const pageSetupSelector = {
  getLoading: () => getLoading,
  getModuleData: () => getModuleData,
  getPageTypeData: () => getPageTypeData,
  getDeletePageData: () => getDeletePageData,
};
