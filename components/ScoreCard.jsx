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


const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
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

class ScoreCard extends Component {
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
      <Card elevation={1}>
        <Grid container="container" item="item" justify="center" xs={12}>
          <Grid item="item" xs={12} md={4}>
            <OnTimePie bins={data.ontime} total={data.total_arrivals_analyzed} selected={this.state.selectedArrivalWindow.dataLabel}/>
          </Grid>
        </Grid>
        <Grid item="item" xs={12}>
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
                      <Tooltip classes={{ tooltip: classes.htmlTooltip }} title={(
                    <Fragment>
                      <Typography color="inherit">Performance Score</Typography>
                      This number is based on the {data.total_arrivals_analyzed} train arrivals estimated so far out of {data.total_scheduled_arrivals} scheduled for today ({ Math.round(1000 * data.total_arrivals_analyzed / data.total_scheduled_arrivals) / 10 }%).
                    </Fragment>
  )}>
                        <IconButton aria-label="Delete">
                          <InfoIcon/>
                        </IconButton>
                      </Tooltip>
                    </Typography>

                  </Fragment>
                : <h3><CircularIndeterminate className={classes.progress}/></h3>
            }
        </Grid>
      </Card>
    )
  }

}

export default withStyles(styles)(ScoreCard);
