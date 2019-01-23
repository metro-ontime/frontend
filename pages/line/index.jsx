import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';
import Layout from '../../components/Layout';
import TrainDetails from './TrainDetails';
import TrainStats from './TrainStats';
import Nav from './components/Nav';

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
    console.log(newValue);
    this.setState(state => ({ selectedTab: newValue }));
  };

  render() {
    const { id } = this.props;
    const { selectedTab } = this.state;
    return (
      <div>
        <Layout>
          <Nav pageTitle={`${lines[id]} Line`}>
            <Tabs value={selectedTab} onChange={this.handleTabChange} textColor="inherit">
              <Tab label="Diagram" />
              <Tab label="Stats" />
            </Tabs>
          </Nav>
          {selectedTab === 0 && <TrainDetails />}
          {selectedTab === 1 && <TrainStats />}
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
