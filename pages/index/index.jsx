import React, { Component, Fragment } from 'react';
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
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import Layout from '~/components/Layout';
import LineSelector from '~/components/LineSelector';
import SimpleMenu from '~/components/SimpleMenu';
import { lines } from '~/helpers/LineInfo';
import { whenListAllObjects, whenGotS3Object } from '~/helpers/DataFinder';
import LogoAndTitle from '~/components/LogoAndTitle';
import ScoreCard from '~/components/ScoreCard';

const styles = theme => ({
  cardImage: {
    width: '100%',
  }
});

class Index extends Component {


  static async getInitialProps({ query, res }) {
    // This number crunching should all occur in the backend python scripts.
    // Ideally our summary JSON file should just be one doc,
    // containing all data prepared already.

    const listParams = {Bucket: 'h4la-metro-performance', Prefix: `data/summaries`};
    const lineObjects = await whenListAllObjects(listParams);
    let mostRecent = lineObjects[lineObjects.length - 1]

    const objectParams = {Bucket: 'h4la-metro-performance', Key: mostRecent};
    const data = await whenGotS3Object(objectParams);

    const dataObjects = Object.keys(data).map((key) => {
      return data[key]
    });
    const windows = Array.from({length: 5}, (k, n) => n + 1);

    let totalsOntime = windows.map(windowSize => {
      const totalOntimeForWindow = dataObjects.reduce((acc, currentValue) => {
        return currentValue["ontime"][`${windowSize}_min`] + acc
      }, dataObjects[0]["ontime"][`${windowSize}_min`]);
      return { window: windowSize, n: totalOntimeForWindow }
    });

    totalsOntime = totalsOntime.reduce((map, obj) => {
      map[`${obj.window}_min`] = obj.n;
      return map
    }, {});

    const totalArrivals = dataObjects.reduce((acc, currentValue) => {
      return currentValue["total_arrivals_analyzed"] + acc
    }, dataObjects[0]["total_arrivals_analyzed"]);

    const timestamp = dataObjects[0]["timestamp"];

    return { query, totalsOntime, totalArrivals, timestamp };
  }

  selectTimeWindow = (value) => {
    this.setState({ currentTimeWindow: value })
  }

  render() {
    const { classes, totalsOntime, totalArrivals, timestamp } = this.props;
    const data = {
      ontime: totalsOntime,
      total_arrivals_analyzed: totalArrivals,
      total_scheduled_arrivals: 0
    };
    return (
      <Layout
        pageTitle="Network Summary"
        toolbarTitle="Network Summary"
      >
        <Grid container="container" spacing={24} justify="space-around">
          <Grid container="container" item="item" xs={12} md={8} justify="center" alignItems="center">
            <Grid item="item" xs={12} md={8}>
              <LogoAndTitle altText="How reliable is the LA Metro Network today?" timestamp={ timestamp } altImg="/static/images/logo_network.svg"/>
            </Grid>
          </Grid>
          <Grid container="container" item="item" xs={12} justify="space-around" alignItems="center">
            <Grid item="item" xs={12} md={4}>
              <ScoreCard data={ data } width={ this.props.width } />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <LineSelector />
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default flowRight([withStyles(styles), withWidth()])(Index);
