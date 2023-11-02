import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { RoutesName, RoutesNameComponentMap } from "./paths";
import { RenderChilds } from "components/widgets/RenderChilds";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAccessToken, isAccessTokenValid } from "helper/login";
import { routeSelector } from "./redux";
import { loginActions, loginSelector } from "screens/generic/Login/redux";
import { Layout } from "components/layout";
import { fetchAppRoutesCreator } from "./redux/routerHandler";

export function AppRouter() {
  const dispatch = useDispatch();

  const [routesAdded, setRoutesAdded] = useState([]);
  const appRoutes = useSelector(routeSelector.getAppRoutes(), shallowEqual);
  const authToken = useSelector(loginSelector.getAuthToken(), shallowEqual);
  const isAuthorized = useSelector(
    loginSelector.getIsAuthorizedSelector(),
    shallowEqual
  );

  useEffect(() => {
    const updateTokenAndScreenOnWeb = () => {
      try {
        const token = getAccessToken();
        if (token && isAccessTokenValid()) {
          dispatch(fetchAppRoutesCreator());
          dispatch(
            loginActions.signIn({
              authToken: token,
              logout: false,
            })
          );
          dispatch(loginActions.setIsAuthorized({ isAuthorized: true }));
        } else {
          dispatch(
            loginActions.signOut({
              authToken: null,
              logout: true,
            })
          );
        }
      } catch (error) {
        dispatch(
          loginActions.signOut({
            authToken: null,
            logout: true,
          })
        );
      }
    };
    updateTokenAndScreenOnWeb();
  }, [authToken, dispatch]);

  useEffect(() => {
    if (appRoutes && appRoutes.length > 0) {
      const routes = [];
      appRoutes.map((route) => {
        const primaryRoute = route;
        const secondaryRoutes = route.mainMenuList;
        primaryRoute &&
          routes.push(
            <Route
              path={primaryRoute.modulename}
              element={
                <Suspense fallback={<></>}>
                  {RoutesNameComponentMap.SubMenuContainer}
                </Suspense>
              }
            />
          );
        secondaryRoutes &&
          secondaryRoutes.length > 0 &&
          secondaryRoutes.map((secondaryRoutesRoute) => {
            routes.push(
              <Route
                path={secondaryRoutesRoute.pagepath}
                element={
                  <Suspense fallback={<></>}>
                    {RoutesNameComponentMap.SubMenuContainer}
                  </Suspense>
                }
              />
            );
            if (secondaryRoutesRoute?.subMenuList?.length > 0) {
              secondaryRoutesRoute?.subMenuList?.map((_route) => {
                routes.push(
                  <Route
                    path={_route?.pagepath}
                    element={
                      <Suspense fallback={<></>}>
                        {RoutesNameComponentMap[_route?.pagename]}
                      </Suspense>
                    }
                  />
                );
                return null;
              });
            }
            return null;
          });
        return null;
      });
      setRoutesAdded(routes);
    }
  }, [appRoutes]);

  return (
    <BrowserRouter>
      {authToken || (getAccessToken() && isAccessTokenValid()) ? (
        <>
          <RenderChilds
            condition={isAuthorized}
            child1={
              <AuthorizedLayout
                routesAdded={
                  routesAdded && routesAdded.length > 0 ? routesAdded : []
                }
                RoutesNameComponentMap={RoutesNameComponentMap}
                RoutesName={RoutesName}
              />
            }
            child2={
              <UnAuthorizedLayout
                RoutesNameComponentMap={RoutesNameComponentMap}
                RoutesName={RoutesName}
              />
            }
          />
        </>
      ) : (
        <Routes>
          <Route
            key={RoutesName.Home.path}
            path={RoutesName.Home.path}
            element={
              <Suspense fallback={<></>}>
                {RoutesNameComponentMap[RoutesName.Home.componentName]}
              </Suspense>
            }
          />
          <Route
            key={RoutesName.Login.path}
            path={RoutesName.Login.path}
            element={
              <Suspense fallback={<></>}>
                {RoutesNameComponentMap[RoutesName.Login.componentName]}
              </Suspense>
            }
          />
          <Route
            key={RoutesName.ForgotPassword.path}
            path={RoutesName.ForgotPassword.path}
            element={
              <Suspense fallback={<></>}>
                {
                  RoutesNameComponentMap[
                    RoutesName.ForgotPassword.componentName
                  ]
                }
              </Suspense>
            }
          />
          <Route
            key={RoutesName.Logout.path}
            path={RoutesName.Logout.path}
            element={
              <Suspense fallback={<></>}>
                {RoutesNameComponentMap[RoutesName.Logout.componentName]}
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<></>}>
                <Navigate replace to={RoutesName.Home.path} />
              </Suspense>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export const AuthorizedLayout = ({
  routesAdded,
  RoutesNameComponentMap,
  RoutesName,
}) => (
  <Layout>
    <Routes>
      {routesAdded && routesAdded.length > 0 ? routesAdded : null}
      <Route
        key={RoutesName.Dashboard.path}
        path={RoutesName.Dashboard.path}
        element={
          <Suspense fallback={<></>}>
            {RoutesNameComponentMap[RoutesName.Dashboard.componentName]}
          </Suspense>
        }
      />
      <Route
        key={RoutesName.Dashboard.path}
        path="*"
        element={
          <Suspense fallback={<></>}>
            <Navigate replace to={RoutesName.Dashboard.path} />
          </Suspense>
        }
      />
      <Route
        key={RoutesName.ChangePassword.path}
        path={RoutesName.ChangePassword.path}
        element={
          <Suspense fallback={<></>}>
            {RoutesNameComponentMap[RoutesName.ChangePassword.componentName]}
          </Suspense>
        }
      />
      <Route
        key={RoutesName.School.path}
        path={RoutesName.School.path}
        element={
          <Suspense fallback={<></>}>
            {RoutesNameComponentMap[RoutesName.School.componentName]}
          </Suspense>
        }
      />
      <Route
        key={RoutesName.Setup.path}
        path={RoutesName.Setup.path}
        element={
          <Suspense fallback={<></>}>
            {RoutesNameComponentMap[RoutesName.Setup.componentName]}
          </Suspense>
        }
      />
      <Route
        key={RoutesName.AddPage.path}
        path={RoutesName.AddPage.path}
        element={
          <Suspense fallback={<></>}>
            {RoutesNameComponentMap[RoutesName.AddPage.componentName]}
          </Suspense>
        }
      />
      <Route
        key={RoutesName.AddModule.path}
        path={RoutesName.AddModule.path}
        element={
          <Suspense fallback={<></>}>
            {RoutesNameComponentMap[RoutesName.AddModule.componentName]}
          </Suspense>
        }
      />
    </Routes>
  </Layout>
);
export const UnAuthorizedLayout = ({ RoutesNameComponentMap, RoutesName }) => (
  <Routes>
    <Route
      key={RoutesName.Home.path}
      path={RoutesName.Home.path}
      element={
        <Suspense fallback={<></>}>
          {RoutesNameComponentMap[RoutesName.Home.componentName]}
        </Suspense>
      }
    />
    <Route
      path="*"
      element={
        <Suspense fallback={<></>}>
          <Navigate replace to={RoutesName.Home.path} />
        </Suspense>
      }
    />
    <Route
      key={RoutesName.Login.path}
      path={RoutesName.Login.path}
      element={
        <Suspense fallback={<></>}>
          {RoutesNameComponentMap[RoutesName.Login.componentName]}
        </Suspense>
      }
    />
    <Route
      key={RoutesName.Logout.path}
      path={RoutesName.Logout.path}
      element={
        <Suspense fallback={<></>}>
          {RoutesNameComponentMap[RoutesName.Logout.componentName]}
        </Suspense>
      }
    />
    <Route
      key={RoutesName.ForgotPassword.path}
      path={RoutesName.ForgotPassword.path}
      element={
        <Suspense fallback={<></>}>
          {RoutesNameComponentMap[RoutesName.ForgotPassword.componentName]}
        </Suspense>
      }
    />
  </Routes>
);
