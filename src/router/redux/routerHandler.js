import { createAction, createSlice } from "@reduxjs/toolkit";

export const navbarComponentName = {
  dashBoard: 'DashBoard',
};

export const routesInitialState = {
  currentRoute: "",
  isRoutesLoading: false,
  routesRenderingError: false,
  routesRenderingErrorMessage: "",
  sideBarOpen: true,
  appRoutes: {},
  navbarComponentName: navbarComponentName.dashBoard,
  navbarComponentHeading: "",
};

export const fetchAppRoutesCreator = createAction(
  'ROUTE_HANDLER/FETCH_APP_ROUTES'
);
export const fetchAppRoutesCreatorTypeName = fetchAppRoutesCreator().type;

const routeStateHandler = createSlice({
  name: "ROUTE_HANDLER",
  initialState: routesInitialState,
  reducers: {
    setSideBarOpen: (prevState, action) => {
      const { payload } = action;
      return {
        ...prevState,
        sideBarOpen: payload,
      };
    },
    setRoutesLoading: (prevState, action) => {
      const { payload } = action;
      return {
        ...prevState,
        isRoutesLoading: payload,
      };
    },
    setAppRoutes: (prevState, action) => {
      const { payload } = action;
      return {
        ...prevState,
        appRoutes: payload,
      };
    },
    setNavbarComponentName: (prevState, action) => {
      const { payload } = action;

      return {
        ...prevState,
        navbarComponentName: payload,
      };
    },

    setNavbarComponentHeading: (prevState, action) => {
      const { payload } = action;

      return {
        ...prevState,
        navbarComponentHeading: payload,
      };
    },
  },
});

export const routeStateActions = routeStateHandler.actions;
export const routeStateReducer = routeStateHandler.reducer;
