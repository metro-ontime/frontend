import React from 'react';
import CONFIG from '~/config';
import Marey from './Marey';
const d3 = require('d3');

export default class MareyLoader extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { line, date, direction } = this.props;
    this.fetchData(line, date, direction);
  }
   
  componentWillUpdate(prevProps) {
    const { date, line, direction } = this.props;
    if (date !== prevProps.date || line !== prevProps.line) {
      this.fetchData(line, date, direction);
    } else if (direction !== prevProps.direction) {
      this.diagram.changeDirection(direction)
    }
  }

  fetchData(line, date, direction) {
    const vehiclePath = `${CONFIG.RAILSTATS_API}/tracking/${line}?date=${date}`;
    const schedulePath = `${CONFIG.RAILSTATS_API}/schedule/${line}?date=${date}`;
    const stationPath = `https://raw.githubusercontent.com/metro-ontime/performance_tracker/master/data/line_info/${line}/${line}_${direction}_stations.csv`;
    Promise.all([d3.csv(vehiclePath), d3.csv(schedulePath), d3.csv(stationPath)])
      .then(arr => {
        const tracking = arr[0]
        const schedule = arr[1]
        const stations = arr[2]
        const vehicleTrips = this.prepareTrips(tracking)
        const scheduleTrips = this.prepareScheduleTrips(schedule, stations)
        const minDatetime = d3.min(schedule, d => d.datetime)
        const maxDatetime = d3.max(schedule, d => d.datetime)
        const timeDomain = [new Date(minDatetime), new Date(maxDatetime)]
        this.diagram = new Marey(scheduleTrips, vehicleTrips, stations, timeDomain)
        const svg = d3.select(this.node)
        this.diagram.draw(svg)
      })
  }

  prepareTrips(observations) {
    const trips = [];
    observations.reduce((acc, cur, idx) => {
      if (acc.trip_id !== cur.trip_id) {
        trips.push(acc);
        return { trip_id: cur.trip_id, path: [{ datetime: cur.datetime, position: cur.relative_position }], direction: cur.direction_id }
      } else {
        acc.path.push({ datetime: cur.datetime, position: cur.relative_position });
        return acc
      }
    }, { trip_id: observations[0].trip_id, path: [], direction: observations[0].direction_id });
    return trips
  }

  prepareScheduleTrips(schedule, stations) {
    const trips = [];
    schedule.reduce((acc, cur, idx) => {
      if (acc.trip_id !== cur.trip_id) {
        trips.push(acc);
        return { trip_id: cur.trip_id, path: [{ datetime: cur.datetime, position: stations.find(s => parseInt(s.stop_id) === parseInt(cur.stop_id)).relative_position }], direction: cur.direction_id }
      } else {
        acc.path.push({ datetime: cur.datetime, position: stations.find(s => parseInt(s.stop_id) === parseInt(cur.stop_id)).relative_position });
        return acc
      }
    }, { trip_id: schedule[0].trip_id, path: [], direction: schedule[0].direction_id });
    return trips
  }

  render() {
    return <svg ref={node => { this.node = node }} style={{ width: '100%', height: 1000 }}></svg>
  }
}
