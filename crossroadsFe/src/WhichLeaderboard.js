import * as React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Leaderboard, BatteryCharging90Outlined, CardMembershipOutlined, Filter1, Filter2, Filter3 } from "@mui/icons-material";
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';



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
          <ListItemButton> <Filter1/> st place: ...</ListItemButton>
          <ListItemButton> <Filter2/> nd place: ...</ListItemButton>
          <ListItemButton> <Filter3/> rd place: ...</ListItemButton>
          <Divider sx={{ my: 0.5 }} />
          <ListItemButton>Your place: ...</ListItemButton>
        </List>
      </Dialog>
      
    </div>
  )
}

function MostPointsMenu(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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
          <ListItemButton> <Filter1/> st place: ...</ListItemButton>
          <ListItemButton> <Filter2/> nd place: ...</ListItemButton>
          <ListItemButton> <Filter3/> rd place: ...</ListItemButton>
          <Divider sx={{ my: 0.5 }} />
          <ListItemButton>Your place: ...</ListItemButton>
        </List>
      </Dialog>
      
    </div>
  )
}


export default WhichLeaderboard