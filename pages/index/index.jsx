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
    const listParams = {Bucket: 'h4la-metro-performance', Prefix: 'data/summaries'};
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

    const totalScheduled = dataObjects.reduce((acc, currentValue) => {
      return currentValue["total_scheduled_arrivals"] + acc
    }, dataObjects[0]["total_scheduled_arrivals"]);

    const sumMeanTimeBetween = dataObjects.reduce((acc, currentValue) => {
      return currentValue["mean_time_between"] + acc
    }, dataObjects[0]["mean_time_between"]);
    const overallMeanTimeBetween = sumMeanTimeBetween / dataObjects.length;

    const timestamp = dataObjects[0]["timestamp"];

    const overallData = {
      ontime: totalsOntime,
      total_arrivals_analyzed: totalArrivals,
      total_scheduled_arrivals: totalScheduled,
      mean_time_between: overallMeanTimeBetween
    };

    return { query, overallData, timestamp };
  }

  selectTimeWindow = (value) => {
    this.setState({ currentTimeWindow: value })
  }

  render() {
    const { classes, overallData, timestamp } = this.props;
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
              <ScoreCard data={ overallData } width={ this.props.width } />
            </Grid>
            <Grid item xs={12} md={5}>
              <SimpleScoreCard width={this.props.width} data={ overallData }/>
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
