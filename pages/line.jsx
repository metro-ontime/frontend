import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Drawer, List, Typography, Divider, ListItem, ListItemText } from '@material-ui/core';
import Layout from '../components/Layout';
import DataLoader from '../components/DataLoader';
import TrainDetails from '../components/TrainDetails';

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
        <Layout>
          Line #
          {id}
          <TrainDetails />
        </Layout>
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
