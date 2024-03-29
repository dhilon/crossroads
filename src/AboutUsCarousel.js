import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import AboutUsCard from './AboutUs.js';

const cards = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    card:
      <AboutUsCard/>,
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    card:
        <AboutUsCard/>,
    imgPath:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
  {
    label: 'Bali, Indonesia',
    card:
        <AboutUsCard/>,
    imgPath:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    },
  {
    label: 'Goč, Serbia',
    card:
        <AboutUsCard/>,
    imgPath:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];

function AboutUsCarousel(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = cards.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const { open, onClose } = props;

  if (open) {
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>About Us</DialogTitle>
        <Box sx={{ maxWidth: 400, flexGrow: 1 }} onClose = {onClose}>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'none',
              alignItems: 'center',
              height: 50,
              pl: 2,
              bgcolor: 'background.default',
            }}
          >
            <Typography>{cards[activeStep].label}</Typography>
          </Paper>

          <AboutUsCard> </AboutUsCard>
          
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx = {{display:'none'}}
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

AboutUsCarousel.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

export default AboutUsCarousel;
