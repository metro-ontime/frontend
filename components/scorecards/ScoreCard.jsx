import React, { Fragment} from 'react';
import {
  Typography,
  Card,
  CardMedia,
  Grid,
  Divider
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { linesById } from '~/helpers/LineInfo.js';
import Circle from '~/components/Circle';
import TooltipCustom from '~/components/TooltipCustom';
import ScoreCardHeader from '~/components/scorecards/ScoreCardHeader';

const styles = theme => ({
  root: {
    //padding: theme.spacing.unit * 2,
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    height: '100%'
  },
  iconPosition: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  performer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  container: {
    height: 'calc(100% - 3em)'
  },
  separator: {
    margin: 10
  }
});

const ScoreCard = (props) => {
  const { classes, headerText, title, tooltip, blockA, blockB, blockC } = props;
  return (
    <Card elevation={1} classes={classes}>
      <div className={ classes.iconPosition }>
        <TooltipCustom title={(<Fragment>
            <Typography color="inherit">{tooltip.header}</Typography>
            {tooltip.content}
          </Fragment>
        )}/>
      </div>
      <ScoreCardHeader title={headerText} />
      <Grid container justifyContent="center" alignItems="center" className={ classes.separator }>
        <Grid item xs={12} className={ classes.separator }>
          <Typography variant={props.width === 'xs'
            ? 'h3'
            : 'h2'} component="p" align="center">
          {title}
          </Typography>
          <Divider light variant="middle" className={ classes.separator } />
        </Grid>
        {blockA && (
          <Grid item xs={12}>
            <Typography color="textPrimary" gutterBottom>
              {blockA}
            </Typography>
          </Grid>
        )}
        {blockB && (
            <Grid item xs={12} className={ classes.separator }>
            <Divider light variant="middle" className={ classes.separator } />
            <Typography color="textPrimary" gutterBottom>
              {blockB}
            </Typography>
          </Grid>
        )}
        {blockC && (
            <Grid item xs={12} className={ classes.separator }>
            <Divider light variant="middle" className={ classes.separator } />
            <Typography color="textPrimary" gutterBottom>
              {blockC}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default withStyles(styles)(ScoreCard);
