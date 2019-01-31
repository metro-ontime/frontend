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
    const chosen = item[0] + "_" + item.slice(2, 5); // "2 minutes" --> "2_min"
    this.props.handleMenuChange(chosen);
  };

  render() {
    const { anchorEl } = this.state;
    const menuItems = this.props.menuItems.map((item) => {
      return <MenuItem onClick={() => this.handleClose(item)} key={item}>{ item }</MenuItem>
    });

    return (
      <span>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          { this.props.label }{ this.state.chosen }
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
