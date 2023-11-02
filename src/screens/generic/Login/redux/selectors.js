import { createSelector } from "@reduxjs/toolkit";

const getLoginState = (state) => state.loginState;

const getAuthToken = (state) => state.loginState.authToken;

const getAuthLogoutStatus = (state) => state.loginState.logout;

const getIsAuthorized = (state) => state.loginState.isAuthorized;

const getAuthTokenSelector = createSelector(
  [getAuthToken],
  (_getAuthToken) => _getAuthToken
);

const getLoginStateSelector = createSelector(
  [getLoginState],
  (_getLoginState) => _getLoginState
);

const getAuthLogoutStatusSelector = createSelector(
  [getAuthLogoutStatus],
  (_getAuthLogoutStatus) => _getAuthLogoutStatus
);

const getIsAuthorizedSelector = createSelector(
  [getIsAuthorized],
  (_getIsAuthorized) => _getIsAuthorized
);

export const loginSelector = {
  getLoginStateSelector: () => getLoginStateSelector,
  getAuthToken: () => getAuthTokenSelector,
  getAuthLogoutStatusSelector: () => getAuthLogoutStatusSelector,
  getIsAuthorizedSelector: () => getIsAuthorizedSelector,
};
