import React from 'react';
import Layout from '~/components/Layout';
import HistoryTable from "~/components/HistoryTable";
import HistoryChart from "~/components/charts/HistoryChart";
import { AppBar, Button, Tab, Tabs, Grid, Typography, Card, Select, MenuItem, ListItemAvatar, Avatar } from '@material-ui/core';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { lines, linesByName } from '../helpers/LineInfo.js';
import { prepareNetworkData } from "../helpers/PrepareData"
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    flexGrow: 1,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  card: {
    maxWidth: 1200,
    margin: 'auto',
    marginTop: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: ".5em",
    marginBottom: '-.25em',
  },
  header: {
    marginLeft: "1.6em",
    fontSize: 16,
  },
  avatar: {
    width: 16,
    height: 16,
    marginRight: ".5em"
  },
  headerContainer: {
    paddingBottom: "1em",
    display: "flex",
    alignItems: "flex-end",
    flexWrap: "wrap"
  },
  chartContainer: {
    margin: "auto",
    width: "90%",
    paddingTop:"3em",
    paddingBottom:"3em"
  }
});

const deriveLine = (data, line) => {
    if (line === "All Lines") {
      return data.map(datum => prepareNetworkData(datum))
    } else {
      const lineNum = linesByName[line].id;
      return data.map(datum => datum[`${lineNum}_lametro-rail`]);
    }
}

const deriveXAxis = (data, axisLabel) => {
  let weekDayArr = [[],[],[],[],[],[],[]]
  switch(axisLabel) {
    case "Weekday Average":
      
      for (let item of data) {
        weekDayArr[new Date(item.date).getDay()].push(item);
      }
      return weekDayArr;
    case "Weekly Average":
      for (let item of data) {
        weekDayArr[new Date(item.date).getDay()].push(item);
      }
      return weekDayArr;
    default:
       return data;
  }
}

const getAverageStats = (arr) => {
  const avgWait = arr.reduce((acc, currItem) => acc + currItem.mean_time_between, 0) / arr.length / 60;
  const avgOneMin = arr.reduce((acc, currItem) => acc + currItem.ontime["1_min"] / currItem.total_arrivals_analyzed, 0) / arr.length * 100;
  const avgFiveMin = arr.reduce((acc, currItem) => acc + currItem.ontime["5_min"] / currItem.total_arrivals_analyzed, 0) / arr.length * 100;
  return {
    avgWait,
    avgOneMin,
    avgFiveMin
  }
}

const deriveYAxis = (data, axisLabel) => {
  const formattedData = data.map(item => getAverageStats(item));
  switch(axisLabel) {
    case "Average Wait Time":
      return formattedData.map((item, i) => {
        return item.avgWait;
      });
    case "% Within 1 Minute":
      return formattedData.map((item, i) => {
        return item.avgOneMin;        
      });
    case "% Within 5 Minutes":
    return formattedData.map((item, i) => {
        return item.avgFiveMin;
      });
    default:
       return data;
  }
}

const prepareHistoryData = (data) => {
    return data.slice(0,data.length).reverse().map((item,i) => Object.assign(item,{ id: i }))
}

class History extends React.Component {
  state = {
    rows: [],
    graphData: [],
    line: "All Lines",
    xAxis: "Weekday Average",
    xTickFormat: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    yAxis: "Average Wait Time",
    yTickFormat: { formatter: function() { return `${this.value} min`; } },
    dataFormat: "chart",
    value: 0,
    color: "#dddddd"
  };

  static async getInitialProps({ query, res }) {
    const { data } = await axios.get('http://localhost:8080/history');
    const formattedData = Object.values(data);
    return { query, formattedData };
  }

  static getDerivedStateFromProps (props, state) {
    if (!state.rows[0] && !state.graphData[0]) {
      return {
        rows: prepareHistoryData(props.formattedData.map(datum => prepareNetworkData(datum))),
        graphData: deriveYAxis(deriveXAxis(deriveLine(props.formattedData, state.line), state.xAxis), state.yAxis)
      }
    }
    return null;
  }


