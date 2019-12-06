import { createMuiTheme } from '@material-ui/core/styles';

// Create custom theme according to FlyBondi palette
export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fdbe15',
      main: '#fdbe15',
      dark: '#cccccc',
      contrastText: '#2f3143'
    },
    secondary: {
      light: '#2f3143',
      main: '#2f3143',
      dark: '#c7a000',
      contrastText: '#fff'
    },
    background: {
      paper: '#fff'
    },
    text: {
      secondary: '#ffd110'
    },
    type: 'light'
  },
  typography: {
    fontFamily: `'Lato','Roboto',sans-serif`
  }
});
export default theme;
