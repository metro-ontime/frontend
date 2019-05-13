import React, { Fragment} from 'react';
import {
  Typography,
  Card
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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
});

const WaitTimeScoreCard = (props) => {
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
    </Card>
  )
}

export default withStyles(styles)(WaitTimeScoreCard);
