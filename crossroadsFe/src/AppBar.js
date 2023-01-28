import * as React from "react";
import { AppBar, Toolbar, Avatar, Tooltip, Container, Typography, Button, Box, IconButton, Paper } from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileDialog from "./ProfileDialog.js";
import FeedbackDialog from './FeedbackDialog.js';
import rct from './logo60.png'
import AboutUsCarousel from "./AboutUsCarousel.js";



function ResponsiveAppBar(props){
  const { feedbackOpen, feedbackClose, feedbackClickOpen, aboutUsOpen, aboutUsClose, aboutUsClickOpen, handleLogOut } = props;

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CROSSROADS
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton>
                <MenuIcon />
              </IconButton>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key={"About Us"}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick = {aboutUsClickOpen}
              >
                {"About Us"}
              </Button>
              <AboutUsCarousel open = {aboutUsOpen} onClose = {aboutUsClose} />
              <Button
                key={"Feedback"}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick = {feedbackClickOpen}
              >
                {"Feedback"}
              </Button>
              <FeedbackDialog open = {feedbackOpen} onClose = {feedbackClose}/>
              <IconButton>
                <Paper elevation = {4}>
                  <a href = 'https://reactjs.org' target = '_blank' rel="noreferrer">
                    <img src={rct} className="rctlogo" alt="recty" />
                  </a>
                </Paper>
              </IconButton>
              
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open profile settings">
                <IconButton onClick={props.profileClickOpen} sx={{ p: 0 }}
                id="profile-button"
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  <ProfileDialog open = {props.profileOpen} onClose = {props.profileClose} onLogOut = {props.handleLogOut}/>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
  
};

export default ResponsiveAppBar;