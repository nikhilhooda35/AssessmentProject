import React from "react";
import {
  Typography,
  Container,
  Grid,
  CssBaseline,
  Box,
  Button,
   Icon,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LogoutPageImg } from "assets/images";
import "./style.css";
import { fontFamilies } from "themes/typography";
import { useNavigate } from "react-router-dom";
import { RoutesName } from "router/paths";
import { West } from "@mui/icons-material";

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

export const Logout = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  return (
    <div className={classes.loginAdmin}>
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

            <Box style={{ position: "absolute", top: 0, left: 340 }}>
              <img className="adminLogin" alt="" src={LogoutPageImg} />
            </Box>
            <Box className="assessment-software-text-parent">
              <Typography
                className="assessment-software-text"
                sx={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  fontFamily: fontFamilies.fontBold,
                }}
              >
                You have been Looged out
              </Typography>
              <Typography
                className="assessment-software-text-child"
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                To login again, Please login using your credentials
              </Typography>
              <Button
                variant="contained"
                style={{
                  minWidth: 180,
                  marginLeft: 130,
                  borderRadius: 36,
                  marginTop: 15,
                  backgroundColor: "#002058",
                }}
                onClick={() => {
                  navigate(RoutesName.Login.path);
                }}
              >
                <Typography fontWeight={500} fontSize={14}>
                  Login now
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              style={{
                display: "flex",
                justifyContent: 'flex-end',
                flexDirection: "row",
                marginTop: 35,
                marginRight: 110,
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 70,
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
                    fontSize: 16,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(RoutesName.Login.path);
                  }}
                >
                  Back to Home
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
