import React, { Component, Fragment } from 'react';
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
  Typography,
  Drawer,
} from '@material-ui/core';
import DirectionsTransitIcon from '@material-ui/icons/DirectionsTransit';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import InfoIcon from '@material-ui/icons/Info';
import PlaceIcon from '@material-ui/icons/Place';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import SvgIcon from '@material-ui/core/SvgIcon';
import Link from 'next/link';
import Nav from './Nav';
import { lines } from '../helpers/LineInfo.js';

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
  }
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
    const { classes } = this.props;
    const selectedTab = this.state.selectedTab;

    const links = (
      <List>
        {lines.map(line => (
          <Link href={`/line/${line.id}`} key={line.id.toString()}>
            <ListItem button>
              <ListItemAvatar>
                <div
                  style={{
                    backgroundColor: line.color,
                    width: '25px',
                    padding: 0,
                    height: '25px',
                    margin: 0,
                    borderRadius: '25px',
                    float: 'left',
                  }}
                />
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
          <title>RailStats LA | {this.props.pageTitle}</title>
        </Head>
        {' '}
        <Drawer variant="persistent" classes={{ paper: classes.drawer }} open={this.state.drawerOpen}>
          <List>
            <Link href="/">
              <a style={{ textDecoration: 'none' }}>
                <ListItem style={{ padding: '5px 16px' }}>
                  <ListItemIcon>
                    <img src="/static/images/network-color.svg" className={classes.logo} alt="Logo" />
                  </ListItemIcon>
                  <ListItemText primary="RailStats LA" classes={{ primary: classes.logoText }}/>
                </ListItem>
              </a>
            </Link>
            <Divider />
            {' '}
            <Link href="/">
              <ListItem button>
                <LocationCityIcon className={classes.icon} style={{ marginLeft: 0 }} />
                <ListItemText inset primary="Network" />
              </ListItem>
            </Link>
            <ListItem button onClick={this.handleSubMenu}>
              <DirectionsTransitIcon className={classes.icon} style={{ marginLeft: 0 }} />
              <ListItemText inset primary="Lines" />
              {this.state.subMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.subMenuOpen} timeout="auto" unmountOnExit>
              {links}
            </Collapse>
            <Link href="/about">
              <ListItem button>
                <InfoIcon className={classes.icon} style={{ marginLeft: 0 }} />
                <ListItemText inset primary="About" />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <Nav navClasses={classNames(classes.content, { [classes.contentShift]: this.state.drawerOpen, })} pageTitle={this.props.toolbarTitle} handleMenuButton={this.handleDrawer}>
          {this.props.toolbarChildren}
        </Nav>
        <div className={classNames(classes.main, classes.content, { [classes.contentShift]: this.state.drawerOpen, })} style={{ ...this.props.style }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default flowRight([withStyles(styles), withWidth()])(Layout);
