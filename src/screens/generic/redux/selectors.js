import { createSelector } from "@reduxjs/toolkit";

const loadingData = (state) => state.genericState.loading;

const getLoading = createSelector([loadingData], (loading) => loading);

export const genericSelector = {
  getLoading: () => getLoading,
};
