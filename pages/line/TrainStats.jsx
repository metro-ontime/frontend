import React, { Component } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Map from './components/Map';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  datetime: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,

  }
});
class TrainStats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper elevation={1} className={classes.paper}>
              <Map />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={1} className={classes.datetime}>
              <Typography variant="h5"><b>Latest Update:</b> 25 January 2018 at 2:30pm (PST)</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={1} className={classes.paper}>
              <Typography variant="h1" component="h3">
                57%
              </Typography>
              <Typography component="p">of trains arrived within 1 minute of a scheduled station stop today</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={1} className={classes.paper}>
              <Typography variant="h1" component="h3">
                14 mins
              </Typography>
              <Typography component="p">Average wait time between trains</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={1} className={classes.paper}>
              <Typography variant="h1" component="h3">
                20 secs
              </Typography>
              <Typography component="p">Average difference between predicted and actual arrivals</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={1} className={classes.paper}>
              <Typography variant="h1" component="h3">
                7 mins
              </Typography>
              <Typography component="p">Standard deviation of difference between prediction and actual arrival times.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TrainStats);
