import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import Layout from '~/components/SimpleLayout';
import LogoAndTitle from '~/components/LogoAndTitle';
import PerformanceScoreCard from '~/components/scorecards/PerformanceScoreCard';
import WaitTimeScoreCard from '~/components/scorecards/WaitTimeScoreCard';
import FilterPanel from '~/components/FilterPanel';
import CONFIG from '~/config';
import { linesByName } from '~/helpers/LineInfo';

const styles = () => ({
  item: {
    height: 400,
  },
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      currentLine: 'All',
      arrivalWindow: '1_min',
      date: props.dates[props.dates.length - 1],
    };
  }

  static async getInitialProps({ query }) {
    const { data } = await axios.get(`${CONFIG.RAILSTATS_API}/network`);
    const { data: { dates } } = await axios.get(`${CONFIG.RAILSTATS_API}/dates`);
    return { query, dates, data };
  }

  handleLineChange = e => {
    const selectedLine = e.target.value;
    if (selectedLine === 'All') {
      axios.get(`${CONFIG.RAILSTATS_API}/network`)
        .then(({ data }) => this.setState({ data, currentLine: selectedLine }));
    } else {
      axios.get(`${CONFIG.RAILSTATS_API}/line/${linesByName[selectedLine].id}`)
        .then(({ data }) => this.setState({ data, currentLine: selectedLine }));
    }
  }

  handleArrivalWindow = e => {
    const newValue = e.target.value;
    this.setState({ arrivalWindow: newValue });
  }

  handleDate = e => {
    const newValue = e.target.value;
    this.setState({ date: newValue });
    axios.get(`${CONFIG.RAILSTATS_API}/network?date=${newValue}`)
      .then(({ data }) => { console.log(data); this.setState({ data }) });
  }

  render() {
    const {
      classes, width
    } = this.props;
    const { currentLine, arrivalWindow, date, data } = this.state;
    const { timestamp } = data;

    return (
      <Layout
        pageTitle="Rail Summary"
        toolbarTitle="Rail Summary"
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
            alignItems="flex-start"
          >
            <Grid item xs={12} md={2}>
              <FilterPanel
                line={currentLine}
                handleLineChange={this.handleLineChange}
                arrivalWindow={arrivalWindow}
                handleArrivalWindow={this.handleArrivalWindow}
                date={date}
                dates={this.props.dates}
                handleDate={this.handleDate}
              />
            </Grid>
            <Grid item xs={12} md={5} classes={classes}>
              <PerformanceScoreCard
                data={data}
                width={width}
                currentLine={currentLine}
                arrivalWindow={arrivalWindow}
              />
            </Grid>
            <Grid item xs={12} md={5} classes={classes}>
              <WaitTimeScoreCard
                width={width}
                data={data}
                currentLine={currentLine}
              />
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
};

Index.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
};


export default flowRight([withStyles(styles), withWidth()])(Index);
