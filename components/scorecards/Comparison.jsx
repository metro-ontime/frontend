import React from 'react';
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
  }
});

const Comparison = (props) => {
  const {
    classes, comparisons
  } = props;
  const structure = function(obj) {
    return(
      <Grid item xs={12}>
        <Typography color="textPrimary" align="center">
        {obj.title}
        </Typography>
        <div className={classes.performer}>
        <Circle color={obj.color} />
        <Typography color="textSecondary" style={{ marginLeft: 10 }} component="h3">
          {obj.text}
        </Typography>
        </div>
      </Grid>
    );
  };

  const list = comparisons.map(comparison => structure(comparison))
  
  return (
    <div>
      {list}
    </div>
  );
};

export default withStyles(Comparison);