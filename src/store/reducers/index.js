import { combineReducers } from "@reduxjs/toolkit";
import { appSliceReducer } from "./appSlice";
import { genericReducer } from "screens/generic/redux";
import { routeStateReducer } from "router/redux/routerHandler";
import { loginReducer } from "screens/generic/Login/redux";
import { PageSetupReducer } from "screens/Setup/UserSetup/PageSetup/redux";

export const rootReducer = combineReducers({
  appState: appSliceReducer,
  loginState: loginReducer,
  genericState: genericReducer,
  routeState: routeStateReducer,
  pageSetupState: PageSetupReducer,
});

export {} from "./appSlice";
