import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Grid,
  CssBaseline,
  Box,
  Icon,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AdminLoginImg } from "assets/images";
import "./style.css";
import {
  PlayCircle,
  Replay,
  Visibility,
  VisibilityOff,
  West,
} from "@mui/icons-material";
import axios from "axios";
import { API_PATH, HTTP_OK } from "common/constants";
import { fontFamilies } from "themes/typography";
import {
  getDecryptedValue,
  getEncryptedValue,
  getEncryptedValueWithHash,
} from "./Encryption";
import { saveAccessToken, saveTokenExpiryTime, saveUserId } from "helper/login";
import { useNavigate } from "react-router-dom";
import { RoutesName } from "router/paths";
import { useDispatch, useSelector } from "react-redux";
import { genericActions, genericSelector } from "../redux";
import jwt_decode from "jwt-decode";
import { loginActions } from "./redux";
import { ToastContainer } from "react-toastify";
import env from "env";
import { ErrorToaster } from "components/Toaster";
const svgContent = `
    <svg width="677" height="675" viewBox="0 0 677 675" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M676.368 674.258L454.167 -315.744L-244.651 248.579L676.368 674.258Z" fill="url(#paint0_linear_98_34)" fill-opacity="0.79"/>
      <defs>
        <linearGradient id="paint0_linear_98_34" x1="676.368" y1="674.258" x2="-85.7787" y2="-269.529" gradientUnits="userSpaceOnUse">
          <stop stop-color="white"/>
          <stop offset="1" stop-color="white" stop-opacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  `;

const useStyles = makeStyles((theme) => ({
  customTextField: {
    "& input::placeholder": {
      fontSize: "14px",
    },
  },
  loginAdmin: {
    width: "100%",
    height: "706px",
    textAlign: "left",
    fontSize: "var(--font-size-sm)",
    color: "var(--color-darkslateblue-100)",
    fontFamily: "var(--font-poppins)",
    backgroundImage:
      "linear-gradient(85.17deg, #d0fff4, #fff 56.25%, rgba(212, 237, 255, 0.65))",
  },
  errorText: {
    marginLeft: 50,
  },
}));

