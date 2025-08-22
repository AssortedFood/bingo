// src/components/SettingsMenu.js
import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon           from '@mui/icons-material/Menu';
import DarkLightToggle    from './DarkLightToggle';
import AutoRefreshToggle  from './AutoRefreshToggle';

export default function SettingsMenu({
  mode,
  setMode,
  onRefresh
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu  = e => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  // centralize your interval here:
  const REFRESH_INTERVAL = 10;

  return (
    <>
      <IconButton size="small" onClick={openMenu}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        keepMounted
        PaperProps={{ sx: { minWidth: 180 } }}
      >
        <DarkLightToggle
          mode={mode}
          setMode={setMode}
          staysOpen={true}
          toggleClose={closeMenu}
        />

        <AutoRefreshToggle
          onRefresh={onRefresh}
          staysOpen={true}
          toggleClose={closeMenu}
          interval={REFRESH_INTERVAL}
        />
      </Menu>
    </>
  );
}