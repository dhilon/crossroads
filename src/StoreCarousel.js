import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {Dialog, DialogTitle, CircularProgress, Alert} from '@mui/material';
import PropTypes from 'prop-types';
import StoreCard from './StoreCard.js';
import useSWR from 'swr';
import axios from 'axios';
import { mutate } from "swr";

function StoreCarousel(props) {

  const { data: items, error, isLoading, mutate: storeItemsMutate } = useSWR('/storeItems');

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const { open, onClose } = props;

  async function onBuy(id) {
    try {
      await axios.post('/inventoryStoreItems/', {storeItemId: id});
      storeItemsMutate();
      mutate("/inventoryStoreItems")
    }
    catch (error) {
      //do it again
    }
  }

  if (isLoading) {
    return (<CircularProgress />);
  }
  if (error) {
    return (<Alert severity="error">There is an error {error}</Alert>);
  }

  const maxSteps = items.length;
  
  if (open) {
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Store</DialogTitle>
        <Box sx={{ maxWidth: 400, flexGrow: 1 }} onClose = {onClose}>
          <StoreCard item = {items[activeStep]} onBuy = {onBuy}>
          </StoreCard>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx = {{display:'flex'}}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
            
        </Box>
      </Dialog>
      );
  }
}

StoreCarousel.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

export default StoreCarousel;