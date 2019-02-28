import React, { Component } from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const labelMap = {
  '1_min': 'Trains running within 1 minute of schedule',
  '2_min': 'Trains running between 1 - 2 minutes ahead or behind schedule',
  '3_min': 'Trains running between 2 - 3 minutes ahead or behind schedule',
  '4_min': 'Trains running between 3 - 4 minutes ahead or behind schedule',
  '5_min': 'Trains running between 4 - 5 minutes ahead or behind schedule',
  '>5_mins': 'Trains running more than 5 minutes ahead or behind schedule'
};

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
      '#550055',
      '#000000'
    ];
    const bins = Object.keys(this.props.bins).map((key) => ({ name: key, value: this.props.bins[key] }));

    const selectedValue = this.props.bins[this.props.selected];
    const selectedPercent = Math.round(selectedValue / this.props.total * 1000) / 10;

    const separated = {};
    separated[bins[0]["name"]] = Math.round(bins[0]["value"] / this.props.total * 1000) / 10;
    bins.reduce((acc, currentValue) => {
      separated[currentValue["name"]] = Math.round((currentValue["value"] - acc["value"]) / this.props.total * 1000) / 10;
      return currentValue
    });
    separated[">5_mins"] = Math.round((this.props.total - bins[4]["value"]) / this.props.total * 1000) / 10;
    const observations = Object.keys(separated).map((key, index) => {
      console.log(separated[key]);
      return {
        name: labelMap[key],
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
          },
          size: '100%'
        }
      },
      tooltip: {
        crosshairs: [true, true],
        formatter: function() {
          if (this.point.name) {
            return `<b>${this.point.y}%</b><br>${this.point.name}`
          } else {
            return false
          }
        }
      },
      series: [
        {
          innerSize: '45%',
          name: 'Bins',
          data: observations.reverse()
        },
        {
          innerSize: '80%',
          name: '',
          data: [{y: 100, color: '#ffffff', name: ''}]
        },
        {
          innerSize: '90%',
          name: '',
          data: [{y: selectedPercent, color: '#99e0ff', name: 'Trains within selected window'}, {y: (100 - selectedPercent), color: '#ffffff', name: ''}].reverse()
        }
      ],
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
