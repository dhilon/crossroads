import * as React from "react";
import { useState } from 'react';
import {
    Button,
    Card, 
    CardActions, 
    CardContent, 
    Typography,
    CircularProgress,
    Paper,
    Box
} from '@mui/material';

function InventoryCard (props) {

  const [disabled, setDisabled] = useState(false);

  function handleClose() {
    this.setState({disabled: true});
    this.props.onClose();
  }

  
  return (
    <div>
      
      <Box
          component="img"
          sx={{
              height: 255,
              display: 'block',
              maxWidth: 400,
              overflow: 'hidden',
              width: '100%',
          }}
          src={props.item.storeItem.img}
          alt={props.item.storeItem.name}
      />
      <Card variant="outlined">
        <React.Fragment>
            <CardContent>

              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Store Item: {props.item.storeItem.id}
              </Typography>
              <Typography variant="h5" component="div">
                {props.item.storeItem.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Strength: {props.item.storeItem.powerLevel}
              </Typography>
              
              <Typography variant="body2">
                {props.item.storeItem.description}
                <hr />
                Cost: {props.item.storeItem.pointsCost}
                <br />
                Created: {props.item.storeItem.createdAt}
                <br />
                Bought At: {props.item.boughtAt}
              </Typography>
            </CardContent>
          <CardActions>
            <Button size="small" onClick = {handleClose} disabled = {disabled}>
              Use
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </div>
    
    
  )
};

export default InventoryCard;