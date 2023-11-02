import React from "react";
import {
  Typography,
  Container,
  Grid,
  CssBaseline,
  Box,
  Icon,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./style.css";
import { Search } from "@mui/icons-material";
import { fontFamilies } from "themes/typography";
import { useNavigate } from "react-router-dom";
import { RoutesName } from "router/paths";
import { Home2Img, HomeImg } from "assets/images";
import { IdeaIcon, LoginUserIcon } from "assets/icons/svg/home";
import { PlayButtonImg } from "assets/icons";

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

export const Home = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  return (
    <div style={{ height: "100%" }}>
      <div className={classes.loginAdmin}>
        <CssBaseline />

        <Container>
          <Grid container spacing={2} className="grid-container-home">
            <Grid item xs={4.5} className="grid-item-home">
              <div
                className="svg-container-home"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </Grid>
            <Grid item xs={7.5}>
              <Box className="box-container-home">
                <Box className="icon-container-home">
                  <Icon className="search-icon-container-home">
                    <Search className="search-icon-home" />
                  </Icon>
                  <Button
                    className="login-container-home"
                    onClick={() => {
                      navigate(RoutesName.Login.path);
                    }}
                  >
                    <Icon className="icon">
                      <LoginUserIcon />
                    </Icon>
                    <Typography className="login-home">Login</Typography>
                  </Button>
                </Box>
                <Box>
                  <Box className="assessment-software-text-parent-home">
                    <Typography
                      className="assessment-software-text-home"
                      sx={{
                        fontSize: "3.5rem",
                        fontWeight: 700,
                        fontFamily: fontFamilies.fontBold,
                      }}
                    >
                      Assessment Software <br />
                      for Schools
                    </Typography>
                    <Typography
                      className="assessment-software-text-child-home"
                      sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        width: 420,
                      }}
                    >
                      Connects principles, Parents, Teachers & Students on a
                      single platform.
                    </Typography>
                    <Button
                      variant="contained"
                      style={{
                        minWidth: 180,
                        marginLeft: 10,
                        borderRadius: 36,
                        marginTop: 15,
                        backgroundColor: "#002058",
                      }}
                    >
                      <Typography fontWeight={500} fontSize={14}>
                        Read More
                      </Typography>
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        minWidth: 180,
                        marginLeft: 10,
                        borderRadius: 36,
                        marginTop: 15,
                        backgroundColor: "#17CD9D",
                      }}
                    >
                      <Typography fontWeight={500} fontSize={14}>
                        Contact us
                      </Typography>
                    </Button>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 10,
                        marginTop: 130,
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
                      <Box sx={{ marginLeft: 2, marginTop: 2 }}>
                        <img alt="Home" src={PlayButtonImg} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <img alt="Home" src={HomeImg} className="home-img" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="second-container">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img alt="Home" src={Home2Img} className="home2-img" />
          </Grid>
          <Grid item xs={6}>
            <Typography className="second-container-Title">
              Easy learning experience{" "}
            </Typography>
            <Typography className="second-container-para">
              Its ease to use the application for the students and as well as
              <br />
              for the teachers to track the students progress at ease...
            </Typography>
            <Box display="flex" flexDirection="row" >
              <Box className="idea-container">
                <Box display="flex" flexDirection="row" className="idea">
                  <Box className="idea1-icon">
                    <IdeaIcon />
                  </Box>
                  <Typography className="idea1">
                    Its ease to use the <br />
                    application
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row" className="idea">
                  <Box className="idea1-icon">
                    <IdeaIcon />
                  </Box>
                  <Typography className="idea1">
                    Its ease to use the <br />
                    application
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex" flexDirection="row" className="idea">
                  <Box className="idea1-icon">
                    <IdeaIcon />
                  </Box>
                  <Typography className="idea1">
                    Its ease to use the <br />
                    application
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row" className="idea">
                  <Box className="idea1-icon">
                    <IdeaIcon />
                  </Box>
                  <Typography className="idea1">
                    Its ease to use the <br />
                    application
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Button
                      variant="contained"
                      style={{
                        minWidth: 140,
                        marginLeft: 10,
                        borderRadius: 36,
                        marginTop: 15,
                        backgroundColor: "#002058",
                      }}
                    >
                      <Typography fontWeight={500} fontSize={14}>
                        Read More
                      </Typography>
                    </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
