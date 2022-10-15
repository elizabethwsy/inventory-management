import { Collapse, Divider, TextField } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Autocomplete, List, ListItem, ListItemText } from "@mui/material";
import React, { Component } from "react";
import LocationNames from "../data/locationnames.json";
import "../styles/Sidebar.css";

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationInputValue: "",
      locationValue: [],
      selected: "",
      openDropdownSearch: false,
      openDropdownCategory: false,
    };
  }

  handleClick = (category) => {
    this.setState({
      selected: category.categoryName,
      openDropdownCategory: !this.state.openDropdownCategory,
    });
  };

  handleClickSub = (category) => {
    this.props.setCategoryName(category.categoryName);
  };

  render() {
    return (
      <>
        <div className="location-search">
          <label className="location-searchbar-label">
            Find a store:
            <Autocomplete
              className="location-searchbar"
              disableClearable
              filterSelectedOptions
              multiple
              value={this.state.locationValue}
              inputValue={this.state.locationInputValue}
              onChange={(event, newValue) => {
                this.setState({ locationValue: newValue }, () =>
                  this.props.setLocation(newValue, "location")
                );
              }}
              onInputChange={(event, newInputValue) => {
                this.setState({ locationInputValue: newInputValue });
                if (!newInputValue) {
                  this.setState({
                    openDropdownSearch: false,
                  });
                }
              }}
              onOpen={() => {
                if (this.state.locationInputValue) {
                  this.setState({
                    openDropdownSearch: true,
                  });
                }
              }}
              onClose={() => this.setState({ openDropdownSearch: false })}
              open={this.state.openDropdownSearch}
              options={LocationNames}
              getOptionLabel={(option) => option.locationName || ""}
              isOptionEqualToValue={(option, value) =>
                option.locationName === value.name
              }
              id="location-searchbar"
              renderTags={() => null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Search location, ZIP or store name"
                  InputLabelProps={{
                    style: { fontSize: "12px" , width: "75%" }
                  }}
                />
              )}
            />
          </label>
          <div className="divider" />
          <div className="product-name">Product Name</div>
          {this.props.categories.map((category) => (
            <div key={category.id}>
              <List>
                {category.children != null ? (
                  <>
                    <ListItem
                      button
                      onClick={this.handleClick.bind(this, category)}
                    >
                      <ListItemText primary={category.categoryName} />
                      {this.state.openDropdownCategory &&
                      this.state.selected === category.categoryName ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItem>
                    <Collapse
                      key={category.id}
                      in={
                        this.state.openDropdownCategory &&
                        this.state.selected === category.categoryName
                      }
                      timeout="auto"
                      unmountOnExit
                    >
                      <List disablePadding>
                        {category.children.map((subCat) => {
                          return (
                            <ListItem
                              button
                              key={subCat.id}
                              onClick={this.handleClickSub.bind(this, subCat)}
                            >
                              <ListItemText primary={subCat.categoryName} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItem
                    button
                    key={category.id}
                    onClick={this.handleClick.bind(this, category)}
                  >
                    <ListItemText primary={category.categoryName} />
                  </ListItem>
                )}
                <Divider key={category.id} absolute />
              </List>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Sidebar;
