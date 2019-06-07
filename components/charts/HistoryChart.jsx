import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const styles = () => ({
  card: {
    maxWidth: 1200,
    margin: 'auto',
    marginTop: 20,
  },
});

const HistoryChart = (props) => {
  const {
    bgColor,
    chartFormat,
    xTickFormat,
    yTickFormat,
    graphData,
    color,
    yAxis,
    secondSeries,
  } = props;

  const series = [{
    name: '',
    color,
    data: graphData,
  }];
  if (secondSeries) series.push(secondSeries);

  const options = {
    chart: {
      type: chartFormat,
      backgroundColor: bgColor,
      plotBackgroundColor: bgColor,
    },
    title: {
      text: '',
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    xAxis: {
      categories: xTickFormat,
    },
    yAxis: {
      title: '',
      labels: yTickFormat,
      min: 0,
      max: yAxis === 'Average Wait Time' ? 30 : 100,
    },
    series,
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      key={Math.random()}
    />
  );
};

export default withStyles(styles)(HistoryChart);
