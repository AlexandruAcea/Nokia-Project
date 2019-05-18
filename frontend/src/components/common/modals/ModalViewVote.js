import React, { Component } from "react";
import axios from "axios";
import close from "../../../assets/close.png";
import MiniModal from "./ModalAddCandidatiPartide";
import MiniModalPartide from "./ModalAddPartide";
import "../../../styles/modal.css";
import { URL } from "../../../types";

class Modal extends Component {
  state = {
    listaPartide: [],
    listaCandidati: [],
    dataFetched: false,

    miniModalShow: false,
    miniModalShowPartide: false
  };

  deleteReferendum = () => {
    axios
      .delete(`http://${URL}/vot/${this.props._id}/delete`)
      .then(response => {
        console.log("YAS YOU DELETED IT!");
      })
      .then(this.props.closeModal)
      .then(this.props.reloadData);
  };

  startVot = () => {
    axios
      .post(`http://${URL}/vot/${this.props._id}/start`)
      .then(function(response) {
        //this.setState({ votStatus: "ongoing" });
      });
  };

  stopVot = () => {
    axios
      .post(`http://${URL}/vot/${this.props._id}/stop`)
      .then(function(response) {
        //this.setState({ votStatus: "stopped" });
      });
  };

  fetchListaPartide() {
    axios
      .all([
        axios.get(`http://${URL}/partid/listaPartide`),
        axios.get(`http://${URL}/candidat/listaCandidati`)
      ])
      .then(
        axios.spread((res1, res2) => {
          this.setState({
            listaPartide: res1.data,
            listaCandidati: res2.data,
            dataFetched: true
          });
        })
      );
  }

  componentDidMount() {
    this.fetchListaPartide();
  }

  renderAddModal() {
    if (this.state.dataFetched && this.state.miniModalShow)
      return (
        <MiniModal
          listaPartide={this.state.listaPartide}
          listaCandidati={this.state.listaCandidati}
          idVotItself={this.props._id}
          closeModal={() => this.setState({ miniModalShow: false })}
        />
      );
  }

  renderAddPartidModal() {
    if (this.state.dataFetched && this.state.miniModalShowPartide)
      return (
        <MiniModalPartide
          listaPartide={this.state.listaPartide}
          listaCandidati={this.state.listaCandidati}
          idVotItself={this.props._id}
          closeModal={() => this.setState({ miniModalShowPartide: false })}
        />
      );
  }

  render() {
    return (
      <div className="modalBody">
        {console.log(this.props)}
        <div className="background" />
        <div className="inside">
          <div className="modal" id="viewVote">
            <img
              id="closeIcon"
              src={close}
              alt="close icon"
              onClick={this.props.closeModal}
            />
            <h1>{this.props.nume}</h1>
            <p>Acesta este un placeholder pentru descrierea ref</p>

            <h2 id="dataStartRef">Data inceperii</h2>
            <p>{this.props.data_start}</p>

            <h2 id="dataStartRef">ID Database - for debug</h2>
            <p>{this.props._id}</p>

            <h2 id="dataStartRef">Status</h2>
            <p
              style={{
                color: this.props.votStatus === "ongoing" ? "green" : "red",
                textTransform: "uppercase"
              }}
            >
              {this.props.votStatus}
            </p>

            <div className="wrap">
              <div className="candidatiSide">
                <h2 id="dataStartRef">Partide</h2>
                <ul>
                  {this.props.candidati.map((item, key) => {
                    if (item.tip === "partid") {
                      return (
                        <li key={key}>
                          {(() => {
                            var value = 0;
                            this.props.results.forEach(function(entry) {
                              if (item.candidat._id === entry.candidatID)
                                value = entry.voturi;
                            });
                            return <h2>{value}</h2>;
                          })()}
                          <p id="p">
                            {item.candidat.nume} ({item.candidat.abreviere})
                          </p>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="partideSide">
                <h2 id="dataStartRef">Candidati</h2>
                <ul>
                  {this.props.candidati.map((item, key) => {
                    if (item.tip === "candidat") {
                      return (
                        <li key={key}>
                          {(() => {
                            var value = 0;
                            this.props.results.forEach(function(entry) {
                              if (item.candidat._id === entry.candidatID)
                                value = entry.voturi;
                            });
                            return <h2>{value}</h2>;
                          })()}
                          <p id="p">
                            {item.candidat.nume} {item.candidat.prenume}
                          </p>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>

            <div className="buttons" id="buttons2">
              <div
                className="startVot"
                onClick={() => this.setState({ miniModalShowPartide: true })}
              >
                <p>Adauga Partide</p>
              </div>
              <div
                className="stopVot"
                onClick={() => this.setState({ miniModalShow: true })}
              >
                <p>Adauga Candidati</p>
              </div>
            </div>

            <div className="buttons">
              <div className="startVot" onClick={this.startVot}>
                <p>Start Vot</p>
              </div>
              <div className="stopVot" onClick={this.stopVot}>
                <p>Stop Vot</p>
              </div>
            </div>

            <div className="buttonWrapper" onClick={this.deleteReferendum}>
              <div className="buttonDeleteBoi">
                <p>Sterge Vot</p>
              </div>
            </div>
            {this.renderAddModal()}
            {this.renderAddPartidModal()}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
