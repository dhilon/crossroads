import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from "react";
import {Typography } from '@mui/material';
import PropTypes from 'prop-types';


function HTPDialog(props) {
    const { onClose, open } = props;
  
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>How to Play</DialogTitle>
        <Typography variant = "body1" sx = {{padding: 1}}>
          This game delves into both the complex natures of game theory and the trustworthiness of cooperation. 
          Choose the side that you think other people will not choose. Whichever side has the least amount of 
          votes by the day will get a certain amount of points added to the score and their streak increased by one. 
          Use other tools on screen and items you can find in the shop to help you decide the road you will take.
        </Typography>
      </Dialog>
    );
  }

HTPDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default HTPDialog;