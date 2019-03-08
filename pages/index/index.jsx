import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Typography,
  Grid, 
  Paper,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Tooltip
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import Layout from '~/components/Layout';
import LineSelector from '~/components/LineSelector';
import SimpleMenu from '~/components/SimpleMenu';
import { lines } from '~/helpers/LineInfo';
import { whenListAllObjects, whenGotS3Object } from '~/helpers/DataFinder';
import LogoAndTitle from '~/components/LogoAndTitle';
import ScoreCard from '~/components/ScoreCard';
import SimpleScoreCard from '~/components/SimpleScoreCard';

const styles = theme => ({
  cardImage: {
    width: '100%',
  },
  container: {
    [theme.breakpoints.down('xs')]: {
    }
  }
});

class Index extends Component {


  static async getInitialProps({ query, res }) {
    const { data } = await axios.get('https://api.railstats.org/network');
    const timestamp = data.timestamp;
    return { query, data, timestamp };
  }

  selectTimeWindow = (value) => {
    this.setState({ currentTimeWindow: value })
  }

  render() {
    const { classes, data, timestamp } = this.props;
    return (
      <Layout
        pageTitle="Network Summary"
        toolbarTitle="Network Summary"
      >
        <Grid container spacing={24} justify="space-around" className={ classes.container }>
          <Grid container item xs={12} md={8} justify="center" alignItems="center" className={ classes.container }>
            <Grid item xs={12} md={10} className={ classes.container }>
              <LogoAndTitle altText="How reliable is the LA Metro Network today?" timestamp={ timestamp } altImg="/static/images/logo_network.svg"/>
            </Grid>
          </Grid>
          <Grid container spacing={16} item xs={12} lg={8} justify="space-between" alignItems="center">
            <Grid item xs={12} md={6}>
              <ScoreCard data={ data } width={ this.props.width } />
            </Grid>
            <Grid item xs={12} md={5}>
              <SimpleScoreCard width={this.props.width} data={ data }/>
            </Grid>
            <Grid item xs={12} md={12}>
              <LineSelector />
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default flowRight([withStyles(styles), withWidth()])(Index);
