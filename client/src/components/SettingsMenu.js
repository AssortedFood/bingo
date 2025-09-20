// src/components/SettingsMenu.js
import React from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import SettingsIconImg from '../assets/icons/settings.png';
import DarkLightToggle from './DarkLightToggle.js';
import AutoRefreshToggle from './AutoRefreshToggle.js';
import InstructionsIcon from '../assets/icons/instructions.png';
import ContactIcon from '../assets/icons/bond.png';

export default function SettingsMenu({
  themeMode,
  setThemeMode,
  onRefresh,
  onInstructions,
  onContact,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  // centralize your interval here:
  const REFRESH_INTERVAL = 60;

  return (
    <>
      <Tooltip
        title="Settings"
        placement="left" // ← tells the popper to appear on the left
        arrow // ← optional, gives you the little arrow pointer
      >
        <IconButton
          size="small"
          onClick={openMenu}
          sx={{
            '&:hover': { backgroundColor: (t) => t.palette.action.hover },
            '& img': { transition: 'transform 0.1s' },
            '&:hover img': { transform: 'scale(1.1)' },
          }}
        >
          <img src={SettingsIconImg} alt="Settings" width={24} height={24} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        keepMounted
        disableScrollLock
        PaperProps={{ sx: { minWidth: 180 } }}
      >
        <DarkLightToggle
          mode={themeMode}
          setMode={setThemeMode}
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
        <MenuItem
          onClick={() => {
            onContact();
            closeMenu();
          }}
        >
          <ListItemIcon>
            <img src={ContactIcon} alt="Contact us" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Contact us" />
        </MenuItem>
      </Menu>
    </>
  );
}
