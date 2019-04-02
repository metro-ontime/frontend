import React from "react";
import { Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const styles = theme => ({
  card: {
    maxWidth: 1200,
    margin: 'auto',
    marginTop: 20,
  },
});

class HistoryChart extends React.Component {
  render() {
    const { classes, xTickFormat, yTickFormat, graphData, color, yAxis } = this.props;
    const options = {
        chart: {
            type: 'column'
        },
        title: {
          text: '',
        },
        legend: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        xAxis: {
          categories: xTickFormat
        },
        yAxis: {
          title: '',
          labels: yTickFormat,
          min: 0,
          max: yAxis === "Average Wait Time" ? 30 : 100
        },
        series: [{
          name: '',
          color: color,
          data: graphData
        }]
    }
    return <HighchartsReact 
                 highcharts={Highcharts} 
                 options={options}
                 key={Math.random()} />
  }
}

export default withStyles(styles)(HistoryChart);
