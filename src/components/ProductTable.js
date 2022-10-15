import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import React, { Component } from "react";
import tableHeaders from "../data/tableheaders.json";
import "../styles/ProductTable.css";
import ViewModal from "./ViewModal";

export class ProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "name",
      selected: [],
      setOpen: false,
      viewProduct: {},
      rows: this.props.rows,
    };
  }

  onOpenView = (product) => {
    this.setState({
      viewProduct: product,
      setOpen: !this.state.setOpen,
    });
  };

  handleClick = (event, product) => {
    const selectedIndex = this.state.selected.indexOf(product);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, product);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.elected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1)
      );
    }
    this.state({ selected: newSelected });
  };

  isSelected = (product) => this.state.selected.indexOf(product) !== -1;

  getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => -this.descendingComparator(a, b, orderBy);
  };

  descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    this.setState({
      order: isAsc ? "desc" : "asc",
      orderBy: property,
    });
  };

  productTableHeader = (props) => {
    const createSortHandler = (property) => (event) => {
      this.handleRequestSort(event, property);
    };

    return (
      <TableHead className="table-header">
        <TableRow>
          <TableCell padding="checkbox" sx={{ borderBottom: 1 }}></TableCell>
          {tableHeaders.map((header) => (
            <TableCell
              key={header.id}
              align={header.rightAlign ? "left" : "right"}
              padding={header.disablePadding ? "none" : "normal"}
              sortDirection={
                this.state.orderBy === header.id ? this.state.order : false
              }
              sx={{ borderBottom: 1 }}
            >
              <TableSortLabel
                active={this.state.orderBy === header.id}
                direction={
                  this.state.orderBy === header.id ? this.state.order : "asc"
                }
                onClick={createSortHandler(header.id)}
              >
                {header.label}
                {this.state.orderBy === header.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {this.state.order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  render() {
    return (
      <>
        <div className="product-table">
          <ViewModal
            setOpen={this.state.setOpen}
            onOpenView={this.onOpenView}
            viewProduct={this.state.viewProduct}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750, borderLeft: "1px solid #c1c1c1" }}
              aria-labelledby="product table"
              size="small"
              stickyHeader
              key={this.props.reset}
            >
              {this.productTableHeader()}
              <TableBody>
                {this.props.rows.length > 0 ? (
                  this.props.rows
                    .sort(
                      this.getComparator(this.state.order, this.state.orderBy)
                    )
                    .map((row, index) => {
                      const isItemSelected = this.isSelected(row.name);
                      const labelId = `table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) => this.handleClick.bind(this, row)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                          className={index % 2 ? "background-grey" : " "}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="default"
                              size="small"
                              checked={isItemSelected.name}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell>{row.locationName}</TableCell>
                          <TableCell align="right">{row.modelNumber}</TableCell>
                          <TableCell align="right">{row.color}</TableCell>
                          <TableCell align="right">{row.size}</TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                          <TableCell
                            align="right"
                            className={
                              row.availability ? "available" : "unavailable"
                            }
                          >
                            {row.availability ? "YES" : "NO"}
                          </TableCell>
                          <TableCell align="right" className="view">
                            <div onClick={this.onOpenView.bind(this, row)}>
                              View
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  }
}

export default ProductTable;
