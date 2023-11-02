import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { shallowEqual, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LeftSideBar } from "components/leftSideBar";
import { routeSelector } from "router/redux/routerSelector";
import { NavBar } from "components/navbar";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  // alignItems: "center",
  padding: theme.spacing(2, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Layout = ({ children }) => {
  const open = useSelector(routeSelector.getSideBarOpen(), shallowEqual);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* authorized={isAuthorized}  have to add this when doing authorization*/}
      <NavBar />
      <LeftSideBar />
      <Main open={open}>
        <DrawerHeader />
        <ToastContainer />
        <Box>{children}</Box>
      </Main>
    </Box>
  );
};
