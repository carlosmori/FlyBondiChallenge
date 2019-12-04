import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import theme from "../src/theme";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import configureStore from "../state/store";
import { Provider as ReduxProvider } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";

import "babel-polyfill";
const reduxStore = configureStore({});
// Create custom theme according to FlyBondi palette
export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fdbe15",
      main: "#fdbe15",
      dark: "#cccccc",
      contrastText: "#2f3143"
    },
    secondary: {
      light: "#83439a",
      main: "#ffd110",
      dark: "#c7a000",
      contrastText: "#fff"
    },
    background: {
      paper: "#fff"
    },
    text: {
      secondary: "#ffd110"
    },
    type: "light"
  },
  typography: {
    fontFamily: `'Lato','Roboto',sans-serif`
  }
});
export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Home | Flybondi</title>
        </Head>
        <ReduxProvider store={reduxStore}>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
              <CssBaseline />
              <Component {...pageProps} />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </ReduxProvider>
      </React.Fragment>
    );
  }
}
