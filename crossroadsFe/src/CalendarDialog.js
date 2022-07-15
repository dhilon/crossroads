import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from "react";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import PropTypes from 'prop-types';
import { PieChart, Series } from 'devextreme-react/pie-chart';

const data = [{
  arg: 'Right',
  val: 60
}, {
  arg: 'Left',
  val: 40
}
];


function CalendarDialog(props) {
    const [value, setValue] = React.useState(new Date());
    const { onClose, open } = props;
  
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle> </DialogTitle>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Ultimate Calendar of Votes"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
        <PieChart
          type = 'doughnut'
          dataSource={data}
        >
          <Series 
              argumentField="arg" 
              valueField="val"
          >
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