import React, { Fragment } from 'react';
import {
  Typography,
  Grid,
} from '@material-ui/core';
import Circle from '~/components/Circle';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  performer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%'
  }
});

const Comparison = (props) => {
  const {
    classes, comparisons
  } = props;
  const list = comparisons.map((comparison, i) => {
    return(
      <Grid key={i} item xs={12}>
        <Typography color="textPrimary" align="center">
        {comparison.title}
        </Typography>
        <div className={classes.performer}>
          <Circle color={comparison.color} />
          <Typography color="textSecondary" style={{ marginLeft: 10 }} component="h3">
            {comparison.text}
          </Typography>
        </div>
      </Grid>
    );
  });

  return (
    <Fragment>
      {list}
    </Fragment>
  );
};

export default withStyles(styles)(Comparison);
