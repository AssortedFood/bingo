// src/components/SearchDialog.js
import React, { useEffect, useRef } from 'react';
import { Dialog, TextField, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    padding:    theme.spacing(2),
    // semi-transparent so you can see tiles behind
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(18,18,18,0.8)'
        : 'rgba(255,255,255,0.8)',
    borderRadius: theme.shape.borderRadius,
    minWidth:     300
  },
  '& .MuiBackdrop-root': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(0,0,0,0.6)'
        : 'rgba(0,0,0,0.4)',
    // no blur here
  }
}));

export default function SearchDialog({ open, value, onChange, onClose }) {
  const inputRef = useRef();

  // after open, give the TextField a moment and then autofocus
  useEffect(() => {
    if (!open) return;
    const handle = setTimeout(() => {
      inputRef.current?.focus();
      // move cursor to end
      const v = inputRef.current.value;
      inputRef.current.setSelectionRange(v.length, v.length);
    }, 0);
    return () => clearTimeout(handle);
  }, [open]);

  return (
    <StyledDialog
      open={open}
      onClose={() => { onClose(); onChange(''); }}
      disableEnforceFocus     // allow child to take focus
      BackdropProps={{}}      // just translucent, no blur
    >
      <Box>
        <TextField
          inputRef={inputRef}
          autoFocus            // built-in autofocus as a fallback
          fullWidth
          variant="outlined"
          placeholder="Search tiles…"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              onClose();
              onChange('');
            }
          }}
        />
      </Box>
    </StyledDialog>
  );
}