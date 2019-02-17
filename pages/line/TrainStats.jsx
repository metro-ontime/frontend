import React, { Component, Fragment } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Map from './components/Map';
import SimpleMenu from '../../components/SimpleMenu';
import CircularIndeterminate from '../../components/CircularIndeterminate'
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import mapboxData from './components/MapboxData';
import { getMostRecentSummary } from '../../components/DataFinder';

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
      total: null,
      timestamp: '',
      mean_time_between: null,
      selectedArrivalWindow: {
        index: 0,
        menuLabel: arrivalWindows[0].menuLabel,
        dataLabel: arrivalWindows[0].dataLabel,
      }
    };
  }

  componentDidMount() {
    getMostRecentSummary(this.props.line, (data) => {
      this.setState({
        summary: data.ontime,
        total: data.total_arrivals_analyzed,
        timestamp: data.timestamp,
        mean_time_between: data.mean_time_between
      });
    });
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
    const timestamp = this.state.timestamp;
    const mean_time_between = this.state.mean_time_between;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper elevation={1} className={classes.paper}>
              <Map data={ mapboxData[this.props.line] }/>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={1} className={classes.datetime}>
              <Typography variant="h5">
                <b>Latest Update: </b> 
                { timestamp ?
                  <Moment format="D MMMM YYYY, h:mma" tz="America/Los_Angeles">{ timestamp }</Moment>
                  :
                  <span>---</span>
                }
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={1} className={classes.paper}>
              { score ?
                <Fragment>
                  <Typography variant="h1" component="h3">
                    { score }%
                  </Typography>
                  <Typography component="p">of trains arrived within
                    <SimpleMenu
                      menuItems={ arrivalWindows.map((item) => { return item.menuLabel }) }
                      handleMenuChange = {this.handleMenuChange}
                      selected = {this.state.selectedArrivalWindow.index}
                    />
                    of a scheduled station stop today
                  </Typography>
                </Fragment>
                :
                <h3><CircularIndeterminate className={classes.progress} /></h3>
              }
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={1} className={classes.paper}>
              { mean_time_between ?
                <Fragment>
                  <Typography variant="h1" component="h3">
                    { Math.round(this.state.mean_time_between / 60 ) }
                  </Typography>
                  <Typography component="p">Average wait time between trains</Typography>
                </Fragment>
                :
                <h3><CircularIndeterminate className={classes.progress} /></h3>
              }
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TrainStats);
