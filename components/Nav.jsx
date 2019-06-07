import React, { Component } from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';


const styles = () => ({
  menuButton: {
    marginLeft: 0,
    marginRight: 20,
  },
  appBar: {
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
  leftSideDrawer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const Nav = (props) => {
  const {
    classes,
    pageTitle,
    navClasses,
    width,
    children,
    handleMenuButton
  } = props;
  return (
    <AppBar
      position="fixed"
      classes={{ root: classes.appBar, colorPrimary: classes.appBarColor }}
    >
      <Toolbar className={classNames(classes.containAppBar, navClasses)}>
        <div className={classes.leftSideDrawer}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleMenuButton}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant={width === 'xs' ? 'body1' : 'h5'} color="inherit">
            {pageTitle}
          </Typography>
        </div>
        {children}
      </Toolbar>
    </AppBar>
  );
}

export default flowRight([withStyles(styles), withWidth()])(Nav);
