import React from 'react';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

/**
 * Exactly your in-App dark/light toggle, extracted
 *
 * Props:
 *  - mode:    "light" | "dark"
 *  - setMode: (next: "light"|"dark") => void
 */
export default function DarkLightToggle({ mode, setMode }) {
  const handleToggle = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('mode', next); } catch {}
      return next;
    });
  };

  return (
    <IconButton
      onClick={handleToggle}
      size="small"
      sx={{
        bgcolor: 'transparent',
        '&:hover': { bgcolor: 'transparent' },
        p: 0.5,
      }}
    >
      {mode === 'light'
        ? <DarkModeIcon fontSize="small" />
        : <LightModeIcon fontSize="small" />
      }
    </IconButton>
  );
}