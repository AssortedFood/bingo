// client/src/constants/sortModes.js
export const SORT_DEFAULT = 'default'; // by modification order (claims.json order), fallback id
export const SORT_POINTS_ASC = 'points_low'; // lowest → highest
export const SORT_POINTS_DESC = 'points_high'; // highest → lowest

export const ALL_SORT_MODES = [SORT_DEFAULT, SORT_POINTS_ASC, SORT_POINTS_DESC];
