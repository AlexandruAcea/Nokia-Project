import React, { Component } from "react";
import axios from "axios";
import close from "../../../assets/close.png";
import ModalCandidati from "./ModalAddCandidatiToPartid";
import "../../../styles/modal.css";
import { URL } from "../../../types";

class Modal extends Component {
  state = {
    addCandidatiVisible: false,
    listaCandidati: [],
    dataFetched: false
  };

  deletePartid = () => {
    axios
      .delete(`http://${URL}/partid/${this.props._id}/delete`)
      .then(response => {
        console.log("YAS YOU DELETED IT!");
      })
      .then(this.props.closeModal)
      .then(this.reload);
  };

  fetchListaPartide() {
    axios.all([axios.get(`http://${URL}/candidat/listaCandidati`)]).then(
      axios.spread(res => {
        this.setState({
          listaCandidati: res.data,
          dataFetched: true
        });
      })
    );
  }

  reload = () => {
    this.props.reloadData();
  };

  componentDidMount() {
    this.fetchListaPartide();
  }

  renderAddCandidati() {
    if (this.state.addCandidatiVisible && this.state.dataFetched)
      return (
        <ModalCandidati
          listaCandidati={this.state.listaCandidati}
          closeModal={() => this.setState({ addCandidatiVisible: false })}
          idVotItself={this.props._id}
          reload={this.reload}
        />
      );
  }

  render() {
    return (
      <div className="modalBody">
        {console.log(this.props)}
        <div className="background" />
        <div className="inside">
          <div className="modal">
            <img
              id="closeIcon"
              src={close}
              alt="close icon"
              onClick={this.props.closeModal}
            />
            <h1>{this.props.abreviere}</h1>
            <p>{this.props.nume}</p>

            <h2 id="dataStartRef">ID Database - for debug</h2>
            <p>{this.props._id}</p>

            <h2
              id="dataStartRef"
              onClick={() => this.setState({ addCandidatiVisible: true })}
            >
              Candidati
            </h2>
            <ul id="specialUl">
              {this.props.membrii.map((item, key) => {
                return (
                  <li key={key}>
                    <p>
                      {item.nume} {item.prenume}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div
              className="buttonAddPartid"
              onClick={() => this.setState({ addCandidatiVisible: true })}
            >
              <p id="pNew">Adauga Candidati</p>
            </div>

            <div
              className="buttonSave"
              id="buttonDelete"
              onClick={this.deletePartid}
            >
              <p>Sterge Partid</p>
            </div>
          </div>
          {this.renderAddCandidati()}
        </div>
      </div>
    );
  }
}

export default Modal;
