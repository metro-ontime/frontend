import React from 'react';
import {
  Card,
  Typography,
  Select,
} from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';
import HistoryChart from '~/components/charts/HistoryChart';
import {
  dateToString,
  deriveLine,
  deriveXAxis,
  deriveYAxis,
} from '../helpers/formatHistory';
import { lineLinks, linesByName } from '~/helpers/LineInfo';

const styles = theme => ({
  card: {
    maxWidth: 1200,
    margin: 'auto',
    marginTop: 20,
  },
  chartContainer: {
    margin: 'auto',
    width: '100%',
    marginTop: '1em',
    marginBottom: '1em',
    paddingTop: '2em',
    paddingBottom: '2em',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    marginTop: '1em',
    paddingBottom: '1em',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  header: {
    fontSize: 36,
    marginBottom: '-.25em',
    textAlign: 'center',
  },
  compareText: {
    fontSize: 16,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: '.5em',
    marginBottom: '-.25em',
  },
  avatar: {
    width: 16,
    height: 16,
    marginRight: '.5em',
  },
  slider: {
    padding: '22px 0px',
  },
  sliderContainer: {
    width: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: '1em',
    paddingTop: '1em',
    textAlign: 'center',
  },
  trackBefore: {
    opacity: '.2',
  },
  trackAfter: {
    opacity: '1',
  },
});

class LineComparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      allLineGraph: [],
      line: 'Blue',
      xAxis: 'All Daily Data',
      xTickFormat: [],
      yAxis: '% Within 5 Minutes',
      yTickFormat: {
        formatter() {
          return `${this.value}%`;
        },
      },
      color: '#2461aa',
      value: 0,
      sliderLabel: 'All Time',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.graphData[0] && !state.allLineGraph[0]) {
      return {
        graphData: deriveYAxis(
          deriveXAxis(
            deriveLine(props.formattedData, state.line, props.allLineData),
            state.xAxis,
          ),
          state.yAxis,
        ),
        allLineGraph: deriveYAxis(
          deriveXAxis(
            deriveLine(props.formattedData, 'All Lines', props.allLineData),
            state.xAxis,
          ),
          state.yAxis,
        ),
      };
    }
    return null;
  }

  componentDidMount() {
    this.setState(prevState => ({
      xTickFormat: prevState.graphData.map((item, i) => (
        dateToString(prevState.graphData.length - 1 - i)
      )),
    }));
  }

  setLabel = (value) => {
    switch (value) {
      case 0:
        this.setState({ sliderLabel: 'All Time' });
        break;
      case 1:
        this.setState({ sliderLabel: '90 Days' });
        break;
      case 2:
        this.setState({ sliderLabel: '30 Days' });
        break;
      default:
        this.setState({ sliderLabel: '7 Days' });
        break;
    }
  };

  formatGraphData = (value) => {
    const { formattedData, allLineData } = this.props;
    const { xAxis, yAxis, line } = this.state;
    let cutOff;
    switch (value) {
      case 0:
        cutOff = formattedData.length;
        break;
      case 1:
        if (formattedData.length > 90) {
          cutOff = 90;
        }
        break;
      case 2:
        cutOff = 30;
        break;
      default:
        cutOff = 7;
        break;
    }
    this.setState({
      graphData: deriveYAxis(
        deriveXAxis(
          deriveLine(
            formattedData.slice(
              formattedData.length - cutOff,
              formattedData.length,
            ),
            line,
            allLineData.slice(allLineData.length - cutOff, allLineData.length),
          ),
          xAxis,
        ),
        yAxis,
      ),
      allLineGraph: deriveYAxis(
        deriveXAxis(
          deriveLine(
            formattedData.slice(
              formattedData.length - cutOff,
              formattedData.length,
            ),
            'All Lines',
            allLineData.slice(allLineData.length - cutOff, allLineData.length),
          ),
          xAxis,
        ),
        yAxis,
      ),
    });
  };

  handleSlide = (event, value) => {
    this.setState({ value });
    this.setLabel(value);
    this.formatGraphData(value);
  };

  handleLineChange = (event) => {
    const { formattedData, allLineData } = this.props;
    const { xAxis, yAxis } = this.state;
    this.setState({
      line: event.target.value,
      color: linesByName[event.target.value].color,
      graphData: deriveYAxis(
        deriveXAxis(
          deriveLine(
            formattedData,
            event.target.value,
            allLineData,
          ),
          xAxis,
        ),
        yAxis,
      ),
    });
  };

  render() {
    const { classes } = this.props;
    const {
      value,
      graphData,
      allLineGraph,
      color,
      xTickFormat,
      yTickFormat,
      yAxis,
      line,
      sliderLabel,
    } = this.state;

    return (
      <Card>
        <div className={classes.headerContainer}>
          <Typography className={classes.header}>
            All Line Performance Chart
          </Typography>
          <div>
            <Typography className={classes.compareText} inline>
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
            chartFormat="line"
            bgColor="#f8f8f8"
            graphData={graphData}
            color={color}
            xTickFormat={xTickFormat}
            yTickFormat={yTickFormat}
            yAxis={yAxis}
            secondSeries={{
              name: '',
              color: '#c8c8c8',
              data: allLineGraph,
            }}
          />
        </div>
        <div className={classes.sliderContainer}>
          <Typography id="slider-icon">
View data for
            {sliderLabel}
          </Typography>
          <Slider
            classes={{
              container: classes.slider,
              trackBefore: classes.trackBefore,
              trackAfter: classes.trackAfter,
            }}
            value={value}
            min={0}
            max={3}
            step={1}
            onChange={this.handleSlide}
          />
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(LineComparison);
