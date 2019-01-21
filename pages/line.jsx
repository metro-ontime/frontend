import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Drawer, List, Typography, Divider, ListItem, ListItemText } from '@material-ui/core';

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static async getInitialProps({ query }) {
    return query
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        <div>
          Line #
          {id}
        </div>
      </div>
    );
  }
}

Line.defaultProps = {
  id: 9,
};
Line.propTypes = {
  id: PropTypes.number,
};
export default Line;
