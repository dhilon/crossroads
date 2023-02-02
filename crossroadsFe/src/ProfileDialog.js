import { Dialog, DialogTitle, Button, Alert } from "@mui/material";
import React from "react";
import { CircularProgress } from "@mui/material";
import useSWR from 'swr';


function ProfileDialog (props) {
  const { data: profile, error, isLoading } = useSWR('/profile');


  if (isLoading) {
    return (<CircularProgress color="secondary" />);
  }

  if (error) {
    return (<Alert severity="error">There is an error {error}</Alert>)
  }
      
  return (
    <div>
      <Dialog onClose={props.onClose} open={props.open}>
        <DialogTitle>All About YOU</DialogTitle>
        Codename: {profile.user.username}
        <br></br>
        Created: {profile.created}
        <br></br>
        Hours Played: {profile.hoursPlayed}
        <br></br>
        Hours Won: {profile.hoursWon}
        <br></br>
        Highest Streak Rank: {profile.highestStreakRank}
        <br></br>
        Highest Streak: {profile.highestStreak}
        <Button id="logout" variant="contained" label="Log Out" onClick={props.onLogOut}>Log Out</Button>
      </Dialog>
    </div>
  )
      
      
      
};

export default ProfileDialog