import React from 'react';
import {
  Card,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ScoreCardHeader from '~/components/scorecards/ScoreCardHeader';

const styles = theme => ({
  root: {
    // padding: theme.spacing.unit * 2,
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
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

const ScoreCard = (props) => {
  const {
    classes, title, tooltip, content,
  } = props;
  return (
    <Card elevation={1} classes={classes}>
      <div className={classes.iconPosition}>
        { tooltip }
      </div>
      <ScoreCardHeader title={title} />
      <Grid container justifyContent="center" alignItems="center" className={classes.separator}>
        {content}
      </Grid>
    </Card>
  );
};

export default withStyles(styles)(ScoreCard);
