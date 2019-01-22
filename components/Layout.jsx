import React, { Component } from 'react';
import { AppBar, Toolbar, Collapse, List, ListItem, ListItemIcon, Icon, ListItemText, Typography, Drawer } from '@material-ui/core';
import DirectionsTransitIcon from '@material-ui/icons/DirectionsTransit';
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
    width: drawerWidth
  },
  mainContent: {
    paddingLeft: drawerWidth
  },
  appBar: {
    paddingLeft: drawerWidth,
  },
  appBarColor: {
    backgroundColor: theme.palette.bw.light
  },
  icon: {
    margin: theme.spacing.unit
  },
  logo: {
    display: 'inline',
    width: 45,
    padding: 5
  }
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
		open: false
	}

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    const links = (
      <List>
        {lines.map((line) => (
          <Link href={`/line/${line.id}`} key={line.id.toString()}>
            <ListItem button>
              <ListItemText primary={`${line.name}`} />
            </ListItem>
          </Link>
        ))}
      </List>
    )

    return <div>
      <AppBar position="static" classes={{ root: classes.appBar, colorPrimary: classes.appBarColor }}>
        <Toolbar>
          <img src="/static/images/mot-logo.svg" className={ classes.logo }/>
          <Typography variant="h5">LA Metro Performance</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{ paper: classes.drawer }}>
				<List>
          <ListItem>
            <ListItemText primary="Metro Monitor" />
          </ListItem>
					<ListItem button onClick={this.handleClick}>
            <DirectionsTransitIcon className={classes.icon} />
						<ListItemText inset primary="Lines" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
					<Collapse in={this.state.open} timeout="auto" unmountOnExit>
						{ links }
					</Collapse>
				</List>
      </Drawer>
      <div className={ classes.mainContent }>
        { this.props.children }
      </div>
    </div>
  }
}

export default withStyles(styles)(Layout);

