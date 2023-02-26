import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from "react";
import {TextField, CircularProgress, Alert } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';
import { PieChart, Series, Label, Connector } from 'devextreme-react/pie-chart';
import useSWR from 'swr';

function toDateString(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return month + "-" + day + "-" + date.getUTCFullYear();
}

function CalendarDialog(props) {

    const [date, setDate] = React.useState(new Date());
    const { data: quiz, error, isLoading } = useSWR('/quizzes/'+toDateString(date)+"/");
    const { onClose, open } = props;

    if (isLoading) {
      return (<CircularProgress color="secondary" />);
    }
  
    if (error) {
      return (<Alert severity="error">There is an error {error}</Alert>)
    } 

    const today = new Date();
    const quizDate = new Date(Date.parse(quiz.created));
    let data = [];
    if (quizDate.getDate() !== today.getDate() && quizDate.getMonth() !== today.getMonth() && quizDate.getUTCFullYear() !== today.getUTCFullYear()) {
      data = [
        {
          name: quiz.leftWord,
          val: quiz.leftPlayCount
        },
        {
          name: quiz.rightWord,
          val: quiz.rightPlayCount
        }
      ];
    }
    

    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Quick Calendar</DialogTitle>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            renderInput={(props) => <TextField {...props} />}
            label="Ultimate Calendar of Votes"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
          />
        </LocalizationProvider>
        <PieChart
          type = 'doughnut'
          dataSource={data}
          title = "Vote Counts"
        >
          <Series 
              argumentField="name" 
              valueField="val"
          >
            <Label visible={true}>
              <Connector visibile={true} width={1} />
            </Label>
          </Series>
        </PieChart>
        
      </Dialog>
    );
  }

CalendarDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};


export default CalendarDialog;