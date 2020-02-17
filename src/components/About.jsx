import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import hackForLA from '~/static/images/hackforla.png';
import github from '~/static/images/GitHub_Logo.png';
import './about.scss';

const About = () => (
  <Grid container justify="center" alignItems="center" style={{ margin: '20px auto'}}>
    <Grid item xs={12}>
      <Typography align="center" paragraph>
          RailStats LA is developed at Hack For LA.
      </Typography>
      <Typography align="center" paragraph>
        Visit our project repository and Hack For LA's website to find out how you can contribute.
      </Typography>
      <div className="links">
        <a href="https://github.com/metro-ontime"><img src={github} height="60px" /></a>
        <a href="https://www.hackforla.org/"><img src={hackForLA} height="100px" /></a>
      </div>
    </Grid>
  </Grid>
);

export default About;
