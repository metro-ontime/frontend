import React, { Fragment } from 'react';
import {
  Typography,
  Grid,
  Divider,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { linesById } from '../../helpers/LineInfo.jsx';
import ScoreCard from './ScoreCard.jsx';
import Comparison from './Comparison.jsx';

const styles = () => ({
  separator: {
    margin: '10px 0',
    width: '100%',
  },
});

const WaitTimeScoreCard = ({
  classes,
  data,
  currentLine,
  width,
}) => {
  const showComparison = currentLine === 'All';

  const tooltip = {
    title: 'Average Wait Time',
    content: 'This is an average over all stop intervals measured for the day so far. Obviously, this interval should be split by time of day since trains run more frequently during peak times. Feature coming soon!'
  };

  const title = 'Average Wait Time';

  const mostFrequent = showComparison
    ? {
      title: 'Most Frequent',
      color: linesById[data.most_frequent.name].color,
      text: (
        <Fragment>
          {linesById[data.most_frequent.name].name}
          {' Line every '}
          {Math.round(data.most_frequent.mean_time_between / 60)}
          {' minutes'}
        </Fragment>
      )
    }
    : null;

  const leastFrequent = showComparison
    ? {
      title: 'Least Frequent',
      color: linesById[data.least_frequent.name].color,
      text: (
        <Fragment>
          {linesById[data.least_frequent.name].name}
          {' Line every '}
          {Math.round(data.least_frequent.mean_time_between / 60)}
          {' minutes'}
        </Fragment>
      )
    }
    : null;

  const content = (
    <Fragment>
      <Grid item xs={6}>
        <img
          alt="waiting"
          src="/public/images/waiting.svg"
        />
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant={width === 'xs'
            ? 'h3'
            : 'h1'}
          component="p"
          align="center"
        >
          {Math.round(data.mean_time_between / 60)}
        </Typography>
        <Typography variant="body1" align="center">
          minutes
        </Typography>
      </Grid>
      <Divider light variant="middle" className={classes.separator} />
      {showComparison && <Comparison comparisons={[mostFrequent, leastFrequent]} />}
    </Fragment>
  );

  return <ScoreCard title={title} content={content} tooltip={tooltip} />;
};

export default withStyles(styles)(WaitTimeScoreCard);
