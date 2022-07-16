import * as React from "react";
import {
    Button,
    Card, 
    CardActions, 
    CardContent, 
    Typography 
} from '@mui/material';

class InventoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  handleClose() {
    this.setState({disabled: true});
    this.props.onClose();
  }

  render () {
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
            <Button size="small" onClick = {this.handleClose.bind(this)} disabled = {this.state.disabled}>
              Use
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    )
  };
}

export default InventoryCard;