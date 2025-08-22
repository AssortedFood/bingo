// src/App.js
import React, { useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline      from '@mui/material/CssBaseline';
import IconButton       from '@mui/material/IconButton';
import DarkModeIcon     from '@mui/icons-material/DarkMode';
import LightModeIcon    from '@mui/icons-material/LightMode';
import BingoBoard       from './components/BingoBoard';

// 1) central “light” palette (your original colors)
const lightPalette = {
  background: { default: '#c0a886', paper: '#e2dbc8' },
  body: {
    main:       '#e2dbc8',
    light:      '#d8ccb4',
    mid:        '#d0bd97',
    dark:       '#b8a282',
    border:     '#94866d',
    background: '#c0a886',
  },
  text: { primary: '#000', secondary: '#777' },
  divider: '#c0a886',
};

// 2) empty “dark” overrides (fill these in later)
const darkOverrides = {
  background: { default: '#605443', paper: '#605443'},
  body: {
    main:       '#b2a999',
    light:      '#d8ccb4',
    mid:        '#d0bd97',
    dark:       '#b8a282',
    border:     '#5e5443',
    background: '#605443',
  },
  // text: { primary: '#000', secondary: '#777' },
  divider: '#605443',
};

// :root {
//     --body-main: #e2dbc8;
//     --body-light: #d8ccb4;
//     --body-mid: #d0bd97;
//     --body-dark: #b8a282;
//     --body-border: #94866d;
//     --body-background-color: #c0a886;
//     --button-background: #605443;
//     --button-color: #fff;
//     --button-border: #3c352a;
//     --button-dark: #18140c;
//     --button-light: #3a301d;
//     --sidebar: #cfc08d;
//     --background-text-color: #444;
//     --background-link-color: #52351e;
//     --search-box: #efeee6;
//     --link-color: #936039;
//     --redlink-color: #ba0000;
//     --text-color: #000;
//     --byline-color: #4c4c4c;
//     --subtle-color: #777;
//     --admin-blue: #332e75;
//     --bearcat-green: #13592e;
//     --awb-purple: #933b96;
//     --rsw-blue: #438ab6;
//     --osrsw-brown: #605443;

function App() {
  // pick up stored mode, else OS preference, else default to light
  const getInitialMode = () => {
    if (typeof window !== 'undefined') {
      // 1) do we have a saved value?
      try {
        const stored = localStorage.getItem('mode');
        if (stored === 'light' || stored === 'dark') {
          return stored;
        }
      } catch {}
      // 2) no saved value → check the OS setting
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      if (mql.matches) {
        return 'dark';
      }
    }
    // 3) fallback
    return 'light';
  };

  const [mode, setMode] = useState(getInitialMode);

  const handleToggle = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('mode', next); } catch {}
      return next;
    });
  };

  // 3) create two themes, merging lightPalette + (darkOverrides if dark)
  const lightTheme = useMemo(
    () =>
      createTheme({
        palette: { ...lightPalette, mode: 'light' },
        typography: {
          fontFamily: `"Runescape", ${lightPalette.text.primary /* fallback */}`,
        },
      }),
    []
  );

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          ...lightPalette,      // start with your light defaults
          ...darkOverrides,     // override only the bits you supplied
          mode: 'dark',
        },
        typography: {
          fontFamily: `"Runescape", ${darkOverrides.text?.primary || '#fff'}`,
        },
      }),
    []
  );

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* 4) simple toggle button */}
      <IconButton
        onClick={handleToggle}
        size="small"           // make the button a bit smaller
        sx={{
          bgcolor: "transparent",
          "&:hover": { bgcolor: "transparent" },
          p: 0.5,               // reduce padding if you like
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: theme => theme.zIndex.appBar,
          // If you want an even smaller icon:
          "& .MuiSvgIcon-root": {
            fontSize: "1rem",
          },
        }}
      >
        {mode === "light" 
          ? <DarkModeIcon fontSize="small" /> 
          : <LightModeIcon fontSize="small" />}
      </IconButton>
      <BingoBoard />
    </ThemeProvider>
  );
}

export default App;