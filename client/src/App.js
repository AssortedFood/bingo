import React, { useState, useMemo } from 'react';
import { Box }                      from '@mui/material';
import CssBaseline                  from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SettingsMenu from './components/SettingsMenu';
import BingoBoard   from './components/BingoBoard';

// 1) central “light” palette:
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
  text:    { primary: '#000', secondary: '#777' },
  divider: '#c0a886',
};

// 2) your “dark” overrides:
const darkOverrides = {
  background: { default: '#605443', paper: '#605443' },
  body: {
    main:       '#b2a999',
    light:      '#d8ccb4',
    mid:        '#d0bd97',
    dark:       '#b8a282',
    border:     '#5e5443',
    background: '#605443',
  },
  text:    { primary: '#000', secondary: '#777' },
  divider: '#605443',
};

// pick up saved or OS‐pref mode
function getInitialMode() {
  if (typeof window !== 'undefined') {
    try {
      const m = localStorage.getItem('mode');
      if (m==='light'||m==='dark') return m;
    } catch {}
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
}

export default function App() {
  // dark/light toggle
  const [mode, setMode] = useState(getInitialMode());
  // used to force BingoBoard reload
  const [refreshKey, setRefreshKey] = useState(0);

  // callback passed into Menu → increments refreshKey
  const handleRefresh = () => {
    setRefreshKey(k => k + 1);
  };

  // build themes once
  const lightTheme = useMemo(()=>createTheme({
    palette:   { ...lightPalette, mode:'light' },
    typography:{ fontFamily:`"Runescape",${lightPalette.text.primary}` }
  }),[]);

  const darkTheme = useMemo(()=>createTheme({
    palette:   { ...lightPalette, ...darkOverrides, mode:'dark' },
    typography:{ fontFamily:`"Runescape",${darkOverrides.text.primary}` }
  }),[]);

  const theme = mode==='light'? lightTheme: darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* top-right settings */}
      <Box sx={{
        position: 'fixed',
        top:      theme=>theme.spacing(1),
        right:    theme=>theme.spacing(1),
        zIndex:   theme=>theme.zIndex.appBar
      }}>
        <SettingsMenu
          mode={mode}
          setMode={setMode}
          onRefresh={handleRefresh}
        />
      </Box>

      {/* BingoBoard re-fetches when refreshKey changes */}
      <BingoBoard refreshKey={refreshKey} />
    </ThemeProvider>
  );
}