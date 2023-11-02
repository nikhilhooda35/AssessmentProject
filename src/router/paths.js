import { lazy } from "react";

const Dashboard = lazy(() =>
  import("screens/Menu/Dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);

const Login = lazy(() =>
  import("screens/generic/Login").then((module) => ({
    default: module.Login,
  }))
);

const Auth = lazy(() =>
  import("screens/generic/Auth").then((module) => ({
    default: module.Auth,
  }))
);
const Home = lazy(() =>
  import("screens/Home").then((module) => ({ default: module.Home }))
);

const ForgotPassword = lazy(() =>
  import("screens/generic/FogotPassword").then((module) => ({
    default: module.ForgotPassword,
  }))
);
const Logout = lazy(() =>
  import("screens/generic/Logout").then((module) => ({
    default: module.Logout,
  }))
);
const ChangePassword = lazy(() =>
  import("screens/generic/ChangePassword").then((module) => ({
    default: module.ChangePassword,
  }))
);
const InProgress = lazy(() =>
  import("screens/in-progress").then((module) => ({
    default: module.InProgress,
  }))
);
const Unauthorized = lazy(() =>
  import("screens/unauthorized").then((module) => ({
    default: module.Unauthorized,
  }))
);
const School = lazy(() =>
  import("screens/Menu/School").then((module) => ({
    default: module.School,
  }))
);
const Setup = lazy(() =>
  import("screens/Menu/Setup").then((module) => ({
    default: module.Setup,
  }))
);
const SubMenuContainer = lazy(() =>
  import("screens/subMenuContainer").then((module) => ({
    default: module.SubMenuContainer,
  }))
);

//User Setup
const PageSetup = lazy(() =>
  import("screens/Setup/UserSetup/PageSetup").then((module) => ({
    default: module.PageSetup,
  }))
);
const AddPage = lazy(() =>
  import("screens/Setup/UserSetup/PageSetup/AddPage").then((module) => ({
    default: module.AddPage,
  }))
);
const ModuleSetup = lazy(() =>
  import("screens/Setup/UserSetup/ModuleSetup").then((module) => ({
    default: module.ModuleSetup,
  }))
);
const AddModule = lazy(() =>
  import("screens/Setup/UserSetup/ModuleSetup/AddModule").then((module) => ({
    default: module.AddModule,
  }))
);




export const RoutesName = {
  Login: {
    path: "/login",
    componentName: "Login",
  },
  Auth: {
    path: "/auth",
    componentName: "Auth",
  },
  Dashboard: {
    path: "/dashboard",
    componentName: "Dashboard",
  },
  Home: {
    path: "/home",
    componentName: "Home",
  },
  ForgotPassword: {
    path: "/forgotpassword",
    componentName: "ForgotPassword",
  },
  Logout: {
    path: "/logout",
    componentName: "Logout",
  },
  ChangePassword: {
    path: "/changePassword",
    componentName: "ChangePassword",
  },
  Unauthorized: {
    path: "/unauthorized",
    componentName: "Unauthorized",
  },
  InProgress: {
    path: "/in-progress",
    componentName: "InProgress",
  },
  School: {
    path: "/school",
    componentName: "School",
  },
  Setup: {
    path: "/setup",
    componentName: "Setup",
  },
  AddPage: {
    path: "/addPage",
    componentName: "AddPage",
  },
  AddModule: {
    path: "/addModule",
    componentName: "AddModule",
  },
 
};

export const RoutesNameComponentMap = {
  Dashboard: <Dashboard />,
  Login: <Login />,
  Auth: <Auth />,
  Home: <Home />,
  InProgress: <InProgress />,
  Unauthorized: <Unauthorized />,
  ForgotPassword: <ForgotPassword />,
  Logout: <Logout />,
  ChangePassword: <ChangePassword />,
  School: <School />,
  Setup: <Setup />,
  SubMenuContainer: <SubMenuContainer />,
  PageSetup: <PageSetup />,
  AddPage: <AddPage />,
  ModuleSetup: <ModuleSetup />,
  AddModule: <AddModule />,
};
