import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CircularProgress variant="indeterminate" color="secondary" />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
