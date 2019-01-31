import React, { Component } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Map from './components/Map';
import SimpleMenu from '../../components/SimpleMenu';
import CircularIndeterminate from '../../components/CircularIndeterminate'
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';

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

const arrivalWindows = [
  {
    menuLabel: '1 minute',
    dataLabel: '1_min',
  },
  {
    menuLabel: '2 minutes',
    dataLabel: '2_min',
  },
  {
    menuLabel: '3 minutes',
    dataLabel: '3_min',
  },
  {
    menuLabel: '4 minutes',
    dataLabel: '4_min',
  },
  {
    menuLabel: '5 minutes',
    dataLabel: '5_min',
  },
]

class TrainStats extends Component {
  constructor(props) {
    super(props);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.state = {
      summary: {},
      total: 1,
      selectedArrivalWindow: {
        index: 0,
        menuLabel: arrivalWindows[0].menuLabel,
        dataLabel: arrivalWindows[0].dataLabel,
      }
    };
  }

  componentDidMount() {
    const currentDate = moment().tz('America/Los_Angeles').format("YYYY-MM-DD");
    console.log(currentDate);
    axios.get(`https://s3-us-west-1.amazonaws.com/h4la-metro-performance/data/summaries/${this.props.line}_lametro-rail/2019-01-30.json`).then( ({ data }) => {
      this.setState({
        summary: data.ontime,
        total: data.total_arrivals_analyzed
      });
    })
  }

  handleMenuChange(item, index) {
    this.setState({ 
      selectedArrivalWindow: { 
        index: index,
        menuLabel: arrivalWindows[index].menuLabel,
        dataLabel: arrivalWindows[index].dataLabel,
      }
    })
  }

  render() {
    const { classes } = this.props;
    const score = Math.round(this.state.summary[this.state.selectedArrivalWindow.dataLabel] / this.state.total * 1000) / 10;
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
                  { score }%
                </Typography>
                :
                <h3><CircularIndeterminate className={classes.progress} /></h3>
              }
                <Typography component="p">of trains arrived within
                  <SimpleMenu
                    menuItems={ arrivalWindows.map((item) => { return item.menuLabel }) }
                    handleMenuChange = {this.handleMenuChange}
                    selected = {this.state.selectedArrivalWindow.index}
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
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TrainStats);
