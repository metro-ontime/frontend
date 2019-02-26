import React, { Component } from 'react';
import { Typography, Grid, Toolbar, Paper, Divider } from '@material-ui/core';
import Highchart from '../../components/charts/Highchart';
import DataParser from '../../components/DataParser';
import { withStyles } from '@material-ui/core/styles';
import SimpleMenu from '../../components/SimpleMenu';
import directionNames from '../../helpers/Directions.js';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    margin: '20px 0'
  }
});

class TrainDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: 0
    };
    this.handleDirectionChange = this.handleDirectionChange.bind(this);
  }

  handleDirectionChange(newDirection, index) {
    this.setState({ direction: index });
  }

  render() {
    const { classes } = this.props;
    const directions = [directionNames[`${this.props.line}_0`], directionNames[`${this.props.line}_1`]];

    return (
      <Grid container justify="center" spacing={24}>
        <Grid item xs={12}>
          <Toolbar color="primary">
            <SimpleMenu label={`Towards: ${directions[this.state.direction]}`} menuItems={directions} handleMenuChange={ this.handleDirectionChange } />
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <DataParser line={ this.props.line } direction={ this.state.direction } date={this.props.date}/>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(TrainDetails);
