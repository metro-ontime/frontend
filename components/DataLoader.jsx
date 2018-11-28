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
      axios.get('http://s3-us-west-1.amazonaws.com/h4la-metro-performance/sample_schedule.json'),
      axios.get('http://s3-us-west-1.amazonaws.com/h4la-metro-performance/sample_trips.json')])
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
        { this.state
        && schedule
        && trips
        && (
          <div>
            <div className="date">
              <b>Date: </b>
              Tuesday, October 30, 2018
              (vertical axes showing incorrect times due to timezone error)
            </div>
            <Marey
              schedule={schedule}
              trips={trips}
              dates={{ min: '2018-10-29 23:00:00', max: '2018-10-30 02:00:00' }}
              size={[1200, 2000]}
              direction="804 - Azusa / Citrus"
            />
          </div>
        )
        }
        <style jsx>
          {`
            .date {
              font-weight: 200;
              padding: 0 0 1em;
            }
          `}
        </style>
      </div>
    );
  }
}

export default DataLoader;
