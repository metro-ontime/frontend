import React, { Component } from 'react';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

const styles = () => ({
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
  }
});

function Layout(props) {
  const {
    classes,
    width,
    pageTitle,
    children,
    toolbarTitle,
    toolbarChildren,
    style,
  } = props;
  return (
    <div style={{ minHeight: '100%' }}>
      <Head>
        <title>
          RailStats LA |
          {' '}
          {pageTitle}
        </title>
      </Head>
      <AppBar
        position="relative"
        classes={{ root: classes.appBar, colorPrimary: classes.appBarColor }}
      >
        <Toolbar className={classes.containAppBar}>
          <div className={classes.leftSideDrawer}>
            <Typography
              variant={width === 'xs' ? 'body1' : 'h5'}
              color="inherit"
            >
              {toolbarTitle}
            </Typography>
          </div>
          {toolbarChildren}
        </Toolbar>
      </AppBar>
      <div style={{ ...style }}>
        {children}
      </div>
    </div>
  )
}

export default flowRight([withStyles(styles), withWidth()])(Layout);
