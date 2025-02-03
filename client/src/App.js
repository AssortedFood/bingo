// src/App.js

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BingoBoard from './components/BingoBoard';

// Custom Theme with OSRS Wiki Colors
const theme = createTheme({
  palette: {
    background: {
      default: '#c0a886',
    },
    body: {
      main: '#e2dbc8',
      light: '#d8ccb4',
      mid: '#d0bd97',
      dark: '#b8a282',
      border: '#94866d', // Define the border property here
      background: '#c0a886',
    },
    text: {
      primary: '#000',
      secondary: '#777',
    },
    divider: '#94866d',
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BingoBoard />
  </ThemeProvider>
);

export default App;
