// src/App.js
import React, {
  useState,
  useMemo,
  useEffect,
  useCallback
} from 'react';
import { Box }                      from '@mui/material';
import CssBaseline                  from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SettingsMenu                 from './components/SettingsMenu';
import BingoBoard                   from './components/BingoBoard';

import tileData   from './data/tiles';
import BingoTile  from './models/BingoTile';
import teams      from './data/teams'; // only needed if you want to compute teamColors/readOnly here

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
  // ─── Dark/Light Theme Toggle ───────────────────────────────────────────────
  const [mode, setMode] = useState(getInitialMode());

  // ─── Claims Data (hoisted) ─────────────────────────────────────────────────
  // build your API_URL once
  const hostname = window.location.hostname;
  const API_URL = hostname.includes('localhost')
    ? 'http://localhost:5000/api/claims'
    : 'https://bingo.synox.is/api/claims';
  const readOnly = hostname === 'bingo.synox.is';

  // state for all tiles
  const [tiles, setTiles] = useState([]);

  // a) loader
  const loadClaims = useCallback(async () => {
    try {
      const res    = await fetch(API_URL);
      const claims = await res.json();
      const updated = tileData.map(data => {
        const found = claims.find(c => c.id === data.id);
        return new BingoTile(
          data.id,
          data.text,
          data.image,
          data.points,
          found ? found.claimedBy : []
        );
      });
      setTiles(updated);
    } catch (err) {
      console.error('Failed to load claims:', err);
    }
  }, [API_URL]);

  // b) initial load
  useEffect(() => {
    loadClaims();
  }, [loadClaims]);

  // c) toggle & save a single claim
  const handleToggleClaim = useCallback((tileId, teamId) => {
    setTiles(prev =>
      prev.map(tile => {
        if (tile.id !== tileId) return tile;

        // copy & flip
        const copy = new BingoTile(
          tile.id,
          tile.description,
          tile.image,
          tile.points,
          [...tile.claimedBy]
        );
        copy.toggleTeamClaim(teamId);

        // only POST if changed
        if (
          JSON.stringify(copy.claimedBy) !==
          JSON.stringify(tile.claimedBy)
        ) {
          fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(copy),
          }).catch(console.error);
        }
        return copy;
      })
    );
  }, [API_URL]);

  // ─── MUI THEME SETUP ────────────────────────────────────────────────────────
  const lightTheme = useMemo(
    () =>
      createTheme({
        palette:   { ...lightPalette, mode: 'light' },
        typography:{ fontFamily: `"Runescape",${lightPalette.text.primary}` },
      }),
    []
  );
  const darkTheme = useMemo(
    () =>
      createTheme({
        palette:   { ...lightPalette, ...darkOverrides, mode: 'dark' },
        typography:{ fontFamily: `"Runescape",${darkOverrides.text.primary}` },
      }),
    []
  );
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Top-right settings */}
      <Box
        sx={{
          position: 'fixed',
          top:      theme => theme.spacing(1),
          right:    theme => theme.spacing(1),
          zIndex:   theme => theme.zIndex.appBar,
        }}
      >
        {/* now passes the real loader */}
        <SettingsMenu
          mode={mode}
          setMode={setMode}
          onRefresh={loadClaims}
        />
      </Box>

      {/* BingoBoard now just renders based on the `tiles` prop */}
      <BingoBoard
        tiles={tiles}
        onToggleClaim={handleToggleClaim}
        readOnly={readOnly}
      />
    </ThemeProvider>
  );
}