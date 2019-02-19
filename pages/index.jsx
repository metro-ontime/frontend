import React, { Component } from 'react';
import { Typography, Grid, Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import { lines } from '../helpers/LineInfo.js';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonWrapper: {
    padding: 0,
    width: 200,
    background: 'transparent',
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
    const lineButton = (line) => (
      <Button href={`/line/${line.id}`} variant="outlined" className={classes.button}>
        <div className={classes.buttonWrapper} style={{ position: 'relative' }}>
          <div
            style={{
              backgroundColor: line.color,
              width: '25px',
              padding: 0,
              height: '25px',
              margin: 0,
              borderRadius: '25px',
              float: 'left',
            }}
          />
          <div>
            <Typography component="h4">{line.name} Line</Typography>
          </div>
        </div>
      </Button>
    )
    const lineButtons = () => {
      return lines.map((line) => {
        return (
          <Grid item xs={12} key={line.name}>
            { lineButton(line) }
          </Grid>
        )
      })
    };

    return (
      <div>
        <Layout
          pageTitle="Network Summary"
        >
          <div style={{ maxWidth: '800px'}}>
            <Grid container spacing={24} style={{ marginTop: '2em' }}>
              { lineButtons() }
            </Grid>
          </div>
        </Layout>
      </div>
    );
  }
}

export default withStyles(styles)(Index);
