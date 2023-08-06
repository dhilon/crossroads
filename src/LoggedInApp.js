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
import { Button, Typography, Alert, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import * as React from "react";
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import IconButton from '@mui/material/IconButton';
import { CalendarToday, Inventory, ShoppingCart } from '@mui/icons-material';
import axios from 'axios';



function LoggedInApp(props) {
  const { data: profile, error, isLoading } = useSWR('/profile/');
  const { data: quizzes, error: quizError, isLoading: isQuizLoading, mutate} = useSWR('/quizzes/');
  const { data: plays, error: playError, isLoading: isPlayLoading} = useSWR('/quizzes/plays');
  const [buttonState, setButtonState] = useState('None');

  
  const [state, setState] = useState({
    showHowToPlay: true,
    dropdownLead: false,
    htpOpen: false,
    dfOpen: false,
    leads: false,
    leadMenu: false,
    calendarOpen: false,
    inventoryOpen: false,
    profileOpen: false,
    storeOpen: false,
    feedbackOpen: false,
    aboutUsOpen: false,
  });

  async function handleVote(stateVar) {
    if (buttonState === 'None') {
      try {
        setButtonState(stateVar)
        await axios.post('/quizzes/plays/', {choice: stateVar});
        mutate();
      }
      catch (error) {
        //do it again
      }
    }

  }

  useEffect(() => {
    if (plays && plays.length > 0) {
      setButtonState(plays[0].choice);
    }
  }, [isQuizLoading, quizzes]);


  async function handleOpenClose(stateVar) {
    var newState = Object.assign({}, state);
    newState[stateVar] = !state[stateVar];
    setState(newState);
  }

  if (isLoading || isQuizLoading || isPlayLoading) {
    return (<CircularProgress color="secondary" />);
  }

    if (error || quizError || playError) {
      let toDisplay = error;
      if (error) {
        toDisplay = "No Quiz today! Come back later";
      } else {
        toDisplay = "No Soup for You!"
      }
      return (<Alert severity="error">There is an error: {toDisplay}</Alert>);
    }

  
  


  return (
    <div className="App">

      <Grid container spacing={2}>

        <Grid item xs={4}>
          <Button variant="outlined" onClick={() => {handleOpenClose('htpOpen')}}>
            How to Play
          </Button>
          <HTPDialog
            open={state.htpOpen}
            onClose={() => {handleOpenClose('htpOpen')}}
          />
        </Grid>
        <Grid item xs={4}>
          <WhichLeaderboard open={state.dfOpen} onClick={() => {handleOpenClose('leads')}} leadClickOpen={() => {handleOpenClose('leadMenu')}} />
        </Grid>

        <Grid item xs={4}>
          <Button variant="outlined" onClick={() => {handleOpenClose('dfOpen')}}>
            Daily Fact
          </Button>
          <DFDialog
            open={state.dfOpen}
            onClose={() => {handleOpenClose('dfOpen')}}
          />
        </Grid>

        <Grid item xs={4}>
          Current Streak: {profile.streak}
        </Grid>

        <Grid item xs={4}>
          <IconButton aria-label="inventory" size="large" onClick={() => {handleOpenClose('inventoryOpen')}}>
            <Inventory sx={{ fontSize: 45, border: 2 }} />
          </IconButton>
          <InventoryCarousel
            open={state.inventoryOpen}
            onClose={() => {handleOpenClose('inventoryOpen')}}
          />
        </Grid>

        <Grid item xs={4}>
          Best Streak: {profile.highestStreak}
        </Grid>


        <Grid item xs={3}>
          <Button variant="contained" disabled={buttonState === 'Left'} onClick={() => {handleVote('Left')}}>
            {quizzes[quizzes.length-1].leftWord}
          </Button>
        </Grid>

        <Grid item xs={6}>
          <img src={logo} className="App-logo" alt="logo" sx={{ width: "100%", height: "100%" }} />
        </Grid>

        <Grid item xs={3}>
          <Button variant = "contained" disabled={buttonState === 'Right'} onClick={() => {handleVote('Right')}}>
            {quizzes[quizzes.length-1].rightWord}
          </Button>
        </Grid>


        <Grid item xs={12}>
          
        </Grid>

        <Grid item xs={4}>

          <IconButton aria-label="shopping-cart" sie="large" onClick={() => {handleOpenClose('storeOpen')}}>
            <ShoppingCart sx={{ fontSize: 60, border: 2 }} />

          </IconButton>
          <StoreCarousel
            open={state.storeOpen}
            onClose={() => {handleOpenClose('storeOpen')}}
          />

        </Grid>

        <Grid item xs={4}>
          <Typography variant="h4" sx={{ padding: 1 }}>
            My Points: {profile.points}
          </Typography>
        </Grid>


        <Grid item xs={4}>

          <IconButton aria-label="calendr-today" sze="large" onClick={() => {handleOpenClose('calendarOpen')}}>
            <CalendarToday sx={{ fontSize: 60, border: 2 }} />
          </IconButton>

          <CalendarDialog
            open={state.calendarOpen}
            onClose={() => {handleOpenClose('calendarOpen')}}
            />
        </Grid>

      <Grid item xs={12} fontSize="large">
          <Typography variant="h2" sx={{ padding: 1 }}>
            Welcome to  Crossroads!
          </Typography>
      </Grid>

      <Grid item xs={12}>
        <ResponsiveAppBar
          profileOpen={state.profileOpen}
          profileClose={() => {handleOpenClose('profileOpen')}}
          profileClickOpen={() => {handleOpenClose('profileOpen')}}
          feedbackOpen={state.feedbackOpen}
          feedbackClose={() => {handleOpenClose('feedbackOpen')}}
          feedbackClickOpen={() => {handleOpenClose('feedbackOpen')}}
          aboutUsOpen={state.aboutUsOpen}
          aboutUsClose={() => {handleOpenClose('aboutUsOpen')}}
          aboutUsClickOpen={() => {handleOpenClose('aboutUsOpen')}}
          handleLogOut={props.handleLogOut}
          profile = {profile}
        />
      </Grid>


    </Grid>





      </div >
    );

}


export default LoggedInApp;
