import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

export class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Header />
      </>
    );
  }
}

export default App;
