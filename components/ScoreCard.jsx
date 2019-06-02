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
import SimpleScoreCardHeader from '~/components/SimpleScoreCardHeader';
import { linesByName } from '~/helpers/LineInfo';


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
  },
  cardContainer: {
    height: 'calc(100% - 3em)'
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

class ScoreCard extends Component {
  render() {
    const { classes, data, currentLine, arrivalWindow, formattedLineData } = this.props;
    let scoreData = data
    const lineId = linesByName[currentLine]
    if (lineId && lineId.id)
      scoreData = formattedLineData[formattedLineData.length - 1][`${lineId.id}_lametro-rail`]
    const score = Math.round(scoreData.ontime[arrivalWindow] / scoreData.total_arrivals_analyzed * 1000) / 10;

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
        <SimpleScoreCardHeader title="On-Time Performance" />
        <Grid container item justify="center" alignItems="center" xs={12} className={ classes.cardContainer }>
          <Grid item xs={12} md={4} className={ classes.maxWidth300 }>
            <OnTimePie bins={scoreData.ontime} total={scoreData.total_arrivals_analyzed} selected={arrivalWindow}/>
          </Grid>
          <Grid item xs={12} md={4} className={ classes.maxWidth300 }>
            <Typography variant={this.props.width === 'xs'
                ? 'h3'
                : 'h2'} component="p" className={ classes.score }>
              {score}%
            </Typography>
          </Grid>
        </Grid>
      </Card>
    )
  }

}

export default withStyles(styles)(ScoreCard);
