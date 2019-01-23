import React, { Component } from 'react';
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


class Highchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: {
          text: ''
        },
        series: [{ data: [1,2,3] }],
        chart: {
          height: "100%"
        }
      }
    }
  }

  componentDidUpdate() {
    const arr = this.props.data.map((row, index) => {
      return { data: [index, row.relative_position] }
    });
    const options = {
      title: {
        text: ''
      },
      series: [arr],
      chart: {
        height: "100%"
      }
    };
    this.setState({ options: options })
  }

  render() {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={this.state.options}
      />
    )
  }
}

export default Highchart;
