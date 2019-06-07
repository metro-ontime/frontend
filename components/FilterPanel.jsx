import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  Card,
  CardHeader,
  CardContent,
  MenuItem,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { lines } from '~/helpers/LineInfo';

const styles = theme => ({
  avatar: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: '-.25em',
  },
  lineDot: {
    width: '100%',
    padding: 0,
    height: '100%',
    margin: 0,
    borderRadius: '50%',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 120,
  },
});

const arrivalWindows = [
  {
    menuLabel: '1 minute',
    dataLabel: '1_min',
  }, {
    menuLabel: '2 minutes',
    dataLabel: '2_min',
  }, {
    menuLabel: '3 minutes',
    dataLabel: '3_min',
  }, {
    menuLabel: '4 minutes',
    dataLabel: '4_min',
  }, {
    menuLabel: '5 minutes',
    dataLabel: '5_min',
  },
];

const FilterPanel = (props) => {
  const {
    classes,
    line,
    handleLineChange,
    arrivalWindow,
    handleArrivalWindow,
    date,
    dates,
    handleDate,
  } = props;
  const windows = arrivalWindows.map((item, i) => (
    <MenuItem value={item.dataLabel} key={i}>
      { item.menuLabel }
    </MenuItem>
  ));
  const lineSelectors = lines.map(metLine => (
    <MenuItem value={`${metLine.name}`} key={metLine.name}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <div style={{ backgroundColor: metLine.color }} className={classes.lineDot} />
          </Avatar>
        </ListItemAvatar>
        {metLine.name}
      </div>
    </MenuItem>
  ));
  const dateSelectors = dates.map((item, i) => (
    <MenuItem value={item} key={i}>
      { item }
    </MenuItem>
  ));
  return (
    <Card>
      <CardHeader style={{ paddingBottom: 0 }} title="Filter By" titleTypographyProps={{ variant: 'body1' }} />
      <CardContent style={{ paddingTop: 0, paddingLeft: '.5em' }}>
        <FormControl className={classes.formControl}>
          <InputLabel>Line</InputLabel>
          <Select
            className={classes.selectEmpty}
            value={line}
            onChange={handleLineChange}
            name="Line"
          >
            <MenuItem value="All">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <div style={{ backgroundColor: '#dddddd' }} className={classes.lineDot} />
                  </Avatar>
                </ListItemAvatar>
                All Lines
              </div>
            </MenuItem>
            { lineSelectors }
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Cutoff</InputLabel>
          <Select
            className={classes.selectEmpty}
            value={arrivalWindow}
            onChange={handleArrivalWindow}
            name="arrivalWindow"
          >
            { windows }
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Date</InputLabel>
          <Select
            className={classes.selectEmpty}
            value={date}
            onChange={handleDate}
            name="Date"
          >
            { dateSelectors }
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(FilterPanel);
