// src/theme.js
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';

// 1) your “base” light palette
export const lightPalette = {
  background: { default: '#c0a886', paper: '#e2dbc8' },
  body: {
    main:       '#e2dbc8',
    light:      '#d8ccb4',
    mid:        '#d0bd97',
    dark:       '#b8a282',
    border:     '#94866d',
    background: '#c0a886',
  },
  text:    { primary: '#000', secondary: '#777' },
  divider: '#c0a886',
};

// 2) your “overrides” for dark mode
export const darkOverrides = {
  background: { default: '#605443', paper: '#605443' },
  body: {
    main:       '#b2a999',
    light:      '#d8ccb4',
    mid:        '#d0bd97',
    dark:       '#b8a282',
    border:     '#5e5443',
    background: '#605443',
  },
  text:    { primary: '#000', secondary: '#434343' },
  divider: '#605443',
};

// helper to pick initial mode from localStorage or OS preference
export function getInitialMode() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('mode');
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {} 
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
}

// main factory
export function getTheme(mode) {
  // pick palette
  const palette =
    mode === 'light'
      ? { ...lightPalette, mode: 'light' }
      : { ...lightPalette, ...darkOverrides, mode: 'dark' };

  return createTheme({
    palette,
    typography: {
      // use your Runescape font in both modes:
      fontFamily: `"Runescape", ${palette.text.primary}`,
    },
    // you can also put shadows, shape, breakpoints, transitions, etc. here
  });
}

// a React hook for your App to call
export default function useAppTheme(mode) {
  return useMemo(() => getTheme(mode), [mode]);
}