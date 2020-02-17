import React from 'react';
import {
  Card,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ScoreCardHeader from './ScoreCardHeader.jsx';

const styles = theme => ({
  root: {
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    width: '100%',
    margin: 0,
  },
  content: {
    padding: 10,
  },
});

const ScoreCard = (props) => {
  const {
    classes, title, tooltip, content,
  } = props;
  return (
    <Card elevation={1} classes={{ root: classes.root }}>
      <ScoreCardHeader title={title} tooltip={tooltip} />
      <Grid container className={classes.content}>
        {content}
      </Grid>
    </Card>
  );
};

export default withStyles(styles)(ScoreCard);
