import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (item, index) => {
    const { handleMenuChange, menuItems } = this.props;
    this.setState({ anchorEl: null });
    if (menuItems.includes(item)) {
      handleMenuChange(item, index);
    }
  };

  render() {
    const { anchorEl } = this.state;
    const { menuItems, label, selected } = this.props;
    const menuItemList = menuItems.map((item, index) => (
      <MenuItem onClick={() => this.handleClose(item, index)} key={item}>
        { item }
      </MenuItem>));
    return (
      <span>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          { label }
          { menuItems[selected] }
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          { menuItemList }
        </Menu>
      </span>
    );
  }
}

export default SimpleMenu;
