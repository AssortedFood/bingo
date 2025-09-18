// client/src/components/BingoBoard.js
import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Divider, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Tooltip } from '@mui/material';
import InfoIcon from '../assets/icons/info.png';
import teams from '../data/teams.js';
import { useRef, createRef } from 'react';

// responsive sizing constants
const MIN_TILE_WIDTH = 300;
const SCALE = 0.9;

// styled container for each tile
const GridItem = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  border: `1px solid ${theme.palette.body.border}`,
  backgroundColor: theme.palette.body.background,
}));

// styled badge for each team
const TeamBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'teamColor' && prop !== 'isActive' && prop !== 'readOnly',
})(({ theme, teamColor, isActive, readOnly }) => ({
  width: 20,
  height: 20,
  margin: '0 5px',
  backgroundColor: isActive ? teamColor : theme.palette.body.main,
  border: `1px solid ${teamColor}`,
  cursor: readOnly ? 'default' : 'pointer',
  opacity: readOnly ? 0.6 : 1,
}));

// single tile component
const BingoTileComponent = ({ tile, readOnly, onToggleClaim }) => (
  <GridItem sx={{ position: 'relative' }}>
    {tile.info && (
      <Tooltip
        title={tile.info}
        interactive // allow clicking the tooltip itself
        enterTouchDelay={0} // tap opens immediately
      >
        <Box
          component="img"
          src={InfoIcon}
          alt={tile.description}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 20,
            height: 20,
            cursor: 'pointer',
            zIndex: 1,
          }}
        />
      </Tooltip>
    )}
    <CardContent
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
        {teams.map((team) => (
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
 * BingoBoard props:
 *   tiles          – list of BingoTile to display
 *   teamPoints     – [number] static array of points per team
 *   onToggleClaim  – callback(tileId, teamId)
 *   readOnly       – disable interactions
 *   filters        – { [teamId]: 0|1|2 } (3‐state filters)
 *   onFilterTeam   – toggle a team’s filter mode
 */
export default function BingoBoard({
  tiles,
  teamPoints, // <-- now comes in from parent
  onToggleClaim,
  readOnly,
  filters,
  onFilterTeam,
}) {
  // 1) Create an array of refs, one per team badge
  const badgeRefs = useRef(teams.map(() => createRef()));

  // 2) State to hold the “max width” in px
  const [badgeWidth, setBadgeWidth] = useState(0);

  // 3) After every render where teamPoints or filter labels might change,
  //    measure all badges and pick the maximum.
  useEffect(() => {
    const widths = badgeRefs.current.map((ref) => {
      const el = ref.current;
      return el ? el.getBoundingClientRect().width : 0;
    });
    const max = Math.ceil(Math.max(...widths, 0));
    setBadgeWidth(max);
  }, [teamPoints, filters]);

  // responsive tile sizing
  const [tileWidth, setTileWidth] = useState(MIN_TILE_WIDTH);
  useEffect(() => {
    function recalc() {
      const vw = window.innerWidth;
      const cols = Math.max(Math.floor(vw / MIN_TILE_WIDTH), 1);
      const w = (vw / cols) * SCALE;
      setTileWidth(w);
    }
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  // apply 3‐state filters
  const visibleTiles = tiles.filter((tile) =>
    Object.entries(filters).every(([teamIdStr, mode]) => {
      const teamId = Number(teamIdStr);
      if (mode === 1) return !tile.isClaimedByTeam(teamId);
      if (mode === 2) return tile.isClaimedByTeam(teamId);
      return true;
    }),
  );

  return (
    <div>
      {/* TEAM BADGES (3‐state toggles, full‐colour only) */}
      <Paper
        elevation={3}
        square
        sx={{
          p: 3,
          mb: 3,
          pr: 6,
          textAlign: 'center',
          bgcolor: 'background.default',
          border: 1,
          borderColor: 'body.border',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ flexWrap: 'wrap', gap: 2 }}
        >
          {teams.map((team, idx) => {
            const mode = filters[team.id] || 0;
            let label = '';
            if (mode === 1) label = 'Missing';
            if (mode === 2) label = 'Obtained';

            return (
              <Box
                key={team.id}
                ref={badgeRefs.current[idx]}
                onClick={() => onFilterTeam(team.id)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 1,
                  // minWidth: 100,
                  // flex: '0 1 auto',
                  width: badgeWidth ? `${badgeWidth}px` : 'auto',
                  flex: badgeWidth ? '0 0 auto' : '0 1 auto',
                  cursor: 'pointer',
                  backgroundColor: team.color,
                }}
              >
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  {team.name}
                </Typography>
                <Typography variant="body1">Points: {teamPoints[idx]}</Typography>
                {label && (
                  <Typography variant="caption" sx={{ mt: 0.5 }}>
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
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          pl: 2,
          pb: 2,
          pr: 0.5,
          gap: 2,
        }}
      >
        {visibleTiles.map((tile) => (
          <Grid item key={tile.id} sx={{ flex: `0 0 ${tileWidth}px` }}>
            <BingoTileComponent tile={tile} readOnly={readOnly} onToggleClaim={onToggleClaim} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
