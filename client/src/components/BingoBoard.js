// client/src/components/BingoBoard.js

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Divider, Paper } from '@mui/material';
import { styled } from '@mui/system';
import teams from '../data/teams';
import BingoTile from '../models/BingoTile';

// Styled Components
const GridItem = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.body.border}`,
  backgroundColor: theme.palette.body.background,
}));

const TeamBox = styled(Box)(({ teamColor, isActive, readOnly }) => ({
  width: '20px',
  height: '20px',
  margin: '0 5px',
  backgroundColor: isActive ? teamColor : '#E2DBC8',
  border: `1px solid ${teamColor}`,
  cursor: readOnly ? 'default' : 'pointer',
  opacity: readOnly ? 0.6 : 1,
}));

const BingoTileComponent = ({ tile, readOnly, onToggleClaim }) => (
  <GridItem>
    <CardMedia component="img" height="100" image={tile.image} alt={tile.description} />
    <CardContent>
      <Typography variant="body1" align="center">{tile.description}</Typography>
      <Typography variant="body2" align="center">Points: {tile.points}</Typography>
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
    </CardContent>
  </GridItem>
);

const BingoBoard = () => {
  const hostname = window.location.hostname;
  const readOnly = hostname === 'bingo.synox.is';
  const API_URL = hostname.includes('localhost') 
    ? 'http://localhost:5000/api/claims' 
    : 'https://score.synox.is/api/claims';

  const [tiles, setTiles] = useState([]);
  const [teamPoints, setTeamPoints] = useState(Array(teams.length).fill(0));

  const loadClaims = useCallback(async () => {
    const response = await fetch(API_URL);
    const claimsData = await response.json();

    const tileData = [
      { description: "Quest gauntlet", points: 1 },
      { description: "Selfie at the map edge", points: 1 },
      { description: "Fire cape", points: 1 },
      { description: "Barrows unique", points: 1 },
      { description: "500k FM XP in one session", points: 1 }
    ];

    const updatedTiles = tileData.map((data, index) => {
      const tileClaims = claimsData.find(claim => claim.id === index + 1);
      return new BingoTile(
        index + 1,
        data.description,
        `/images/tile_${index + 1}.jpg`,
        data.points,
        tileClaims ? tileClaims.claimedBy : []
      );
    });

    setTiles(updatedTiles);
  }, [API_URL]);

  const handleToggleClaim = async (tileId, teamId) => {
    if (readOnly) return;
  
    setTiles(prevTiles => {
      return prevTiles.map(tile => {
        if (tile.id === tileId) {
          const newTile = new BingoTile(tile.id, tile.description, tile.image, tile.points, [...tile.claimedBy]);
          newTile.toggleTeamClaim(teamId);
          // Only save if the claim state actually changes
          if (JSON.stringify(tile.claimedBy) !== JSON.stringify(newTile.claimedBy)) {
            saveClaim(newTile);
          }
          return newTile;
        }
        return tile;
      });
    });
  };
  

  const saveClaim = async (tile) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tile),
      });
    } catch (error) {
      console.error('Failed to save claim:', error);
    }
  };

  const calculateTeamPoints = (tiles) => {
    const points = Array(teams.length).fill(0);
    tiles.forEach(tile => {
      tile.claimedBy.forEach(teamId => {
        points[teamId - 1] += tile.points; // Assuming team IDs start from 1
      });
    });
    setTeamPoints(points);
  };

  useEffect(() => {
    loadClaims().then(() => calculateTeamPoints(tiles));
  }, [loadClaims]);

  return (
    <div>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 3, 
          textAlign: 'center', 
          backgroundColor: '#c0a886',  
          border: '1px solid #94866d',  
          borderRadius: 2 
        }}
      >
        <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ gap: 2 }}>
          {teams.map((team, index) => (
            <Box key={team.id} sx={{ backgroundColor: team.color, p: 2, borderRadius: 2 }}>
              <Typography variant="h6" color="textPrimary">{team.name}</Typography>
              <Typography variant="body1" color="textPrimary">Points: {teamPoints[index]}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
      <Divider />

      <Grid container spacing={2}>
        {tiles.map(tile => (
          <Grid item xs={1.7} key={tile.id}>
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
