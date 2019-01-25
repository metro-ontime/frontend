import React, { Component } from 'react';
import Papa from 'papaparse';
import DataFrame from 'dataframe-js';
import Highchart from './charts/Highchart';
import LinearIndeterminate from './LinearIndeterminate';

class DataParser extends Component {

  constructor(props) {
    super(props);
    this.state = { data: null };
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    // Should be run as web worker?
    var csvFilePath = "../static/sample_data/trips_latest.csv";
    DataFrame.fromCSV('https://s3-us-west-1.amazonaws.com/h4la-metro-performance/data/vehicle_tracking/804_lametro-rail/trips_latest.csv').then(df => {
      df = df.cast('relative_position', Number);
      //df = df.cast('datetime_local_iso8601', Date);
      const grouped = df.groupBy('trip_id').toCollection();
      const trips = grouped.map((trip) => {
        const theTrip = trip.group.toCollection().map((row) => [row.relative_position, new Date(row.datetime_local_iso8601).getTime()]);
        return { data: theTrip }
      });
      this.updateData(trips);
    });
  }

  updateData(result) {
    const data = result;
    this.setState({data: data});
  }

  render() {
    if (this.state.data) {
      return <Highchart data={ this.state.data } />
    } else {
      return <LinearIndeterminate />
    }
    //return <LinearIndeterminate />
  }
}

export default DataParser;

