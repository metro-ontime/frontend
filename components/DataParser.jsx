import React, { Component } from 'react';
import Papa from 'papaparse';
import Highchart from './charts/Highchart';
import LinearIndeterminate from './LinearIndeterminate';
import { prepareObservations, prepareSchedule } from './PrepareData';
import { whenListAllObjects, whenGotS3Object } from './DataFinder';

class DataParser extends Component {
  constructor(props) {
    super(props);
    this.state = { trips: null, schedule: null, minTime: null, maxTime: null };
    this.updateTrips = this.updateTrips.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
  }

  componentDidMount() {
    const vehicleListParams = {Bucket: 'h4la-metro-performance', Prefix: `data/vehicle_tracking/processed/${this.props.line}_lametro-rail`};
    whenListAllObjects(vehicleListParams).then(objects => {
      const vehiclePath = `https://s3-us-west-1.amazonaws.com/h4la-metro-performance/${objects[objects.length - 1]}`;
      prepareObservations(vehiclePath, this.updateTrips);
    });

    const scheduleListParams = {Bucket: 'h4la-metro-performance', Prefix: `data/schedule/${this.props.line}_lametro-rail`};
    whenListAllObjects(scheduleListParams).then(objects => {
      const schedulePath = `https://s3-us-west-1.amazonaws.com/h4la-metro-performance/${objects[objects.length - 1]}`;
      prepareSchedule(schedulePath, this.props.line, this.updateSchedule);
    });
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
