import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';

class SimpleMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      anchorEl: null,
      chosen: props.menuItems[0],
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (item) => {
    this.setState({ anchorEl: null, chosen: item });
  };

  render() {
    const { anchorEl } = this.state;
    const menuItems = this.props.menuItems.map((item) => {
      return <MenuItem onClick={() => this.handleClose(item)} key={item}>{ item }</MenuItem>
    });

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          { this.props.label }{':  '}{ this.state.chosen }
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          { menuItems }
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
