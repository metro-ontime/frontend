import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Layout from '../components/Layout';

class Index extends Component {
  render() {
    return (
      <div>
        <Layout pageTitle="Line Selector" style={{ paddingTop: 0 }}>
          <div style={{ backgroundColor: '#333' }}>
            <h1>Hello World</h1>
          </div>
        </Layout>
      </div>
    );
  }
}

export default Index;
