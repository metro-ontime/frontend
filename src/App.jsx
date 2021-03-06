import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogoAndTitle from './components/LogoAndTitle.jsx';
import PerformanceScoreCard from './components/scorecards/PerformanceScoreCard.jsx';
import WaitTimeScoreCard from './components/scorecards/WaitTimeScoreCard.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import CONFIG from '../config';
import { linesByName } from './helpers/LineInfo.jsx';
import directionNames from './helpers/Directions';
import SimpleMenu from './components/SimpleMenu.jsx';
import About from './components/About.jsx';
import MareyLoader from './components/MareyLoader.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import './App.css';

const styles = () => ({
  root: {
    flexGrow: 1,
    margin: '0 auto',
    maxWidth: '1200px',
  },
});

const loadingStates = new Set(['loading', 'success', 'error']);

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataState: 'loading',
      data: null,
      timestamp: null,
      currentLine: 'All',
      arrivalWindow: '1_min',
      date: '',
      dates: [],
      direction: 0,
      width: 0,
      height: 0
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    const urls = [`${CONFIG.RAILSTATS_API}/network`, `${CONFIG.RAILSTATS_API}/network/dates`]
    Promise.all(urls.map(url => fetch(url).then(response => response.json())))
      .then(arr => {
        const data = arr[0];
        const dates = arr[1];
        this.setState({ dates, data, date: dates[dates.length - 1], timestamp: data.timestamp, dataState: 'success' });
      })
      .catch(err => this.setState({ dataState: 'error' }))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleDirectionChange = (newDirection, index) => {
    this.setState({ direction: index });
  }

  updateData = () => {
    if (this.state.currentLine === 'All') {
      const urls = [
        `${CONFIG.RAILSTATS_API}/network?date=${this.state.date}`,
        `${CONFIG.RAILSTATS_API}/network/dates`
      ]
      Promise.all(urls.map(url => fetch(url).then(response => response.json())))
        .then(arr => {
          this.setState({ data: arr[0], dates: arr[1], timestamp: arr[0].timestamp, dataState: 'success' })
        })
        .catch(err => this.setState({ dataState: 'error' }))
    } else {
      const urls = [
        `${CONFIG.RAILSTATS_API}/line/${linesByName[this.state.currentLine].id}?date=${this.state.date}`,
        `${CONFIG.RAILSTATS_API}/line/${linesByName[this.state.currentLine].id}/dates`
      ]
      Promise.all(urls.map(url => fetch(url).then(response => response.json())))
        .then(arr => {
          if (!arr[0].total_arrivals_analyzed) {
            throw new Error('data error')
          }
          this.setState({ data: arr[0], dates: arr[1], timestamp: arr[0].timestamp, dataState: 'success' })
        })
        .catch(err => this.setState({ dataState: 'error' }))
    }
  }

  handleLineChange = (e) => {
    const selectedLine = e.target.value;
    this.setState({ currentLine: selectedLine, dataState: 'loading' }, this.updateData)
  }

  handleArrivalWindow = (e) => {
    const newValue = e.target.value;
    this.setState({ arrivalWindow: newValue });
  }

  handleDate = (e) => {
    const newValue = e.target.value;
    this.setState({ date: newValue, dataState: 'loading' }, this.updateData);
  }

  render() {
    const {
      currentLine,
      arrivalWindow,
      date,
      data,
      dataState,
      dates,
      direction,
      timestamp,
      width
    } = this.state;
    let line;
    let directions;
    if (currentLine !== 'All') {
      line = linesByName[currentLine].id;
      directions = [directionNames[`${line}_0`], directionNames[`${line}_1`]];
    }

    return (
      <div>
        <div>
          <LogoAndTitle
            timestamp={timestamp}
            line={currentLine}
            date={date}
            altImg="/static/images/logo_network.svg"
          />
        </div>
        <div className="content">
          <div className="filterPanel">
            <FilterPanel
              line={currentLine}
              handleLineChange={this.handleLineChange}
              arrivalWindow={arrivalWindow}
              handleArrivalWindow={this.handleArrivalWindow}
              date={date}
              dates={dates}
              handleDate={this.handleDate}
            />
          </div>
          { dataState === 'loading' &&
            <div className="warning">
              <CircularProgress variant="indeterminate" color="secondary" size={100} />
            </div>
          }
          { dataState === 'error' &&
            <div className="warning">
              There was an error fetching the data.
            </div>
          }
          { dataState === 'success' &&
            <div className="performanceScoreCard">
              <PerformanceScoreCard
                data={data}
                currentLine={currentLine}
                arrivalWindow={arrivalWindow}
              />
            </div>
          }
          { dataState === 'success' &&
            <div className="waitScoreCard">
              <WaitTimeScoreCard
                data={data}
                currentLine={currentLine}
              />
            </div>
          }
          { width > 900 && dataState === 'success' && currentLine !== 'All' && (
            <div className="marey">
              <SimpleMenu
                label={`Towards: ${directions[direction]}`}
                menuItems={directions}
                handleMenuChange={this.handleDirectionChange}
              />
              <MareyLoader line={line} direction={direction} date={date} width="lg" />
            </div>
          )}
          <div className="about">
            <About />
          </div>
        </div>
      </div>
    )
  }
}

export default Index;
