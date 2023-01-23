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
      disabled: false,
      items: [],
      error: null
    };
  }

  handleClose() {
    this.setState({disabled: true});
    this.props.onClose();
  }

  componentDidMount() {
    fetch("http://localhost:3000/inventoryStoreItems")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({items: result});
        },
        (error) => {
          this.setState({error});
        }
      )
  }

  render () {
    const { items } = this.state;
    return (
      <div>
        {items.map(value => (
        <Card variant="outlined">
          <React.Fragment>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {value.storeItem.id}
                </Typography>
                <Typography variant="h5" component="div">
                  {value.storeItem.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Strength: {value.storeItem.powerLevel}
                </Typography>
                <Typography variant="body2">
                  A great ploy to ...
                  <br />
                  {'"..."'}
                  Cost: {value.storeItem.pointsCost}
                  Created: {value.storeItem.createdAt}
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
      )}
      </div>
      
      
    )
  };
}

export default InventoryCard;