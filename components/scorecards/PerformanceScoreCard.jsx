import React, { Component, Fragment } from 'react';
import {
  Typography,
  Grid,
  Tooltip,
  Card,
  Divider
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import TooltipCustom from '~/components/TooltipCustom';
import OnTimePie from '~/components/charts/OnTimePie';
import SimpleMenu from '~/components/SimpleMenu';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Circle from '~/components/Circle';
import Dropdown from '~/components/Dropdown';
import ScoreCardHeader from '~/components/scorecards/ScoreCardHeader';
import { linesByName, linesById } from '~/helpers/LineInfo';


const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
  card: {
    position: 'relative',
    padding: 0,
    height: '100%'
  },
  iconPosition: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  center: {
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
  },
  cardContainer: {
    height: 'calc(100% - 3em)'
  },
  performer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  separator: {
    margin: 10
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
    const { classes, data, currentLine, arrivalWindow, formattedLineData } = this.props;
    let scoreData = data
    const lineId = linesByName[currentLine]
    if (lineId && lineId.id)
      scoreData = formattedLineData[formattedLineData.length - 1][`${lineId.id}_lametro-rail`]
    const score = Math.round(scoreData.ontime[arrivalWindow] / scoreData.total_arrivals_analyzed * 1000) / 10

    return (
      <Card elevation={1} className={ classes.card }>
        <div className={ classes.iconPosition }>
          <TooltipCustom title={(
            <Fragment>
              <Typography color="inherit">Performance Score</Typography>
              This figure is based on {scoreData.total_arrivals_analyzed} train arrivals estimated so far out of {scoreData.total_scheduled_arrivals} scheduled for today ({ Math.round(1000 * scoreData.total_arrivals_analyzed / scoreData.total_scheduled_arrivals) / 10 }%). It includes trains both running ahead and behind schedule (early and late).
            </Fragment>
          )}/>
        </div>
        <ScoreCardHeader title="On-Time Performance" />
        <Grid container item justify="center" alignItems="center" xs={12} className={ classes.cardContainer }>
          <Grid item xs={12} md={4} className={ classes.maxWidth300 }>
            <OnTimePie bins={scoreData.ontime} total={scoreData.total_arrivals_analyzed} selected={arrivalWindow}/>
          </Grid>
          <Grid item xs={12} md={4} className={ classes.maxWidth300 }>
            <Typography variant={this.props.width === 'xs'
                ? 'h3'
                : 'h2'} component="p" className={ classes.center }>
              {score}%
            </Typography>
          </Grid>
          {scoreData.most_reliable && (
            <Grid item xs={12}>
              <Divider light variant="middle" className={ classes.separator } />
              <Typography color="textPrimary" gutterBottom className={classes.center}>
                Most Reliable
              </Typography>
              <div className={classes.performer}>
                <Circle color={linesById[scoreData.most_reliable[arrivalWindow].line.slice(0,3)].color} />
                <Typography color="textSecondary" style={{ marginLeft: 10 }} component="h3">
                  {linesById[scoreData.most_reliable[arrivalWindow].line.slice(0,3)].name}
                  {' Line '}
                  {(scoreData.most_reliable[arrivalWindow].percent_ontime * 100).toFixed(1)}
                  {'% on-time'}
                </Typography>
              </div>
            </Grid>
          )}
          {scoreData.least_reliable && (
            <Grid item xs={12}>
              <Typography color="textPrimary" gutterBottom className={classes.center}>
                Least Reliable
              </Typography>
              <div className={classes.performer}>
                <Circle color={linesById[scoreData.least_reliable[arrivalWindow].line.slice(0,3)].color} />
                <Typography color="textSecondary" style={{ marginLeft: 10 }} component="h3">
                  {linesById[scoreData.least_reliable[arrivalWindow].line.slice(0,3)].name}
                  {' Line '}
                  {(scoreData.least_reliable[arrivalWindow].percent_ontime * 100).toFixed(1)}
                  {'% on-time'}
                </Typography>
              </div>
            </Grid>
          )}
        </Grid>
      </Card>
    )
  }

}

export default withStyles(styles)(PerformanceScoreCard);
