import React, { Component, Fragment } from 'react';
import {
  Typography,
  Grid,
  Tooltip,
  Card
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import TooltipCustom from '~/components/TooltipCustom';
import OnTimePie from '~/components/charts/OnTimePie';
import SimpleMenu from '~/components/SimpleMenu';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Dropdown from '~/components/Dropdown';


const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
  card: {
    position: 'relative',
    padding: 20
  },
  iconPosition: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  score: {
    textAlign: 'center'
  },
  description: {
    textAlign: 'center',
    marginTop: '1em'
  },
  spacer: {
    margin: '2em 0'
  },
  maxWidth300: {
    maxWidth: 300
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
];

class PerformanceScoreCard extends Component {
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
    const { classes } = this.props;
    const data = this.props.data;
    const score = Math.round(data.ontime[this.state.selectedArrivalWindow.dataLabel] / data.total_arrivals_analyzed * 1000) / 10;
    return (
      <Card elevation={1} className={ classes.card }>
        <div className={ classes.iconPosition }>
          <TooltipCustom title={(
            <Fragment>
              <Typography color="inherit">Performance Score</Typography>
              This figure is based on {data.total_arrivals_analyzed} train arrivals estimated so far out of {data.total_scheduled_arrivals} scheduled for today ({ Math.round(1000 * data.total_arrivals_analyzed / data.total_scheduled_arrivals) / 10 }%). It includes trains both running ahead and behind schedule (early and late).
            </Fragment>
          )}/>
        </div>
        <Grid container item justify="center" alignItems="center" xs={12}>
          <Grid item xs={12} md={4} className={ classes.maxWidth300 }>
            <OnTimePie bins={data.ontime} total={data.total_arrivals_analyzed} selected={this.state.selectedArrivalWindow.dataLabel}/>
          </Grid>
          <Grid item xs={12} md={4} className={ classes.maxWidth300 }>
            <Typography variant={this.props.width === 'xs'
                ? 'h3'
                : 'h2'} component="p" className={ classes.score }>
              {score}%
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={12} justify="center">
          <Grid item xs={12}>
            <Typography component="p" className={ classes.description }>Trains running within { this.state.selectedArrivalWindow.menuLabel } of schedule.
            </Typography>
          </Grid>
          <Grid item xs={10} sm={8} md={6} className={ classes.spacer }>
            <Dropdown
              menuItems={ arrivalWindows.map((item) => { return item.menuLabel }) }
              handleMenuChange = {this.handleMenuChange}
              selected = {this.state.selectedArrivalWindow.index}
            />
          </Grid>
        </Grid>
      </Card>
    )
  }

}

export default withStyles(styles)(PerformanceScoreCard);
