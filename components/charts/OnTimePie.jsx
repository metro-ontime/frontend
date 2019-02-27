import React, { Component } from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class OnTimePie extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const colors = [
      '#00ff00',
      '#ffff00',
      '#ff9900',
      '#ff0000',
      '#550055'
    ];
    const bins = Object.keys(this.props.bins).map((key) => ({ name: key, value: this.props.bins[key] }));

    const separated = {};
    separated[bins[0]["name"]] = bins[0]["value"] / this.props.total * 100;
    bins.reduce((acc, currentValue) => {
      separated[currentValue["name"]] = (currentValue["value"] - acc["value"]) / this.props.total * 100;
      return currentValue
    });
    const observations = Object.keys(separated).map((key, index) => {
      return {
        name: key,
        y: separated[key],
        color: colors[index]
      }
    });
    const options = {
      title: {
        text: ''
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        data: observations.reverse()
      }],
      chart: {
        height: '100%',
        margin: 0,
        padding: 0,
        type: 'pie',
        backgroundColor: null,
      },
      credits: {
        enabled: false
      }
    }

    return <HighchartsReact highcharts={Highcharts} options={options} callback={chart => {chart.reflow()}}/>;
  }
}

export default OnTimePie;
