import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hidden, Tab, Tabs } from '@material-ui/core';
import Layout from '~/components/Layout';
import TrainDetails from './TrainDetails';
import TrainStats from './TrainStats';
import { linesById } from '~/helpers/LineInfo.js';
import { whenGotS3Object, whenListAllObjects } from '~/helpers/DataFinder.js';

import S3 from 'aws-sdk/clients/s3';
const s3 = new S3();

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }

  static async getInitialProps({ query, res }) {
    const listParams = {Bucket: 'h4la-metro-performance', Prefix: 'data/summaries'};
    const objects = await whenListAllObjects(listParams);
    const mostRecent = objects[objects.length - 1];
    const objectParams = {Bucket: 'h4la-metro-performance', Key: mostRecent};
    const allData = await whenGotS3Object(objectParams);
    const data = allData[`${query.id}_lametro-rail`];
    return { query, data };
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleTabChange = (event, newValue) => {
    this.setState(state => ({ selectedTab: newValue }));
  };

  render() {
    const { id } = this.props.query;
    const { data } = this.props;
    const { selectedTab } = this.state;
    const toolbarChildren = (
      <Hidden smDown>
        <Tabs value={selectedTab} onChange={this.handleTabChange} textColor="inherit">
          <Tab label="Summary" />
          <Tab label="Diagram" />
        </Tabs>
      </Hidden>
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
        {selectedTab === 0 && <TrainStats line={id} data={data}/>}
        {selectedTab === 1 && <TrainDetails line={id} date={data["date"]} />}
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
