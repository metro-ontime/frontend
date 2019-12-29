import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment-timezone';
import stopPositions from '~/helpers/StopPositions';
import positionStops from '~/helpers/PositionStops';

class Highchart extends Component {
  render() {
    const {
      line,
      direction,
      min,
      max,
      observations,
    } = this.props;
    const ticks = stopPositions[`${line}_${direction}`];

    // This technique is a bit of a hack!
    // We need to access the stop name by it's position as a float
    // From "tickPositions" below
    // So we are creating a simplified dictionary derived from
    // the PositionStops object
    const positionsForLineDir = positionStops[`${line}_${direction}`];
    const stopsByPosition = Object.keys(positionsForLineDir).map((pos) => {
      const posStr = parseFloat(pos).toFixed(3);
      const name = positionsForLineDir[pos].stop_name;
      return { pos: posStr, name };
    });

    const posToStopNames = stopsByPosition.reduce((map, obj) => {
      const newMap = map;
      newMap[obj.pos] = obj.name;
      return newMap;
    }, {});

    const tickPositions = Object.keys(ticks).map((stop) => {
      const pos = ticks[stop].relative_position;
      return pos;
    });

    const options = {
      title: {
        text: '',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: false,
          },
        },
      },
      tooltip: {
        crosshairs: [true, true],
        formatter() {
          if (this.point.name) {
            const time = `${moment(this.y)
              .tz('America/Los_Angeles')
              .format('h:mma')}`;
            return `<b>${this.point.name}</b><br>Scheduled arrival: ${time}`;
          }
          return false;
        },
      },
      xAxis: {
        reversed: !!direction,
        gridLineWidth: 1,
        tickPositions,
        opposite: true,
        tickPosition: 'inside',
        min: 0,
        max: 1,
        labels: {
          rotation: -90,
          style: {
            width: '200px',
          },
          formatter() {
            const index = this.value.toFixed(3);
            const name = posToStopNames[index];
            return name.replace(' Station', '');
          },
        },
      },
      yAxis: {
        reversed: true,
        type: 'datetime',
        min,
        max,
        title: {
          text: 'Time',
        },
        labels: {
          formatter() {
            return `${moment(this.value)
              .tz('America/Los_Angeles')
              .format('h:mma')}`;
          },
        },
      },
      series: observations,
      chart: {
        height: '500%',
        backgroundColor: '#f5f5f5',
        borderColor: '#999999',
        borderWidth: 2,
        spacing: [50, 50, 50, 50],
      },
      legend: {
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

export default Highchart;
