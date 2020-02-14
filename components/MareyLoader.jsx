import React from 'react';
import CONFIG from '~/config';
import Marey from './charts/Marey';
import { select, selectAll } from 'd3-selection'
import { min, max, group } from 'd3-array'
import { csv } from 'd3-fetch'

class MareyLoader extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { line, date, direction } = this.props;
    this.fetchData(line, date, direction);
  }
   
  componentDidUpdate(prevProps) {
    const { date, line, direction } = this.props;
    this.fetchData(line, date, direction);
  }

  fetchData(line, date, direction) {
    const vehiclePath = `${CONFIG.RAILSTATS_API}/tracking/${line}?date=${date}`;
    const schedulePath = `${CONFIG.RAILSTATS_API}/schedule/${line}?date=${date}`;
    const stationPath = `https://raw.githubusercontent.com/metro-ontime/performance_tracker/master/data/line_info/${line}/${line}_${direction}_stations.csv`;
    Promise.all([csv(vehiclePath), csv(schedulePath), csv(stationPath)])
      .then(arr => {
        const tracking = arr[0]
        const schedule = arr[1]
        const stations = this.prepareStations(arr[2], direction)
        const vehicleTrips = this.prepareTrips(tracking)
        const scheduleTrips = this.prepareScheduleTrips(schedule, stations, direction)
        const minDatetime = min(schedule, d => d.datetime)
        const maxDatetime = max(schedule, d => d.datetime)
        const timeDomain = [new Date(minDatetime), new Date(maxDatetime)]
        const width = ({ xl: 1850, lg: 1100, md: 900, sm: 550 })[this.props.width]
        this.diagram = new Marey(scheduleTrips, vehicleTrips, stations, timeDomain, direction, width, 1000)
        select(this.node).call(this.diagram.draw)
      })
      .catch(err => {
        console.log(err)
        select(this.node).selectAll('svg').remove()
      })
  }

  prepareStations(stations, direction) {
    return stations.map(station => ({
      ...station,
      relative_position: direction === 0 ? station.relative_position : 1 - station.relative_position
    }))
  }

  prepareTrips(observations) {
    return Array.from(group(observations, d => d.trip_id), ([trip_id, trip]) => {
      return ({
        path: trip.map(obs => ({
          datetime: obs.datetime,
          position: parseInt(obs.direction_id) === 0 ? obs.relative_position : 1 - obs.relative_position
        })),
        direction: parseInt(trip[0].direction_id)
      })
    })
  }

  prepareScheduleTrips(schedule, stations, direction) {
    const trips = Array.from(group(schedule, d => d.direction_id, d => d.trip_id), ([direction_id, trips]) => ({ direction_id, trips }))
      .find(el => parseInt(el.direction_id) === direction)
      .trips
    return Array.from(trips, ([trip_id, trip]) => trip)
      .map(trip => {
        return ({
          path: trip.map(stop => ({
            datetime: stop.datetime,
            position: stations.find(station => parseInt(station.stop_id) === parseInt(stop.stop_id)).relative_position,
          })),
          direction: direction
        })
      })
  }

  render() {
    return <div ref={node => { this.node = node }} style={{
      width: '100%',
      height: 1000,
      display: 'flex',
      justifyContent: 'center',
      background: 'white',
      borderRadius: '4px',
      boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
    }}></div>
  }
}

export default MareyLoader
