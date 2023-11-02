import { createSelector } from "@reduxjs/toolkit";

const loadingData = (state) => state.moduleSetupState.loading;

const moduleData = (state) => state.moduleSetupState.module;

const pageTypeData = (state) => state.moduleSetupState.pageType;

const deleteModuleData = (state) => state.moduleSetupState.message;

const getModuleData = createSelector([moduleData], (module) => module);

const getPageTypeData = createSelector([pageTypeData], (module) => module);

const getLoading = createSelector([loadingData], (loading) => loading);

const getDeleteModuleData = createSelector([deleteModuleData], (message) => message);

export const moduleSetupSelector = {
  getLoading: () => getLoading,
  getModuleData: () => getModuleData,
  getPageTypeData: () => getPageTypeData,
  getDeleteModuleData: () => getDeleteModuleData,
};
