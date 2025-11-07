import * as React from "react";
import { Leaderboard, BatteryCharging90Outlined, CardMembershipOutlined } from "@mui/icons-material";
import { Divider, Menu, MenuItem, Dialog, DialogTitle, List, ListItemButton, CircularProgress, Alert, Typography, Button } from '@mui/material'
import useSWR from 'swr';


function WhichLeaderboard(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { leadClickOpen } = props;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <div>
      <Button variant="contained" size="normal" onClick={handleClick}>
        <Leaderboard fontSize="large" />
        <Typography variant="h5" sx={{ padding: 1 }}>
          Leaderboards
          </Typography>
        <Leaderboard fontSize="large" />
      </Button>
      <Menu
        id="which-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={leadClickOpen}>
          <TopStreaksMenu />
        </MenuItem>
        <MenuItem onClick={leadClickOpen}>
          <MostPointsMenu />
        </MenuItem>
      </Menu>
    </div>
  );
}

function TopStreaksMenu(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const { data: streak, error, isLoading } = useSWR('/streakLeaderboard');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) {
    return (<CircularProgress color="secondary" />);
  }

  if (error) {
    return (<Alert severity="error">There is an error {error}</Alert>)
  }

  return (
    <div>
      <Button variant="contained" size="normal" onClick={handleClick}>
        <Leaderboard fontSize="large" />
        <Typography variant="h5" sx={{ padding: 1 }}>
          <BatteryCharging90Outlined size="small" />
          Top Streaks
          <BatteryCharging90Outlined size="small" />
        </Typography>
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Top Streaks Leaderboard</DialogTitle>
        <List
          id="points-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {streak.map(function(profile, i) {
            return <ListItemButton> Place #{i+1}: {profile.user.username}: {profile.streak}</ListItemButton>;
          })}
          <Divider sx={{ my: 0.5 }} />
          <ListItemButton>Your place: ...</ListItemButton>
        </List>
      </Dialog>
      
    </div>
  )
}

function MostPointsMenu(props) {
  const { data: points, error, isLoading } = useSWR('/pointsLeaderboard');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) {
    return (<CircularProgress color="secondary" />);
  }

  if (error) {
    return (<Alert severity="error">There is an error {error}</Alert>)
  }

  return (
    <div>
      <Button variant="contained" size="normal" onClick={handleClick}>
        <Leaderboard fontSize="large" />
        <Typography variant="h5" sx={{ padding: 1 }}>
          <CardMembershipOutlined size="small" />
          Most Points
            <CardMembershipOutlined size="small" />
        </Typography>
        <Leaderboard fontSize="large" />
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Most Points Leaderboard</DialogTitle>
        <List
          id="points-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {points.map(function(profile, i) {
            return <ListItemButton> Place #{i+1}: {profile.user.username}: {profile.points}</ListItemButton>;
          })}
          
          <Divider sx={{ my: 0.5 }} />
          <ListItemButton>Your place: ...</ListItemButton>
        </List>
      </Dialog>
      
    </div>
  )
}


export default WhichLeaderboard