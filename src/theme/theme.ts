import { createTheme } from '@mui/material';
import { deepOrange, grey } from '@mui/material/colors';

export const getAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            // Dark mode palette
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: '#1a1a1a',
              paper: '#242424',
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
          }
        : {
            // Light mode palette
            primary: deepOrange,
            divider: deepOrange[200],
            background: {
              default: grey[50],
              paper: '#fff',
            },
          }),
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });
