import React, { Component } from 'react';
import Papa from 'papaparse';
import DataFrame from 'dataframe-js';
import Highchart from './charts/Highchart';
import LinearIndeterminate from './LinearIndeterminate';

class DataParser extends Component {

  constructor(props) {
    super(props);
    this.state = { trips: null };
    this.updateTrips = this.updateTrips.bind(this);
  }

  componentDidMount() {
    // Should be run as web worker?
    var csvFilePath = "../static/sample_data/trips_latest.csv";
    DataFrame.fromCSV(`https://s3-us-west-1.amazonaws.com/h4la-metro-performance/data/vehicle_tracking/processed/${this.props.line}_lametro-rail/2019-01-30.csv`).then(df => {
      df = df.cast('relative_position', Number);
      df = df.cast('direction_id', Number);
      let direction0 = df.where(row => row.get('direction_id') == 0);
      let direction1 = df.where(row => row.get('direction_id') == 1);

      direction0 = direction0.groupBy('trip_id').toCollection();
      direction1 = direction1.groupBy('trip_id').toCollection();

      const collectTrip = (trip) => {
        const theTrip = trip.group.toCollection().map((row) => [row.relative_position, new Date(row.datetime).getTime()]);
        return { data: theTrip }
      };

      const trips0 = direction0.map(collectTrip);
      const trips1 = direction1.map(collectTrip);
      this.updateTrips(trips0, trips1);
    });
  }

  updateTrips(trips0, trips1) {
    this.setState({trips: [trips0, trips1]});
  }

  render() {
    return (
      <div>
        { this.state.trips ? 
            <div>
              { this.props.direction == 0 && (
                <Highchart data={ this.state.trips[0] }/>
              )}
              { this.props.direction == 1 && (
                <Highchart data={ this.state.trips[1] }/>
              )}
            </div>
            :
            <LinearIndeterminate />
        }
      </div>
    )
  }
}

export default DataParser;

