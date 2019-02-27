import React, {Component, Fragment} from 'react';
import {
  Typography,
  Grid,
  Paper,
  Tooltip,
  Card,
  CardMedia
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Map from './components/Map';
import SimpleMenu from '../../components/SimpleMenu';
import CircularIndeterminate from '../../components/CircularIndeterminate'
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import mapboxData from './components/MapboxData';
import withWidth from '@material-ui/core/withWidth';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import flowRight from 'lodash/flowRight';
import OnTimePie from '../../components/charts/OnTimePie';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  paperAlignLeft: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  logo: {
    padding: '0!important',
    margin: '0!important'
  },
  datetime: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  progress: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
  htmlTooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    '& b': {
      fontWeight: theme.typography.fontWeightMedium
    }
  }
});

const arrivalWindows = [
  {
    menuLabel: '1 minute',
    dataLabel: '1_min'
  }, {
    menuLabel: '2 minutes',
    dataLabel: '2_min'
  }, {
    menuLabel: '3 minutes',
    dataLabel: '3_min'
  }, {
    menuLabel: '4 minutes',
    dataLabel: '4_min'
  }, {
    menuLabel: '5 minutes',
    dataLabel: '5_min'
  }
]

class TrainStats extends Component {
  constructor(props) {
    super(props);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.state = {
      selectedArrivalWindow: {
        index: 0,
        menuLabel: arrivalWindows[0].menuLabel,
        dataLabel: arrivalWindows[0].dataLabel
      }
    };
  }

  handleMenuChange(item, index) {
    this.setState({
      selectedArrivalWindow: {
        index: index,
        menuLabel: arrivalWindows[index].menuLabel,
        dataLabel: arrivalWindows[index].dataLabel
      }
    })
  }

  render() {
    const {classes} = this.props;
    const data = this.props.data;
    const score = Math.round(data.ontime[this.state.selectedArrivalWindow.dataLabel] / data.total_arrivals_analyzed * 1000) / 10;
    return (<div className={classes.root}>
      <Paper elevation={0} className={classes.paperAlignLeft}>
        <Grid container="container" spacing={24} justify="space-around">
          <Grid item="item" xs={8} md={12}>
            <Tooltip classes={{
                tooltip: classes.htmlTooltip
              }} title={(<Fragment>
                <Typography color="inherit">Update Timing</Typography>
                Latest statistics are provided roughly every 30 minutes between 5am and 10pm PST.
              </Fragment>)}>
              <Typography variant="body2">
                <b>Latest Update:
                </b>
                {
                  data.timestamp
                    ? <Moment format="D MMMM YYYY, h:mma" tz="America/Los_Angeles">{data.timestamp}</Moment>
                    : <span>---</span>
                }
              </Typography>
            </Tooltip>
          </Grid>
          <Grid container="container" item="item" xs={12} sm={8} md={6}>
            <Grid container="container" item="item" justify="center" xs={12}>
              <Grid item="item" xs={12} md={4}>
                <OnTimePie bins={data.ontime} total={data.total_arrivals_analyzed}/>
              </Grid>
            </Grid>
            <Grid item="item" xs={12}>
              <Paper elevation={0} className={classes.paper}>
                {
                  score
                    ? <Fragment>

                        <Typography variant={this.props.width === 'xs'
                            ? 'h3'
                            : 'h1'} component="p">
                          {score}%
                        </Typography>
                        <Typography component="p">observed arrivals within
                          <SimpleMenu menuItems={arrivalWindows.map((item) => {
                              return item.menuLabel
                            })} handleMenuChange={this.handleMenuChange} selected={this.state.selectedArrivalWindow.index}/>
                          of a scheduled stop
                        </Typography>
                        <Tooltip title="Delete">
                          <IconButton aria-label="Delete">
                            <DeleteIcon/>
                          </IconButton>
                        </Tooltip>
                      </Fragment>
                    : <h3><CircularIndeterminate className={classes.progress}/></h3>
                }
              </Paper>
            </Grid>
            <Grid item="item" xs={12}>
              <Paper elevation={0} className={classes.paper}>
                {
                  data.mean_time_between
                    ? <Fragment>
                        <Tooltip classes={{
                            tooltip: classes.htmlTooltip
                          }} title={(<Fragment>
                            <Typography color="inherit">Average Wait Time</Typography>
                            This is an average over all stop intervals measured for the day so far. Obviously, this interval should be split by time of day since trains run more frequently during peak times. Feature coming soon!
                          </Fragment>)}>
                          <Typography variant={this.props.width === 'xs'
                              ? 'h3'
                              : 'h1'} component="p">
                            {Math.round(data.mean_time_between / 60)}
                          </Typography>
                        </Tooltip>
                        <Typography component="p">minutes between trains on average</Typography>
                      </Fragment>
                    : <h3><CircularIndeterminate className={classes.progress}/></h3>
                }
              </Paper>
            </Grid>
          </Grid>
          <Grid item="item" xs={4} md={4} lg={3} className={classes.logo}>
            <Card elevation={0} className={classes.logo}>
              <CardMedia component="img" className={classes.cardImage} src={`/static/images/logo_${this.props.line}.svg`}/>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>);
  }
}

export default flowRight([withStyles(styles), withWidth()])(TrainStats);
