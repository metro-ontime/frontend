import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const labelMap = {
  '1_min': 'Trains running within 1 minute of schedule',
  '2_min': 'Trains running between 1 - 2 minutes ahead or behind schedule',
  '3_min': 'Trains running between 2 - 3 minutes ahead or behind schedule',
  '4_min': 'Trains running between 3 - 4 minutes ahead or behind schedule',
  '5_min': 'Trains running between 4 - 5 minutes ahead or behind schedule',
  '>5_mins': 'Trains running more than 5 minutes ahead or behind schedule',
};

class OnTimePie extends Component {
  render() {
    const { bins, total, selected } = this.props;
    const colors = [
      '#00ff00',
      '#ffff00',
      '#ff9900',
      '#ff0000',
      '#550055',
      '#000000',
    ];
    const binList = Object.keys(bins).map(key => ({ name: key, value: bins[key] }));

    const selectedValue = bins[selected];
    const selectedPercent = Math.round(selectedValue / total * 1000) / 10;

    const separated = {};
    separated[binList[0].name] = Math.round(binList[0].value / total * 1000) / 10;
    binList.reduce((acc, currentValue) => {
      separated[currentValue.name] = Math.round(
        (currentValue.value - acc.value) / total * 1000
      ) / 10;
      return currentValue;
    });
    separated['>5_mins'] = Math.round((total - binList[4].value) / total * 1000) / 10;
    const observations = Object.keys(separated).map((key, index) => ({
      name: labelMap[key],
      y: separated[key],
      color: colors[index],
    }));
    const options = {
      title: {
        text: '',
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          size: '100%',
        },
      },
      tooltip: {
        crosshairs: [true, true],
        formatter() {
          if (this.point.name) {
            return `<b>${this.point.y}%</b><br>${this.point.name}`;
          }
          return false;
        },
      },
      series: [
        {
          innerSize: '45%',
          name: 'Bins',
          data: observations.reverse(),
        },
        {
          innerSize: '80%',
          name: '',
          data: [{ y: 100, color: '#ffffff', name: '' }],
        },
        {
          innerSize: '90%',
          name: '',
          data: [{ y: selectedPercent, color: '#99e0ff', name: 'Trains within selected window' }, { y: (100 - selectedPercent), color: '#ffffff', name: '' }].reverse(),
        },
      ],
      chart: {
        height: '100%',
        margin: 0,
        padding: 0,
        type: 'pie',
        backgroundColor: null,
      },
      credits: {
        enabled: false,
      },
    };

    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        callback={(chart) => { chart.reflow(); }}
      />
    );
  }
}

export default OnTimePie;
