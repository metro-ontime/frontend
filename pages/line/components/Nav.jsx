import React, { Component } from 'react';
import {
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Typography,
  Drawer,
} from '@material-ui/core';
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
  appBarColor: {
    backgroundColor: theme.palette.bw.dark,
  },
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
  state = {
    selectedTab: 0,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleTabChange = (event, newValue) => {
    this.setState(state => ({ selectedTab: newValue }));
  };

  render() {
    const { classes } = this.props;
    const selectedTab = this.state.selectedTab;
    return (
      <div>
        {' '}
        <AppBar
          position="fixed"
          classes={{ root: classes.appBar, colorPrimary: classes.appBarColor }}
        >
          <div className={classes.containAppBar}>
            <Typography variant="h5" classes={{ root: classes.centerVertically }} color="primary">
              {this.props.pageTitle}
            </Typography>
            <Tabs value={selectedTab} onChange={this.handleTabChange} textColor="primary">
              <Tab label="Stats" />
              <Tab label="Diagram" />
            </Tabs>
          </div>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
