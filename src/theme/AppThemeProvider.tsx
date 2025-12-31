import React from 'react';
import {
  useMediaQuery,
  ThemeProvider,
  GlobalStyles,
  CssBaseline,
} from '@mui/material';
import { getAppTheme } from './theme';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () => getAppTheme(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          ':root': {
            '--mui-palette-primary-main': theme.palette.primary.main,
            '--mui-palette-primary-light': theme.palette.primary.light,
            '--mui-palette-background-default': theme.palette.background.default,
            '--mui-palette-background-paper': theme.palette.background.paper,
            '--mui-palette-divider': theme.palette.divider,
          },
        }}
      />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
