import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import { linesById } from '~/helpers/LineInfo.js';

const styles = theme => ({
  card: {
    display: 'flex',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40
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
  }
});

const LogoAndTitle = (props) => {
  const { classes } = props;
  return (
    <Card elevation={0} className={ classes.card }>
      <CardMedia component="img" className={classes.logo} src={`/static/images/logo_${props.line}.svg`}/>
      <CardContent>
        <Typography variant="h5" className={ classes.title }>
          How dependable is the LA Metro { linesById[props.line]["name"] } Line today?
        </Typography>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(LogoAndTitle);
