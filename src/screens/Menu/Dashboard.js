import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { NoteBookImg } from "assets/icons";
import "./style.css";
import { Notes } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { NoteIcon, UserIcon } from "assets/icons/svg/dashboard";

export const Dashboard = () => {
  return (
    <div>
      <Typography
        variant="h6"
        noWrap
        marginBottom={2}
        color={"#000"}
        fontWeight={600}
      >
        Dashboard
      </Typography>
      <Grid container spacing={2} direction="row">
        <Grid item xs={9}>
          <Grid container direction={"row"} spacing={2}>
            {[
              "Total Students",
              "Total Teachers",
              "Total Assessment",
              "Total Exams",
            ].map((text, index) => {
              let backgroundColor, iconColor, borderColor;
              // Set the background-color and icon color based on the text
              if (text === "Total Students") {
                backgroundColor = "#FEF2FF";
                borderColor = "#FDDFFF";
                iconColor = "#F8C9FC";
              } else if (text === "Total Teachers") {
                backgroundColor = "#EBF9FF";
                borderColor = "#D6F3FF";
                iconColor = "#ACE6FF";
              } else if (text === "Total Assessment") {
                backgroundColor = "#FFF9E3";
                borderColor = "#FFF1C0";
                iconColor = "#F6E8B4";
              } else if (text === "Total Exams") {
                backgroundColor = "#F2FFF8";
                borderColor = "#D1FFE6";
                iconColor = "#BCFEDB";
              }

              return (
                <Grid
                  className="box"
                  key={index}
                  sx={{
                    backgroundColor,
                    m: 1,
                    border: "1px solid",
                    borderColor,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: iconColor,
                      color: "#000",
                      padding: 0.2,
                      borderRadius: 1,
                      width: 30,
                    }}
                  >
                    <UserIcon />
                  </Box>

                  <Typography>{text}</Typography>
                  <Typography>1532</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid container xs={3}>
          <Grid item xs={12} direction={"column"}>
            <Box className="createAssessmentCard">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <NoteIcon />
                <Typography className="createAssessmentText">
                  Create Assessment
                </Typography>
              </Box>
              <img
                src={NoteBookImg}
                style={{ height: 25, width: 35 }}
                alt="notebook"
              />
            </Box>

            <Box className="createAssessmentCard">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <NoteIcon />
                <Typography className="createAssessmentText">
                  Create Assessment
                </Typography>
              </Box>
              <img
                src={NoteBookImg}
                style={{ height: 25, width: 35 }}
                alt="notebook"
              />
            </Box>
          </Grid>

          <Grid item xs={12} direction={"column"}>
            <Grid className="card2">
              <Box className="card2Head">
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Recent Assessments
                </Typography>
                <MoreVertOutlinedIcon />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: 13,
                    }}
                  >
                    Physics Verbal Exam
                  </Typography>
                  <Button
                    sx={{
                      borderRadius: 3,
                      background: "#004CDF",
                      width: 20,
                      height: 30,
                    }}
                  >
                    <Typography sx={{ color: "#fff" }}>View</Typography>
                  </Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Notes sx={{ height: 12, width: 12 }} />
                  <Typography
                    sx={{
                      fontSize: 11.4,
                      fontWeight: 400,
                      marginLeft: 1,
                    }}
                  >
                    22-08-2023
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  height: 1.5,
                  background: "#E7E7E7",
                  marginTop: 2,
                  marginBottom: 2,
                }}
              />
              <Box sx={{ borderWidth: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: 13,
                    }}
                  >
                    Physics Verbal Exam
                  </Typography>
                  <Button
                    sx={{
                      borderRadius: 3,
                      background: "#004CDF",
                      width: 20,
                      height: 30,
                    }}
                  >
                    <Typography sx={{ color: "#fff" }}>View</Typography>
                  </Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Notes sx={{ height: 12, width: 12 }} />
                  <Typography
                    sx={{
                      fontSize: 11.4,
                      fontWeight: 400,
                      marginLeft: 1,
                    }}
                  >
                    22-08-2023
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{
                  borderRadius: 3,
                  background: "#004CDF",
                  height: 30,
                  marginTop: 2,
                }}
              >
                <Typography sx={{ color: "#fff" }}>View All</Typography>
              </Button>
            </Grid>
            <Grid className="card2">
              <Box className="card2Head">
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Recent Assessments
                </Typography>
                <MoreVertOutlinedIcon />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: 13,
                    }}
                  >
                    Physics Verbal Exam
                  </Typography>
                  <Button
                    sx={{
                      borderRadius: 3,
                      background: "#004CDF",
                      width: 20,
                      height: 30,
                    }}
                  >
                    <Typography sx={{ color: "#fff" }}>View</Typography>
                  </Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Notes sx={{ height: 12, width: 12 }} />
                  <Typography
                    sx={{
                      fontSize: 11.4,
                      fontWeight: 400,
                      marginLeft: 1,
                    }}
                  >
                    22-08-2023
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  height: 1.5,
                  background: "#E7E7E7",
                  marginTop: 2,
                  marginBottom: 2,
                }}
              />
              <Box sx={{ borderWidth: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: 13,
                    }}
                  >
                    Physics Verbal Exam
                  </Typography>
                  <Button
                    sx={{
                      borderRadius: 3,
                      background: "#004CDF",
                      width: 20,
                      height: 30,
                    }}
                  >
                    <Typography sx={{ color: "#fff" }}>View</Typography>
                  </Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Notes sx={{ height: 12, width: 12 }} />
                  <Typography
                    sx={{
                      fontSize: 11.4,
                      fontWeight: 400,
                      marginLeft: 1,
                    }}
                  >
                    22-08-2023
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{
                  borderRadius: 3,
                  background: "#004CDF",
                  height: 30,
                  marginTop: 2,
                }}
              >
                <Typography sx={{ color: "#fff" }}>View All</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
