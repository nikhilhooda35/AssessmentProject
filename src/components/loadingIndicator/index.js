import { Backdrop, CircularProgress } from "@mui/material";

export const LoadingIndicator = () => {
    return (
      <Backdrop sx={{ zIndex: 9999 }} open>
        <CircularProgress sx={{ color: "blue" }} disableShrink />
      </Backdrop>
    );
  };