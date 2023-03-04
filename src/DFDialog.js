import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from "react";
import { Typography, Alert, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import useSWR from 'swr';

function DFDialog(props) {
    const { onClose, open } = props;
    const { data: fact, error, isLoading } = useSWR("/fact");
  
    if (isLoading) {
      return (<CircularProgress color="secondary" />);
    }
  
    if (error) {
      return (<Alert severity="error">There is an error {error}</Alert>)
    }

    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Daily Fact ({fact.id})</DialogTitle>
        <Typography variant = "body1" sx = {{padding: 1}}>
          {fact.title}
        </Typography>
      </Dialog>
    );
  }

DFDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default DFDialog;