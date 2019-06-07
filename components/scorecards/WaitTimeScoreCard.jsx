import React, { Fragment } from 'react';
import {
  Typography,
  Card,
  Grid,
  Divider,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { linesById, linesByName } from '~/helpers/LineInfo';
import Circle from '~/components/Circle';
import TooltipCustom from '~/components/TooltipCustom';
import ScoreCardHeader from '~/components/scorecards/ScoreCardHeader';

const styles = theme => ({
  root: {
    // padding: theme.spacing.unit * 2,
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    height: '100%',
  },
  iconPosition: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  performer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  container: {
    height: 'calc(100% - 3em)',
  },
  separator: {
    margin: 10,
  },
});

const WaitTimeScoreCard = (props) => {
  const {
    classes, data, currentLine, formattedLineData, width,
  } = props;
  const lineId = linesByName[currentLine];
  const waitData = lineId && lineId.id
    ? formattedLineData[formattedLineData.length - 1][`${lineId.id}_lametro-rail`]
    : data;
  return (
    <Card elevation={1} classes={classes}>
      <div className={classes.iconPosition}>
        <TooltipCustom title={(
          <Fragment>
            <Typography color="inherit">Average Wait Time</Typography>
            This is an average over all stop intervals measured for the day so far. Obviously, this interval should be split by time of day since trains run more frequently during peak times. Feature coming soon!
          </Fragment>
        )}
        />
      </div>
      <ScoreCardHeader title="Average Wait Time" />
      <Grid container justifyContent="center" alignItems="center" className={classes.separator}>
        <Grid item xs={6}>
          <img
            src="/static/images/waiting.svg"
            alt="waiting"
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
            {Math.round(waitData.mean_time_between / 60)}
          </Typography>
          <Typography variant="h5" align="center">
            minutes
          </Typography>
        </Grid>
        {waitData.most_frequent && (
          <Grid item xs={12}>
            <Divider light variant="middle" className={classes.separator} />
            <Typography color="textPrimary" gutterBottom>
              Most Frequent
            </Typography>
            <div className={classes.performer}>
              <Circle color={linesById[waitData.most_frequent.name].color} />
              <Typography color="textSecondary" style={{ marginLeft: 10 }} component="h3">
                {linesById[waitData.most_frequent.name].name}
                {' Line every '}
                {Math.round(waitData.most_frequent.mean_time_between / 60)}
                {' minutes'}
              </Typography>
            </div>
          </Grid>
        )}
        {waitData.least_frequent && (
          <Grid item xs={12}>
            <Typography color="textPrimary" gutterBottom>
              Least Frequent
            </Typography>
            <div className={classes.performer}>
              <Circle color={linesById[waitData.least_frequent.name].color} />
              <Typography color="textSecondary" style={{ marginLeft: 10 }} component="h3">
                {linesById[waitData.least_frequent.name].name}
                {' Line every '}
                {Math.round(waitData.least_frequent.mean_time_between / 60)}
                {' minutes'}
              </Typography>
            </div>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default withStyles(styles)(WaitTimeScoreCard);
