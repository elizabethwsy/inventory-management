import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as AppleIcon } from "../icons/apple.svg";
import "../styles/Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <>
        <div className="navbar">
          <AppBar position="static" className="navbar-padding">
            <Toolbar position="sticky" className="toolbar">
              <AppleIcon className="appleicon" />
              <Box display="flex" flexGrow={1}>
                <IconButton color="inherit" className="navlinks">
                  Inventory
                </IconButton>
                <IconButton color="inherit" className="navlinks">
                  Appointments
                </IconButton>
                <IconButton color="inherit" className="navlinks">
                  Reservations
                </IconButton>
              </Box>
              <Box>
                <IconButton color="inherit" className="navlinks-right">
                  Account
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </div>
      </>
    );
  }
}

export default Navbar;
