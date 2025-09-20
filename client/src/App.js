// src/App.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, IconButton, useMediaQuery, CssBaseline, ThemeProvider } from '@mui/material';
import useAppTheme, { getInitialMode } from './theme.js';

import SettingsMenu from './components/SettingsMenu.js';
import InstructionsDialog from './components/InstructionsDialog.js';
import ContactDialog from './components/ContactDialog.js';
import SearchDialog from './components/SearchDialog.js';
import BingoBoard from './components/BingoBoard.js';

import tileData from './data/tiles.js';
import BingoTile from './models/BingoTile.js';
import teams from './data/teams.js';

// 1) your sort constants
import {
  SORT_DEFAULT,
  SORT_POINTS_ASC,
  SORT_POINTS_DESC,
  ALL_SORT_MODES,
} from './constants/sortModes.js';

// 2) the three icons you downloaded
import DefaultIcon from './assets/icons/sort/default.png';
import PointsLowIcon from './assets/icons/sort/points_low.png';
import PointsHighIcon from './assets/icons/sort/points_high.png';

export default function App() {
  // ─── DIALOG STATES ─────────────────────────────────────────────────────────
  const [showInstructions, setShowInstructions] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const openInstructions = () => setShowInstructions(true);
  const closeInstructions = () => setShowInstructions(false);
  const openContact = () => setShowContact(true);
  const closeContact = () => setShowContact(false);

  // ─── THEME MODE TOGGLE ──────────────────────────────────────────────────────
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeMode, setThemeMode] = useState(() => {
    const init = getInitialMode();
    return init === 'system' ? (prefersDarkMode ? 'dark' : 'light') : init;
  });
  const theme = useAppTheme(themeMode);

  // ─── SPOTLIGHT SEARCH ───────────────────────────────────────────────────────
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (searchOpen) return;
      const fe = document.activeElement;
      if (fe && (fe.tagName === 'INPUT' || fe.tagName === 'TEXTAREA' || fe.isContentEditable)) {
        return;
      }
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
    function handleGlobalKeyDown(e) {
      if (e.key === 'Escape') {
        setSearchText('');
        setSearchOpen(false);
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);
  useEffect(() => {
    if (!searchOpen) return;
    const handle = setTimeout(() => setSearchOpen(false), 1500);
    return () => clearTimeout(handle);
  }, [searchText, searchOpen]);

  // ─── TEAM FILTERS ───────────────────────────────────────────────────────────
  const [filters, setFilters] = useState(() =>
    teams.reduce((acc, t) => ({ ...acc, [t.id]: 0 }), {}),
  );
  const handleFilter = useCallback((teamId) => {
    setFilters((prev) => ({
      ...prev,
      [teamId]: (prev[teamId] + 1) % 3,
    }));
  }, []);

  // ─── SORT STATE ─────────────────────────────────────────────────────────────
  const [sortMode, setSortMode] = useState(SORT_DEFAULT);

  // cycle to the next mode when the button is clicked
  const cycleSort = () => {
    const idx = ALL_SORT_MODES.indexOf(sortMode);
    const next = ALL_SORT_MODES[(idx + 1) % ALL_SORT_MODES.length];
    setSortMode(next);
  };

  // icon + label maps
  const ICON_MAP = {
    [SORT_DEFAULT]: DefaultIcon,
    [SORT_POINTS_ASC]: PointsLowIcon,
    [SORT_POINTS_DESC]: PointsHighIcon,
  };
  const LABEL_MAP = {
    [SORT_DEFAULT]: 'Sort: Modified',
    [SORT_POINTS_ASC]: 'Sort: Points ↑',
    [SORT_POINTS_DESC]: 'Sort: Points ↓',
  };

  // ─── CLAIMS & TILES ─────────────────────────────────────────────────────────
  const hostname = window.location.hostname;
  const API_URL = hostname.includes('localhost')
    ? 'http://localhost:5000/api/claims'
    : 'https://bingo.synox.is/api/claims';
  const readOnly = hostname === 'bingo.synox.is';

  const [tiles, setTiles] = useState([]);
  // remember the raw claims array order for SORT_DEFAULT
  const [claimOrder, setClaimOrder] = useState([]);

  const loadClaims = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const claims = await res.json();
      setClaimOrder(claims);

      const updated = tileData.map((data) => {
        const found = claims.find((c) => c.id === data.id);
        return new BingoTile(
          data.id,
          data.text,
          data.image,
          data.info,
          data.points,
          found ? found.claimedBy : [],
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

  const handleToggleClaim = useCallback(
    (tileId, teamId) => {
      setTiles((prev) =>
        prev.map((tile) => {
          if (tile.id !== tileId) return tile;
          const copy = new BingoTile(
            tile.id,
            tile.description,
            tile.image,
            tile.info,
            tile.points,
            [...tile.claimedBy],
          );
          copy.toggleTeamClaim(teamId);
          if (JSON.stringify(copy.claimedBy) !== JSON.stringify(tile.claimedBy)) {
            fetch(API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(copy),
            }).catch(console.error);
          }
          return copy;
        }),
      );
    },
    [API_URL],
  );

  // ─── FILTER + SEARCH ────────────────────────────────────────────────────────
  const visibleTiles = tiles.filter((tile) =>
    Object.entries(filters).every(([id, mode]) => {
      const tid = Number(id);
      if (mode === 1) return !tile.isClaimedByTeam(tid);
      if (mode === 2) return tile.isClaimedByTeam(tid);
      return true;
    }),
  );
  const query = searchText.trim().toLowerCase();
  const finalTiles = query
    ? visibleTiles.filter((tile) => tile.description.toLowerCase().includes(query))
    : visibleTiles;

  // ─── SORTING ────────────────────────────────────────────────────────────────
  const sortedTiles = useMemo(() => {
    switch (sortMode) {
      case SORT_POINTS_ASC:
        return finalTiles
          .slice()
          .sort((a, b) => (a.points !== b.points ? a.points - b.points : a.id - b.id));

      case SORT_POINTS_DESC:
        return finalTiles
          .slice()
          .sort((a, b) => (b.points !== a.points ? b.points - a.points : a.id - b.id));

      case SORT_DEFAULT: {
        // sort by ISO‐timestamp descending (newest first),
        // fallback to 1970‐01‐01 for missing entries, then tiebreak by id
        const tsMap = new Map(
          claimOrder.map((c) => [c.id, c.lastModified ? new Date(c.lastModified).getTime() : 0]),
        );
        return finalTiles.slice().sort((a, b) => {
          const ta = tsMap.get(a.id) || 0;
          const tb = tsMap.get(b.id) || 0;
          if (ta !== tb) return tb - ta; // newer first
          return a.id - b.id; // fallback by id
        });
      }

      default:
        return finalTiles;
    }
  }, [finalTiles, sortMode, claimOrder]);

  // ─── STATIC TEAM POINTS ─────────────────────────────────────────────────────
  const teamPoints = useMemo(() => {
    const pts = Array(teams.length).fill(0);
    tiles.forEach((tile) => {
      tile.claimedBy.forEach((id) => {
        const idx = teams.findIndex((t) => t.id === id);
        if (idx >= 0) pts[idx] += tile.points;
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
        onClose={() => setSearchOpen(false)}
      />

      {/* Settings Menu */}
      <Box
        sx={{
          position: 'absolute',
          top: (theme) => theme.spacing(1),
          right: (theme) => theme.spacing(1),
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <SettingsMenu
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          sortMode={sortMode}
          setSortMode={setSortMode}
          onRefresh={loadClaims}
          onInstructions={openInstructions}
          onContact={openContact}
        />
      </Box>

      {/* directly underneath: Sort icon button */}
      <Box
        sx={{
          position: 'absolute',
          top: (t) => t.spacing(6),
          right: (t) => t.spacing(1),
          zIndex: (t) => t.zIndex.appBar,
        }}
      >
        <IconButton size="small" title={LABEL_MAP[sortMode]} onClick={cycleSort}>
          <img src={ICON_MAP[sortMode]} alt={LABEL_MAP[sortMode]} width={24} height={24} />
        </IconButton>
      </Box>

      {/* Bingo Grid */}
      <BingoBoard
        tiles={sortedTiles}
        teamPoints={teamPoints}
        onToggleClaim={handleToggleClaim}
        readOnly={readOnly}
        filters={filters}
        onFilterTeam={handleFilter}
      />

      {/* Dialogs */}
      <InstructionsDialog open={showInstructions} onClose={closeInstructions} />
      <ContactDialog open={showContact} onClose={closeContact} />
    </ThemeProvider>
  );
}
