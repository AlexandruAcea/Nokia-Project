import Context from "../Context";
import React, { Component } from "react";

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: ["Campanii", "Partide", "Candidati", "Utilizatori"],
      currentPage: 0,
      setCurrentPage: newPage => {
        this.setState({ currentPage: newPage });
      }
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default AppProvider;
