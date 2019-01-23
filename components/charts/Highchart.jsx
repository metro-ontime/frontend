import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Papa from 'papaparse';

const options = {
  title: {
    text: ''
  },
  series: [
    {
      data: [1, 2, 3],
      color: '#cccccc',
    },
    {
      data: [1.5, 2.3, -0.8],
      color: '#cccccc',
    },
    {
      data: [2.5, 3.3, 4.8],
      color: '#cccccc',
    },
    {
      data: [8.5, 4.3, 0.8]
    },
    {
      data: [9.5, -2.3, -4.8]
    }
  ],
  chart: {
    height: "100%"
  }
}

const Highchart = () => <div>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
</div>

export default Highchart;
