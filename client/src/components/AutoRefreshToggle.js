// src/components/AutoRefreshToggle.js
import { useState, useEffect, useRef } from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import RefreshIcon from '../assets/icons/refresh.png';

export default function AutoRefreshToggle({
  onRefresh, // now your App’s loadClaims()
  interval,
  staysOpen = true,
  toggleClose = () => {},
}) {
  const [enabled, setEnabled] = useState(false);
  const [countdown, setCountdown] = useState(interval);

  // keep a ref to the latest onRefresh so that our interval
  // callback never closes over a stale version
  const onRefreshRef = useRef(onRefresh);
  useEffect(() => {
    onRefreshRef.current = onRefresh;
  }, [onRefresh]);

  useEffect(() => {
    // whenever we disable, reset the countdown
    if (!enabled) {
      setCountdown(interval);
      return;
    }

    // fire immediately
    onRefreshRef.current();

    let remaining = interval;
    setCountdown(remaining);

    const id = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        onRefreshRef.current();
        remaining = interval;
      }
      setCountdown(remaining);
    }, 1000);

    return () => clearInterval(id);
  }, [enabled, interval]);

  const handleClick = () => {
    setEnabled((e) => !e);
    if (!staysOpen) toggleClose();
  };

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <img src={RefreshIcon} alt="Refresh" />
      </ListItemIcon>
      <ListItemText primary={enabled ? `Auto-refresh (${countdown}s)` : 'Auto-refresh'} />
    </MenuItem>
  );
}
