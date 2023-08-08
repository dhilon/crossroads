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


function StoreCard(props) {

  function handleBuy() {
    props.onBuy(props.item.id);
  }

  const createdAtDate = new Date(props.item.createdAt).toLocaleString("en-US")

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
          src={props.item.img}
          alt={props.item.name}
      />
      <Card variant="outlined">
        <React.Fragment>
            <CardContent>

              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Store Item: {props.item.id}
              </Typography>
              <Typography variant="h5" component="div">
                {props.item.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Strength: {props.item.powerLevel}
              </Typography>
              
              <Typography variant="body2">
                "{props.item.description}"
                <br />
                Cost: {props.item.pointsCost}
                <br />
                Created: {createdAtDate}
              </Typography>
            </CardContent>
          <CardActions>
            <Button size="small" onClick = {handleBuy} disabled = {props.item.isBought}>
              Buy
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </div>
  );
  }


export default StoreCard;