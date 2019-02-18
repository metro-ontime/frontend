import React, { Component, Fragment } from 'react';
import { Typography, Grid, Paper, Tooltip } from '@material-ui/core';
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
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';

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
  },
  htmlTooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    '& b': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
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
      total_scheduled: null,
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
      console.log(data);
      this.setState({
        summary: data.ontime,
        total: data.total_arrivals_analyzed,
        total_scheduled: data.total_scheduled_arrivals,
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
        <Grid container spacing={24} justify="center">
          <Grid item xs={12}>
            <Paper elevation={1} className={classes.paper}>
              <Map data={ mapboxData[this.props.line] }/>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={1} className={classes.datetime}>
              <Tooltip classes={{ tooltip: classes.htmlTooltip }} title={(
                <Fragment>
                  <Typography color="inherit">Update Timing</Typography>
                  Latest statistics are provided roughly every 30 minutes between 5am and 10pm PST.
                </Fragment>
              )}>
                <Typography variant="subtitle1">
                  <b>Latest Update: </b> 
                  { timestamp ?
                    <Moment format="D MMMM YYYY, h:mma" tz="America/Los_Angeles">{ timestamp }</Moment>
                    :
                    <span>---</span>
                  }
                </Typography>
              </Tooltip>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} className={classes.paper}>
              { score ?
                <Fragment>
                  <Tooltip classes={{ tooltip: classes.htmlTooltip }} title={(
                    <Fragment>
                      <Typography color="inherit">Performance Score</Typography>
                      This number is based on {this.state.total} train arrivals estimated so far out of {this.state.total_scheduled} scheduled for today ({ Math.round(1000 * this.state.total / this.state.total_scheduled) / 10 }%).
                    </Fragment>
                  )}>
                    <Typography variant={ this.props.width === 'xs' ? 'h3' : 'h1' } component="p">
                      { score }%
                    </Typography>
                  </Tooltip>
                  <Typography component="p">observed arrivals within
                    <SimpleMenu
                      menuItems={ arrivalWindows.map((item) => { return item.menuLabel }) }
                      handleMenuChange = {this.handleMenuChange}
                      selected = {this.state.selectedArrivalWindow.index}
                    />
                    of a scheduled stop
                  </Typography>
                </Fragment>
                :
                <h3><CircularIndeterminate className={classes.progress} /></h3>
              }
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} className={classes.paper}>
              { mean_time_between ?
                <Fragment>
                  <Tooltip classes={{ tooltip: classes.htmlTooltip }} title={(
                    <Fragment>
                      <Typography color="inherit">Average Wait Time</Typography>
                      This is an average over all stop intervals measured for the day so far. Obviously, this interval should be split by time of day since trains run more frequently during peak times. Feature coming soon!
                    </Fragment>
                  )}>
                    <Typography variant={ this.props.width === 'xs' ? 'h3' : 'h1' } component="p">
                      { Math.round(this.state.mean_time_between / 60 ) }
                    </Typography>
                  </Tooltip>
                  <Typography component="p">minutes between trains on average</Typography>
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

export default flowRight([withStyles(styles), withWidth()])(TrainStats);
