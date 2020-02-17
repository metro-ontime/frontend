import React, { Fragment } from 'react';
import {
  Tooltip,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  htmlTooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    '& b': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
});

const TooltipCustom = (props) => {
  const defaultIcon = (
    <IconButton aria-label="Delete">
      <InfoIcon />
    </IconButton>
  );
  const {
    classes, title, content, children,
  } = props;
  return (
    <Tooltip
      classes={{
        tooltip: classes.htmlTooltip,
      }}
      title={(
        <Fragment>
          <Typography color="inherit">{ title }</Typography>
          { content }
        </Fragment>
      )}
      enterTouchDelay={0}
      leaveTouchDelay={2000}
    >
      { children || defaultIcon }
    </Tooltip>
  );
};

export default withStyles(styles)(TooltipCustom);
