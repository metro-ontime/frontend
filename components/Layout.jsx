import React, { Component } from 'react';
import { Button, Typography, Drawer } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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
  }
});

const lines = [801, 802, 803, 804, 805, 806];

class Layout extends Component {
  render() {
    const { classes } = this.props;

    const links = (
      <div>
        {lines.map((i) => (
          <Link href={`/line/${i}`} key={i.toString()}>
              <Button>
                <Typography variant="h4">Line {i}</Typography>
              </Button>
            </Link>
        ))}
      </div>
    )

    return <div>
      <Drawer
        variant="permanent"
        classes={{ paper: classes.drawer }}>
        { links }
      </Drawer>
      <div className={ classes.mainContent }>
        { this.props.children }
      </div>
    </div>
  }
}

export default withStyles(styles)(Layout);

