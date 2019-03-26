import React from 'react';
import Layout from '~/components/Layout';
import { Grid, Typography, Card, Select, MenuItem, ListItemAvatar, Avatar } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { lines } from '../helpers/LineInfo.js';

const sampleDataSet = [{
  mean_time_between: 1012.4553324721667,
  ontime: {
    "1_min": 2000,
    '2_min': 3000,
    '3_min': 4000,
    '4_min': 5000,
    '5_min': 6000,
  },
  timestamp: "2019-03-23T11:00:41.896707-07:00",
  total_arrivals_analyzed: 7000,
  total_scheduled_arrivals: 18679,
  },
  {
  mean_time_between: 1200.5553324721667,
  ontime: {
    "1_min": 2139,
    '2_min': 3478,
    '3_min': 4085,
    '4_min': 4384,
    '5_min': 4511,
  },
  timestamp: "2019-03-23T11:00:41.896707-07:00",
  total_arrivals_analyzed: 4758,
  total_scheduled_arrivals: 18679,
  },
  {
  mean_time_between: 1112.4553324721667,
  ontime: {
    "1_min": 2100,
    '2_min': 3400,
    '3_min': 4000,
    '4_min': 4300,
    '5_min': 4500,
  },
  timestamp: "2019-03-23T11:00:41.896707-07:00",
  total_arrivals_analyzed: 4800,
  total_scheduled_arrivals: 18679,
  },
  {
  mean_time_between: 1112.4553324721667,
  ontime: {
    "1_min": 2100,
    '2_min': 3400,
    '3_min': 4000,
    '4_min': 4300,
    '5_min': 4500,
  },
  timestamp: "2019-03-23T11:00:41.896707-07:00",
  total_arrivals_analyzed: 4800,
  total_scheduled_arrivals: 18679,
  },
  {
  mean_time_between: 1112.4553324721667,
  ontime: {
    "1_min": 2100,
    '2_min': 3400,
    '3_min': 4000,
    '4_min': 4300,
    '5_min': 4500,
  },
  timestamp: "2019-03-23T11:00:41.896707-07:00",
  total_arrivals_analyzed: 4800,
  total_scheduled_arrivals: 18679,
  },
  {
  mean_time_between: 1112.4553324721667,
  ontime: {
    "1_min": 2100,
    '2_min': 3400,
    '3_min': 4000,
    '4_min': 4300,
    '5_min': 5000,
  },
  timestamp: "2019-03-23T11:00:41.896707-07:00",
  total_arrivals_analyzed: 4800,
  total_scheduled_arrivals: 18679,
  },
  {
  mean_time_between: 1012.4553324721667,
  ontime: {
    "1_min": 2000,
    '2_min': 3000,
    '3_min': 4000,
    '4_min': 5000,
    '5_min': 6000,
  },
  timestamp: "2019-03-23T11:00:41.896707-07:00",
  total_arrivals_analyzed: 7000,
  total_scheduled_arrivals: 18679,
  },
  {
  mean_time_between: 1200.5553324721667,
  ontime: {
    "1_min": 2139,
    '2_min': 3478,
    '3_min': 4085,
    '4_min': 4384,
    '5_min': 4511,
  },
  timestamp: "2019-03-23T11:00:41.896707-07:00",
  total_arrivals_analyzed: 4758,
  total_scheduled_arrivals: 18679,
  },
  {
  mean_time_between: 1112.4553324721667,
  ontime: {
    "1_min": 2100,
    '2_min': 3400,
    '3_min': 4000,
    '4_min': 4300,
    '5_min': 4500,
  },
  timestamp: "2019-03-23T11:00:41.896707-07:00",
  total_arrivals_analyzed: 4800,
  total_scheduled_arrivals: 18679,
  },
  {
  mean_time_between: 1112.4553324721667,
  ontime: {
    "1_min": 2100,
    '2_min': 3400,
    '3_min': 4000,
    '4_min': 4300,
    '5_min': 4500,
  },
  timestamp: "2019-03-23T11:00:41.896707-07:00",
  total_arrivals_analyzed: 4800,
  total_scheduled_arrivals: 18679,
  },
  {
  mean_time_between: 1112.4553324721667,
  ontime: {
    "1_min": 2100,
    '2_min': 3400,
    '3_min': 4000,
    '4_min': 4300,
    '5_min': 4500,
  },
  timestamp: "2019-03-23T11:00:41.896707-07:00",
  total_arrivals_analyzed: 4800,
  total_scheduled_arrivals: 18679,
  },
  {
  mean_time_between: 1112.4553324721667,
  ontime: {
    "1_min": 2100,
    '2_min': 3400,
    '3_min': 4000,
    '4_min': 4300,
    '5_min': 5000,
  },
  timestamp: "2019-03-23T11:00:41.896707-07:00",
  total_arrivals_analyzed: 4800,
  total_scheduled_arrivals: 18679,
  }
]

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
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
});

class History extends React.Component {
  state = {
    rows: sampleDataSet.slice(0,sampleDataSet.length).reverse().map((item,i) => Object.assign(item,{ id: i })),
    page: 0,
    rowsPerPage: 5,
    line: "All Lines"
  };

  /* for getting actual data
  static async getInitialProps({ query, res }) {
    const { data } = await axios.get('http://localhost:8080/network');
    const timestamp = data.timestamp;
    console.log(data);
    return { query, data, timestamp };
  }
  */

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: Number(event.target.value) });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const dateToString = (diff) => {
        let d = new Date();
        d.setDate(d.getDate() - diff);
        
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();

        return [month,day].join('/');
      }

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
        )
    );
    return (
      <Layout
        pageTitle="History"
        toolbarTitle="History"
      > <Card className={classes.card}>
        <div className={classes.tableWrapper}>
          <div style={{display: "flex", alignItems: "flex-end"}}>
            <Typography className={classes.header} inline={true}>View Data for
            </Typography>
            <Select
              value={this.state.line}
              onChange={this.handleChange}
              name="line"
              className={classes.selectEmpty}
            >
              <MenuItem value={"All Lines"}>All Lines
              </MenuItem>
              {links}
            </Select>
          </div>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Within 1 min.</TableCell>
                <TableCell align="right">Within 5 min.</TableCell>
                <TableCell align="right">Avg. wait time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                   .map((row,i) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {dateToString(row.id)}
                        </TableCell>
                        <TableCell align="right">{Math.round(1000 * row.ontime["1_min"] / row.total_arrivals_analyzed) / 10 + "%"}</TableCell>
                        <TableCell align="right">{Math.round(1000 * row.ontime["5_min"] / row.total_arrivals_analyzed) / 10 + "%"}</TableCell>
                        <TableCell align="right">{Math.round(row.mean_time_between/60) + " min."}</TableCell>
                      </TableRow>
              ))}
            </TableBody>           
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        </Card>
      </Layout>
    );
  }
}

History.propTypes = {
  classes: PropTypes.object.isRequired,
};


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}


export default withStyles(styles)(History);
