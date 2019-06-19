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
import Comparison from './Comparison';


const styles = theme => ({
  separator: {
    margin: 10,
    width: '100%'
  }
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

  const mostReliable = {
    title: 'Most Reliable',
    color: linesById[scoreData.most_reliable[arrivalWindow].line.slice(0, 3)].color,
    text: (
      <Fragment>
        {linesById[scoreData.most_reliable[arrivalWindow].line.slice(0, 3)].name}
        {' Line '}
        {(scoreData.most_reliable[arrivalWindow].percent_ontime * 100).toFixed(1)}
        {'% on-time'}
      </Fragment>
    )
  };

  const leastReliable = {
    title: 'Least Reliable',
    color: linesById[scoreData.least_reliable[arrivalWindow].line.slice(0, 3)].color,
    text: (
      <Fragment>
        {linesById[scoreData.least_reliable[arrivalWindow].line.slice(0, 3)].name}
        {' Line '}
        {(scoreData.least_reliable[arrivalWindow].percent_ontime * 100).toFixed(1)}
        {'% on-time'}
      </Fragment>
    )
  };

  const content = (
    <Grid container item justify="center" alignItems="center" xs={12} >
      <Grid item xs={6} md={4} >
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
      <Comparison comparisons={[mostReliable, leastReliable]} />
    </Grid>
  );

  return (
    <ScoreCard tooltip={tooltip} title={title} content={content} />
  );
};

export default withStyles(styles)(PerformanceScoreCard);
