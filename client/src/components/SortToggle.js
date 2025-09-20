// client/src/components/SortToggle.js
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  ALL_SORT_MODES,
  SORT_DEFAULT,
  SORT_POINTS_ASC,
  SORT_POINTS_DESC,
} from '../constants/sortModes';
import DefaultIcon from '../assets/icons/sort/default.png';
import PointsLowIcon from '../assets/icons/sort/points_low.png';
import PointsHighIcon from '../assets/icons/sort/points_high.png';

/**
 * Props:
 *  – mode:       one of SORT_DEFAULT | SORT_POINTS_ASC | SORT_POINTS_DESC
 *  – setMode:    (newMode) => void
 *  – staysOpen:  boolean
 *  – toggleClose: fn
 */
export default function SortToggle({ mode, setMode, staysOpen = true, toggleClose = () => {} }) {
  const ICONS = {
    [SORT_DEFAULT]: DefaultIcon,
    [SORT_POINTS_ASC]: PointsLowIcon,
    [SORT_POINTS_DESC]: PointsHighIcon,
  };
  const LABELS = {
    [SORT_DEFAULT]: 'Sort: Modified',
    [SORT_POINTS_ASC]: 'Sort: Points ↑',
    [SORT_POINTS_DESC]: 'Sort: Points ↓',
  };

  const handleClick = () => {
    // cycle through ALL_SORT_MODES
    const idx = ALL_SORT_MODES.indexOf(mode);
    const next = ALL_SORT_MODES[(idx + 1) % ALL_SORT_MODES.length];
    setMode(next);
    if (!staysOpen) toggleClose();
  };

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <img src={ICONS[mode]} alt={LABELS[mode]} width={24} height={24} />
      </ListItemIcon>
      <ListItemText primary={LABELS[mode]} />
    </MenuItem>
  );
}
