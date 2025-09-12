// src/components/DarkLightToggle.js
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';

// import gives you a URL string
import LightModeImg from '../assets/icons/light-mode.png';
import DarkModeImg from '../assets/icons/dark-mode.png';

/**
 * Props:
 *  – mode:        'light' | 'dark'
 *  – setMode:     fn
 *  – staysOpen:   boolean
 *  – toggleClose: fn
 */
export default function DarkLightToggle({
  mode,
  setMode,
  staysOpen = true,
  toggleClose = () => {},
}) {
  const handleClick = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('mode', next);
      } catch (err) {
        // ignore failures (e.g. private mode)
        console.warn('DarkLightToggle: failed to save theme mode', err);
      }
      return next;
    });
    if (!staysOpen) toggleClose();
  };

  // pick the correct URL
  const iconSrc = mode === 'light' ? DarkModeImg : LightModeImg;

  const label = mode === 'light' ? 'Dark Mode' : 'Light Mode';

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <img src={iconSrc} alt={label} />
      </ListItemIcon>
      <ListItemText primary={label} />
    </MenuItem>
  );
}
