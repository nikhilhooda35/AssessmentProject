import { createSelector } from "@reduxjs/toolkit";

const apiData = (state) => state.appState.apiData;

const getApiData = createSelector([apiData], (_apiData) => _apiData);

export const appSelector = {
  getApiData: () => getApiData,
};
