import { createSlice } from "@reduxjs/toolkit";
import { logout } from "helper/login";

const loginState = {
  userID: null,
  pk_userID: null,
  userName: null,
  name: null,
  isfirstlogin: null,
  locationname: null,
  active: null,
  isAuthorized: null,
  authToken: null,
  logout: null,
};

/**
 * Login Slice
 */

const loginSlice = createSlice({
  name: "login",
  initialState: loginState,
  reducers: {
    signIn: (prevState, action) => {
      const { payload } = action;
      return {
        ...prevState,
        authToken: payload.authToken,
        logout: false,
        userID: payload.userID,
        pk_userID: payload.fk_userId_global,
        userName: payload.userName,
        name: payload.name,
        isfirstlogin: payload.isfirstlogin,
        locationname: payload.locationname,
        active: payload.active,
        fk_locationId: payload.fk_locationId,
      };
    },
    signOut: (prevState) => {
      logout();
      return {
        ...prevState,
        authToken: null,
        isAuthorized: false,
        logout: true,
      };
    },
    removeToken: (prevState) => {
      return {
        ...prevState,
        authToken: null,
      };
    },
    setIsAuthorized: (prevState, action) => {
      const { payload } = action;
      return {
        ...prevState,
        isAuthorized: payload.isAuthorized,
      };
    },
  },
});

export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
