import React, { Component } from 'react';
import { Typography,
  Grid, 
  Paper,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../components/Layout';
import LineSelector from './components/LineSelector';
import SimpleMenu from '../../components/SimpleMenu';

const styles = theme => ({
  cardImage: {
    width: '100%',
  }
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimeWindow: '1 minute'
    };
  }

  selectTimeWindow = (value) => {
    this.setState({ currentTimeWindow: value })
  }

  render() {
    const { classes } = this.props;

    return (
      <Layout
        pageTitle="Network Summary"
        toolbarTitle="Network Summary"
      >
        <Grid container justify="center">
          <Grid item container justify="center" spacing={24} xs={12} md={6}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="RailStats LA" />
                <CardContent>
                  We track LA Metro trains and assess network performance.
                  <p><b>Last Update:</b> 10pm</p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Grid container spacing={0} justify="space-between">
                  <Grid item xs={12} md={4}>
                    <CardContent>
                      <Typography variant="h1">
                        50%
                      </Typography>
                      <Typography variant="subtitle1">
                        Trains running within
                        <SimpleMenu menuItems={['1 minute', '2 minutes']} label={this.state.currentTimeWindow} handleMenuChange={this.selectTimeWindow}/>
                        of schedule across the network today.
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CardMedia component="img" className={classes.cardImage} src="/static/images/network-color.svg" />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <LineSelector />
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default withStyles(styles)(Index);
