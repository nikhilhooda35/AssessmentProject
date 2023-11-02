import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ProfileImg } from "assets/icons";
import { InputAdornment, TextField, CircularProgress } from "@mui/material";
import { Notes, Search } from "@mui/icons-material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loginSelector } from "screens/generic/Login/redux";
import {
  FullscreenIcon,
  MoonIcon,
  NotesIcon,
  NotificationIcon,
  TranslateIcon,
} from "assets/icons/svg/topBar";
import { routeSelector } from "router/redux/routerSelector";
import { routeStateActions } from "router/redux/routerHandler";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#fff",
  boxShadow: "none",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    backgroundColor: "#fff",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    borderRadius: 20,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const NavBar = () => {
  const dispatch = useDispatch();

  const open = useSelector(routeSelector.getSideBarOpen(), shallowEqual);
  const loginData = useSelector(loginSelector.getLoginStateSelector());

  const handleDrawerOpenClose = () => {
    dispatch(routeStateActions.setSideBarOpen(!open));
  };
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <IconButton
            color="blue"
            aria-label="open drawer"
            onClick={handleDrawerOpenClose}
            edge="start"
            sx={{ mr: 2, ...(open && { color: "#004CDF" }) }}
          >
            <Notes />
          </IconButton>
          <TextField
            placeholder="Search..."
            // value={username}
            // onChange={(e) => {
            //   setUsername(e.target.value);
            // }}
            style={{ height: 1 }}
            size="small"
            InputProps={{
              style: {
                borderRadius: 8,
                padding: 1,
              },
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => {}}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box>
            <IconButton
              color="blue"
              sx={{ mr: 0.1, ...(open && { color: "#004CDF" }) }}
            >
              <MoonIcon />
            </IconButton>
            <IconButton
              color="blue"
              sx={{ mr: 0.1, ...(open && { color: "#004CDF" }) }}
            >
              <NotificationIcon />
            </IconButton>
            <IconButton
              color="blue"
              sx={{ mr: 0.1, ...(open && { color: "#004CDF" }) }}
            >
              <NotesIcon />
            </IconButton>
            <IconButton
              color="blue"
              sx={{ mr: 0.1, ...(open && { color: "#004CDF" }) }}
            >
              <TranslateIcon />
            </IconButton>
            <IconButton
              color="blue"
              sx={{ mr: 4, ...(open && { color: "#004CDF" }) }}
            >
              <FullscreenIcon />
            </IconButton>
          </Box>

          <Box pt={0.5} mr={1}>
            <Typography
              color={"black"}
              fontWeight={600}
              textTransform={"capitalize"}
            >
              {loginData.userName || "admin"}
            </Typography>
            <Typography color={"black"} textAlign={"right"}>
              Admin
            </Typography>
          </Box>

          <CircularProgress
            variant="determinate"
            value={75}
            sx={{
              color: "#004CDF",
              position: "absolute",
              left: "85.5%",
            }}
          />
          <img
            src={ProfileImg}
            alt="profile"
            width={32.5}
            height={32.5}
            style={{
              borderRadius: 20,
              marginTop: 4,
              marginLeft: 4,
              marginRight: 15,
            }}
          />
          <Box>
            <Typography sx={{ fontSize: 12, color: "#000" }}>
              Profile Completion
            </Typography>
            <Typography
              sx={{ fontSize: 12, color: "#004CDF", fontWeight: 600 }}
            >
              75%
            </Typography>
            <Typography
              onClick={() => {
                alert("profile clicked");
              }}
              sx={{
                fontSize: 12,
                color: "#004CDF",
                fontWeight: 600,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              My Profile
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
