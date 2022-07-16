import * as React from "react";
import { Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {CardMembershipOutlined} from '@mui/icons-material';


class StoreCard extends React.Component {
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
  render() {
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
              <Typography variant="body1">
                <CardMembershipOutlined size = "small"/> 34
              </Typography>
            </CardContent>
          <CardActions>
            <Button size="small" onClick = {this.handleClose.bind(this)} disabled = {this.state.disabled}>
              Buy
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    );
    }
  }


export default StoreCard;