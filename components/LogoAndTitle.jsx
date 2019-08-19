import React, { Fragment } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import Moment from 'react-moment';
import 'moment-timezone';
import TooltipCustom from '~/components/TooltipCustom';
import { linesByName } from '~/helpers/LineInfo';

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
      padding: 10,
    },
  },
  cardContent: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      margin: 0,
    },
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
    marginRight: 25,
  },
  title: {
    fontWeight: 500,
  },
  updateTime: {
    marginTop: '1em',
  },
  iconPosition: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

const LogoAndTitle = (props) => {
  const {
    classes, timestamp, line, date, altImg, width, altText,
  } = props;
  let defaultText = '';
  if (line === 'All') {
    defaultText = 'LA Metro Rail - Network Performance'
  } else {
    defaultText = `LA Metro Rail - ${line} Line Performance`;
  }
  return (
    <Card elevation={0} className={classes.card}>
      <div className={classes.iconPosition}>
        <TooltipCustom title="Update Timing" content="Latest statistics are provided roughly every 30 minutes." />
      </div>
      <CardMedia component="img" className={classes.logo} src={linesByName[line] ? `/static/images/logo_${linesByName[line].id}.svg` : altImg } />
      <CardContent className={classes.cardContent}>
        <Typography variant={width === 'xs' ? 'h6' : 'h4'} className={classes.title}>
          { altText || defaultText }
        </Typography>
        <Typography component="p" variant="body2" className={classes.updateTime}>
          Rail performance on the selected date was last updated at
          {' '}
          {
            timestamp
              ? <Moment format="D MMMM YYYY, h:mma" tz="America/Los_Angeles">{timestamp}</Moment>
              : <span>---</span>
          }
        </Typography>
      </CardContent>
    </Card>
  );
};

export default flowRight([withStyles(styles), withWidth()])(LogoAndTitle);
