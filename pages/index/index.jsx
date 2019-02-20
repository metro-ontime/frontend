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
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import Layout from '~/components/Layout';
import LineSelector from './components/LineSelector';
import SimpleMenu from '~/components/SimpleMenu';
import { lines } from '~/helpers/LineInfo';
import { whenListAllObjects, whenGotS3Object } from '~/helpers/DataFinder';

const styles = theme => ({
  cardImage: {
    width: '100%',
  }
});

const arrivalWindows = [
  {
    menuLabel: '1 minute',
    dataLabel: '1_min',
  },
  {
    menuLabel: '2 minutes',
    dataLabel: '2_min',
  },
  {
    menuLabel: '3 minutes',
    dataLabel: '3_min',
  },
  {
    menuLabel: '4 minutes',
    dataLabel: '4_min',
  },
  {
    menuLabel: '5 minutes',
    dataLabel: '5_min',
  },
]

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.state = {
      selectedArrivalWindow: {
        index: 0,
        menuLabel: arrivalWindows[0].menuLabel,
        dataLabel: arrivalWindows[0].dataLabel,
      }
    };
  }

  handleMenuChange(item, index) {
    this.setState({ 
      selectedArrivalWindow: { 
        index: index,
        menuLabel: arrivalWindows[index].menuLabel,
        dataLabel: arrivalWindows[index].dataLabel,
      }
    })
  }


  static async getInitialProps({ query, res }) {
    // This number crunching should all occur in the backend python scripts.
    // Ideally our summary JSON file should just be one doc,
    // containing all data prepared already.
    let lineObjects = lines.map(line => {
      const listParams = {Bucket: 'h4la-metro-performance', Prefix: `data/summaries/${line.id}_lametro-rail`};
      return whenListAllObjects(listParams);
    });
    lineObjects = await Promise.all(lineObjects);

    let mostRecents = lineObjects.map(objects => {
      return objects[objects.length - 1]
    });
    mostRecents = await Promise.all(mostRecents);

    let dataObjects = mostRecents.map(mostRecent => {
      const objectParams = {Bucket: 'h4la-metro-performance', Key: mostRecent};
      return whenGotS3Object(objectParams)
    });

    dataObjects = await Promise.all(dataObjects);
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
    const score = Math.round(totalsOntime[this.state.selectedArrivalWindow.dataLabel] / totalArrivals * 1000) / 10;
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
                  <Tooltip classes={{ tooltip: classes.htmlTooltip }} title={(
                    <Fragment>
                      <Typography color="inherit">Update Timing</Typography>
                      Latest statistics are provided roughly every 30 minutes between 5am and 10pm PST.
                    </Fragment>
                  )}>
                    <Typography variant="subtitle1">
                      <b>Latest Update: </b> 
                      <Moment format="D MMMM YYYY, h:mma" tz="America/Los_Angeles">{ timestamp }</Moment>
                    </Typography>
                  </Tooltip>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Grid container spacing={0} justify="space-between">
                  <Grid item xs={12} md={4}>
                    <CardContent>
                      <Typography variant="h1">
                        { score }%
                      </Typography>
                      <Typography variant="subtitle1">
                        Trains running within
                        <SimpleMenu
                          menuItems={ arrivalWindows.map((item) => { return item.menuLabel }) }
                          handleMenuChange = {this.handleMenuChange}
                          selected = {this.state.selectedArrivalWindow.index}
                        />
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
