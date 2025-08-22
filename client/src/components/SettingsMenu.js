import React from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import MenuIcon    from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';
import LightModeIcon   from '../assets/icons/light-mode.png';
import DarkModeIcon  from '../assets/icons/dark-mode.png';
/**
 * Props:
 *  – mode           "light" | "dark"
 *  – setMode        fn
 *  – autoRefresh    bool
 *  – setAutoRefresh fn
 *  – countdown?     number
 */
export default function SettingsMenu({
  mode,
  setMode,
  autoRefresh,
  setAutoRefresh,
  countdown = 60
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu  = e => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  // flip dark/light
  const handleMode = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('mode', next); } catch {}
      return next;
    });
    // keep open
  };

    const ModeIcon = mode === 'light' ? DarkModeIcon : LightModeIcon;

  // flip auto‐refresh
  const handleAuto = () => {
    setAutoRefresh(prev => !prev);
    // keep open
  };

  return (
    <>
      <IconButton size="small" onClick={openMenu}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        PaperProps={{ sx: { minWidth: 180 } }}
      >
        {/* Dark <→> Light */}
        <MenuItem onClick={handleMode}>
          <ListItemIcon>
            <img
              src={ModeIcon}
              alt={mode === 'light' ? 'Switch to dark' : 'Switch to light'}
            //   style={{ width: 20, height: 20 }}
            />
          </ListItemIcon>
          {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </MenuItem>

        {/* Auto‐refresh */}
        <MenuItem onClick={handleAuto}>
          <ListItemIcon>
            <RefreshIcon fontSize="small" />
          </ListItemIcon>
          {autoRefresh
            ? `Auto‐refresh (${countdown}s)`
            : 'Auto‐refresh'
          }
        </MenuItem>
      </Menu>
    </>
  );
}