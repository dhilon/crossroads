import * as React from "react";
import { useState } from 'react';
import {
    Button,
    Card, 
    CardActions, 
    CardContent, 
    Typography,
    Box
} from '@mui/material';

function InventoryCard (props) {

  const [disabled, setDisabled] = useState(false);

  function handleBuy() {
    setDisabled(true);
    props.onBuy(props.item.id);
  }

  const createdAtDate = new Date(props.item.storeItem.createdAt).toLocaleString("en-US")
  const boughtAtDate = new Date(props.item.boughtAt).toLocaleString("en-US")

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
                "{props.item.storeItem.description}"
                <br />
                Cost: {props.item.storeItem.pointsCost}
                <br />
                Created: {createdAtDate}
                <br />
                Bought At: {boughtAtDate}
              </Typography>
            </CardContent>
          <CardActions>
            <Button size="small" onClick = {handleBuy} disabled = {disabled}>
              Use
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </div>
    
    
  )
};

export default InventoryCard;