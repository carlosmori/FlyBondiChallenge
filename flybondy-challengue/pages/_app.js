import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import configureStore from '../state/store';
import { Provider as ReduxProvider } from 'react-redux';

import 'babel-polyfill';
import theme from '../src/theme';
const reduxStore = configureStore({});
export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
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
            <MuiPickersUtilsProvider utils={LuxonUtils} locale="es-AR">
              <CssBaseline />
              <Component {...pageProps} />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </ReduxProvider>
      </React.Fragment>
    );
  }
}
