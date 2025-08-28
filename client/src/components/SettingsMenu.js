// src/components/SettingsMenu.js
import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import MenuIcon           from '@mui/icons-material/Menu';
import DarkLightToggle    from './DarkLightToggle';
import AutoRefreshToggle  from './AutoRefreshToggle';
import InstructionsIcon from '../assets/icons/instructions.png';

export default function SettingsMenu({
  mode,
  setMode,
  onRefresh,
  onInstructions
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu  = e => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  // centralize your interval here:
  const REFRESH_INTERVAL = 60;

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
        disableScrollLock
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
        <MenuItem
          onClick={() => {
            onInstructions();
            closeMenu();
          }}
        >
          <ListItemIcon>
            <img src={InstructionsIcon} alt="Instructions" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Instructions" />
        </MenuItem>
      </Menu>
    </>
  );
}