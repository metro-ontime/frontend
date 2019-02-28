import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const styles = theme => ({
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  icon: {
    marginTop: '0.25em',
    marginLeft: '1em',
    fontSize: 32,
  }
});

class Dropdown extends Component {
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
    const { classes } = this.props;
    const menuItems = this.props.menuItems.map((item, index) => {
      return <MenuItem onClick={() => this.handleClose(item, index)} key={item}>{ item }</MenuItem>
    });
    return (
      <Fragment>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          variant="outlined"
          onClick={this.handleClick}
          className={ classes.button }
        >
          <div>
            { this.props.menuItems[this.props.selected] }
          </div>
          <div>
            <KeyboardArrowDownIcon className={ classes.icon }/>
          </div>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          { menuItems }
        </Menu>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Dropdown);
