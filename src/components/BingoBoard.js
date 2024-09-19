import React, { useEffect, useState, useMemo } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Divider, Paper } from '@mui/material';
import { styled } from '@mui/system';

// Import the matrix from the separate file
import teamSelectionsMatrix from './teamSelectionsMatrix';

const GridItem = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.body.border}`,
  backgroundColor: theme.palette.body.background,
}));

const TeamBox = styled(Box)(({ teamColor, isActive }) => ({
  width: '20px',
  height: '20px',
  margin: '0 5px',
  backgroundColor: isActive ? teamColor : '#f0f0f0',
  border: `1px solid ${teamColor}`,
}));

const BingoTile = ({ image, text, teamSelection, points }) => (
  <GridItem>
    <CardMedia component="img" height="100" image={image} alt={text} />
    <CardContent>
      <Typography variant="body1" align="center" color="textPrimary">{text}</Typography>
      <Typography variant="body2" align="center" color="textSecondary">Points: {points}</Typography>
      <Box display="flex" justifyContent="center" mt={1}>
        {['#f44336', '#4caf50', '#2196f3'].map((color, index) => (
          <TeamBox
            key={index}
            teamColor={color}
            isActive={teamSelection[index] === '1'}
          />
        ))}
      </Box>
    </CardContent>
  </GridItem>
);

const BingoBoard = () => {
  const tilePoints = useMemo(() => [
    1, 1, 1, 1, 1, 5,
    5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 10,
    10, 10, 10, 10, 10, 10,
    15, 15, 15, 15, 20, 20,
    20, 20, 25, 30, 35, 50
  ], []);

  const tileText = useMemo(() => [
    "Quest gauntlet", "Selfie at the map edge", "Fire cape", "Barrows unique", "500k FM XP in one session", "100x GOTR pulls",
    "Venator shard", "Zulrah unique", "Elegant piece", "Crystal grail", "Abyssal whip", "Boss head",
    "250x Brimhaven vouchers", "Perilous moons unique", "Zenyte shard", "Enhanced crystal teleport seed", "Dragon pickaxe", "Evil chicken piece", "5m XP in any non-combat", "10x clue uniques",
    "Elder chaos piece", "Nex unique", "Blood shard", "Wilderness boss ring", "Zalcano unique", "3x Any CG seed", "Boss jar",
    "Uncut onyx", "Any pet", "3x unique slayer boss drops", "Lord of the dagannoth rings", "DT2 Ring or virtus piece", "Tome of fire/water", "Fang kit",
    "5x Purple chest", "Mega rare"
  ], []);

  const [teamPoints, setTeamPoints] = useState([0, 0, 0]);

  useEffect(() => {
    const totalPoints = [0, 0, 0];
    teamSelectionsMatrix.forEach((row, rowIndex) => {
      row.forEach((selection, colIndex) => {
        const points = tilePoints[rowIndex * 6 + colIndex];
        const [team1, team2, team3] = selection.split('').map(Number);
        totalPoints[0] += team1 * points;
        totalPoints[1] += team2 * points;
        totalPoints[2] += team3 * points;
      });
    });
    setTeamPoints(totalPoints);
  }, [tilePoints]); // Remove teamSelectionsMatrix from the dependency array

  const tiles = Array.from({ length: 36 }, (_, index) => ({
    id: index,
    image: `/images/tile_${index + 1}.jpg`,
    text: tileText[index],
    points: tilePoints[index],
    teamSelection: teamSelectionsMatrix[Math.floor(index / 6)][index % 6]
  }));

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
        }}>
        <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ gap: 2 }}>
          <Box sx={{ backgroundColor: '#f44336', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" color="textPrimary">Akun Ankat</Typography>
            <Typography variant="body1" color="textPrimary">Points: {teamPoints[0]}</Typography>
          </Box>
          <Box sx={{ backgroundColor: '#4caf50', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" color="textPrimary">Akustin Akustiikkapojat</Typography>
            <Typography variant="body1" color="textPrimary">Points: {teamPoints[1]}</Typography>
          </Box>
          <Box sx={{ backgroundColor: '#2196f3', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" color="textPrimary">Juipin Jupiterit</Typography>
            <Typography variant="body1" color="textPrimary">Points: {teamPoints[2]}</Typography>
          </Box>
        </Box>
      </Paper>
      <Divider />

      <Grid container spacing={2}>
        {tiles.map((tile) => (
          <Grid item xs={2} key={tile.id}>
            <BingoTile
              image={tile.image}
              text={tile.text}
              points={tile.points}
              teamSelection={tile.teamSelection}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BingoBoard;
