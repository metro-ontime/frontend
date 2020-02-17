import React, { Fragment } from 'react';
import {
  Typography,
  Grid,
  Divider,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import OnTimePie from '../charts/OnTimePie.jsx';
import { linesById } from '../../helpers/LineInfo.jsx';
import ScoreCard from './ScoreCard.jsx';
import Comparison from './Comparison.jsx';


const styles = () => ({
  separator: {
    margin: 10,
    width: '100%',
  },
});

const PerformanceScoreCard = ({
  classes, data, currentLine, arrivalWindow, width,
}) => {
  const showComparison = currentLine === 'All';
  const score = Math.round(
    data.ontime[arrivalWindow] / data.total_arrivals_analyzed * 1000,
  ) / 10;
  const percentAnalyzed = Math.round(
    1000 * data.total_arrivals_analyzed
    / data.total_scheduled_arrivals,
  )
  / 10;
  const tooltip = {
    title: 'Performance Score',
    content: `This figure is based on ${data.total_arrivals_analyzed} train arrivals estimated so far out of ${data.total_scheduled_arrivals} scheduled for today (${ percentAnalyzed } %). It includes trains both running ahead and behind schedule (early and late).`
  };

  const title = 'On-Time Performance';
  const mostReliable = showComparison
    ? {
      title: 'Most Reliable',
      color: linesById[data.most_reliable[arrivalWindow].line.slice(0, 3)].color,
      text: (
        <Fragment>
          {linesById[data.most_reliable[arrivalWindow].line.slice(0, 3)].name}
          {' Line '}
          {(data.most_reliable[arrivalWindow].percent_ontime * 100).toFixed(1)}
          {'% on-time'}
        </Fragment>
      ),
    }
    : null;

  const leastReliable = showComparison
    ? {
      title: 'Least Reliable',
      color: linesById[data.least_reliable[arrivalWindow].line.slice(0, 3)].color,
      text: (
        <Fragment>
          {linesById[data.least_reliable[arrivalWindow].line.slice(0, 3)].name}
          {' Line '}
          {(data.least_reliable[arrivalWindow].percent_ontime * 100).toFixed(1)}
          {'% on-time'}
        </Fragment>
      ),
    }
    : null;

  const content = (
    <Grid container item justify="center" alignItems="center" xs={12}>
      <Grid item xs={6} md={4}>
        <OnTimePie
          bins={data.ontime}
          total={data.total_arrivals_analyzed}
          selected={arrivalWindow}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="h1"
          component="p"
          align="center"
        >
          {score}
          %
        </Typography>
      </Grid>
      <Divider light variant="middle" className={classes.separator} />
      {showComparison && <Comparison comparisons={[mostReliable, leastReliable]} />}
    </Grid>
  );

  return (
    <ScoreCard tooltip={tooltip} title={title} content={content} />
  );
};

export default withStyles(styles)(PerformanceScoreCard);
