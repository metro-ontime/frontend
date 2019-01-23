import React, { Component } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 1.5,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    const position = [34.0407, -118.2468];
    return (
      <div>
        <Layout
          pageTitle="Line Selector"
          style={{ paddingTop: '0', paddingLeft: '300px', height: '100vh' }}
        >
          <div
            style={{
              padding: '6em',
              paddingBottom: '10em',
              paddingTop: '16em',
              height: '400px',
              backgroundImage:
                'url('
                + 'https://images.unsplash.com/photo-1477936821694-ec4233a9a1a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2820&q=80'
                + ')',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Typography variant="h5" style={{ color: '#fff' }}>
              We had a question
            </Typography>
            <Typography
              variant="h2"
              style={{ fontWeight: 'bold', marginTop: '0.25em', color: '#fff' }}
              color="white"
            >
              How predictable is the LA Metro?
            </Typography>
          </div>
          <div style={{ padding: '6em', paddingTop: '4em', marginTop: '0em' }}>
            <Typography variant="h5" style={{ marginTop: '0.25em', color: '#303030' }}>
              Find out by clicking a line below
            </Typography>
            <Grid container spacing={24} style={{ marginTop: '2em' }}>
              <Grid item xs={3}>
                <Paper elevation={1} className={classes.paper} style={{ position: 'relative' }}>
                  <div
                    style={{
                      backgroundColor: 'red',
                      width: '25px',
                      padding: 0,
                      height: '25px',
                      margin: 0,
                      borderRadius: '25px',
                      float: 'left',
                    }}
                  />
                  <div>
                    <Typography component="h5">Red Line</Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper elevation={1} className={classes.paper} style={{ position: 'relative' }}>
                  <div
                    style={{
                      backgroundColor: 'blue',
                      width: '25px',
                      padding: 0,
                      height: '25px',
                      margin: 0,
                      borderRadius: '25px',
                      float: 'left',
                    }}
                  />
                  <div>
                    <Typography component="h5">Blue Line</Typography>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Layout>
      </div>
    );
  }
}

export default withStyles(styles)(Index);
