import React, { Component } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
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
          <Grid item xs={6}>
            <Paper elevation={1} className={classes.paper}>
              <Typography variant="h1" component="h3">
                25%
              </Typography>
              <Typography component="p">Percentages of trains that arrive on time</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={1} className={classes.paper}>
              <Typography variant="h1" component="h3">
                70%
              </Typography>
              <Typography component="p">Customer happiness</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TrainStats);
