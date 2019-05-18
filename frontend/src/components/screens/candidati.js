import React, { Component } from "react";
import RoundedSquare from "../common/RoundedSquare";
import ModalNewCandidat from "../common/modals/ModalNewCandidat";
import addIcon from "../../assets/add.png";
import axios from "axios";
import { URL } from "../../types";

class candidati extends Component {
  state = {
    listaCandidati: [],
    dataLoaded: false,

    modalNewCandidat: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get(`http://${URL}/candidat/listaCandidati`)
      .then(res =>
        this.setState({ listaCandidati: res.data, dataLoaded: true })
      );
  };

  deleteCandidat(id) {
    axios
      .delete(`http://${URL}/candidat/${id}/delete`)
      .then(res =>
        this.setState({ listaCandidati: res.data, dataLoaded: true })
      )
      .then(this.fetchData());
  }

  showData() {
    const { dataLoaded, listaCandidati } = this.state;

    if (dataLoaded) {
      return listaCandidati.map((item, key) => {
        return (
          <li
            key={key} //onClick={() => this.deleteCandidat(item._id)}
          >
            <RoundedSquare nume={item.nume + " " + item.prenume} />
          </li>
        );
      });
    }
  }

  renderNewCandidat() {
    if (this.state.modalNewCandidat)
      return (
        <ModalNewCandidat
          closeModal={() => this.setState({ modalNewCandidat: false })}
          reloadData={this.fetchData}
        />
      );
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
              onClick={() => this.setState({ modalNewCandidat: true })}
            >
              <img src={addIcon} alt="plus symbol" />
            </div>
          </li>
        </ul>
        {this.renderNewCandidat()}
      </div>
    );
  }
}

export default candidati;
