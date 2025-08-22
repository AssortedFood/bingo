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

// same styled components…
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

// tile renderer stays the same
const BingoTileComponent = ({ tile, readOnly, onToggleClaim }) => (
  <GridItem>
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={tile.image}
        alt={tile.description}
        sx={{
          height: 100,
          width: '100%',
          objectFit: 'contain',
          mb: 1,
        }}
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

// ▼────────── PRESENTATIONAL BOARD ──────────▼
export default function BingoBoard({ tiles, onToggleClaim, readOnly }) {
  // recompute points any time tiles change
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

  // responsive tile sizing (unchanged)
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

  return (
    <div>
      {/* TEAM BADGES */}
      <Paper
        elevation={3}
        sx={{
          p: 3, mb: 3,
          textAlign: 'center',
          bgcolor: 'background.default',
          border: 1,
          borderColor: 'body.border',
          borderRadius: 2,
        }}
      >
        <Box display="flex" alignItems="center"
             justifyContent="center"
             sx={{ flexWrap: 'wrap', gap: 2 }}>
          {teams.map((team, i) => (
            <Box key={team.id}
                 sx={{
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   backgroundColor: team.color,
                   p: 1,
                   borderRadius: 1,
                   minWidth: 100,
                   flex: '0 1 auto',
                 }}>
              <Typography
                variant="h6"
                sx={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)', mb: 0.5 }}
              >
                {team.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: 'clamp(0.75rem, 1.8vw, 1.1rem)' }}
              >
                Points: {teamPoints[i]}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
      <Divider />
      {/* BINGO GRID */}
      <Grid container
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              pl: 2, pb: 2, pr: 0.5, gap: 2
            }}>
        {tiles.map(tile => (
          <Grid item
                key={tile.id}
                sx={{ flex: `0 0 ${tileWidth}px` }}>
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