import React from 'react';
import {
  Typography, Select, MenuItem,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    maxWidth: '100%',
    margin: 'auto'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: '.5em',
    marginBottom: '-.25em',
  },
  header: {
    marginLeft: '1.6em',
    fontSize: 16,
  },
  avatar: {
    width: 16,
    height: 16,
    marginRight: '.5em',
  },
  headerContainer: {
    paddingBottom: '1em',
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
});

const HistoryMenu = (props) => {
  const {
    classes, dataFormat, xAxis, handleXAxisChange, yAxis, handleYAxisChange,
  } = props;
  return (
    <div className={classes.headerContainer}>
      { dataFormat === 'chart' ? (
        <React.Fragment>
          <Typography className={classes.header} inline>
            View Data for
            {' '}
          </Typography>
          <div>
            <Typography className={classes.header} inline>
              X-Axis:
              {' '}
            </Typography>
            <Select
              value={xAxis}
              onChange={handleXAxisChange}
              name="xAxis"
              className={classes.selectEmpty}
            >
              <MenuItem value="Last 30 Days">
                Last 30 Days
                {' '}
              </MenuItem>
              <MenuItem value="Weekday Average">
                Weekday Average
                {' '}
              </MenuItem>
            </Select>
          </div>
          <div>
            <Typography className={classes.header} inline>
              Y-Axis:
              {' '}
            </Typography>
            <Select
              value={yAxis}
              onChange={handleYAxisChange}
              name="yAxis"
              className={classes.selectEmpty}
            >
              <MenuItem value="Average Wait Time">
                Average Wait Time
                {' '}
              </MenuItem>
              <MenuItem value="% Within 1 Minute">
                % Within 1 Minute
                {' '}
              </MenuItem>
              <MenuItem value="% Within 5 Minutes">
                % Within 5 Minutes
                {' '}
              </MenuItem>
            </Select>
          </div>
        </React.Fragment>
      ) : ''
        }
    </div>
  );
};

export default withStyles(styles)(HistoryMenu);
