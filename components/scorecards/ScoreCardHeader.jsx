import React from 'react';
import {
  CardHeader,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    backgroundColor: '#eee',
    height: '3em',
  },
  title: {
    fontSize: '1em',
    textAlign: 'center',
  },
});

const ScoreCardHeader = (props) => {
  const { title, classes } = props;
  return (
    <CardHeader classes={classes} title={title} />
  );
};

export default withStyles(styles)(ScoreCardHeader);
