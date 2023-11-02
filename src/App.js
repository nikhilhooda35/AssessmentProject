import "assets/fonts/PoppinsBold.ttf";
import "assets/fonts/PoppinsItalic.ttf";
import "assets/fonts/PoppinsLight.ttf";
import "assets/fonts/PoppinsMedium.ttf";
import "assets/fonts/PoppinsRegular.ttf";
import "assets/fonts/PoppinsSemiBold.ttf";
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import { ErrorBoundary } from "./ErrorBoundary";
import { AppRouter } from "router/AppRouter";
import themeOptions from "themeOptions";
import { Provider } from "react-redux";
import { getStore } from "store";
import "./App.css";


const theme = responsiveFontSizes(themeOptions);

export const store = getStore();

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
