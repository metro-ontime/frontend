import React, { Component } from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment-timezone';

class Highchart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = {
      title: {
        text: '',
      },
      xAxis: {
        reversed: !!this.props.direction,
      },
      yAxis: {
        reversed: true,
        title: {
          text: 'Time',
        },
        labels: {
          formatter() {
            return `${moment(this.value)
              .tz('America/Los_Angeles')
              .format('HH:mm')}`;
          },
        },
      },
      series: this.props.data,
      chart: {
        height: '300%',
      },
      legend: {
        enabled: false,
      },
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}

export default Highchart;
