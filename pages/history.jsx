import React from 'react';
import Layout from '~/components/Layout';
import HistoryMenu from "~/components/HistoryMenu";
import HistoryTable from "~/components/HistoryTable";
import HistoryChart from "~/components/charts/HistoryChart";
import { AppBar, Button, Tab, Tabs, Grid, Typography, Card, Select, MenuItem, ListItemAvatar, Avatar } from '@material-ui/core';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { linesByName } from '../helpers/LineInfo.js';
import { dateToString, deriveLine, deriveXAxis, deriveYAxis, prepareTableData } from "../helpers/formatHistory"
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    flexGrow: 1,
  },
  card: {
    maxWidth: 1200,
    margin: 'auto',
    marginTop: 20,
  },
  chartContainer: {
    margin: "auto",
    width: "90%",
    paddingTop:"3em",
    paddingBottom:"3em"
  }
});

class History extends React.Component {
  state = {
    rows: [],
    graphData: [],
    line: "All Lines",
    xAxis: "Last 30 Days",
    xTickFormat: new Array(30).fill("").map((item, i) => dateToString(30-i)),
    yAxis: "Average Wait Time",
    yTickFormat: { formatter: function() { return `${this.value} min`; } },
    dataFormat: "chart",
    value: 0,
    color: "#dddddd"
  };

  static async getInitialProps({ query, res }) {
    const { data } = await axios.get('http://localhost:8080/history');
    const formattedData = Object.values(data[0]);
    const allLineData = data[1];
    return { query, allLineData, formattedData };
  }

  static getDerivedStateFromProps (props, state) {
    if (!state.rows[0] && !state.graphData[0]) {
      return {
        rows: prepareTableData(props.allLineData),
        graphData: deriveYAxis(deriveXAxis(deriveLine(props.formattedData, state.line, props.allLineData), state.xAxis), state.yAxis)
      }
    }
    return null;
  }

  handleLineChange = event => {
    this.setState({ line: event.target.value,
                    color: linesByName[event.target.value]["color"],
                    rows: prepareTableData(deriveLine(this.props.formattedData, event.target.value, this.props.allLineData)),
                    graphData: deriveYAxis(deriveXAxis(deriveLine(this.props.formattedData, event.target.value, this.props.allLineData), this.state.xAxis), this.state.yAxis)
                 });
  };

  handleXAxisChange = event => {
    this.setState({ xAxis: event.target.value,
                    graphData: deriveYAxis(deriveXAxis(deriveLine(this.props.formattedData, this.state.line, this.props.allLineData), event.target.value), this.state.yAxis),
                 });
    if (event.target.value === "Weekday Average") {
      this.setState({ xTickFormat: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] });
    } else {
      this.setState({ xTickFormat: new Array(30).fill("").map((item, i) => dateToString(30-i)) });
    }
  };

  handleYAxisChange = event => {
    this.setState({ yAxis: event.target.value,
                    graphData: deriveYAxis(deriveXAxis(deriveLine(this.props.formattedData, this.state.line, this.props.allLineData), this.state.xAxis), event.target.value),
                    
                 });
    if (event.target.value === "Average Wait Time") {
      this.setState({ yTickFormat: { formatter: function() { 
                        return `${this.value} min`;
                      } 
                    } });
    } else {
      this.setState({ yTickFormat: { formatter: function() { 
                        return `${this.value}%`;
                      } 
                    } });
    }
  };

  handleTabChange = (event, value) => {
    this.setState({ dataFormat: value });
  };

  render() {
    const { classes } = this.props;
    const { line, rows, dataFormat, xTickFormat, yTickFormat, color, graphData, xAxis, yAxis } = this.state;
    return (
      <Layout
        pageTitle="History"
        toolbarTitle="History"
      >
        <HistoryMenu
          line={line}
          handleLineChange={this.handleLineChange}
          dataFormat={dataFormat}
          xAxis={xAxis}
          handleXAxisChange={this.handleXAxisChange}
          yAxis={yAxis}
          handleYAxisChange={this.handleYAxisChange}
        />
        <Card className={classes.card}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={8}>
            </Grid>
            <Grid item xs={4}>
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
          { dataFormat === "chart" ? 
          <div className={classes.chartContainer}>
          <HistoryChart
            graphData={graphData}
            color={color}
            xTickFormat={xTickFormat}
            yTickFormat={yTickFormat}
            yAxis={yAxis}
            />
          </div>
          :
          <HistoryTable rows={rows} />
          } 
        </Card>
      </Layout>
    );
  }
}

History.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(History);
