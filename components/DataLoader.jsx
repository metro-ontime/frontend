import React, { Component } from 'react';
import axios from 'axios';
import Marey from './charts/Marey';

class DataLoader extends Component {
  constructor(props) {
    super(props);
    this.state = { schedule: null, trips: null };
  }

  componentDidMount() {
    axios.all([
      axios.get('static/sample_data/sample_schedule.txt'),
      axios.get('static/sample_data/sample_trips.txt')])
      .then(axios.spread((schedule, actual) => {
        const scheduleJSON = JSON.parse(schedule.data);
        const actualJSON = JSON.parse(actual.data);
        this.setState({ schedule: scheduleJSON, trips: actualJSON });
      }));
  }

  render() {
    const { schedule, trips } = this.state;
    return (
      <div>
        <Marey
          schedule={schedule}
          trips={trips}
          dates={{ min: '2018-10-29 23:00:00', max: '2018-10-30 02:00:00' }}
          size={[1200, 2000]}
          direction="804 - Azusa / Citrus"
        />
      </div>
    );
  }
}

export default DataLoader;
