import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { dateToString } from '~/helpers/formatHistory';
import TablePaginationActions from '~/components/TablePaginationActions';

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
});

class HistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ page: 0, rowsPerPage: Number(event.target.value) });
  };

  render() {
    const { classes, rows } = this.props;
    const { rowsPerPage, page } = this.state;
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
      <div className={classes.tableWrapper}>
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
              .map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {dateToString(row.id)}
                  </TableCell>
                  <TableCell align="right">{`${Math.round(1000 * row.ontime['1_min'] / row.total_arrivals_analyzed) / 10}%`}</TableCell>
                  <TableCell align="right">{`${Math.round(1000 * row.ontime['5_min'] / row.total_arrivals_analyzed) / 10}%`}</TableCell>
                  <TableCell align="right">{`${Math.round(row.mean_time_between / 60)} min.`}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

HistoryTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistoryTable);
