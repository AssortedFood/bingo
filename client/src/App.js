// src/App.js
import React, {
  useState,
  useMemo,
  useEffect,
  useCallback
} from 'react';
import { Box }                        from '@mui/material';
import useMediaQuery                  from '@mui/material/useMediaQuery';
import CssBaseline                    from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SettingsMenu                   from './components/SettingsMenu';
import InstructionsDialog             from './components/InstructionsDialog';
import ContactDialog                  from './components/ContactDialog';
import BingoBoard                     from './components/BingoBoard';
import tileData                       from './data/tiles';
import BingoTile                      from './models/BingoTile';
import teams                          from './data/teams';

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
  text:    { primary: '#000', secondary: '#434343' },
  divider: '#605443',
};

// pick up saved or OS‐pref mode
function getInitialMode() {
  if (typeof window !== 'undefined') {
    try {
      const m = localStorage.getItem('mode');
      if (m === 'light' || m === 'dark') return m;
    } catch {}
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
}

export default function App() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showContact, setShowContact]           = useState(false);

  // ─── Dark/Light Theme Toggle ───────────────────────────────────────────────
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(() => {
    let stored;
    try {
      stored = localStorage.getItem('mode');
    } catch {}
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return prefersDarkMode ? 'dark' : 'light';
  });

  // ─── Multi‐team FILTER state ─────────────────────────────────────────────────
  // 0 = off, 1 = show missing, 2 = show obtained
  const [filters, setFilters] = useState(() =>
    teams.reduce((acc, t) => { acc[t.id] = 0; return acc; }, {})
  );
  const handleFilter = useCallback(teamId => {
    setFilters(prev => ({
      ...prev,
      [teamId]: (prev[teamId] + 1) % 3
    }));
  }, []);

  // ─── Claims Data (hoisted) ─────────────────────────────────────────────────
  const hostname = window.location.hostname;
  const API_URL  = hostname.includes('localhost')
    ? 'http://localhost:5000/api/claims'
    : 'https://bingo.synox.is/api/claims';
  const readOnly = hostname === 'bingo.synox.is';

  const [tiles, setTiles] = useState([]);
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

  useEffect(() => {
    loadClaims();
  }, [loadClaims]);

  const handleToggleClaim = useCallback((tileId, teamId) => {
    setTiles(prev =>
      prev.map(tile => {
        if (tile.id !== tileId) return tile;
        const copy = new BingoTile(
          tile.id,
          tile.description,
          tile.image,
          tile.points,
          [...tile.claimedBy]
        );
        copy.toggleTeamClaim(teamId);
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
        palette:    { ...lightPalette, mode: 'light' },
        typography: { fontFamily: `"Runescape",${lightPalette.text.primary}` },
      }),
    []
  );
  const darkTheme = useMemo(
    () =>
      createTheme({
        palette:    { ...lightPalette, ...darkOverrides, mode: 'dark' },
        typography: { fontFamily: `"Runescape",${darkOverrides.text.primary}` },
      }),
    []
  );
  const theme = mode === 'light' ? lightTheme : darkTheme;

  // open/close dialogs
  const openInstructions = () => setShowInstructions(true);
  const closeInstructions = () => setShowInstructions(false);
  const openContact = () => setShowContact(true);
  const closeContact = () => setShowContact(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Top‐right menu */}
      <Box
        sx={{
          position: 'absolute',
          top:      theme => theme.spacing(1),
          right:    theme => theme.spacing(1),
          zIndex:   theme => theme.zIndex.appBar,
        }}
      >
        <SettingsMenu
          mode={mode}
          setMode={setMode}
          onRefresh={loadClaims}
          onInstructions={openInstructions}
          onContact={openContact}
        />
      </Box>

      {/* BingoBoard with 3‐state filters */}
      <BingoBoard
        tiles={tiles}
        onToggleClaim={handleToggleClaim}
        readOnly={readOnly}
        filters={filters}
        onFilterTeam={handleFilter}
      />

      <InstructionsDialog
        open={showInstructions}
        onClose={closeInstructions}
      />
      <ContactDialog
        open={showContact}
        onClose={closeContact}
      />
    </ThemeProvider>
  );
}