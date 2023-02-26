import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from "react";
import {StepContext, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import axios from "axios"
import { useState } from 'react';


function FeedbackDialog(props) {
    const { onClose, open} = props;

    const [text, setText] = useState('');

    async function handleClose () {
      try {
        await axios.post('/feedbacks/', {text:text});
        setText('');
        onClose();
      }
      catch (error) {
        onClose();
      }
    }

    function handleTextChange (event) {
      setText(event.target.value);
    }
  
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Feedback</DialogTitle>
        <Typography variant = "body1" sx = {{padding: 1}}>
          All feedback is good feedback! 
        </Typography>
        <TextField name = "feedbackText" id="outlined-basic" label="Enter feedback here: 😁" variant="outlined" value = {text} onChange = {handleTextChange}/>
        <Button variant="contained" endIcon={<SendIcon />} onClick = {handleClose} > Send </Button>
      </Dialog>
    );
  }

FeedbackDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default FeedbackDialog;