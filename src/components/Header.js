import { Button, TextField, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Autocomplete, createFilterOptions } from "@mui/material";
import React, { Component } from "react";
import { Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import ProductTable from "./ProductTable";
import productNames from "../data/productnames.json";
import "../styles/Header.css";
import FilterHeader from "./FilterHeader";
import productList from "../data/product.json";
import productCategories from "../data/productcategories.json";

const OPTIONS_LIMIT = 5;
const defaultFilterOptions = createFilterOptions({
  stringify: ({ name, model }) => `${name} ${model}`,
});

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productInputValue: "",
      productValue: [],
      categoryName: [],
      keywords: [],
      openDropdown: false,
      rows: productList,
      categories: productCategories,
      reset: false,
    };
    this.setRows = this.setRows.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  setCategoryName = (categoryName) => {
    this.setState({ categoryName: categoryName }, () =>
      this.setRows(this.state.categoryName)
    );
  };

  setLocation = (value, type) => {
    let keywords = [];
    value.forEach((keyword) => {
      keywords.push(keyword.locationName);
    });
    this.setState(
      {
        keywords: [...new Set(this.state.keywords.concat(keywords))],
        productValue: [...new Set(this.state.productValue.concat(value))],
      },
      () => {
        this.setRows(this.state.keywords, "location");
      }
    );
  };

  resetSearch = () => {
    this.setState({
      productValue: [],
      keywords: [],
      rows: productList,
      reset: !this.state.reset,
    });
  };

  filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  onDelete = (name) => {
    console.log(name);
    console.log(this.state.productValue);
    console.log(this.state.productValue.filter((value) => console.log(value)));
    this.setState(
      {
        keywords: this.state.keywords.filter((value) => value !== name),
        productValue: this.state.productValue.filter((value) => {
          if (value.name) {
            return !value.name.includes(name) || !value.model.includes(name);
          } else if (value.locationName) {
            return !value.locationName.includes(name);
          }
        }),
      },
      () => {
        if (this.state.keywords.length < 1) {
          this.resetSearch();
        } else {
          if (Object.keys(this.state.productValue).includes("name")) {
            this.setRows(this.state.keywords, "product");
          } else if (
            Object.keys(this.state.productValue).includes("locationName")
          ) {
            this.setRows(this.state.keywords, "location");
          }
        }
      }
    );
  };

  setRows = (filterParam, type) => {
    console.log(filterParam);
    let searchResult = [];
    if (type === "product") {
      this.state.rows.filter((product) => {
        filterParam.forEach((keyword) => {
          if (
            product.name.toLowerCase().includes(keyword.toLowerCase()) ||
            product.modelNumber.includes(keyword.toLowerCase())
          ) {
            searchResult.push(product);
          }
        });
      });
    } else if (type === "location") {
      this.state.rows.filter((location) => {
        filterParam.forEach((keyword) => {
          if (
            location.locationName.toLowerCase().includes(keyword.toLowerCase())
          ) {
            searchResult.push(location);
          }
        });
      });
    } else {
      productList.filter((product) => {
        if (
          product.name.toLowerCase().includes(filterParam.toLowerCase()) ||
          product.modelNumber.includes(filterParam.toLowerCase()) ||
          product.locationName.toLowerCase().includes(filterParam.toLowerCase())
        ) {
          searchResult.push(product);
        }
      });
    }
    this.setState({
      rows: searchResult,
    });
  };

  render() {
    return (
      <>
        <div className="header">
          <Box className="header-padding">
            <Box display="flex" flexGrow={1} className="heading">
              <Typography variant="h3">Inventory</Typography>
            </Box>
            <Button className="search-type-button" disabled disableRipple>
              <Typography variant="body1" className="search-type-button-label">
                Search by Location
              </Typography>
            </Button>
            <Button className="search-type-button" disableRipple>
              <Typography
                variant="body1"
                className="search-type-button-label active"
              >
                Search by Product
              </Typography>
            </Button>
            <div style={{ clear: "both" }} />
            <div className="searchbar-group">
              <label className="searchbar">Find a product:</label>
              <Autocomplete
                disableClearable
                filterSelectedOptions
                filterOptions={this.filterOptions}
                multiple
                value={this.state.productValue}
                inputValue={this.state.productInputValue}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  if (this.state.productValue.length > 4) {
                    this.setState({
                      productValue: this.state.productValue.slice(0, -1),
                    });
                  } else {
                    this.setState(
                      {
                        productValue: newValue,
                        keywords: newValue.map((value) =>
                          value.name
                            .toLowerCase()
                            .includes(
                              this.state.productInputValue.toLowerCase()
                            )
                            ? value.name
                            : value.model
                        ),
                      },
                      () => {
                        this.setRows(this.state.keywords, "product");
                      }
                    );
                  }
                }}
                onInputChange={(event, newInputValue) => {
                  this.setState({
                    productInputValue: newInputValue,
                  });
                  if (!newInputValue) {
                    this.setState({
                      openDropdown: false,
                    });
                  }
                }}
                onOpen={() => {
                  if (this.state.productInputValue) {
                    this.setState({
                      openDropdown: true,
                    });
                  }
                }}
                onClose={() => this.setState({ openDropdown: false })}
                open={this.state.openDropdown}
                options={productNames}
                getOptionLabel={(option) => {
                  return option.name
                    .toLowerCase()
                    .includes(this.state.productInputValue.toLowerCase())
                    ? `${option.name}`
                    : `${option.model}` || "";
                }}
                sx={{ width: 400 }}
                id="product-searchbar"
                renderTags={() => null}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Search by product name or model"
                  />
                )}
              />
            </div>
          </Box>
        </div>
        <FilterHeader
          productValue={this.state.productValue}
          keywords={this.state.keywords}
          onDelete={this.onDelete}
          resetSearch={this.resetSearch}
        />
        <Grid container>
          <Grid item md={2}>
            <Sidebar
              setCategoryName={this.setCategoryName}
              categoryName={this.state.categoryName}
              setLocation={this.setLocation}
              key={this.state.reset}
              categories={this.state.categories}
            />
          </Grid>
          <Grid item md={10}>
            <ProductTable
              categoryName={this.state.categoryName}
              {...this.state.categoryName}
              rows={this.state.rows}
              key={this.state.reset}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Header;
