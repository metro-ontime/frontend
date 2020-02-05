import React, { Component } from 'react';
import CONFIG from '~/config';
import Highchart from './charts/Highchart';
import LinearIndeterminate from './LinearIndeterminate';
import { prepareObservations, prepareSchedule } from '~/helpers/PrepareData';

class DataParser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: null, schedule: null, minTime: null, maxTime: null,
    };
    this.updateTrips = this.updateTrips.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { line, date } = this.props;
    this.fetchData(line, date);
  }

  componentWillUpdate(prevProps) {
    const { date, line } = this.props;
    if (date !== prevProps.date || line !== prevProps.line) {
      // this.setState({
      //   trips: null, schedule: null, minTime: null, maxTime: null,
      // });
      this.fetchData(line, date);
    }
  }

  fetchData(line, date) {
    const vehiclePath = `${CONFIG.RAILSTATS_API}/tracking/${line}?date=${date}`;
    prepareObservations(vehiclePath, this.updateTrips);

    const schedulePath = `${CONFIG.RAILSTATS_API}/schedule/${line}?date=${date}`;
    prepareSchedule(schedulePath, line, this.updateSchedule);
  }

  updateTrips(trips0, trips1) {
    this.setState({ trips: [trips0, trips1] });
  }

  updateSchedule(trips0, trips1, minTime, maxTime) {
    this.setState({ schedule: [trips0, trips1], minTime, maxTime });
  }

  render() {
    const {
      trips,
      schedule,
      minTime,
      maxTime,
    } = this.state;
    const { direction, line } = this.props;
    return (
      <div>
        {trips && schedule ? (
          <div>
            {direction === 0 && (
              <Highchart
                observations={trips[0].concat(schedule[0])}
                min={minTime}
                max={maxTime}
                direction={0}
                line={line}
              />
            )}
            {direction === 1 && (
              <Highchart
                observations={trips[1].concat(schedule[1])}
                min={minTime}
                max={maxTime}
                direction={1}
                line={line}
              />
            )}
          </div>
        ) : (
          <LinearIndeterminate />
        )}
      </div>
    );
  }
}

export default DataParser;
