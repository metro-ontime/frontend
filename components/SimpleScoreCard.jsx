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
    color: theme.palette.text.secondary
  },
  progress: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  }
});

const SimpleScoreCard = (props) => {
  const { data, classes } = props;
  return (
    <Card elevation={1} className={classes.paper}>
      {
        data.mean_time_between
          ? <Fragment>

                <Typography variant={props.width === 'xs'
                    ? 'h3'
                    : 'h1'} component="p">
                  {Math.round(data.mean_time_between / 60)}

                </Typography>

                <Typography component="p">minutes between trains on average
                  <TooltipCustom classes={{
                    tooltip: classes.htmlTooltip
                  }} title={(<Fragment>
                    <Typography color="inherit">Average Wait Time</Typography>
                    This is an average over all stop intervals measured for the day so far. Obviously, this interval should be split by time of day since trains run more frequently during peak times. Feature coming soon!
                  </Fragment>)} />
              </Typography>
            </Fragment>
          : <h3><CircularIndeterminate className={classes.progress}/></h3>
      }
    </Card>
  )
}

export default withStyles(styles)(SimpleScoreCard);
