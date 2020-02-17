import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import LogoAndTitle from './components/LogoAndTitle.jsx';
// import PerformanceScoreCard from './components/scorecards/PerformanceScoreCard.jsx';
// import WaitTimeScoreCard from './components/scorecards/WaitTimeScoreCard.jsx';
// import FilterPanel from './components/FilterPanel.jsx';
import CONFIG from '../config';
import { linesByName } from './helpers/LineInfo.jsx';
import directionNames from './helpers/Directions';
// import SimpleMenu from './components/SimpleMenu.jsx';
// import About from './components/About.jsx';
// import MareyLoader from './components/MareyLoader.jsx';

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
      error: true,
      data: null,
      timestamp: null,
      currentLine: 'All',
      arrivalWindow: '1_min',
      date: null,
      dates: [],
      direction: 0,
    };
  }

  componentDidMount() {
    const urls = [`${CONFIG.RAILSTATS_API}/network`, `${CONFIG.RAILSTATS_API}/network/dates`]
    Promise.all(urls.map(url => fetch(url).then(response => response.json())))
      .then(arr => {
        const data = arr[0];
        const dates = arr[1];
        this.setState({ dates, data, date: dates[dates.length - 1], timestamp: data.timestamp });
      })
  }

  handleDirectionChange = (newDirection, index) => {
    this.setState({ direction: index });
  }

  updateData = () => {
    if (this.state.currentLine === 'All') {
      Promise.all([
        fetch(`${CONFIG.RAILSTATS_API}/network?date=${this.state.date}`),
        fetch(`${CONFIG.RAILSTATS_API}/network/dates`)
      ])
        .then(arr => {
          this.setState({ data: arr[0].data, dates: arr[1].data, error: false })
        })
    } else {
      Promise.all([
        fetch(`${CONFIG.RAILSTATS_API}/line/${linesByName[this.state.currentLine].id}?date=${this.state.date}`),
        fetch(`${CONFIG.RAILSTATS_API}/line/${linesByName[this.state.currentLine].id}/dates`)
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
    const { classes, width } = this.props;
    const {
      currentLine,
      arrivalWindow,
      date,
      data,
      dates,
      direction,
      timestamp
    } = this.state;
    let line;
    let directions;
    if (currentLine !== 'All') {
      line = linesByName[currentLine].id;
      directions = [directionNames[`${line}_0`], directionNames[`${line}_1`]];
    }

    return <div>Railstats</div>
    /*
    return (
      <div className={classes.root}>
        <div>
          <LogoAndTitle
            timestamp={timestamp}
            line={currentLine}
            date={date}
            altImg="/static/images/logo_network.svg"
          />
        </div>
        <div>
          <FilterPanel
            line={currentLine}
            handleLineChange={this.handleLineChange}
            arrivalWindow={arrivalWindow}
            handleArrivalWindow={this.handleArrivalWindow}
            date={date}
            dates={dates}
            handleDate={this.handleDate}
          />
          <div>
          { !this.state.error &&
            <div>
              <PerformanceScoreCard
                data={data}
                width={width}
                currentLine={currentLine}
                arrivalWindow={arrivalWindow}
              />
            </div>
          }
          { !this.state.error &&
            <div>
              <WaitTimeScoreCard
                width={width}
                data={data}
                currentLine={currentLine}
              />
            </div>
          }
          { this.state.error &&
            <div>
              There was an error fetching the data.
            </div>
          }
          </div>
        </div>
        {!this.state.error && currentLine !== 'All' && (
          <div>
            <Toolbar color="primary">
              <SimpleMenu
                label={`Towards: ${directions[direction]}`}
                menuItems={directions}
                handleMenuChange={this.handleDirectionChange}
              />
            </Toolbar>
            <MareyLoader line={line} direction={direction} date={date} width={width} />
          </div>
        )}
        <div>
          <About />
        </div>
      </div>
    );
    */
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


export default Index;
