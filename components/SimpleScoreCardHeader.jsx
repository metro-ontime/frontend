import React, { Fragment} from 'react';
import {
  Typography,
  CardHeader
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    backgroundColor: '#eee',
    height: '3em'
  },
  title: {
    fontSize: '1em',
    textAlign: 'center'
  }
});

const SimpleScoreCardHeader = (props) => {
  const { title, classes } = props;
  return (
    <CardHeader classes={ classes } title={ title }>
    </CardHeader>
  )
}

export default withStyles(styles)(SimpleScoreCardHeader);

