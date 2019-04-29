import React, { Fragment} from 'react';
import {
  Typography,
  Card,
  CardMedia,
  Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TooltipCustom from '~/components/TooltipCustom';
import SimpleScoreCardHeader from '~/components/SimpleScoreCardHeader';

const styles = theme => ({
  root: {
    //padding: theme.spacing.unit * 2,
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    height: '100%'
  },
  iconPosition: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  container: {
    height: 'calc(100% - 3em)'
  }
});

const SimpleScoreCard = (props) => {
  const { data, classes } = props;
  return (
    <Card elevation={1} classes={classes}>
      <div className={ classes.iconPosition }>
        <TooltipCustom title={(<Fragment>
            <Typography color="inherit">Average Wait Time</Typography>
            This is an average over all stop intervals measured for the day so far. Obviously, this interval should be split by time of day since trains run more frequently during peak times. Feature coming soon!
          </Fragment>
        )}/>
      </div>
      <SimpleScoreCardHeader title="Average Wait Time" />
      <Grid container justifyContent="center" alignItems="center" classes={classes}>
        <Grid item xs={6}>
          <img
            src="/static/images/waiting.svg"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant={props.width === 'xs'
          ? 'h3'
          : 'h1'} component="p" align="center">
        {Math.round(data.mean_time_between / 60)}

      </Typography>
      <Typography variant="h5" align="center">
        minutes
      </Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default withStyles(styles)(SimpleScoreCard);
