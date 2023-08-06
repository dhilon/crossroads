import * as React from "react";
import {
    Card, 
    CardActionArea, 
    CardContent, 
    Typography 
} from '@mui/material';

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
              Age: 17
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