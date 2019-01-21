import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Layout from '../components/Layout';

class Index extends Component {
  render() {
    return <div>
      <Layout>
        <Typography variant="h3">Select your line now</Typography>
      </Layout>
    </div>
  }
}

export default Index;
