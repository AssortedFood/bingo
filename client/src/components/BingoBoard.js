// client/src/components/BingoBoard.js
import { useEffect, useState, useCallback } from 'react';
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
import BingoTile from '../models/BingoTile';
import tileData from '../data/tiles';

// Constants for responsive tile sizing
const MIN_TILE_WIDTH = 300; // px
const SCALE = 0.9;          // 90% of slice width

// 1) Make each card a column‐flex container that fills its parent height
const GridItem = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  border: `1px solid ${theme.palette.body.border}`,
  backgroundColor: theme.palette.body.background,
}));

// little square for marking claims
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

// The tile component
const BingoTileComponent = ({ tile, readOnly, onToggleClaim }) => (
  <GridItem>
    {/* Top section grows to fill space */}
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

    {/* Footer stuck to bottom */}
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

const BingoBoard = () => {
  const hostname = window.location.hostname;
  const readOnly = hostname === 'bingo.synox.is';
  const API_URL = hostname.includes('localhost')
    ? 'http://localhost:5000/api/claims'
    : 'https://bingo.synox.is/api/claims';

  const [tiles, setTiles] = useState([]);
  const [teamPoints, setTeamPoints] = useState(Array(teams.length).fill(0));
  const [tileWidth, setTileWidth] = useState(MIN_TILE_WIDTH);

  // Load existing claims
  const loadClaims = useCallback(async () => {
    const res = await fetch(API_URL);
    const claims = await res.json();
    const updated = tileData.map(data => {
      const found = claims.find(c => c.id === data.id);
      return new BingoTile(
        data.id,
        data.text,
        data.image,
        data.points,
        found ? found.claimedBy : []
      );
    });
    setTiles(updated);
  }, [API_URL]);

  // Toggle a team‐claim
  const handleToggleClaim = (tileId, teamId) => {
    if (readOnly) return;
    setTiles(prev =>
      prev.map(tile => {
        if (tile.id !== tileId) return tile;
        const copy = new BingoTile(
          tile.id,
          tile.description,
          tile.image,
          tile.points,
          [...tile.claimedBy]
        );
        copy.toggleTeamClaim(teamId);
        // only POST if changed
        if (JSON.stringify(copy.claimedBy) !== JSON.stringify(tile.claimedBy)) {
          saveClaim(copy);
        }
        return copy;
      })
    );
  };

  // POST to server
  const saveClaim = async tile => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tile),
      });
    } catch (err) {
      console.error('Failed to save claim:', err);
    }
  };

  // Recompute team points
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

  // Initial load
  useEffect(() => {
    loadClaims();
  }, [loadClaims]);

  // Recompute tileWidth on resize
  useEffect(() => {
    const recalc = () => {
      const vw = window.innerWidth;
      const cols = Math.max(Math.floor(vw / MIN_TILE_WIDTH), 1);
      const w = (vw / cols) * SCALE;
      setTileWidth(w);
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  return (
    <div>
      {/* === HEADER: TEAM BADGES === */}
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
          sx={{
            flexWrap: 'wrap',    // <— allow wrapping onto next row
            gap: 2,
          }}
        >
          {teams.map((team, i) => (
            <Box
              key={team.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: team.color,
                p: 1,
                borderRadius: 1,
                minWidth: 100,    // won’t vanish completely
                flex: '0 1 auto', // can shrink but will wrap
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
                  lineHeight: 1.1,
                  mb: 0.5,
                }}
              >
                {team.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 'clamp(0.75rem, 1.8vw, 1.1rem)',
                  lineHeight: 1.2,
                }}
              >
                Points: {teamPoints[i]}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      <Divider />

      {/* === BINGO GRID === */}
      <Grid
        container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          pl: 2,
          pb: 2,
          pr: 0.5,
          gap: 2
        }}
      >
        {tiles.map(tile => (
          <Grid
            item
            key={tile.id}
            sx={{
              flex: `0 0 ${tileWidth}px`
            }}
          >
            <BingoTileComponent
              tile={tile}
              readOnly={readOnly}
              onToggleClaim={handleToggleClaim}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BingoBoard;