import React, { Component } from 'react';
import { Grid, Toolbar } from '@material-ui/core';
import DataParser from '~/components/DataParser';
import { withStyles } from '@material-ui/core/styles';
import SimpleMenu from '~/components/SimpleMenu';
import directionNames from '~/helpers/Directions.js';
import { whenListAllObjects } from '~/helpers/DataFinder.js';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    margin: '20px 0',
  },
  optionsBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

class TrainDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: 0,
      date: props.date,
      availableDates: [props.date],
    };
    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.populateDates = this.populateDates.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  componentDidMount() {
    const { line } = this.props;
    const listParams = {
      Bucket: 'h4la-metro-performance',
      Prefix: `data/schedule/${line}_lametro-rail`
    };
    whenListAllObjects(listParams).then(this.populateDates);
  }

  populateDates(datePaths) {
    const { line } = this.props;
    const prefix = `data/schedule/${line}_lametro-rail/`;
    const myRegexp = new RegExp(`${prefix}(.*).csv`);
    const formattedDates = datePaths.reverse().map(path => myRegexp.exec(path)[1]);
    this.setState({ availableDates: formattedDates });
  }

  handleDirectionChange(newDirection, index) {
    this.setState({ direction: index });
  }

  changeDate(newDate) {
    this.setState({ date: newDate });
  }

  render() {
    const { classes, line } = this.props;
    const { direction, availableDates, date } = this.state;
    const directions = [directionNames[`${line}_0`], directionNames[`${line}_1`]];

    return (
      <Grid container justify="center" spacing={24}>
        <Grid item xs={12}>
          <Toolbar color="primary" className={classes.optionsBar}>
            <SimpleMenu label={`Towards: ${directions[direction]}`} menuItems={directions} handleMenuChange={this.handleDirectionChange} />
            <SimpleMenu label={`Select Date: ${date}`} menuItems={availableDates} handleMenuChange={this.changeDate} />
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <DataParser line={line} direction={direction} date={date} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TrainDetails);
