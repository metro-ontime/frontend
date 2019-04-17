import React, { Component } from 'react';
import Highchart from './charts/Highchart';
import LinearIndeterminate from './LinearIndeterminate';
import { prepareObservations, prepareSchedule } from '../helpers/PrepareData';
import { whenListAllObjects, whenGotS3Object } from '../helpers/DataFinder';

class DataParser extends Component {
  constructor(props) {
    super(props);
    this.state = { trips: null, schedule: null, minTime: null, maxTime: null };
    this.updateTrips = this.updateTrips.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(line, date) {
    const vehiclePath = `https://s3-us-west-1.amazonaws.com/h4la-metro-performance/data/vehicle_tracking/processed/${line}_lametro-rail/${date}.csv`;
    prepareObservations(vehiclePath, this.updateTrips);

    const schedulePath = `https://s3-us-west-1.amazonaws.com/h4la-metro-performance/data/schedule/${line}_lametro-rail/${date}.csv`;
    prepareSchedule(schedulePath, line, this.updateSchedule);
  }

  componentDidMount() {
    this.fetchData(this.props.line, this.props.date)
  }

  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date || this.props.line !== prevProps.line) {
      this.setState({ trips: null, schedule: null, minTime: null, maxTime: null });
      this.fetchData(this.props.line, this.props.date);
    }
  }

  updateTrips(trips0, trips1) {
    this.setState({ trips: [trips0, trips1] });
  }

  updateSchedule(trips0, trips1, minTime, maxTime) {
    this.setState({ schedule: [trips0, trips1], minTime: minTime, maxTime: maxTime });
  }

  render() {
    return (
      <div>
        {this.state.trips && this.state.schedule ? (
          <div>
            {this.props.direction == 0 && <Highchart observations={this.state.trips[0].concat(this.state.schedule[0])} min={this.state.minTime} max={this.state.maxTime} direction={ 0 } line={ this.props.line }/>}
            {this.props.direction == 1 && <Highchart observations={this.state.trips[1].concat(this.state.schedule[1])} min={this.state.minTime} max={this.state.maxTime} direction={ 1 } line={ this.props.line }/>}
          </div>
        ) : (
          <LinearIndeterminate />
        )}
      </div>
    );
  }
}

export default DataParser;
