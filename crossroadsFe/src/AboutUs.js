import * as React from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    Box,
    Card, 
    CardActionArea, 
    CardActions, 
    CardContent, 
    Typography 
} from '@mui/material';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';

function AboutUsCard(props) {
  return (
    <Card variant="outlined">
      <React.Fragment>
        <CardActionArea>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Genius
            </Typography>
            <Typography variant="h5" component="div">
              Dhilon Prasad
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Age: 16
            </Typography>
            <Typography variant="body2">
              Hobbies: 
              <br />
              {'"..."'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </React.Fragment>
    </Card>
  );
}

export default AboutUsCard;