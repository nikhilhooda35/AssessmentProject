import { createSelector } from "@reduxjs/toolkit";

export const routeSelector = {
  getIsRoutesLoading: () => {
    return createSelector(
      [(state) => state.routeState.isRoutesLoading],
      (isRoutesLoading) => isRoutesLoading
    );
  },
  getAppRoutes: () => {
    return createSelector(
      [(state) => state.routeState.appRoutes],
      (appRoutes) => appRoutes
    );
  },
  getSideBarOpen: () => {
    return createSelector(
      [(state) => state.routeState.sideBarOpen],
      (sideBarOpen) => sideBarOpen
    );
  },
  getNavbarComponentName: () => {
    return createSelector(
      [(state) => state.routeState.navbarComponentName],
      (navbarComponentName) => navbarComponentName
    );
  },
  getNavbarComponentHeading: () => {
    return createSelector(
      [(state) => state.routeState.navbarComponentHeading],
      (navbarComponentHeading) => navbarComponentHeading
    );
  },
};
