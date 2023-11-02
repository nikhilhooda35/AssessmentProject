import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  AssessmentIcon,
  DashboardIcon,
  LogoutIcon,
  SchoolIcon,
  SetupIcon,
} from "assets/icons/svg/sideMenu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RoutesName } from "router/paths";
import { getDecryptedValue } from "screens/generic/Login/Encryption";
import { loginActions } from "screens/generic/Login/redux";
import themeOptions from "themeOptions";
import Colors from "themes/colors";
import { fontFamilies } from "themes/typography";
let primaryMenuLabel = "";
export const CollapseMenu = ({ route }) => {
  const [primaryMenu, setPrimaryMenu] = useState(false);
  const [secondryMenu, setSecondryMenu] = useState("");
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const ListIcon = ({ text, id }) => {
    const moduleId =
      typeof id === "number" ? id : parseInt(getDecryptedValue(id));
    switch (moduleId) {
      case 101:
        return (
          <div className="listIcon">
            <DashboardIcon />
          </div>
        );
      case 102:
        return (
          <div className="listIcon">
            <LogoutIcon />
          </div>
        );
      case 1:
        return (
          <div className="listIcon">
            <SetupIcon />
          </div>
        );
      case 2:
        return (
          <div className="listIcon">
            <SchoolIcon />
          </div>
        );

      default:
        return (
          <div className="listIcon">
            <AssessmentIcon />
          </div>
        );
    }
  };
  return (
    <>
      {route ? (
        <Box>
          <Box>
            <NavLink to={route?.pagepath} style={{ textDecoration: "none" }}>
              <ListItemButton
                onClick={() => {
                  if (primaryMenuLabel !== route?.modulename) {
                    setPrimaryMenu(true);
                  } else {
                    setPrimaryMenu(!primaryMenu);
                  }
                  setSecondryMenu("");
                  primaryMenuLabel = route?.modulename;
                  if (route?.modulename === "Logout") {
                    handleClickOpen();
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        color:
                          primaryMenuLabel === route?.modulename
                            ? Colors.primary
                            : Colors.menuUnSelected,
                        fontFamily:
                          primaryMenuLabel === route?.modulename
                            ? fontFamilies.fontBold
                            : fontFamilies.fontSemiBold,
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListIcon
                        text={route?.modulename}
                        id={route?.pk_moduleId_enc || route?.moduleId}
                      />
                      {route?.modulename}
                    </Typography>
                  }
                />
              </ListItemButton>
            </NavLink>
            {route?.mainMenuList && route?.mainMenuList?.length > 0 && (
              <>
                {route?.mainMenuList.map((routeFirstLevel, index) => {
                  return (
                    <>
                      <Collapse
                        in={
                          primaryMenu && route?.modulename === primaryMenuLabel
                        }
                        timeout="auto"
                        unmountOnExit
                        sx={{
                          backgroundColor: Colors.CE0E9FF,
                          borderLeft: 1,
                          borderLeftWidth: 6,
                          borderColor: Colors.primary,
                        }}
                      >
                        <List component="div" disablePadding>
                          <Box
                            //to={routeFirstLevel?.pagepath}
                            style={{ textDecoration: "none" }}
                            onClick={() => {
                              setSecondryMenu(routeFirstLevel?.menucaption);
                              primaryMenuLabel = route?.modulename;
                              navigate(routeFirstLevel?.pagepath, {
                                state: routeFirstLevel,
                              });
                            }}
                          >
                            <ListItemButton
                              sx={{ pl: 4, paddingTop: 0, paddingBottom: 0 }}
                            >
                              <ListItemText
                                primary={
                                  <Typography
                                    sx={{
                                      color:
                                        secondryMenu ===
                                        routeFirstLevel?.menucaption
                                          ? Colors.primary
                                          : Colors.menuUnSelected,
                                      fontSize: 12.7,
                                      fontFamily:
                                        secondryMenu ===
                                        routeFirstLevel?.menucaption
                                          ? fontFamilies.fontBold
                                          : fontFamilies.fontSemiBold,
                                      flexDirection: "row",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div className="listIcon">
                                      <SchoolIcon />
                                    </div>
                                    {routeFirstLevel?.menucaption}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          </Box>
                        </List>
                      </Collapse>
                    </>
                  );
                })}
              </>
            )}
          </Box>
        </Box>
      ) : (
        <></>
      )}

      <Dialog
        sx={{ position: "absolute", bottom: 350 }}
        open={dialogOpen}
        onClose={handleClose}
      >
        <DialogTitle sx={{ color: themeOptions.palette.title.main }}>
          {"Are you sure you want to log off?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              localStorage.clear();
              dispatch(loginActions.signOut());
              navigate(RoutesName.Logout.path);
            }}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
