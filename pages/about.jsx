import React from 'react';
import Layout from '~/components/Layout';
import { Grid, Typography } from '@material-ui/core';

const About = (props) => {
  return (
    <Layout
      pageTitle="About"
      toolbarTitle="About"
    >
      <Grid container justify="center" alignItems="center" style={{ height: '50vh' }}>
        <Grid item xs={12}>
          <Typography align="center">
            <p>RailStats LA is a performance monitor tool developed at Hack For LA.</p>
            <p>Github: <a href="https://github.com/metro-ontime">https://github.com/metro-ontime</a></p>
            <p>Hack For LA: <a href="http://www.hackforla.org/">http://www.hackforla.org/</a></p>
        </Typography>
        </Grid>
      </Grid>
    </Layout>
  )
};

export default About;
