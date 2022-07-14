import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from "react";
import {Typography } from '@mui/material';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';


function FeedbackDialog(props) {
    const { onClose, open } = props;
  
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Feedback</DialogTitle>
        <Typography variant = "body1" sx = {{padding: 1}}>
          All feedback is good feedback! 
        </Typography>
        <TextField id="outlined-basic" label="Enter feedback here: 😁" variant="outlined" />
        <Button variant="contained" endIcon={<SendIcon />} onClick = {onClose} > Send </Button>
      </Dialog>
    );
  }

FeedbackDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default FeedbackDialog;