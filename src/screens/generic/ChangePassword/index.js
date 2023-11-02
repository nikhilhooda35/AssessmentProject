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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./style.css";
import { West } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { RoutesName } from "router/paths";
import { API_PATH, HTTP_OK, NOT_AUTHORIZED } from "common/constants";
import { getHashWithSHA256 } from "./Encryption";
import NetworkService from "services/network/NetworkService";
import { getUserId } from "helper/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export const ChangePassword = () => {
  const classes = useStyles();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const navigate = useNavigate();

  const handleResponse = (response) => {
    if (response.status === HTTP_OK) {
      navigate(RoutesName.Layout.path);
    } else if (response.status === NOT_AUTHORIZED) {
      ErrorToaster("Unauthorized user");
    } else {
      ErrorToaster(response.data || "Error Occured");
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    const capitalRegex = /[A-Z]/;
    const smallRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\\[\]:;<>,.?~\\-]/;

    if (password.length < 6 || password.length > 15) {
      errors.push("Password must be between 6 and 15 characters.");
    }
    if (!capitalRegex.test(password)) {
      errors.push("Password must include at least one capital letter.");
    }
    if (!smallRegex.test(password)) {
      errors.push("Password must include at least one small letter.");
    }
    if (!specialCharRegex.test(password)) {
      errors.push("Password must include at least one special character.");
    }

    const isValid = errors.length === 0;
    return { isValid, errors };
  };

  const ChangePasswordAPI = async (e) => {
    e.preventDefault();
    const validationResult = validatePassword(newPassword);
    const changePasswordData = {
      pk_userId: getUserId(),
      oldpassword: getHashWithSHA256(currentPassword),
      newpassword: getHashWithSHA256(newPassword),
    };
    if (!newPassword && !confirmNewPassword) {
      setNewPasswordError("Enter Password");
    }
    if (newPassword === !confirmNewPassword) {
      setConfirmNewPasswordError("Password not matching");
    }
    if (!validationResult.isValid) {
      setNewPasswordError("New Password is not in password Format");
    }
    try {
      const response = await NetworkService.post(
        API_PATH.changePassword,
        changePasswordData,
        {}
      );
      handleResponse(response);
    } catch (error) {
      ErrorToaster(error.response.data || error.message || "Error Occured");
    }
  };

  return (
    <form className={classes.loginAdmin} onSubmit={ChangePasswordAPI}>
      <CssBaseline />
      <ToastContainer />
      <Container>
        <Grid container spacing={2} className="grid-container-changePassword">
          <Grid item xs={4.5} className="grid-item-changePassword">
            <div
              className="svg-container-changePassword"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </Grid>
          <Grid item xs={7.5}>
            <Box className="box-container-changePassword">
              <Box className="icon-container-changePassword">
                <Icon>
                  <West className="icon-changePassword" />
                </Icon>
                <Typography
                  className="back-to-home-changePassword"
                  onClick={() => {
                    navigate(RoutesName.Login.path);
                  }}
                >
                  Back to Home
                </Typography>
              </Box>
              <Box className="inner-box-changePassword">
                <Box className="inner-box-content-changePassword">
                  <div className="vertical-line-changePassword" />
                  <Typography className="title-changePassword">
                    Change password
                  </Typography>
                </Box>
                <Typography className="description-changePassword">
                  Reset password using your username
                </Typography>
                <Box
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "35ch" },
                  }}
                >
                  <div className="text-field-container-changePassword">
                    <TextField
                      classes={{ root: classes.customTextField }}
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => {
                        setCurrentPassword(e.target.value);
                      }}
                      fullWidth
                      InputProps={{
                        className: "custom-text-field-changePassword",
                        disableUnderline: true,
                      }}
                      variant="standard"
                    />
                    <TextField
                      classes={{ root: classes.customTextField }}
                      placeholder="New Password"
                      value={newPassword}
                      error={newPasswordError}
                      helperText={
                        newPasswordError ? (
                          <div className={classes.errorText}>
                            {newPasswordError}
                          </div>
                        ) : (
                          ""
                        )
                      }
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setNewPasswordError(false);
                      }}
                      fullWidth
                      InputProps={{
                        className: "custom-text-field-changePassword",
                        disableUnderline: true,
                      }}
                      variant="standard"
                    />
                    <TextField
                      classes={{ root: classes.customTextField }}
                      placeholder="Confirm New password"
                      value={confirmNewPassword}
                      error={confirmNewPasswordError}
                      helperText={
                        confirmNewPasswordError ? (
                          <div className={classes.errorText}>
                            {confirmNewPasswordError}
                          </div>
                        ) : (
                          ""
                        )
                      }
                      onChange={(e) => {
                        setConfirmNewPassword(e.target.value);
                      }}
                      fullWidth
                      InputProps={{
                        className: "custom-text-field-changePassword",
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
                    className="submit-button-changePassword"
                    type="submit"
                  >
                    <Typography fontWeight={500} fontSize={14}>
                      Update password
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};
