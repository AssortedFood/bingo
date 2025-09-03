// client/src/components/BingoBoard.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Paper
} from '@mui/material';
import { styled } from '@mui/system';
import teams from '../data/teams';

// responsive sizing
const MIN_TILE_WIDTH = 300;
const SCALE = 0.9;

// styled components
const GridItem = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  border: `1px solid ${theme.palette.body.border}`,
  backgroundColor: theme.palette.body.background,
}));

const TeamBox = styled(Box, {
  shouldForwardProp: prop =>
    prop !== 'teamColor' &&
    prop !== 'isActive' &&
    prop !== 'readOnly'
})(({ theme, teamColor, isActive, readOnly }) => ({
  width:   20,
  height:  20,
  margin: '0 5px',
  backgroundColor: isActive ? teamColor : theme.palette.body.main,
  border: `1px solid ${teamColor}`,
  cursor: readOnly ? 'default' : 'pointer',
  opacity: readOnly ? 0.6 : 1
}));

// tile renderer
const BingoTileComponent = ({ tile, readOnly, onToggleClaim }) => (
  <GridItem>
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={tile.image}
        alt={tile.description}
        sx={{ height: 100, width: '100%', objectFit: 'contain', mb: 1 }}
      />
      <Typography variant="body1" align="center">
        {tile.description}
      </Typography>
    </CardContent>
    <Box sx={{ px: 2, pb: 2, pr: 2, mt: 'auto' }}>
      <Typography variant="body2" align="center">
        Points: {tile.points}
      </Typography>
      <Box display="flex" justifyContent="center" mt={1}>
        {teams.map(team => (
          <TeamBox
            key={team.id}
            teamColor={team.color}
            isActive={tile.isClaimedByTeam(team.id)}
            readOnly={readOnly}
            onClick={() => !readOnly && onToggleClaim(tile.id, team.id)}
          />
        ))}
      </Box>
    </Box>
  </GridItem>
);

/**
 * BingoBoard supports 3‐state filters per team:
 *   filters = { [teamId]: 0|1|2 }
 *     0 = off
 *     1 = missing only
 *     2 = obtained only
 *
 * Badges are always full‐colour; we rely on the label text
 * to communicate the mode.
 */
export default function BingoBoard({
  tiles,
  onToggleClaim,
  readOnly,
  filters,      // { teamId: mode }
  onFilterTeam  // toggle a team's mode: 0→1→2→0
}) {
  // recompute team points
  const [teamPoints, setTeamPoints] = useState(
    Array(teams.length).fill(0)
  );
  useEffect(() => {
    const pts = Array(teams.length).fill(0);
    tiles.forEach(tile =>
      tile.claimedBy.forEach(id => {
        const idx = teams.findIndex(t => t.id === id);
        if (idx > -1) pts[idx] += tile.points;
      })
    );
    setTeamPoints(pts);
  }, [tiles]);

  // responsive tile sizing
  const [tileWidth, setTileWidth] = useState(MIN_TILE_WIDTH);
  useEffect(() => {
    const recalc = () => {
      const vw   = window.innerWidth;
      const cols = Math.max(Math.floor(vw / MIN_TILE_WIDTH), 1);
      const w    = (vw / cols) * SCALE;
      setTileWidth(w);
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  // apply 3‐state filters
  const visibleTiles = tiles.filter(tile =>
    Object.entries(filters).every(([teamIdStr, mode]) => {
      const teamId = Number(teamIdStr);
      if (mode === 1) {
        // missing only: tile NOT claimed by this team
        return !tile.isClaimedByTeam(teamId);
      }
      if (mode === 2) {
        // obtained only: tile IS claimed by this team
        return tile.isClaimedByTeam(teamId);
      }
      // mode 0: no constraint
      return true;
    })
  );

  return (
    <div>
      {/* TEAM BADGES (3‐state toggles, full‐colour only) */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          textAlign: 'center',
          bgcolor: 'background.default',
          border: 1,
          borderColor: 'body.border',
          borderRadius: 2,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ flexWrap: 'wrap', gap: 2 }}
        >
          {teams.map((team, idx) => {
            const mode = filters[team.id] || 0; // 0|1|2
            let label = '';
            if (mode === 1) label = 'Missing';
            if (mode === 2) label = 'Obtained';

            return (
              <Box
                key={team.id}
                onClick={() => onFilterTeam(team.id)}
                sx={{
                  display:        'flex',
                  flexDirection:  'column',
                  alignItems:     'center',
                  p:              1,
                  borderRadius:   1,
                  minWidth:       100,
                  flex:           '0 1 auto',
                  cursor:         'pointer',
                  backgroundColor: team.color
                }}
              >
                <Typography variant="h6" sx={{ mb: .5}}>
                  {team.name}
                </Typography>
                <Typography variant="body1">
                  Points: {teamPoints[idx]}
                </Typography>
                {label && (
                  <Typography variant="caption" sx={{ mt: .5}}>
                    {label}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Paper>

      <Divider />

      {/* BINGO GRID */}
      <Grid
        container
        sx={{
          display:        'flex',
          flexWrap:       'wrap',
          justifyContent: 'center',
          pl: 2, pb: 2, pr: .5, gap: 2
        }}
      >
        {visibleTiles.map(tile => (
          <Grid
            item
            key={tile.id}
            sx={{ flex: `0 0 ${tileWidth}px` }}
          >
            <BingoTileComponent
              tile={tile}
              readOnly={readOnly}
              onToggleClaim={onToggleClaim}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}