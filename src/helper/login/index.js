import { ACCESS_TOKEN, TOKEN_EXPIRY_TIME, USER_ID } from "common/constants";

export const saveAccessToken = (accessToken) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const saveUserId = (userId) => {
  localStorage.setItem(USER_ID, userId);
};

export const getUserId = () => {
  return localStorage.getItem(USER_ID);
};

export const saveTokenExpiryTime = (expiryTime) => {
  localStorage.setItem(TOKEN_EXPIRY_TIME, expiryTime);
};

export const getTokenExpiryTime = () => {
  return localStorage.getItem(TOKEN_EXPIRY_TIME);
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_EXPIRY_TIME);
  localStorage.removeItem(USER_ID);
};

export const isAccessTokenValid = () => {
  const tokenExpiryTime = localStorage.getItem(TOKEN_EXPIRY_TIME);
  const currentTime = Date.now();
  const diff = currentTime - tokenExpiryTime * 1000;
  if (diff <= 0) {
    return true;
  } else {
    localStorage.clear();
    return false;
  }
};
