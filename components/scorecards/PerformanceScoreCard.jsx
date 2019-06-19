import React, { Fragment } from 'react';
import {
  Typography,
  Grid,
  Divider,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TooltipCustom from '~/components/TooltipCustom';
import OnTimePie from '~/components/charts/OnTimePie';
import Circle from '~/components/Circle';
import { linesByName, linesById } from '~/helpers/LineInfo';
import ScoreCard from './ScoreCard';


const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  card: {
    position: 'relative',
    padding: 0,
    height: '100%',
  },
  description: {
    textAlign: 'center',
    marginTop: '1em',
  },
  spacer: {
    margin: '2em 0',
  },
  maxWidth150: {
    maxWidth: 150,
  },
  cardContainer: {
    height: 'calc(100% - 3em)',
  },
});

const PerformanceScoreCard = (props) => {
  const {
    classes, data, currentLine, arrivalWindow, formattedLineData, width,
  } = props;
  const lineId = linesByName[currentLine];
  const scoreData = lineId && lineId.id
    ? formattedLineData[formattedLineData.length - 1][`${lineId.id}_lametro-rail`]
    : data;
  const score = Math.round(
    scoreData.ontime[arrivalWindow] / scoreData.total_arrivals_analyzed * 1000,
  ) / 10;
  const percentAnalyzed = Math.round(
    1000 * scoreData.total_arrivals_analyzed
    / scoreData.total_scheduled_arrivals,
  )
  / 10;
  const tooltip = (
    <TooltipCustom title={(
      <Fragment>
        <Typography color="inherit">Performance Score</Typography>
        This figure is based on
        {' '}
        {scoreData.total_arrivals_analyzed}
        {' '}
        train arrivals estimated so far out of
        {' '}
        {scoreData.total_scheduled_arrivals}
        {' '}
        scheduled for today (
        { percentAnalyzed }
        %). It includes trains both running ahead and behind schedule (early and late).
      </Fragment>
      )}
    />
  );
  const title = 'On-Time Performance';
  const content = (
    <Grid container item justify="center" alignItems="center" xs={12} className={classes.cardContainer}>
      <Grid item xs={6} className={classes.maxWidth150}>
        <OnTimePie
          bins={scoreData.ontime}
          total={scoreData.total_arrivals_analyzed}
          selected={arrivalWindow}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant={width === 'xs'
            ? 'h3'
            : 'h2'}
          component="p"
          align="center"
        >
          {score}
          %
        </Typography>
      </Grid>
      <Divider light variant="middle" className={classes.separator} />
      {scoreData.most_reliable && scoreData.least_reliable && (
        <Grid item xs={12}>
          <Typography color="textPrimary" align="center">
            Most Reliable
          </Typography>
          <div className={classes.performer}>
            <Circle
              color={linesById[scoreData.most_reliable[arrivalWindow].line.slice(0, 3)].color}
            />
            <Typography color="textSecondary" style={{ marginLeft: 10 }} component="h3">
              {linesById[scoreData.most_reliable[arrivalWindow].line.slice(0, 3)].name}
              {' Line '}
              {(scoreData.most_reliable[arrivalWindow].percent_ontime * 100).toFixed(1)}
              {'% on-time'}
            </Typography>
          </div>
          <Typography color="textPrimary" align="center">
            Least Reliable
          </Typography>
          <div className={classes.performer}>
            <Circle
              color={linesById[scoreData.least_reliable[arrivalWindow].line.slice(0, 3)].color}
            />
            <Typography color="textSecondary" style={{ marginLeft: 10 }} component="h3">
              {linesById[scoreData.least_reliable[arrivalWindow].line.slice(0, 3)].name}
              {' Line '}
              {(scoreData.least_reliable[arrivalWindow].percent_ontime * 100).toFixed(1)}
              {'% on-time'}
            </Typography>
          </div>
        </Grid>
      )}
    </Grid>
  );

  return (
    <ScoreCard tooltip={tooltip} title={title} content={content} />
  );
};

export default withStyles(styles)(PerformanceScoreCard);
