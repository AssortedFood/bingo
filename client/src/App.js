// src/App.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  useMediaQuery,
  CssBaseline,
  ThemeProvider
} from '@mui/material';

import useAppTheme, { getInitialMode } from './theme';

import SettingsMenu       from './components/SettingsMenu';
import InstructionsDialog from './components/InstructionsDialog';
import ContactDialog      from './components/ContactDialog';
import SearchDialog       from './components/SearchDialog';
import BingoBoard         from './components/BingoBoard';

import tileData   from './data/tiles';
import BingoTile  from './models/BingoTile';
import teams      from './data/teams';

export default function App() {
  // ─── DIALOGS ────────────────────────────────────────────────────────────────
  const [showInstructions, setShowInstructions] = useState(false);
  const [showContact,      setShowContact]      = useState(false);

  const openInstructions  = () => setShowInstructions(true);
  const closeInstructions = () => setShowInstructions(false);
  const openContact       = () => setShowContact(true);
  const closeContact      = () => setShowContact(false);

  // ─── THEME MODE TOGGLE ──────────────────────────────────────────────────────
  // seed from localStorage or OS
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(() => {
    const init = getInitialMode();
    // if you want to fall back to OS when stored is missing:
    // return (init === 'system' ? (prefersDarkMode?'dark':'light') : init);
    return init;
  });
  const theme = useAppTheme(mode);

  // ─── SPOTLIGHT SEARCH ───────────────────────────────────────────────────────
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    function handleKeyDown(e) {
      if (searchOpen) return;
      const fe = document.activeElement;
      if (
        fe &&
        (fe.tagName === 'INPUT' ||
         fe.tagName === 'TEXTAREA' ||
         fe.isContentEditable)
      ) return;
      if (/^[a-z0-9]$/i.test(e.key)) {
        setSearchOpen(true);
        setSearchText(e.key);
        e.preventDefault();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const handle = setTimeout(() => {
      setSearchOpen(false);
      setSearchText('');
    }, 1000);
    return () => clearTimeout(handle);
  }, [searchText, searchOpen]);

  // ─── TEAM FILTERS ───────────────────────────────────────────────────────────
  const [filters, setFilters] = useState(
    () => teams.reduce((acc, t) => ({ ...acc, [t.id]: 0 }), {})
  );
  const handleFilter = useCallback(teamId => {
    setFilters(prev => ({
      ...prev,
      [teamId]: (prev[teamId] + 1) % 3
    }));
  }, []);

  // ─── CLAIMS & TILES ─────────────────────────────────────────────────────────
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
          data.id, data.text, data.image, data.points,
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
            body: JSON.stringify(copy)
          }).catch(console.error);
        }
        return copy;
      })
    );
  }, [API_URL]);

  // ─── FILTER + SEARCH ────────────────────────────────────────────────────────
  const visibleTiles = tiles.filter(tile =>
    Object.entries(filters).every(([id, mode]) => {
      const tid = Number(id);
      if (mode === 1) return !tile.isClaimedByTeam(tid);
      if (mode === 2) return  tile.isClaimedByTeam(tid);
      return true;
    })
  );
  const query = searchText.trim().toLowerCase();
  const finalTiles = query
    ? visibleTiles.filter(tile =>
        tile.description.toLowerCase().includes(query)
      )
    : visibleTiles;

  // ─── STATIC POINTS ──────────────────────────────────────────────────────────
  const teamPoints = useMemo(() => {
    const pts = Array(teams.length).fill(0);
    tiles.forEach(tile => {
      tile.claimedBy.forEach(id => {
        const idx = teams.findIndex(t => t.id === id);
        if (idx >= 0) {
          pts[idx] += tile.points;
        }
      });
    });
    return pts;
  }, [tiles]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Spotlight Search */}
      <SearchDialog
        open={searchOpen}
        value={searchText}
        onChange={setSearchText}
        onClose={()=>{
          setSearchOpen(false);
          setSearchText('');
        }}
      />

      {/* Settings Menu */}
      <Box
        sx={{
          position: 'absolute',
          top:      theme => theme.spacing(1),
          right:    theme => theme.spacing(1),
          zIndex:   theme => theme.zIndex.appBar
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

      {/* Bingo Grid */}
      <BingoBoard
        tiles={finalTiles}
        teamPoints={teamPoints}
        onToggleClaim={handleToggleClaim}
        readOnly={readOnly}
        filters={filters}
        onFilterTeam={handleFilter}
      />

      {/* Dialogs */}
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