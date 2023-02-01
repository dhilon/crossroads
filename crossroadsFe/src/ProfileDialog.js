import { Dialog, DialogTitle, Button } from "@mui/material";
import PropTypes from 'prop-types';
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { setDate } from "date-fns";
import { CircularProgress } from "@mui/material";


class ProfileDialog extends React.Component {
    constructor(props) {
      super(props);
      this.state = {profile: null};
      this.handleProfileResponse = this.handleProfileResponse.bind(this)
    }

    handleProfileResponse(response) {
      this.setState({profile: response.data[0]});
    }

    componentDidMount(){
      axios.get("/profile").then(this.handleProfileResponse);
    }
    

    render() {
      if (!this.state.profile) {
        return (<CircularProgress color="secondary" />);
      }
      
      return (
          <div>
            <Dialog onClose={this.props.onClose} open={this.props.open}>
              <DialogTitle>All About YOU</DialogTitle>
              Codename: {this.state.profile.user.username}
              <br></br>
              Created: {this.state.profile.created}
              <br></br>
              Hours Played: {this.state.profile.hoursPlayed}
              <br></br>
              Hours Won: {this.state.profile.hoursWon}
              <br></br>
              Highest Streak Rank: {this.state.profile.highestStreakRank}
              <br></br>
              Highest Streak: {this.state.profile.highestStreak}
              <Button id = "logout" variant = "contained" label = "Log Out" onClick = {this.props.onLogOut}>Log Out</Button>
            </Dialog>
          </div>
      )
      
      
      
    };
  }

export default ProfileDialog