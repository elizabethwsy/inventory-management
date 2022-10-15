import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Button, Grid, IconButton } from "@material-ui/core";
import React, { Component } from "react";
import "../styles/ProductTable.css";
import LocationNames from "../data/locationnames.json";

export class ViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpen: false,
      locationInputValue: "",
      locationValue: "",
      selected: "",
      openDropdownSearch: false,
    };
  }

  render() {
    return (
      <Dialog
        onClose={this.props.onOpenView}
        aria-labelledby="view-product-dialog-title"
        open={this.props.setOpen}
      >
        <DialogTitle>
          <IconButton
            className="close-button"
            aria-label="close"
            onClick={this.props.onOpenView}
            fontSize="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <div className="product-title">
            <Typography variant="h4" fontWeight={500}>
              {this.props.viewProduct.name}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <div className="dialog-content">
                <Typography gutterBottom variant="h6" fontWeight={500}>
                  Product Details
                </Typography>
                <Typography>{this.props.viewProduct.color}</Typography>
                <Typography>{this.props.viewProduct.modelNumber}</Typography>
                <Typography>{this.props.viewProduct.size}</Typography>
                <Typography>{this.props.viewProduct.name}</Typography>
                <Typography>{this.props.viewProduct.description}</Typography>
              </div>
            </Grid>
            <Grid item sm={6}>
              <div className="dialog-content">
                <Autocomplete
                  disabled
                  disableClearable
                  value={this.state.locationValue}
                  inputValue={this.state.locationInputValue}
                  onChange={(event, newValue) => {
                    this.setState({ locationValue: newValue });
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
                  getOptionLabel={(option) => option.name || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  sx={{ width: 250 }}
                  id="location-searchbar"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Search location, ZIP or store name"
                    />
                  )}
                />
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box p={2}>
            <Button
              className="action-button reserve-button"
              autoFocus
              onClick={this.props.onOpenView}
            >
              Reserve
            </Button>
            <Button
              className="action-button appt-button"
              autoFocus
              onClick={this.props.onOpenView}
            >
              Book Appointment
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ViewModal;
