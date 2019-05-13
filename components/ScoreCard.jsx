import React, { Fragment} from 'react';
import {
  Typography,
  Card
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TooltipCustom from '~/components/TooltipCustom';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
  },
  progress: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
  iconPosition: {
    position: 'absolute',
    top: 0,
    right: 0
  },
});

// ---Usage Guide---
// This is meant to be a placeholder card to quickly make a display. This accepts props in the 
// shape of:

// cardInfo = {
//   tooltip: {
//     title: "tool tip title",
//     content: "tool tip content"
//   },
//   body: {
//     title: "card title in large font",
//     content: "smaller subtitle"
//   }
// }
// this card matches the styling of WaitTimeScoreCard

const SimpleScoreCard = (props) => {
  const { classes, cardInfo } = props;
  return (
    <Card elevation={1} className={classes.paper}>
      <div className={ classes.iconPosition }>
        <TooltipCustom title={(<Fragment>
            <Typography color="inherit">{cardInfo.tooltip.Title}</Typography>
            {cardInfo.tooltip.Content}
          </Fragment>
        )}/>
      </div>
      <Typography variant={props.width === 'xs'
          ? 'h3'
          : 'h1'} component="p">
        {cardInfo.body.title}
      </Typography>
      <Typography component="p">
        {cardInfo.body.content}
      </Typography>
    </Card>
  )
}

export default withStyles(styles)(SimpleScoreCard);
