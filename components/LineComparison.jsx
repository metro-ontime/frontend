import React from "react";
import { Card, Typography, MenuItem, Select, Avatar, ListItemAvatar } from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';
import HistoryChart from "~/components/charts/HistoryChart"
import { dateToString, deriveLine, deriveXAxis, deriveYAxis, prepareTableData } from "../helpers/formatHistory"
import { lineLinks, linesByName } from '../helpers/LineInfo.js';

const styles = theme => ({
  card: {
    maxWidth: 1200,
    margin: 'auto',
    marginTop: 20,
  },
  chartContainer: {
    margin: "auto",
    width: "100%",
    marginTop:"1em",
    marginBottom:"1em",
    paddingTop: "2em",
    paddingBottom: "2em",
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: "#f8f8f8"
  },
  headerContainer: {
    marginTop: "1em",
    paddingBottom: "1em",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  header: {
    fontSize: 36,
    marginBottom: '-.25em',
    textAlign: 'center'   
  },
  compareText: {
    fontSize: 16,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: ".5em",
    marginBottom: '-.25em',
  },
  avatar: {
    width: 16,
    height: 16,
    marginRight: ".5em"
  },
  slider: {
    padding: '22px 0px',
  },
  sliderContainer: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class LineComparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      allLineGraph: [],
      line: 'Blue',
      xAxis: "All Daily Data",
      xTickFormat: [],
      yAxis: "% Within 5 Minutes",
      yTickFormat: { formatter: function() { return `${this.value}%`; } },
      color: '#2461aa',
      value: 3,
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (!state.graphData[0] && !state.allLineGraph[0]) {
      return { 
        graphData: deriveYAxis(deriveXAxis(deriveLine(props.formattedData, state.line, props.allLineData), state.xAxis), state.yAxis),
        allLineGraph: deriveYAxis(deriveXAxis(deriveLine(props.formattedData, "All Lines", props.allLineData), state.xAxis), state.yAxis),      
      }
    }
    return null;
  }

  handleSlide = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.setState(prevState => ({
      xTickFormat: prevState.graphData.map((item,i) => {
        return dateToString(prevState.graphData.length - 1 - i)
      })
    }))
  }

  handleLineChange = event => {
    this.setState({ line: event.target.value,
                    color: linesByName[event.target.value]["color"],
                    graphData: deriveYAxis(deriveXAxis(deriveLine(this.props.formattedData, event.target.value, this.props.allLineData), this.state.xAxis), this.state.yAxis)
                 });
  };

  render() {
    const { classes } = this.props;
    const { value, graphData, allLineGraph, color, xTickFormat, yTickFormat, yAxis, line } = this.state;
    
    return (
      <Card>
        <div className={classes.headerContainer}>
          <Typography className={classes.header}>
            All Line Performance Chart
          </Typography>
          <div>
            <Typography className={classes.compareText} inline={true}>
              Compare:
            </Typography>
            <Select
              value={line}
              onChange={this.handleLineChange}
              name="line"
              className={classes.selectEmpty}
            >
              {lineLinks(classes)}
            </Select>
          </div>
        </div>
        <div className={classes.chartContainer}>
          <HistoryChart
            chartFormat={'line'}
            bgColor={'#f8f8f8'}
            graphData={graphData}
            color={color}
            xTickFormat={xTickFormat}
            yTickFormat={yTickFormat}
            yAxis={yAxis}
            secondSeries={{
              name: '',
              color: "#c8c8c8",
              data: allLineGraph
            }}
            />
        </div>
        <div className={classes.sliderContainer}>
          <Slider
            classes={{ container: classes.slider }}
            value={value}
            min={0}
            max={6}
            step={1}
            onChange={this.handleSlide}
          />
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(LineComparison);
