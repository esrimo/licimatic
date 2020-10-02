import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableHead from "@material-ui/core/TableHead";
import { connect } from "react-redux";
import { fetchGrants } from "../store/actions";
import { useHistory } from "react-router";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

function GrantsTable(props) {
  const history = useHistory();
  const { fetchGrantsDispatch, paginationChangeDispatch } = props;

  useEffect(() => {
    fetchGrantsDispatch();
  }, [fetchGrantsDispatch]);

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.totalGrants - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const start = newPage * rowsPerPage;
    paginationChangeDispatch(start, start + rowsPerPage);
    fetchGrantsDispatch();
  };

  const handleChangeRowsPerPage = (event) => {
    const rpp = parseInt(event.target.value, 10);
    setRowsPerPage(rpp);
    setPage(0);
    paginationChangeDispatch(0, rpp);
    fetchGrantsDispatch();
  };

  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader
        className={classes.table}
        aria-label="custom pagination table"
      >
        <TableHead>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={8}
              count={props.totalGrants}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Number</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Agency Code</StyledTableCell>
            <StyledTableCell>Agency</StyledTableCell>
            <StyledTableCell>Opportunity Status</StyledTableCell>
            <StyledTableCell>Posted Date</StyledTableCell>
            <StyledTableCell>Close Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.grant_id}
              className="pointer row-hover"
              onClick={() => {
                props.grantSelected(row.grant_id);
                history.push("/grant");
              }}
            >
              <TableCell component="th" scope="row">
                {row.grant_id}
              </TableCell>
              <TableCell>{row.grant_number}</TableCell>
              <TableCell>{row.grant_title}</TableCell>
              <TableCell>{row.agency_code}</TableCell>
              <TableCell>{row.agency}</TableCell>
              <TableCell>{row.opp_status}</TableCell>
              <TableCell>{row.open_date}</TableCell>
              <TableCell>{row.close_date}</TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={8}
              count={props.totalGrants}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

const s2p = (s) => {
  return {
    rows: s.data.grants,
    totalGrants: s.data.totalGrants,
  };
};

const d2p = (d) => {
  return {
    fetchGrantsDispatch: () => d(fetchGrants()),
    paginationChangeDispatch: (a, b) =>
      d({ type: "CHANGE_PAGINATION", start: a, offset: b }),
    grantSelected: (id) => d({ type: "GRANT_SELECTED", id: id }),
  };
};
export default connect(s2p, d2p)(GrantsTable);
