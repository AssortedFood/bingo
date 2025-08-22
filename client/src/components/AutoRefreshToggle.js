import React, { useState, useEffect } from 'react';
import { MenuItem, ListItemText } from '@mui/material';
import RefreshIcon                from '@mui/icons-material/Refresh';

/**
 * Props:
 *  - onRefresh   () => void     // called immediately and every 60s while enabled
 *  - staysOpen   boolean        // keeps parent Menu open
 *  - toggleClose () => void     // no‐op or optional close handler
 */
export default function AutoRefreshToggle({
  onRefresh,
  staysOpen,
  toggleClose = () => {}
}) {
  const [enabled, setEnabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!enabled) {
      setCountdown(60);
      return;
    }
    // immediate fire
    onRefresh();

    let sec = 60;
    setCountdown(sec);
    const id = setInterval(() => {
      sec -= 1;
      if (sec <= 0) {
        onRefresh();
        sec = 60;
      }
      setCountdown(sec);
    }, 1000);

    return () => clearInterval(id);
  }, [enabled, onRefresh]);

  const handleClick = () => {
    setEnabled(prev => !prev);
    if (!staysOpen) toggleClose();
  };

  return (
    <MenuItem onClick={handleClick}>
      <RefreshIcon fontSize="small" sx={{ mr: 1 }} />
      <ListItemText
        primary={
          enabled
            ? `Auto‐refresh (${countdown}s)`
            : 'Auto‐refresh'
        }
      />
    </MenuItem>
  );
}