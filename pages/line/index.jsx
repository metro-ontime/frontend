import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';
import Layout from '../../components/Layout';
import TrainDetails from './TrainDetails';
import TrainStats from './TrainStats';
import Nav from './components/Nav';
import mapboxData from './components/MapboxData';

const lines = {
  801: 'Blue',
  802: 'Red',
  803: 'Green',
  804: 'Gold',
  805: 'Purple',
  806: 'Expo',
};


class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }

  static async getInitialProps({ query }) {
    return query;
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleTabChange = (event, newValue) => {
    this.setState(state => ({ selectedTab: newValue }));
  };

  render() {
    const { id } = this.props;
    const { selectedTab } = this.state;
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Nav pageTitle={`${lines[id]} Line`}>
          <Tabs value={selectedTab} onChange={this.handleTabChange} textColor="inherit">
            <Tab label="Stats" />
            <Tab label="Diagram" />
          </Tabs>
        </Nav>
        {selectedTab === 0 && <TrainStats line={id} mapbox={mapboxData[id]} />}
        {selectedTab === 1 && <TrainDetails />}
      </Layout>
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
