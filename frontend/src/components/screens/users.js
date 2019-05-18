import React, { Component } from "react";
import RoundedSquare from "../common/RoundedSquare";
import axios from "axios";
import { URL } from "../../types";

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
      .get(`http://${URL}/userList`)
      .then(res => this.setState({ listaPartide: res.data, dataLoaded: true }));
  };

  showData() {
    const { dataLoaded, listaPartide } = this.state;

    if (dataLoaded) {
      return listaPartide.map((item, key) => {
        return (
          <li key={key}>
            <h3 style={{ marginTop: "20px", color: "white" }}>
              {key + 1}. {item.nume} {item.prenume}
            </h3>
            <p style={{ marginTop: "0px", marginLeft: "20px" }}>{item._id}</p>
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
