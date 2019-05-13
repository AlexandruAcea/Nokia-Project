import React, { Component } from "react";
import RoundedSquare from "../common/RoundedSquare";
import axios from "axios";

class users extends Component {
  state = {
    listaPartide: [],
    dataLoaded: false,

    modalNewPartidVisible: false,
    modalViewPartid: false,

    object: {}
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get("http://localhost:1234/userList")
      .then(res => this.setState({ listaPartide: res.data, dataLoaded: true }));
  };

  showData() {
    const { dataLoaded, listaPartide } = this.state;

    if (dataLoaded) {
      return listaPartide.map((item, key) => {
        return (
          <li key={key}>
            <p>Yolo</p>
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Utilizatori</h2>
        <p>Lista utilizatorilor inscrisi pentru vot online</p>
        <ul>{this.showData()}</ul>
      </div>
    );
  }
}

export default users;