export const Login = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(genericSelector.getLoading());

  const handleTogglePasswordVisibility = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    console.count("Login Page");
    generateCaptchaCode();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username) {
      setUsernameError(true);
      if (!password) {
        setPasswordError(true);
        return;
      }
    }
    if (captcha !== captchaCode) {
      setCaptchaError(true);
    } else {
      fetchUniqueKeyAndLogin();
    }
  };

  const generateCaptchaCode = () => {
    const characters =
      "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
    let captchaCodeGenerated = "";

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captchaCodeGenerated += characters.charAt(randomIndex);
    }

    setCaptchaCode(captchaCodeGenerated);
  };

  const fetchUniqueKeyAndLogin = async () => {
    dispatch(genericActions.updateLoading(API_PATH.fetchUniqueKey));
    try {
      // Fetch IP address and unique key concurrently
      const [ipResponse, response] = await Promise.all([
        fetch("https://api.ipify.org?format=json"),
        axios({
          method: "get",
          url: env.API_HOST + API_PATH.fetchUniqueKey,
          data: "",
          headers: {
            "Content-Type": "application/json",
            Authorization: ` `,
          },
        }),
      ]);

      const ipData = await ipResponse.json();
      const ipStatusCode = ipResponse.status;

      if (response.status === HTTP_OK && ipStatusCode === HTTP_OK) {
        dispatch(genericActions.updateLoading(null));
        LoginAPI(response.data.salt_enc, response.data.uniqueKey, ipData.ip);
      } else {
        dispatch(genericActions.updateLoading(null));
        ErrorToaster(response.data|| "Error Occured");
      }
    } catch (error) {
      dispatch(genericActions.updateLoading(null));
      ErrorToaster(error.response.data || error.message || "Error Occured");
    }
  };

  const handleResponse = (response) => {
    if (response.status === HTTP_OK) {
      const accessToken = response.data.authToken;
      const userId = response.data.fk_userId_global;
      const decoded = jwt_decode(accessToken);
      saveAccessToken(accessToken);
      saveUserId(userId);
      saveTokenExpiryTime(JSON.stringify(decoded.exp));
      dispatch(loginActions.signIn(response.data));
      dispatch(loginActions.setIsAuthorized({ isAuthorized: true }));
      if (response.data.isfirstlogin) {
        navigate(RoutesName.ChangePassword.path);
      } else {
        navigate(RoutesName.Dashboard.path);
      }
    } else {
      dispatch(genericActions.updateLoading(null));
      ErrorToaster(response.data|| "Error Occured");
    }
  };

  const LoginAPI = async (salt, key, ip) => {
    const loginData = {
      UserName: getEncryptedValue(username),
      Password: getEncryptedValueWithHash(password, getDecryptedValue(salt)),
      Client_IP: ip || "",
      uniqueKey: key || "",
    };
    dispatch(genericActions.updateLoading(API_PATH.fetchUniqueKey));
    try {
      const response = await axios({
        method: "post",
        url: env.API_HOST + API_PATH.loginIndex,
        data: loginData,
        headers: {
          "Content-Type": "application/json",
          Authorization: ` `,
        },
      });
      dispatch(genericActions.updateLoading(null));
      handleResponse(response);
    } catch (error) {
      dispatch(genericActions.updateLoading(null));
      ErrorToaster(error.response.data || error.message || "Error Occured");
    }
  };

  if (loading) {
    <Backdrop sx={{ zIndex: 9999 }} open>
      <CircularProgress sx={{ color: "blue" }} disableShrink />
    </Backdrop>;
  }

  return (
    <form onSubmit={handleLogin}>
      <div className={classes.loginAdmin}>
        <CssBaseline />
        <ToastContainer />
        <Container>
          <Grid
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            container
            spacing={2}
          >
            <Grid
              item
              xs={6}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  marginTop: -40,
                }}
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />

              <Box style={{ position: "absolute", top: 0, marginLeft: 170 }}>
                <img className="adminLogin-login" alt="" src={AdminLoginImg} />
              </Box>
              <Box className="assessment-software-text-parent-login">
                <Typography
                  className="assessment-software-text-login"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    fontFamily: fontFamilies.fontBold,
                  }}
                >
                  Assessment Software <br />
                  Portal For Admin
                </Typography>
                <Typography
                  className="assessment-software-text-child-login"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur. Non posuere
                  <br /> posuere ornare aliquam blandit in id bibendum.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 35,
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 70,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(RoutesName.Home.path);
                  }}
                >
                  <Icon>
                    <West style={{ width: 20, height: 20 }} />
                  </Icon>
                  <Typography
                    style={{
                      marginTop: 10,
                      color: "#002058",
                      textAlign: "center",
                      fontFamily: fontFamilies.fontRegular,
                      fontSize: 16,
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Back to Home
                  </Typography>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 140,
                  }}
                >
                  <Typography
                    style={{
                      marginTop: 10,
                      color: "#002058",
                      textAlign: "center",
                      fontFamily: fontFamilies.fontRegular,
                      fontSize: 16,
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Watch how it works!
                  </Typography>
                  <Icon>
                    <PlayCircle />
                  </Icon>
                </Box>
              </Box>
              <Box
                style={{
                  marginTop: 85,
                  marginLeft: 70,
                  borderRadius: 28,
                  backgroundColor: "#fff",
                  width: "60%",
                  // height: 502,
                  paddingBottom: 15,
                  boxShadow: "0px 6px 11px rgba(1, 24, 64, 0.13)",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: 50,
                  }}
                >
                  <Box
                    style={{
                      marginTop: 50,
                      width: 4,
                      height: 40,
                      flexShrink: 0,
                      backgroundColor: "#002058",
                    }}
                  />
                  <Typography
                    style={{
                      color: "#002058",
                      fontSize: 24,
                      fontStyle: "normal",
                      fontWeight: 700,
                      marginTop: 50,
                      marginLeft: 10,
                    }}
                  >
                    Admin Login
                  </Typography>
                </Box>

                <Typography
                  style={{
                    color: "rgba(21, 21, 21, 0.75);",
                    fontSize: 14,
                    fontStyle: "normal",
                    fontWeight: 400,
                    marginTop: -5,
                    marginLeft: 70,
                  }}
                >
                  Please enter your username and password
                </Typography>
                <Box
                  // component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "35ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div style={{ marginTop: 20 }}>
                    <TextField
                      classes={{ root: classes.customTextField }}
                      placeholder="Username@gmail.com"
                      value={username}
                      error={usernameError}
                      helperText={
                        usernameError ? (
                          <div className={classes.errorText}>
                            Please Enter UserName
                          </div>
                        ) : (
                          ""
                        )
                      }
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setUsernameError(false);
                      }}
                      fullWidth
                      InputProps={{
                        style: {
                          borderRadius: 8,
                          padding: 10,
                          background: "#E5F4FF",
                          marginLeft: 48,
                        },
                        disableUnderline: true,
                      }}
                      variant="standard"
                    />
                    <TextField
                      classes={{ root: classes.customTextField }}
                      placeholder="Password"
                      fullWidth
                      variant="standard"
                      value={password}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(false);
                      }}
                      error={passwordError}
                      helperText={
                        passwordError ? (
                          <div className={classes.errorText}>
                            Please Enter Password
                          </div>
                        ) : (
                          ""
                        )
                      }
                      InputProps={{
                        style: {
                          borderRadius: 8,
                          padding: 10,
                          background: "#E5F4FF",
                          marginLeft: 48,
                        },
                        disableUnderline: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </Box>
                <Box
                  // component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "35ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Typography
                    style={{
                      color: "#151515",
                      fontFamily: fontFamilies.fontRegular,
                      fontSize: 14,
                      fontStyle: "normal",
                      fontWeight: 500,
                      marginLeft: 48,
                      marginTop: 15,
                    }}
                  >
                    Enter Captcha code to process
                  </Typography>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <TextField
                      classes={{ root: classes.customTextField }}
                      placeholder="Enter Captcha"
                      value={captcha}
                      onChange={(e) => {
                        setCaptcha(e.target.value);
                        setCaptchaError(false);
                      }}
                      error={captchaError}
                      helperText={
                        captchaError ? (
                          <div className={classes.errorText}>
                            Captcha not matching
                          </div>
                        ) : (
                          ""
                        )
                      }
                      InputProps={{
                        style: {
                          borderRadius: 8,
                          padding: 10,
                          marginLeft: 48,
                          background: "#E5F4FF",
                          // width: 200,
                        },
                        disableUnderline: true,
                      }}
                      variant="standard"
                    />
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8,
                        background: "#17CD9D",
                        width: 120,
                        height: 48,
                        marginTop: 10,
                        marginRight: 10,
                      }}
                      startIcon={<Replay />}
                    >
                      <Typography
                        style={{
                          color: "#FFF",
                          fontFamily: fontFamilies.fontRegular,
                          fontSize: 22,
                          fontStyle: "normal",
                          fontWeight: 700,
                        }}
                      >
                        {captchaCode}
                      </Typography>
                    </Box>
                    <Button
                      className="reset-button"
                      onClick={() => {
                        generateCaptchaCode();
                      }}
                    >
                      <Replay />
                    </Button>
                  </Box>
                  <Button
                    variant="contained"
                    style={{
                      minWidth: 310,
                      marginLeft: 58,
                      borderRadius: 36,
                      marginTop: 15,
                      backgroundColor: "#002058",
                    }}
                    type="submit"
                  >
                    Login
                  </Button>
                  <Typography
                    style={{
                      color: "rgba(21, 21, 21, 0.75)",
                      textDecoration: "underline",
                      cursor: "pointer",
                      marginRight: 70,
                      marginTop: 5,
                      textAlign: "end",
                    }}
                    onClick={() => {
                      navigate(RoutesName.ChangePassword.path);
                    }}
                  >
                    ForgotPassword?
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </form>
  );
};
