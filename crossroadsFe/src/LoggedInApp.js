import './App.css';
import logo from './download.jpg'
import 'devextreme/dist/css/dx.light.css';
import WhichLeaderboard from './WhichLeaderboard.js'
import ResponsiveAppBar from './AppBar.js';
import HTPDialog from './HTPDialog.js';
import DFDialog from './DFDialog.js';
import CalendarDialog from './CalendarDialog.js';
import InventoryCarousel from './InventoryCarousel.js';
import StoreCarousel from './StoreCarousel.js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import * as React from "react";

import IconButton from '@mui/material/IconButton';
import {
  CalendarToday, 
  Inventory, 
  ShoppingCart, 
  } from '@mui/icons-material';



class LoggedInApp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showHowToPlay: true,
      dropdownLead: false,
      htpOpen: false,
      dfOpen: false,
      leads: false,
      leadMenu: false,
      calendarOpen: false,
      inventoryOpen: false,
      voteOpen: false,
      profileOpen: false,
      storeOpen: false,
      leftright: false,
      feedbackOpen: false,
      aboutUsOpen: false,
    };
  }

  handleOpenClose(stateVar) {
    var newState = {};
    newState[stateVar] = !this.state[stateVar];
    if (stateVar === 'voteOpen') {
      if (this.state.leftright === true) {
        this.setState(newState)
      }
    }
    else {
      this.setState(newState);
    }
  }
  
  render () {
    return (
      <div className="App">

        <Grid container spacing={2}>
            
          <Grid item xs={4}>
            <Button variant = "outlined" onClick = {this.handleOpenClose.bind(this, 'htpOpen')}>
              How to Play
            </Button>
            <HTPDialog
              open={this.state.htpOpen}
              onClose={this.handleOpenClose.bind(this, 'htpOpen')}
            />
          </Grid>
          <Grid item xs={4}>
            <WhichLeaderboard open={this.state.dfOpen} onClick={this.handleOpenClose.bind(this, 'leads')} leadClickOpen={this.handleOpenClose.bind(this, 'leadMenu')} />
          </Grid>

          <Grid item xs={4}>
            <Button variant = "outlined" onClick = {this.handleOpenClose.bind(this, 'dfOpen')}>
              Daily Fact 
            </Button>
            <DFDialog
              open={this.state.dfOpen}
              onClose={this.handleOpenClose.bind(this, 'dfOpen')}
            />
          </Grid>

          <Grid item xs={4}>
            Current Streak: 
          </Grid>

          <Grid item xs={4}>
            <IconButton aria-label="inventory" size = "large" onClick = {this.handleOpenClose.bind(this, 'inventoryOpen')}>
              <Inventory sx = {{ fontSize : 45, border: 2}}/>
            </IconButton>
            <InventoryCarousel
              open={this.state.inventoryOpen}
              onClose={this.handleOpenClose.bind(this, 'inventoryOpen')}
            />
          </Grid>

          <Grid item xs={4}>
            Best Streak: 
          </Grid>

          
          <Grid item xs={3}>
            <Button disabled={this.state.leftright} onClick={this.handleOpenClose.bind(this, 'leftright')}>
              Left
            </Button>
          </Grid>

          <Grid item xs={6}>
              <img src={logo} className="App-logo" alt="logo" sx = {{width: "100%", height: "100%"}}/>
          </Grid>

          <Grid item xs={3}>
            <Button disabled={this.state.leftright && this.state.voteOpen} onClick={this.handleOpenClose.bind(this, 'leftright')}>
              Right
            </Button>
          </Grid>


          <Grid item xs={12}>
            <Button variant="contained" disabled={this.state.voteOpen && this.state.leftright} onClick = {this.handleOpenClose.bind(this, 'voteOpen')}>
              Vote
            </Button>
          </Grid>

          <Grid item xs={4}>
          
            <IconButton aria-label="shopping-cart" size = "large" onClick = {this.handleOpenClose.bind(this, 'storeOpen')}>
              <ShoppingCart sx = {{ fontSize : 60, border: 2}}/>
              
            </IconButton>
            <StoreCarousel
              open={this.state.storeOpen}
              onClose={this.handleOpenClose.bind(this, 'storeOpen')}
            />

          </Grid>
          
          <Grid item xs={4}>
            <Typography variant = "h4" sx = {{padding: 1}}>
              My Points: 
            </Typography>
          </Grid>
          

          <Grid item xs={4}>
          
            <IconButton aria-label="calendar-today" size = "large" onClick = {this.handleOpenClose.bind(this, 'calendarOpen')}>
              <CalendarToday sx = {{ fontSize : 60, border: 2}}/>
            </IconButton>

            <CalendarDialog
              open={this.state.calendarOpen}
              onClose={this.handleOpenClose.bind(this, 'calendarOpen')}
            />

          </Grid>

          <Grid item xs={12} fontSize = "large">
            <Typography variant = "h2" sx = {{padding: 1}}>
              Welcome to Crossroads!
            </Typography>
          </Grid>
              
          <Grid item xs = {12}>
            <ResponsiveAppBar
            profileOpen = {this.state.profileOpen}
            profileClose = {this.handleOpenClose.bind(this, 'profileOpen')}
            profileClickOpen = {this.handleOpenClose.bind(this, 'profileOpen')}
            feedbackOpen = {this.state.feedbackOpen}
            feedbackClose = {this.handleOpenClose.bind(this, 'feedbackOpen')}
            feedbackClickOpen = {this.handleOpenClose.bind(this, 'feedbackOpen')}
            aboutUsOpen = {this.state.aboutUsOpen}
            aboutUsClose = {this.handleOpenClose.bind(this, 'aboutUsOpen')}
            aboutUsClickOpen = {this.handleOpenClose.bind(this, 'aboutUsOpen')}
            handleLogOut = {this.props.handleLogOut}
            />
          </Grid>


        </Grid>




        
      </div>
    );

            }
  
  
}



export default LoggedInApp;
