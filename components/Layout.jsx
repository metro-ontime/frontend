import React, { Component } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Drawer,
} from '@material-ui/core';
import DirectionsTransitIcon from '@material-ui/icons/DirectionsTransit';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import InfoIcon from '@material-ui/icons/Info';
import HistoryIcon from '@material-ui/icons/History';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import Link from 'next/link';
import Nav from './Nav';
import { lines } from '~/helpers/LineInfo';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  drawer: {
    width: drawerWidth,
  },
  main: {
    paddingLeft: 10,
    paddingTop: 80,
    paddingRight: 15,
    minHeight: '100%',
  },
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  icon: {
    margin: theme.spacing.unit,
  },
  logo: {
    width: 45,
    height: 45,
  },
  logoText: {
    fontSize: '1.5em',
  },
  avatar: {
    width: 25,
    height: 25,
  },
});

class Layout extends Component {
  state = {
    subMenuOpen: false,
    drawerOpen: false,
  };

  handleSubMenu = () => {
    this.setState(state => ({ subMenuOpen: !state.subMenuOpen }));
  };

  handleDrawer = () => {
    this.setState(state => ({ drawerOpen: !state.drawerOpen }));
  };

  render() {
    const {
      classes,
      pageTitle,
      children,
      toolbarTitle,
      toolbarChildren,
      style,
    } = this.props;
    const { drawerOpen, subMenuOpen } = this.state;

    const links = (
      <List>
        {lines.map(line => (
          <Link
            prefetch
            href={{ pathname: '/line', query: { id: line.id } }}
            as={`/line/${line.id}`}
            key={line.id.toString()}
          >
            <ListItem button onClick={this.handleDrawer}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <div
                    style={{
                      backgroundColor: line.color,
                      width: '100%',
                      padding: 0,
                      height: '100%',
                      margin: 0,
                      borderRadius: '50%',
                      float: 'left',
                    }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${line.name}`} />
            </ListItem>
          </Link>
        ))}
      </List>
    );

    return (
      <div style={{ minHeight: '100%' }}>
        <Head>
          <title>
            RailStats LA |
            {pageTitle}
          </title>
        </Head>
        {' '}
        <Drawer variant="persistent" classes={{ paper: classes.drawer }} open={drawerOpen}>
          <List>
            <Link href="/">
              <ListItem onClick={this.handleDrawer} style={{ padding: '5px 8px 5px 16px', cursor: 'pointer' }}>
                <ListItemIcon>
                  <img src="/static/images/logo_network.svg" className={classes.logo} alt="Logo" />
                </ListItemIcon>
                <ListItemText primary="RailStats LA" classes={{ primary: classes.logoText }} />
              </ListItem>
            </Link>
            <Divider />
            {' '}
            <Link prefetch href="/">
              <ListItem button onClick={this.handleDrawer}>
                <LocationCityIcon className={classes.icon} style={{ marginLeft: 0 }} />
                <ListItemText inset primary="Network" />
              </ListItem>
            </Link>
            <ListItem button onClick={this.handleSubMenu}>
              <DirectionsTransitIcon className={classes.icon} style={{ marginLeft: 0 }} />
              <ListItemText inset primary="Lines" />
              {subMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
              {links}
            </Collapse>
            <Link prefetch href="/about">
              <ListItem button onClick={this.handleDrawer}>
                <InfoIcon className={classes.icon} style={{ marginLeft: 0 }} />
                <ListItemText inset primary="About" />
              </ListItem>
            </Link>
            <Link prefetch href="/history">
              <ListItem button onClick={this.handleDrawer}>
                <HistoryIcon className={classes.icon} style={{ marginLeft: 0 }} />
                <ListItemText inset primary="History" />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <Nav
          navClasses={classNames(classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
          pageTitle={toolbarTitle}
          handleMenuButton={this.handleDrawer}
        >
          {toolbarChildren}
        </Nav>
        <div
          className={classNames(classes.main, classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
          style={{ ...style }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default flowRight([withStyles(styles), withWidth()])(Layout);
