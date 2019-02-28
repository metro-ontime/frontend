import React, { Fragment } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Moment from 'react-moment';
import { linesById } from '~/helpers/LineInfo.js';
import TooltipCustom from '~/components/TooltipCustom';

const styles = theme => ({
  card: {
    display: 'flex',
    position: 'relative',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 20
  },
  logo: {
    padding: '0!important',
    margin: '0!important',
    width: 150,
    height: 150,
    marginRight: 25
  },
  title: {
    fontWeight: 500
  },
  updateTime: {
    marginTop: '1em'
  },
  iconPosition: {
    position: 'absolute',
    top: 0,
    right: 0
  }
});

const LogoAndTitle = (props) => {
  const { classes, timestamp, line } = props;
  let defaultText = "";
  if (line) {
    defaultText = `How reliable is the ${linesById[line]["name"]} Line today?`
  };
  return (
    <Card elevation={0} className={ classes.card }>
      <div className={ classes.iconPosition }>
        <TooltipCustom title={(<Fragment>
            <Typography color="inherit">Update Timing</Typography>
            Latest statistics are provided roughly every 30 minutes.
          </Fragment>)}>
        </TooltipCustom>
      </div>
      <CardMedia component="img" className={classes.logo} src={ props.altImg ? props.altImg : `/static/images/logo_${props.line}.svg`}/>
      <CardContent>
        <Typography variant="h5" className={ classes.title }>
          { props.altText ? props.altText : defaultText }
        </Typography>
        <Typography component="p" variant="body2" className={ classes.updateTime }>
          <b>Latest Update: </b>
          {
            timestamp
              ? <Moment format="D MMMM YYYY, h:mma" tz="America/Los_Angeles">{timestamp}</Moment>
              : <span>---</span>
          }
        </Typography>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(LogoAndTitle);
