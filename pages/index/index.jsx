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
import PerformanceScoreCard from '~/components/scorecards/PerformanceScoreCard';
import WaitTimeScoreCard from '~/components/scorecards/WaitTimeScoreCard';
import FilterPanel from '~/components/FilterPanel';
import CONFIG from '~/config';
import LineComparison from '~/components/LineComparison';

const styles = theme => ({
  cardImage: {
    width: '100%',
  },
  container: {
  },
  item: {
    height: 400
  }
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLine: 'All',
      arrivalWindow: '1_min',
      date: 'Today'
    };
    this.handleLineChange = this.handleLineChange.bind(this);
    this.handleArrivalWindow = this.handleArrivalWindow.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  static async getInitialProps({ query, res }) {
    const { data } = await axios.get(`${CONFIG.RAILSTATS_API}/history`);
    const formattedLineData = Object.values(data[0]);
    const allLineData = data[1];
    const latestData = allLineData[allLineData.length-1]
    const timestamp = latestData.timestamp;
    return { query, latestData, timestamp, formattedLineData, allLineData };
  }

  handleLineChange(e) {
    const selectedLine = e.target.value;
    this.setState({ currentLine: selectedLine });
  }

  handleArrivalWindow(e) {
    const newValue = e.target.value;
    this.setState({ arrivalWindow: newValue });
  }

  handleDate(e) {
    const newValue = e.target.value;
    this.setState({ date: newValue });
  }

  render() {
    const { classes, latestData, timestamp, formattedLineData, allLineData, width } = this.props;
    const { currentLine, arrivalWindow, date } = this.state;
    return (
      <Layout
        pageTitle="Network Summary"
        toolbarTitle="Network Summary"
      >
        <Grid container spacing={24} justify="space-around" className={ classes.container }>
          <Grid container item xs={12} md={8} justify="center" alignItems="center" className={ classes.container }>
            <LogoAndTitle
              altText="How reliable is the LA Metro Network today?"
              timestamp={ timestamp }
              altImg="/static/images/logo_network.svg"
            />
          </Grid>
          <Grid
            container
            spacing={16}
            item
            xs={12}
            lg={9}
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={2}>
              <FilterPanel
                line={ currentLine }
                handleLineChange={ this.handleLineChange }
                arrivalWindow={ arrivalWindow }
                handleArrivalWindow={ this.handleArrivalWindow }
                date={ date }
                dates={["Today", "Yesterday"]}
                handleDate={ this.handleDate }
              />
            </Grid>
            <Grid item xs={12} md={5} classes={ classes }>
              <PerformanceScoreCard data={ latestData } width={ width } currentLine={currentLine} arrivalWindow={arrivalWindow} formattedLineData={formattedLineData}  />
            </Grid>
            <Grid item xs={12} md={5} classes={ classes }>
              <WaitTimeScoreCard width={width} data={ latestData }/>
            </Grid>
            <Grid item xs={12} md={12}>
              <LineComparison formattedData={formattedLineData} allLineData={allLineData}/>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default flowRight([withStyles(styles), withWidth()])(Index);
