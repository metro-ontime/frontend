import React, { Fragment } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import { linesById } from '~/helpers/LineInfo.js';
import TooltipCustom from '~/components/TooltipCustom';

const styles = theme => ({
  card: {
    display: 'flex',
    position: 'relative',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 0,
    padding: 0,
    paddingTop: 50,
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      margin: 10,
      padding: 10
    }
  },
  cardContent: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      margin: 0
    }
  },
  logo: {
    padding: '0!important',
    margin: '0!important',
    width: 85,
    height: 85,
    [theme.breakpoints.up('sm')]: {
      width: 150,
      height: 150,
    },
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
  const { classes, timestamp, line, date } = props;
  let defaultText = "";
  if (line === 'All') {
    defaultText = date === 'Yesterday' ?
      'How reliable was the LA Metro Network yesterday?' :
      'How reliable is the LA Metro Network today?'
  } else if (date === 'Today') {
    defaultText = `How reliable is the ${line} Line today?`
  } else if (date === 'Yesterday') {
    defaultText = `How reliable was the ${line} Line yesterday?`
  }
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
      <CardContent className={ classes.cardContent }>
        <Typography variant={ props.width == 'xs' ? 'h6' : 'h4' } className={ classes.title }>
          { props.altText ? props.altText : defaultText }
        </Typography>
        <Typography component="p" variant="body2" className={ classes.updateTime }>
          <b>Data from: </b>
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

export default flowRight([withStyles(styles), withWidth()])(LogoAndTitle);
