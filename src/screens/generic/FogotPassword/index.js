import React, { useState } from "react";
import {
  Typography,
  Container,
  Grid,
  CssBaseline,
  Box,
  Icon,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ForgotPasswordImg } from "assets/images";
import "./style.css";
import { West } from "@mui/icons-material";
import { fontFamilies } from "themes/typography";
import { useNavigate } from "react-router-dom";
import { RoutesName } from "router/paths";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordCreator } from "./redux/slice";
import { genericSelector } from "../redux";

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
}));

export const ForgotPassword = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(genericSelector.getLoading());

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const data = {
      UserName: username,
    };
    if (!username) {
      setUsernameError(true);
    }
    dispatch(forgotPasswordCreator(data));
  };

  if (loading) {
    <CircularProgress />;
  }

  return (
    <form className={classes.loginAdmin} onSubmit={handleForgotPassword}>
      <CssBaseline />

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
              <img
                className="adminLogin-forgotPassword"
                alt=""
                src={ForgotPasswordImg}
              />
            </Box>
            <Box className="assessment-software-text-parent-forgotPassword">
              <Typography
                className="assessment-software-text-forgotPassword"
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
                className="assessment-software-text-child-forgotPassword"
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
            <Box className="box-container-forgotPassword">
              <Box className="icon-container-forgotPassword">
                <Icon>
                  <West className="icon-forgotPassword" />
                </Icon>
                <Typography
                  className="back-to-home-forgotPassword"
                  onClick={() => {
                    navigate(RoutesName.Home.path);
                  }}
                >
                  Back to Home
                </Typography>
              </Box>
            </Box>
            <Box className="inner-box-forgotPassword">
              <Box className="inner-box-content-forgotPassword">
                <div className="vertical-line-forgotPassword" />
                <Typography className="title-forgotPassword">
                  Forgot password
                </Typography>
              </Box>
              <Typography className="description-forgotPassword">
                Reset password using your username
              </Typography>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "35ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div className="text-field-container-forgotPassword">
                  <TextField
                    classes={{ root: classes.customTextField }}
                    placeholder="Username@gmail.com"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setUsernameError(false);
                    }}
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
                    fullWidth
                    InputProps={{
                      className: "custom-text-field-forgotPassword",
                      disableUnderline: true,
                    }}
                    variant="standard"
                  />
                </div>
              </Box>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "35ch" },
                }}
              >
                <Button
                  variant="contained"
                  className="button-forgotPassword reset-button-forgotPassword"
                  type="submit"
                >
                  <Typography fontWeight={500} fontSize={14}>
                    Reset password
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  className="button-forgotPassword cancel-button-forgotPassword"
                  onClick={() => {
                    navigate(RoutesName.Login.path);
                  }}
                >
                  <Typography color={"Black"} fontWeight={600} fontSize={14}>
                    Cancel
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};
