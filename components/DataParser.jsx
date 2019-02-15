import React, { Component } from 'react';
import Papa from 'papaparse';
import Highchart from './charts/Highchart';
import LinearIndeterminate from './LinearIndeterminate';
import { prepareObservations, prepareSchedule } from './PrepareData';

class DataParser extends Component {
  constructor(props) {
    super(props);
    this.state = { trips: null, schedule: null };
    this.updateTrips = this.updateTrips.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
  }

  componentDidMount() {
    // Should be run as web worker?
    const csvFilePath = '../static/sample_data/trips_latest.csv';
    const observationsPath = `https://s3-us-west-1.amazonaws.com/h4la-metro-performance/data/vehicle_tracking/processed/${ this.props.line }_lametro-rail/2019-01-30.csv`;
    const schedulePath = `https://s3-us-west-1.amazonaws.com/h4la-metro-performance/data/schedule/${ this.props.line }_lametro-rail/2019-01-30.csv`;
    prepareObservations(observationsPath, this.updateTrips);
    prepareSchedule(schedulePath, this.props.line, this.updateSchedule);
  }

  updateTrips(trips0, trips1) {
    this.setState({ trips: [trips0, trips1] });
  }

  updateSchedule(trips0, trips1) {
    this.setState({ schedule: [trips0, trips1] });
  }

  render() {
    return (
      <div>
        {this.state.trips && this.state.schedule ? (
          <div>
            {this.props.direction == 0 && <Highchart observations={this.state.trips[0].concat(this.state.schedule[0])} direction={ 0 } line={ this.props.line }/>}
            {this.props.direction == 1 && <Highchart observations={this.state.trips[1].concat(this.state.schedule[1])} direction={ 1 } line={ this.props.line }/>}
          </div>
        ) : (
          <LinearIndeterminate />
        )}
      </div>
    );
  }
}

export default DataParser;