  handleLineChange = event => {
    this.setState({ line: event.target.value,
                    color: linesByName[event.target.value]["color"],
                    rows: prepareHistoryData(deriveLine(this.props.formattedData, event.target.value)),
                    graphData: deriveYAxis(deriveXAxis(deriveLine(this.props.formattedData, event.target.value), this.state.xAxis), this.state.yAxis)
                 });
  };

  handleXAxisChange = event => {
    this.setState({ xAxis: event.target.value,
                    graphData: deriveYAxis(deriveXAxis(deriveLine(this.props.formattedData, this.state.line), event.target.value), this.state.yAxis),
                 });
  };

  handleYAxisChange = event => {
    this.setState({ yAxis: event.target.value,
                    graphData: deriveYAxis(deriveXAxis(deriveLine(this.props.formattedData, this.state.line), this.state.xAxis), event.target.value),
                    
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
    const { rows, dataFormat, xTickFormat, yTickFormat, color, graphData } = this.state;
    const links = lines.map((line,i) => (
            <MenuItem value={`${line.name}`} key={i}>
              <div style={{display: "flex", alignItems: "center"}}>
              <ListItemAvatar>
                <Avatar className={ classes.avatar }>
                  <div
                    style={{
                      backgroundColor: line.color,
                      width: '100%',
                      padding: 0,
                      height: '100%',
                      margin: 0,
                      borderRadius: '50%',
                    }}
                  />
                </Avatar>
              </ListItemAvatar>
              {line.name}
              </div>
            </MenuItem>
    ));

    return (
      <Layout
        pageTitle="History"
        toolbarTitle="History"
      > 
        <Card className={classes.card}>
          <div className={classes.headerContainer}>
          <div>
          <Typography className={classes.header} inline={true}>View Data for
          </Typography>
          <Select
            value={this.state.line}
            onChange={this.handleLineChange}
            name="line"
            className={classes.selectEmpty}
          >
            <MenuItem value={"All Lines"}>
              <div style={{display: "flex", alignItems: "center"}}>
              <ListItemAvatar>
                <Avatar className={ classes.avatar }>
                  <div
                    style={{
                      backgroundColor: '#dddddd',
                      width: '100%',
                      padding: 0,
                      height: '100%',
                      margin: 0,
                      borderRadius: '50%',
                    }}
                  />
                </Avatar>
              </ListItemAvatar>
              All Lines
              </div>
            </MenuItem>
            {links}
          </Select>
          </div>
          { dataFormat === "chart" ?
          <React.Fragment>
          <div>
          <Typography className={classes.header} inline={true}>X-Axis:
          </Typography>
          <Select
            value={this.state.xAxis}
            onChange={this.handleXAxisChange}
            name="xAxis"
            className={classes.selectEmpty}
          >
            <MenuItem value={"Weekday Average"}>Weekday Average
            </MenuItem>
            <MenuItem value={"Weekly Average"}>Weekly Average
            </MenuItem>
          </Select>
          </div>
          <div>
          <Typography className={classes.header} inline={true}>Y-Axis:
          </Typography>
          <Select
            value={this.state.yAxis}
            onChange={this.handleYAxisChange}
            name="yAxis"
            className={classes.selectEmpty}
          >
            <MenuItem value={"Average Wait Time"}>Average Wait Time
            </MenuItem>
            <MenuItem value={"% Within 1 Minute"}>% Within 1 Minute
            </MenuItem>
            <MenuItem value={"% Within 5 Minutes"}>% Within 5 Minutes
            </MenuItem>
          </Select>
          </div>
          </React.Fragment>
          : ""
          }
        </div>
        </Card>
        <Card className={classes.card}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={8}>
            </Grid>
            <Grid item xs={4}>
              <AppBar position="static" color="default">
              <Tabs
                value={this.state.dataFormat}
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
