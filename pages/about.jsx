import React from 'react';
import Layout from '~/components/Layout';
import { Grid, Typography } from '@material-ui/core';

const About = () => (
  <Grid container justify="center" alignItems="center" style={{ height: '50vh' }}>
    <Grid item xs={12}>
      <Typography align="center" paragraph>
          RailStats LA is a performance monitor tool developed at Hack For LA.
      </Typography>
      <Typography align="center" paragraph>
          Github:
        {' '}
        <a href="https://github.com/metro-ontime">https://github.com/metro-ontime</a>
      </Typography>
      <Typography align="center" paragraph>
          Hack For LA:
        {' '}
        <a href="http://www.hackforla.org/">http://www.hackforla.org/</a>
      </Typography>
    </Grid>
  </Grid>
);

export default About;
