// src/components/SettingsMenu.js
import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import SettingsIconImg    from '../assets/icons/settings.png';
import DarkLightToggle    from './DarkLightToggle';
import AutoRefreshToggle  from './AutoRefreshToggle';
import InstructionsIcon from '../assets/icons/instructions.png';
import ContactIcon from '../assets/icons/bond.png';

export default function SettingsMenu({
  mode,
  setMode,
  onRefresh,
  onInstructions,
  onContact
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu  = e => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  // centralize your interval here:
  const REFRESH_INTERVAL = 60;

  return (
    <>
     <IconButton size="small" onClick={openMenu}>
       <img 
         src={SettingsIconImg} 
         alt="Settings" 
         width={24} 
         height={24}
       />
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