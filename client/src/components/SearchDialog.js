// src/components/SearchDialog.js
import React, { useRef } from 'react';
import { Dialog, TextField, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    padding: theme.spacing(2),
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(50,50,50,0.4)'
        : 'rgba(255,255,255,0.4)',
    borderRadius: theme.shape.borderRadius,
    minWidth: 300,
    boxShadow: 'none',
    outline:   'none',
    // kill the default outline on the OutlinedInput
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent !important',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent !important',
    },
  },
  '& .MuiBackdrop-root': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(0,0,0,0.6)'
        : 'rgba(0,0,0,0.4)',
  },
}));

export default function SearchDialog({ open, value, onChange, onClose }) {
  const inputRef = useRef(null);

  // Focus & move cursor to end when dialog is entering
  const handleOnEntering = () => {
    const inp = inputRef.current;
    if (inp) {
      inp.focus();
      const v = inp.value;
      inp.setSelectionRange(v.length, v.length);
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      keepMounted
      TransitionProps={{
        unmountOnExit: false,
        onEntering:    handleOnEntering
      }}
      disableEnforceFocus
      BackdropProps={{}}
    >
      <Box>
        <TextField
          inputRef={inputRef}
          fullWidth
          variant="outlined"
          placeholder="Search tiles…"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onClose();
            }
          }}
          slotProps={{
            input: {
              style: {
                fontSize:        '1.25rem',
                backgroundColor: 'transparent',
                border:          0
              }
            }
          }}
        />
      </Box>
    </StyledDialog>
  );
}