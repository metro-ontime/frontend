import React, { Component } from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  drawer: {
    width: drawerWidth,
  },
  mainContent: {
    paddingLeft: drawerWidth + 10,
    paddingTop: 74,
  },
  appBar: {
    paddingLeft: drawerWidth,
    justifyContent: 'space-between',
  },
  appBarColor: {},
  centerVertically: {
    margin: 'auto 0',
  },
  containAppBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    margin: theme.spacing.unit,
  },
  logo: {
    width: 45,
    height: 45,
  },
});

class Layout extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        {' '}
        <AppBar
          position="fixed"
          classes={{ root: classes.appBar, colorPrimary: classes.appBarColor }}
        >
          <Toolbar className={classes.containAppBar}>
            <Typography variant="h5" classes={{ root: classes.centerVertically }} color="inherit">
              {this.props.pageTitle}
            </Typography>
            {this.props.children}
          </Toolbar>
        </AppBar>
        {' '}
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
