'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// You can import specific fonts for MUI if needed, e.g.:
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

// A basic custom theme. You can expand this.
const defaultTheme = createTheme({
  palette: {
    mode: 'dark', // Can be 'light' or 'dark'
    primary: {
      main: '#1976d2', // Example Blue
    },
    secondary: {
      main: '#dc004e', // Example Pink
    },
    // You can also define typography, spacing, breakpoints, etc.
  },
  // Example of integrating Next/font with MUI typography:
  // typography: {
  //   fontFamily: [
  //     'var(--font-geist-sans)', // From your layout.tsx
  //     'Roboto',
  //     '"Helvetica Neue"',
  //     'Arial',
  //     'sans-serif',
  //   ].join(','),
  // },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
