import React, { Fragment} from 'react';
import {
  Typography,
  Card
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { linesById } from '~/helpers/LineInfo.js';
import Circle from '~/components/Circle';
import TooltipCustom from '~/components/TooltipCustom';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
  },
  progress: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
  iconPosition: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  performWrapper: {
    marginTop: 10
  },
  performer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const SimpleScoreCard = (props) => {
  const { data, classes } = props;
  return (
    <Card elevation={1} className={classes.paper}>
      <div className={ classes.iconPosition }>
        <TooltipCustom title={(<Fragment>
            <Typography color="inherit">Average Wait Time</Typography>
            This is an average over all stop intervals measured for the day so far. Obviously, this interval should be split by time of day since trains run more frequently during peak times. Feature coming soon!
          </Fragment>
        )}/>
      </div>
      <Typography variant={props.width === 'xs'
          ? 'h3'
          : 'h1'} component="p">
        {Math.round(data.mean_time_between / 60)}

      </Typography>
      <Typography component="p">
        minutes between trains on average
      </Typography>
      {data.best_line && (
        <div className={classes.performWrapper}>
          <Typography color="textPrimary" gutterBottom>
            Top Performer
          </Typography>
          <div className={classes.performer}>
            <Circle color={linesById[data.best_line.name].color} />
            <Typography color="textSecondary" style={{ marginLeft: 10 }} component="h3">
              {linesById[data.best_line.name].name}
              {' Line every '}
              {Math.round(data.best_line.mean_time_between / 60)}
              { 'minutes'}
            </Typography>
          </div>
        </div>
      )}
      {data.worst_line && (
        <div className={classes.performWrapper}>
          <Typography color="textPrimary" gutterBottom>
            Worst Performer
          </Typography>
          <div className={classes.performer}>
            <Circle color={linesById[data.worst_line.name].color} />
            <Typography color="textSecondary" style={{ marginLeft: 10 }} component="h3">
              {linesById[data.worst_line.name].name}
              {' Line every '}
              {Math.round(data.worst_line.mean_time_between / 60)}
              {' minutes'}
            </Typography>
          </div>
        </div>
      )}
    </Card>
  );
};

export default withStyles(styles)(SimpleScoreCard);
