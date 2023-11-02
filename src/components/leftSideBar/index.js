import { ListSubheader } from "@mui/material";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { CompanyLogo } from "assets/images";
import { CollapseMenu } from "components/collapseMenu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RoutesName } from "router/paths";
import { routeSelector } from "router/redux/routerSelector";

const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(2, 1),
  ...theme.mixins.toolbar,
}));
const dashboardObject = {
  moduleId: 101,
  modulename: RoutesName.Dashboard.componentName,
  pagepath: RoutesName.Dashboard.path,
  mainMenuList: [],
};
const logoutObj = {
  moduleId: 102,
  modulename: RoutesName.Logout.componentName,
  pagepath: RoutesName.Logout.path,
  mainMenuList: [],
};
export const LeftSideBar = () => {
  const open = useSelector(routeSelector.getSideBarOpen());
  const routes = useSelector(routeSelector.getAppRoutes());
  const [newRoute, setNewRouts] = useState([]);
  useEffect(() => {
    if (routes && routes.length > 0) {
      const updatedRoutes = [
        dashboardObject,
        ...routes.map((element) => ({
          ...element,
          pagepath: `/${element.modulename}`,
        })),
        logoutObj,
      ];
      setNewRouts(updatedRoutes);
    }
  }, [routes]);

  const getRouteLinks = (routes) => {
    const routeLinks = [];
    routes?.map((route) => {
      routeLinks.push(<CollapseMenu route={route} />);
      return null;
    });

    return routeLinks;
  };
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            "&::-webkit-scrollbar": {
              width: "5px", // Adjust the width as needed
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "lightgray", // Adjust the scrollbar thumb color
            },
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img
            alt="logo"
            style={{ height: 35, width: 180 }}
            src={CompanyLogo}
          />
        </DrawerHeader>
        <ListSubheader sx={{ fontFamily: "FontSemiBold" }}>Menu</ListSubheader>
        {newRoute && newRoute.length > 0 ? getRouteLinks(newRoute) : null}
        <Divider sx={{ width: 200, marginLeft: 2, marginRight: 2 }} />
      </Drawer>
    </>
  );
};
