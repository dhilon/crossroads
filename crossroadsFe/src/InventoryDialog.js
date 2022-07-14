import * as React from "react";
import {
    Button,
    Card, 
    CardActions, 
    CardContent, 
    Typography 
} from '@mui/material';

function InventoryCard(props) {
  const { onClose } = props;
  return (
    <Card variant="outlined">
      <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Item #?
            </Typography>
            <Typography variant="h5" component="div">
              Random Item
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Strength: 
            </Typography>
            <Typography variant="body2">
              A great ploy to ...
              <br />
              {'"..."'}
            </Typography>
          </CardContent>
        <CardActions>
          <Button size="small" onClick = {onClose}>
            Use
          </Button>
        </CardActions>
      </React.Fragment>
    </Card>
  );
}

export default InventoryCard;