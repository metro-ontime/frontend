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
import SimpleMenu from '~/components/SimpleMenu';
import About from '~/components/About';
import MareyLoader from '~/components/MareyLoader';

const styles = () => ({
  root: {
    flexGrow: 1,
    margin: '0 auto',
    maxWidth: '1200px',
  },
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      data: props.data,
      currentLine: 'All',
      arrivalWindow: '1_min',
      date: props.dates[props.dates.length - 1],
      direction: 0,
    };
  }

  static async getInitialProps({ query }) {
    const { data } = await axios.get(`${CONFIG.RAILSTATS_API}/network`);
    const dates = await axios.get(`${CONFIG.RAILSTATS_API}/network/dates`).then(response => response.data);
    return { query, dates, data };
  }

  handleDirectionChange = (newDirection, index) => {
    this.setState({ direction: index });
  }

  updateData = () => {
    if (this.state.currentLine === 'All') {
      Promise.all([
        axios.get(`${CONFIG.RAILSTATS_API}/network?date=${this.state.date}`),
        axios.get(`${CONFIG.RAILSTATS_API}/network/dates`)
      ])
        .then(arr => {
          this.setState({ data: arr[0].data, dates: arr[1].data, error: false })
        })
    } else {
      Promise.all([
        axios.get(`${CONFIG.RAILSTATS_API}/line/${linesByName[this.state.currentLine].id}?date=${this.state.date}`),
        axios.get(`${CONFIG.RAILSTATS_API}/line/${linesByName[this.state.currentLine].id}/dates`)
      ])
        .then(arr => {
          if (!arr[0].data.total_arrivals_analyzed) {
            throw new Error('data error')
          }
          this.setState({ data: arr[0].data, dates: arr[1].data, error: false })
        })
        .catch(err => this.setState({ error: true }))
    }
  }

  handleLineChange = (e) => {
    const selectedLine = e.target.value;
    this.setState({ currentLine: selectedLine, error: true }, this.updateData)
  }

  handleArrivalWindow = (e) => {
    const newValue = e.target.value;
    this.setState({ arrivalWindow: newValue }, this.updateData);
  }

  handleDate = (e) => {
    const newValue = e.target.value;
    this.setState({ date: newValue, error: true }, this.updateData);
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
          <FilterPanel
            line={currentLine}
            handleLineChange={this.handleLineChange}
            arrivalWindow={arrivalWindow}
            handleArrivalWindow={this.handleArrivalWindow}
            date={date}
            dates={dates}
            handleDate={this.handleDate}
          />
          <Grid
            container
            spacing={16}
            justify="center"
          >
          { !this.state.error &&
            <Grid item xs={12} md={6}>
              <PerformanceScoreCard
                data={data}
                width={width}
                currentLine={currentLine}
                arrivalWindow={arrivalWindow}
              />
            </Grid>
          }
          { !this.state.error &&
            <Grid item xs={12} md={6}>
              <WaitTimeScoreCard
                width={width}
                data={data}
                currentLine={currentLine}
              />
            </Grid>
          }
          { this.state.error &&
            <Grid item xs={12}>
              There was an error fetching the data.
            </Grid>
          }
          </Grid>
        </Grid>
        {!this.state.error && currentLine !== 'All' && (
          <Grid item xs={12}>
            <Toolbar color="primary">
              <SimpleMenu
                label={`Towards: ${directions[direction]}`}
                menuItems={directions}
                handleMenuChange={this.handleDirectionChange}
              />
            </Toolbar>
            <MareyLoader line={line} direction={direction} date={date} width={width} />
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
