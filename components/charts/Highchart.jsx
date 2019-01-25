import React, { Component } from 'react';
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


class Highchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.setState({ data: this.props.data })
  }

  render() {
    const options = {
      title: {
        text: ''
      },
      series: this.state.data,
      chart: {
        height: "300%"
      },
      legend: {
        enabled: false
      }
    };
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    )
  }
}

export default Highchart;
