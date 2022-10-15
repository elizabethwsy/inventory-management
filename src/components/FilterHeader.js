import { Box, Button, Chip } from "@material-ui/core";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { Typography } from "@mui/material";
import React, { Component } from "react";
import "../styles/Header.css";

export class FilterHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chips: this.props.productValue,
    };
  }

  render() {
    return (
      <>
        <div className="filterheader">
          <Box className="filter-icon-label">
            <FormatListBulletedRoundedIcon
              fontSize="small"
              className="filter-icon"
            />
            <Typography className="filter-icon-text">Filter</Typography>
          </Box>
          <Box display="flex" flexGrow={1}>
            {this.props.keywords.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={this.props.onDelete.bind(this, value)}
              />
            ))}
          </Box>
          <Box>
            <Button
              disableRipple
              className="reset-button"
              onClick={this.props.resetSearch}
            >
              Reset
            </Button>
          </Box>
        </div>
      </>
    );
  }
}

export default FilterHeader;
