import React from 'react';
import HistoryMenu from './HistoryMenu';
import HistoryTable from './HistoryTable';
import HistoryChart from '~/components/charts/HistoryChart';
import {
  AppBar, Tab, Tabs, Grid, Card,
} from '@material-ui/core';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  dateToString, deriveLine, deriveXAxis, deriveYAxis, prepareTableData,
} from '~/helpers/formatHistory';
import { linesByName } from '~/helpers/LineInfo';
import PropTypes from 'prop-types';
import CONFIG from '~/config';

const styles = () => ({
  chartContainer: {
    margin: 'auto',
    width: '90%',
    paddingTop: '3em',
    paddingBottom: '3em',
  },
});

class History extends React.Component {
  state = {
    rows: [],
    graphData: [],
    xAxis: 'Last 30 Days',
    xTickFormat: new Array(30).fill('').map((item, i) => dateToString(30 - i)),
    yAxis: 'Average Wait Time',
    yTickFormat: { formatter() { return `${this.value} min`; } },
    dataFormat: 'chart',
    formattedData: [],
    allLineData: [],
  };

  async componentDidMount() {
    const { data } = await axios.get(`${CONFIG.RAILSTATS_API}/history`);
    const formattedData = Object.values(data[0]);
    const allLineData = data[1];
    this.setState({
      formattedData,
      allLineData,
    });
  }

  static getDerivedStateFromProps(props, state) {
    const {
      rows,
      graphData,
      xAxis,
      yAxis,
      formattedData,
      allLineData,
    } = state;
    const { line } = props;

    if (!rows[0] && !graphData[0]) {
      return {
        rows: prepareTableData(allLineData),
        graphData: deriveYAxis(
          deriveXAxis(
            deriveLine(formattedData, line, allLineData),
            xAxis,
          ),
          yAxis,
        ),
      };
    }
    return null;
  }

  handleXAxisChange = (event) => {
    const {
      yAxis, formattedData, allLineData,
    } = this.state;
    const { line } = this.props;
    this.setState({
      xAxis: event.target.value,
      graphData: deriveYAxis(
        deriveXAxis(
          deriveLine(formattedData, line, allLineData),
          event.target.value,
        ),
        yAxis,
      ),
    });
    if (event.target.value === 'Weekday Average') {
      this.setState({ xTickFormat: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] });
    } else {
      this.setState({ xTickFormat: new Array(30).fill('').map((item, i) => dateToString(30 - i)) });
    }
  };

  handleYAxisChange = (event) => {
    const {
      xAxis, formattedData, allLineData,
    } = this.state;
    const { line } = this.props;
    this.setState({
      yAxis: event.target.value,
      graphData: deriveYAxis(
        deriveXAxis(deriveLine(formattedData, line, allLineData), xAxis),
        event.target.value,
      ),
    });
    if (event.target.value === 'Average Wait Time') {
      this.setState({
        yTickFormat: {
          formatter() {
            return `${this.value} min`;
          },
        },
      });
    } else {
      this.setState({
        yTickFormat: {
          formatter() {
            return `${this.value}%`;
          },
        },
      });
    }
  };

  handleTabChange = (event, value) => {
    this.setState({ dataFormat: value });
  };

  render() {
    const { classes, line } = this.props;
    const {
      rows,
      dataFormat,
      xTickFormat,
      yTickFormat,
      graphData,
      xAxis,
      yAxis,
    } = this.state;
    const { color } = linesByName[line];
    return (
      <Card>
        <Grid container justify="center">
          <Grid item md={8} xs={12}>
            <HistoryMenu
              dataFormat={dataFormat}
              xAxis={xAxis}
              handleXAxisChange={this.handleXAxisChange}
              yAxis={yAxis}
              handleYAxisChange={this.handleYAxisChange}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <AppBar position="static" color="default">
              <Tabs
                value={dataFormat}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Chart" value="chart" />
                <Tab label="Table" value="table" />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        { dataFormat === 'chart' ? (
          <div className={classes.chartContainer}>
            <HistoryChart
              chartFormat="column"
              graphData={graphData}
              color={color}
              xTickFormat={xTickFormat}
              yTickFormat={yTickFormat}
              yAxis={yAxis}
            />
          </div>
        )
          : <HistoryTable rows={rows} />
        }
      </Card>
    );
  }
}

History.propTypes = {
  classes: PropTypes.object,
  line: PropTypes.string,
};

History.defaultProps = {
  line: 'All lines',
  classes: {},
};

export default withStyles(styles)(History);
