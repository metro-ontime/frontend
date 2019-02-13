import React, { Component } from 'react';
import { Typography, Grid, Toolbar, Paper, Divider } from '@material-ui/core';
import Highchart from '../../components/charts/Highchart';
import DataParser from '../../components/DataParser';
import { withStyles } from '@material-ui/core/styles';
import SimpleMenu from '../../components/SimpleMenu';

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
      direction: '0'
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={40}>
        <Grid item xs={12}>
          <Paper elevation={1} className={ classes.paper }>
            <Typography variant="h2">Trip Visualizer</Typography>
            <Divider className={ classes.root } />
            <Typography variant="body1" component="p">
              Grey lines depict scheduled train journeys, while colored lines show the observed paths of trains over this time frame. Colored lines above grey lines depict early trains and colored lines below grey lines depict late trains.
            </Typography>
        </Paper>
        </Grid>

        <Grid container justify="center" alignItems="center" spacing={24}>
          <Grid item xs={12}>
            <Toolbar color="primary">
              <SimpleMenu label="Select Direction: " menuItems={['1', '0']} />
            </Toolbar>
          </Grid>
          <Grid item xs={12}>
            <DataParser line={ this.props.line } direction={ this.state.direction }/>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(TrainDetails);
