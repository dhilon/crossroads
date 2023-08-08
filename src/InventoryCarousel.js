import * as React from 'react';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { DialogTitle, CircularProgress, Alert, Dialog, Button, MobileStepper, Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import InventoryCard from './InventoryCard.js';
import axios from 'axios';
import useSWR from 'swr';
import { mutate } from "swr";

function InventoryCarousel(props) {

  const { data: items, error, isLoading, mutate: inventoryStoreItemsMutate } = useSWR('/inventoryStoreItems');
  
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
      await axios.delete('/inventoryStoreItems/'+id+'/');
      inventoryStoreItemsMutate();
      mutate("/storeItems");
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

  if (maxSteps === 0) {
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Inventory</DialogTitle>
        <Box sx={{ maxWidth: 400, flexGrow: 1 }} onClose = {onClose}>
          <h3>There are no items in your inventory!</h3>
        </Box>
      </Dialog>
      );
  }

  if (activeStep >= maxSteps) {
    setActiveStep(maxSteps-1);
  }

  if (open) {
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Inventory</DialogTitle>
        <Box sx={{ maxWidth: 400, flexGrow: 1 }} onClose = {onClose}>
          <InventoryCard item = {items[activeStep]} onBuy={onBuy}>
          </InventoryCard>
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

InventoryCarousel.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

export default InventoryCarousel;
