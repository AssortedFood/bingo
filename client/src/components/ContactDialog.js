// src/components/ContactDialog.js
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Divider
} from '@mui/material';
import CloseIconImg from '../assets/icons/close.png';

export default function ContactDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      disableScrollLock
    >
      <DialogTitle
        sx={{
          fontFamily: '"Runescape", sans-serif',
          position:   'relative'
        }}
      >
        Contact Us
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <img
            src={CloseIconImg}
            alt="Close"
          />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          fontFamily: '"Runescape", sans-serif',
          px: 3,
          py: 2,
          color: 'text.primary'
        }}
      >
        <Typography variant="body1" paragraph>
          For updates or bug‐fixes, please reach out to{' '}
          <strong>@bullmax1</strong> on Discord.
        </Typography>

        <Typography variant="body1" paragraph>
          Interested in using this bingo board for your own clan?<br />
          Contact{' '}<strong>@bullmax1</strong> on Discord for more information.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Created by @oxidising
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}