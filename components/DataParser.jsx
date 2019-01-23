import React, { Component } from 'react';
import Papa from 'papaparse';
import Highchart from './charts/Highchart';

class DataParser extends Component {

  constructor(props) {
    // Call super class
    super(props);
    this.state = { data: null };
    // Bind this to function updateData (This eliminates the error)
    this.updateData = this.updateData.bind(this);
  }

  componentWillMount() {

    // Your parse code, but not seperated in a function
    var csvFilePath = "../static/sample_data/trips_latest.csv";
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData
    });
  }

  updateData(result) {
    const data = result.data;
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    this.setState({data: data}); // or shorter ES syntax: this.setState({ data });
  }

  render() {
    // Your render function
    return <Highchart data={ this.state.data } />
  }
}

export default DataParser;

