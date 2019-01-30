import React, { Component } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Map from './components/Map';
import SimpleMenu from '../../components/SimpleMenu';
import CircularIndeterminate from '../../components/CircularIndeterminate'
import axios from 'axios';

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

  },
  progress: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  }
});
class TrainStats extends Component {
  constructor(props) {
    super(props);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.state = {
      chosen: '1_min',
      summary: { '1_min': 0 },
      total: 1
    };
  }

  componentDidMount() {
    axios.get(`https://s3-us-west-1.amazonaws.com/h4la-metro-performance/data/summaries/${this.props.line}_lametro-rail/2019-01-29.json`).then( ({ data }) => {
      this.setState({
        summary: data.ontime,
        total: data.total_arrivals_analyzed
      });
      // console.log(data);
    })
  }

  handleMenuChange(chosen) {
    this.setState({ chosen });
  }

  render() {
    const { classes } = this.props;
    const score = this.state.summary[this.state.chosen] / this.state.total * 100;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper elevation={1} className={classes.paper}>
              <Map data={ this.props.mapbox }/>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={1} className={classes.datetime}>
              <Typography variant="h5"><b>Latest Update:</b> 25 January 2018 at 2:30pm (PST)</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={1} className={classes.paper}>
              { score ?
                <Typography variant="h1" component="h3">
                  { Math.round(this.state && this.state.summary[this.state.chosen] / this.state.total * 100) }%
                </Typography>
                :
                <h3><CircularIndeterminate className={classes.progress} /></h3>
              }
                <Typography component="p">of trains arrived within
                  <SimpleMenu
                    menuItems={['1 minute', '2 minutes', '3 minutes', '4 minutes', '5 minutes']}
                    handleMenuChange = {this.handleMenuChange}
                  />
                  of a scheduled station stop today
                </Typography>
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
