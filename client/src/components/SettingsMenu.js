import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon    from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * Props:
 *  - mode            "light" | "dark"
 *  - setMode         fn
 *  - autoRefresh     bool
 *  - setAutoRefresh  fn
 *  - countdown?      number
 */
export default function SettingsMenu({
  mode,
  setMode,
  autoRefresh,
  setAutoRefresh,
  countdown
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu  = e => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  // toggle dark/light
  const toggleMode = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('mode', next); } catch {}
      return next;
    });
    // do NOT close menu
  };

  // toggle auto-refresh
  const toggleAuto = () => {
    setAutoRefresh(prev => !prev);
    // do NOT close menu
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
        {/* 1) Dark/Light toggle label */}
        <MenuItem onClick={toggleMode}>
          {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </MenuItem>

        {/* 2) Auto-refresh */}
        <MenuItem onClick={toggleAuto}>
          <RefreshIcon fontSize="small" sx={{ mr: 1 }} />
          {autoRefresh
            ? `Auto-refresh (${countdown}s)`
            : 'Auto-refresh'
          }
        </MenuItem>
      </Menu>
    </>
  );
}