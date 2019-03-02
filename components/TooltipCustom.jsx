import React from 'react';
import {
  Tooltip,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
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
      fontWeight: theme.typography.fontWeightMedium
    }
  }
});

const TooltipCustom = (props) => {
  const defaultIcon = (
    <IconButton aria-label="Delete">
      <InfoIcon/>
    </IconButton>
  );
  const { classes } = props;
  return (
    <Tooltip classes={{
        tooltip: classes.htmlTooltip
      }} title={ props.title } enterTouchDelay={0} leaveTouchDelay={2000}>
      { props.children ? props.children : defaultIcon }
    </Tooltip>
  )
}

export default withStyles(styles)(TooltipCustom);
