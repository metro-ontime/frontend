import React, { Component } from 'react';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
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
import SvgIcon from '@material-ui/core/SvgIcon';
import Link from 'next/link';

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
    paddingTop: 80,
    paddingRight: 15,
    minHeight: '100%',
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

const lines = [
  { name: 'Blue', id: 801 },
  { name: 'Red', id: 802 },
  { name: 'Green', id: 803 },
  { name: 'Gold', id: 804 },
  { name: 'Purple', id: 805 },
  { name: 'Expo', id: 806 },
];

class Layout extends Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;
    const selectedTab = this.state.selectedTab;

    const links = (
      <List>
        {lines.map(line => (
          <Link href={`/line/${line.id}`} key={line.id.toString()}>
            <ListItem button>
              <ListItemText primary={`${line.name}`} />
            </ListItem>
          </Link>
        ))}
      </List>
    );

    return (
      <div style={{ minHeight: '100%' }}>
        <Drawer variant="permanent" classes={{ paper: classes.drawer }}>
          <List>
            <Link href="/">
              <a style={{ textDecoration: 'none' }}>
                <ListItem style={{ padding: '5px 16px' }}>
                  <ListItemIcon>
                    <img src="/static/images/mot-logo.svg" className={classes.logo} alt="Logo" />
                  </ListItemIcon>
                  <ListItemText primary="LA Metro Monitor" />
                </ListItem>
              </a>
            </Link>
            <Divider />
            {' '}
            <ListItem button>
              <LocationCityIcon className={classes.icon} style={{ marginLeft: 0 }} />
              <ListItemText inset primary="Network" />
            </ListItem>
            <ListItem button onClick={this.handleClick}>
              <DirectionsTransitIcon className={classes.icon} style={{ marginLeft: 0 }} />
              <ListItemText inset primary="Lines" />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              {links}
            </Collapse>
            <ListItem button>
              <PlaceIcon className={classes.icon} style={{ marginLeft: 0 }} />
              <ListItemText inset primary="Stations" />
            </ListItem>
            <ListItem button>
              <InfoIcon className={classes.icon} style={{ marginLeft: 0 }} />
              <ListItemText inset primary="About" />
            </ListItem>
          </List>
        </Drawer>
        <div className={classes.mainContent} style={{ ...this.props.style }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
