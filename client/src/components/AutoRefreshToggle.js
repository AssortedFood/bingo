// src/components/AutoRefreshToggle.js
import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * Props:
 *  – onRefresh:    () => void    // fire immediately + every `interval`
 *  – staysOpen:    boolean
 *  – toggleClose:  fn
 *  – interval:     number        // seconds
 */
export default function AutoRefreshToggle({
  onRefresh,
  staysOpen = true,
  toggleClose = () => {},
  interval
}) {
  const [enabled, setEnabled]     = useState(false);
  const [countdown, setCountdown] = useState(interval);

  useEffect(() => {
    if (!enabled) {
      setCountdown(interval);
      return;
    }
    // fire immediately
    onRefresh();
    let sec = interval;
    setCountdown(sec);

    const id = setInterval(() => {
      sec -= 1;
      if (sec <= 0) {
        onRefresh();
        sec = interval;
      }
      setCountdown(sec);
    }, 1000);

    return () => clearInterval(id);
  }, [enabled, onRefresh, interval]);

  const handleClick = () => {
    setEnabled(x => !x);
    if (!staysOpen) toggleClose();
  };

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <RefreshIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        primary={
          enabled
            ? `Auto-refresh (${countdown}s)`
            : 'Auto-refresh'
        }
      />
    </MenuItem>
  );
}