import { Box, Grid, Typography } from "@mui/material";
import { UserIcon } from "assets/icons/svg/dashboard";
import { useLocation, useNavigate } from "react-router-dom";
import Colors from "themes/colors";

const cardBackground = [
  Colors.cardBackground[1],
  Colors.cardBackground[2],
  Colors.cardBackground[3],
  Colors.cardBackground[4],
];
const cardBorderColor = [
  Colors.cardBorderColor[1],
  Colors.cardBorderColor[2],
  Colors.cardBorderColor[3],
  Colors.cardBorderColor[4],
];
const cardIconColor = [
  Colors.cardIconColor[1],
  Colors.cardIconColor[2],
  Colors.cardIconColor[3],
  Colors.cardIconColor[4],
];
export const SubMenuContainer = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      {data?.subMenuList.map((item, index) => {
        return (
          <Grid
            onClick={() => {
              navigate(item?.pagepath, {
                state: item,
              });
            }}
            className="box"
            key={item}
            sx={{
              backgroundColor: cardBackground[index % 4],
              border: "1px solid",
              borderColor: cardBorderColor[index % 4],
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: 60,
              maxWidth: index / 4,
              cursor: "pointer",
              transition: "background-color 0.5s",
              "&:hover": {
                backgroundColor: "inherit", // Lighter or darker color on hover
              },
              marginBottom: "100px", // Adjust this value to control the vertical spacing
            }}
          >
            <Box
              sx={{
                backgroundColor: cardIconColor[index % 4],
                color: "#000",
                alignItems: "center",
                borderRadius: 1,
                justifyContent: "center",
                marginRight: 1,
                width: 30,
                height: 30,
                display: "flex",
                //padding: 0.5,
              }}
            >
              <UserIcon />
            </Box>

            <Typography>{item.menucaption}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};
