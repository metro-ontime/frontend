import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Grid, Toolbar } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import flowRight from 'lodash/flowRight';
import LogoAndTitle from '~/components/LogoAndTitle';
import PerformanceScoreCard from '~/components/scorecards/PerformanceScoreCard';
import WaitTimeScoreCard from '~/components/scorecards/WaitTimeScoreCard';
import FilterPanel from '~/components/FilterPanel';
import CONFIG from '~/config';
import { linesByName } from '~/helpers/LineInfo';
import directionNames from '~/helpers/Directions';
import DataParser from '~/components/DataParser';
import SimpleMenu from '~/components/SimpleMenu';
import About from '~/components/About';
import History from '~/components/history';

const styles = () => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: '0 15px',
    width: '100%',
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
      direction: 0,
    };
  }

  static async getInitialProps({ query }) {
    const { data } = await axios.get(`${CONFIG.RAILSTATS_API}/network`);
    const dates = await axios.get(`${CONFIG.RAILSTATS_API}/dates`).then(response => response.data);
    return { query, dates, data };
  }

  handleDirectionChange = (newDirection, index) => {
    this.setState({ direction: index });
  }

  handleLineChange = (e) => {
    const selectedLine = e.target.value;
    if (selectedLine === 'All') {
      axios.get(`${CONFIG.RAILSTATS_API}/network`)
        .then(({ data }) => this.setState({ data, currentLine: selectedLine }));
    } else {
      axios.get(`${CONFIG.RAILSTATS_API}/line/${linesByName[selectedLine].id}`)
        .then(({ data }) => this.setState({ data, currentLine: selectedLine }));
    }
  }

  handleArrivalWindow = (e) => {
    const newValue = e.target.value;
    this.setState({ arrivalWindow: newValue });
  }

  handleDate = (e) => {
    const newValue = e.target.value;
    this.setState({ date: newValue });
    axios.get(`${CONFIG.RAILSTATS_API}/network?date=${newValue}`)
      .then(({ data }) => this.setState({ data }));
  }

  render() {
    const {
      classes, width, dates,
    } = this.props;
    const {
      currentLine,
      arrivalWindow,
      date,
      data,
      direction,
    } = this.state;
    const { timestamp } = data;
    let line;
    let directions;
    if (currentLine !== 'All') {
      line = linesByName[currentLine].id;
      directions = [directionNames[`${line}_0`], directionNames[`${line}_1`]];
    }

    return (
      <Grid container spacing={24} justify="space-around" className={classes.root}>
        <Grid item>
          <LogoAndTitle
            timestamp={timestamp}
            line={currentLine}
            date={date}
            altImg="/static/images/logo_network.svg"
          />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            justify="center"
          >
            <Grid item xs={12} md={2}>
              <FilterPanel
                line={currentLine}
                handleLineChange={this.handleLineChange}
                arrivalWindow={arrivalWindow}
                handleArrivalWindow={this.handleArrivalWindow}
                date={date}
                dates={dates}
                handleDate={this.handleDate}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <PerformanceScoreCard
                data={data}
                width={width}
                currentLine={currentLine}
                arrivalWindow={arrivalWindow}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <WaitTimeScoreCard
                width={width}
                data={data}
                currentLine={currentLine}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <History line={currentLine === 'All' ? 'All Lines' : currentLine} />
        </Grid>
        {currentLine !== 'All' && (
          <Grid item xs={12}>
            <Toolbar color="primary">
              <SimpleMenu
                label={`Towards: ${directions[direction]}`}
                menuItems={directions}
                handleMenuChange={this.handleDirectionChange}
              />
            </Toolbar>
            <DataParser line={line} direction={0} date={date} />
          </Grid>
        )}
        <Grid item xs={12}>
          <About />
        </Grid>
      </Grid>
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
