import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';
import Layout from '../../components/Layout';
import TrainDetails from './TrainDetails';
import TrainStats from './TrainStats';
import { linesById } from '../../helpers/LineInfo.js';


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
    const toolbarChildren = (
      <Tabs value={selectedTab} onChange={this.handleTabChange} textColor="inherit">
        <Tab label="Summary" />
        <Tab label="Diagram" />
      </Tabs>
    );
    const pageTitle = `${ linesById[id].name } Line`;
    const toolbarTitle = (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Metro { linesById[id].name } Line
        <div
          style={{
            backgroundColor: linesById[id].color,
            width: '30px',
            padding: 0,
            height: '30px',
            marginLeft: 15,
            marginRight: 15,
            borderRadius: '30px',
            border: '3px solid white',
            float: 'left',
          }}
        />
      </div>
    );

    return (
      <Layout style={{ minHeight: '100%' }} pageTitle={pageTitle} toolbarTitle={toolbarTitle} toolbarChildren={toolbarChildren}>
        {selectedTab === 0 && <TrainStats line={id} />}
        {selectedTab === 1 && <TrainDetails line={id} />}
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
