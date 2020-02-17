import React, { Fragment } from 'react';
import {
  Typography,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  performer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
  },
  circle: {
    width: '25px',
    padding: 0,
    height: '25px',
    margin: 0,
    borderRadius: '25px',
    float: 'left',
  }
});

const Comparison = ({ classes, comparisons }) => {
  const list = comparisons.map(comparison => (
    <Grid key={comparison.title} item xs={12}>
      <Typography color="textPrimary" align="center">
        {comparison.title}
      </Typography>
      <div className={classes.performer}>
        <div
          className={classes.circle}
          style={{ backgroundColor: comparison.color }}
        />
        <Typography color="textSecondary" style={{ marginLeft: 10 }} component="h3">
          {comparison.text}
        </Typography>
      </div>
    </Grid>
  ));

  return (
    <Fragment>
      {list}
    </Fragment>
  );
};

export default withStyles(styles)(Comparison);
