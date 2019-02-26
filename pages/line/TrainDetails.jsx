import React, { Component } from 'react';
import { Typography, Grid, Toolbar, Paper, Divider } from '@material-ui/core';
import Highchart from '../../components/charts/Highchart';
import DataParser from '../../components/DataParser';
import { withStyles } from '@material-ui/core/styles';
import SimpleMenu from '../../components/SimpleMenu';
import directionNames from '../../helpers/Directions.js';
import { whenGotS3Object, whenListAllObjects } from '../../helpers/DataFinder.js';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    margin: '20px 0'
  },
  optionsBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

class TrainDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: 0,
      date: props.date,
      availableDates: [props.date]
    };
    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.populateDates = this.populateDates.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  componentDidMount() {
    const listParams = {Bucket: 'h4la-metro-performance', Prefix: `data/schedule/${this.props.line}_lametro-rail`};
    whenListAllObjects(listParams).then(this.populateDates);
  }

  populateDates(datePaths) {
    const prefix = `data/schedule/${this.props.line}_lametro-rail/`;
    const myRegexp = new RegExp(`${prefix}(.*).csv`);
    const formattedDates = datePaths.reverse().map((path) => {
      return myRegexp.exec(path)[1]
    });
    this.setState({ availableDates: formattedDates });
  }

  handleDirectionChange(newDirection, index) {
    this.setState({ direction: index });
  }

  changeDate(newDate) {
    this.setState({ date: newDate })
  }

  render() {
    const { classes } = this.props;
    const directions = [directionNames[`${this.props.line}_0`], directionNames[`${this.props.line}_1`]];

    return (
      <Grid container justify="center" spacing={24}>
        <Grid item xs={12}>
          <Toolbar color="primary" className={ classes.optionsBar }>
            <SimpleMenu label={`Towards: ${directions[this.state.direction]}`} menuItems={directions} handleMenuChange={ this.handleDirectionChange } />
            <SimpleMenu label={`Select Date: ${this.state.date}`} menuItems={this.state.availableDates} handleMenuChange={ this.changeDate } />
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <DataParser line={ this.props.line } direction={ this.state.direction } date={this.state.date}/>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(TrainDetails);
