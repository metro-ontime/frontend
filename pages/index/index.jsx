import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import Layout from '~/components/Layout';
import LogoAndTitle from '~/components/LogoAndTitle';
import PerformanceScoreCard from '~/components/scorecards/PerformanceScoreCard';
import WaitTimeScoreCard from '~/components/scorecards/WaitTimeScoreCard';
import FilterPanel from '~/components/FilterPanel';
import CONFIG from '~/config';
import LineComparison from '~/components/LineComparison';

const styles = () => ({
  cardImage: {
    width: '100%',
  },
  container: {
  },
  item: {
    height: 400,
  },
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLine: 'All',
      arrivalWindow: '1_min',
      date: 'Today',
    };
    this.handleLineChange = this.handleLineChange.bind(this);
    this.handleArrivalWindow = this.handleArrivalWindow.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  static async getInitialProps({ query }) {
    const { data } = await axios.get(`${CONFIG.RAILSTATS_API}/history`);
    const formattedLineData = Object.values(data[0]);
    const allLineData = data[1];
    return { query, formattedLineData, allLineData };
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
    const {
      classes, formattedLineData, allLineData, width,
    } = this.props;
    const { currentLine, arrivalWindow, date } = this.state;
    const data = date === 'Yesterday'
      ? allLineData[allLineData.length - 2]
      : allLineData[allLineData.length - 1];
    const { timestamp } = data;

    return (
      <Layout
        pageTitle="Network Summary"
        toolbarTitle="Network Summary"
      >
        <Grid container spacing={24} justify="space-around" className={classes.container}>
          <Grid container item xs={12} md={8} justify="center" alignItems="center" className={classes.container}>
            <LogoAndTitle
              timestamp={timestamp}
              line={currentLine}
              date={date}
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
            alignItems="top"
          >
            <Grid item xs={12} md={2}>
              <FilterPanel
                line={currentLine}
                handleLineChange={this.handleLineChange}
                arrivalWindow={arrivalWindow}
                handleArrivalWindow={this.handleArrivalWindow}
                date={date}
                dates={['Today', 'Yesterday']}
                handleDate={this.handleDate}
              />
            </Grid>
            <Grid item xs={12} md={5} classes={classes}>
              <PerformanceScoreCard
                data={data}
                width={width}
                currentLine={currentLine}
                arrivalWindow={arrivalWindow}
                formattedLineData={formattedLineData}
              />
            </Grid>
            <Grid item xs={12} md={5} classes={classes}>
              <WaitTimeScoreCard
                width={width}
                data={data}
                currentLine={currentLine}
                formattedLineData={formattedLineData}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <LineComparison formattedData={formattedLineData} allLineData={allLineData} />
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

Index.defaultProps = {
  width: 'lg',
  classes: {},
  formattedLineData: [],
  allLineData: [],
};

Index.propTypes = {
  classes: PropTypes.object,
  formattedLineData: PropTypes.arrayOf(PropTypes.object),
  allLineData: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.string,
};


export default flowRight([withStyles(styles), withWidth()])(Index);
