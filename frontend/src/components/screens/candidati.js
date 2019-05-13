import React, { Component } from "react";
import RoundedSquare from "../common/RoundedSquare";
import Modal from "../common/modals/ModalNewRef";
import ModalViewRef from "../common/modals/ModelViewRef";
import ModalNewVote from "../common/modals/ModalNewVote";
import ModalViewVote from "../common/modals/ModalViewVote";
import addIcon from "../../assets/add.png";
import axios from "axios";

class candidati extends Component {
  state = {
    listaCandidati: [],
    dataLoaded: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get("http://localhost:1234/candidat/listaCandidati")
      .then(res =>
        this.setState({ listaCandidati: res.data, dataLoaded: true })
      );
  }

  showData() {
    const { dataLoaded, listaCandidati } = this.state;

    if (dataLoaded) {
      return listaCandidati.map((item, key) => {
        return (
          <li
            key={key}
            //onClick={() => this.setState({ modalViewVote: true, object: item })}
          >
            <RoundedSquare nume={item.nume + " " + item.prenume} />
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Candidati</h2>
        <p>Aici poti administra candidatii *independenti sau nu*</p>

        <ul>
          {this.showData()}
          <li>
            <div
              className="newItem"
              onClick={() => this.setState({ modalNewVoteVisible: true })}
            >
              <img src={addIcon} alt="plus symbol" />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default candidati;
