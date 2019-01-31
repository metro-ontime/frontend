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
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (item, index) => {
    this.setState({ anchorEl: null });
    if (this.props.menuItems.includes(item)) {
      this.props.handleMenuChange(item, index);
    }
  };

  render() {
    const { anchorEl } = this.state;
    const menuItems = this.props.menuItems.map((item, index) => {
      return <MenuItem onClick={() => this.handleClose(item, index)} key={item}>{ item }</MenuItem>
    });
    return (
      <span>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          { this.props.label }{ this.props.menuItems[this.props.selected] }
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          { menuItems }
        </Menu>
      </span>
    );
  }
}

export default SimpleMenu;
