import { createTheme } from "@mui/material/styles";
import { fontFamilies } from "themes/typography";

// A custom theme for this app
const palette = createTheme({
  backgroundColors: {
    leftSidebar: "#f5f8f9",
  },
  palette: {
    title: { main: "#322b7c" },
    white: {
      main: "#ffffff",
    },
    primary: {
      main: "#004cdf",
    },
    common: {
      white: "#ffffff",
      black: "#000000",
    },
    grey: {
      A400: "#3a1c1939",
      100: "#acacac",
      700: "#777777",
      50: "#eeeeee",
    },
    success: {
      main: "#34b53a",
    },
    error: {
      main: "#f00",
    },
  },
});

const themeOptions = createTheme(palette, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#fff",
            // backgroundColor: "#a9a9a9",
            width: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            // backgroundColor: "#a9a9a9",
            // backgroundColor: "#fff",
            minHeight: 24,
            // border: "1px solid #a9a9a9",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#fff",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#fff",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#a9a9a9",
            border: "1px solid #a9a9a9",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#fff",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "Capitalize",
          fontSize: 12.7,
          padding: "11px 16px",
          fontWeight: "600",
          cursor: "pointer",
          fontStyle: "normal",
          letterSpacing: 0,
          textAlign: "center",
          ":hover": {
            backgroundColor: "inherit",
          },
        },
        containedPrimary: {
          backgroundColor: "#1c6bf4",
          color: "#fff",
          ":hover": {
            border: 0,
            backgroundColor: "inherit",
          },
        },
        outlinedPrimary: {
          color: "#1c6bf4",
          outline: `2px solid "#1c6bf4"`,
          border: 0,
          ":hover": {
            border: 0,
            backgroundColor: "inherit",
          },
        },
      },
    },
    MuiInputLabel: {
      variants: [
        {
          props: { variant: "standard" },
          style: {
            fontSize: 12.7,
            fontWeight: "600",
            fontFamily: [fontFamilies.fontRegular].join(","),
            color: palette.palette.primary.dark,
            textTransform: "capitalize",
            marginBottom: 10,
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: fontFamilies.fontRegular,
          fontSize: 12.7,
          fontWeight: "400",
          fontStyle: "normal",
          letterSpacing: 0,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          "::placeholder": "red",
          fontFamily: [fontFamilies.fontRegular].join(","),
          fontSize: 12.7,
          fontWeight: "normal",
        },
        inputRoot: {
          padding: "5.5px 14px",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "rgba(148, 148, 148, 0.5)",
        },
      },
    },
  },
});

export default themeOptions;
