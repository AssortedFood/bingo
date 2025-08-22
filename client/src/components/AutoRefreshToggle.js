import React from 'react'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'

/**
 * Props:
 *  - checked    bool
 *  - onChange   (evt) => void
 *  - countdown? number (optional)
 */
export default function AutoRefreshToggle({
  checked,
  onChange,
  countdown
}) {
  return (
    <Box
      component="form"
      title="Auto-refresh price data every 60 seconds while this tab is in focus."
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        mx: 1.5,           // mr-sm-3 & ml-sm-3
      }}
    >
      <FormControlLabel
        className="form-check"
        control={
          <Checkbox
            className="form-check-input"
            size="small"
            checked={checked}
            onChange={onChange}
          />
        }
        label={
          <Typography component="span" className="form-check-label">
            Auto-refresh{' '}
            {typeof countdown === 'number' && (
              <Typography
                component="span"
                className="wgl-muted"
                sx={{ color: 'text.secondary', ml: 0.5 }}
              >
                ({countdown})
              </Typography>
            )}
          </Typography>
        }
        sx={{ // remove extra padding on the label wrapper
          m: 0,
          '& .MuiFormControlLabel-label': {
            marginLeft: 0,
            userSelect: 'none'
          }
        }}
      />
    </Box>
  )
}