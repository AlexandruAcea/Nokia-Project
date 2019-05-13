import React, { Component } from "react";
import axios from "axios";
import close from "../../../assets/close.png";
import "../../../styles/modal.css";

class Modal extends Component {
  state = {};

  deleteReferendum = () => {
    axios
      .delete(`http://localhost:1234/referendum/${this.props._id}/delete`)
      .then(response => {
        console.log("YAS YOU DELETED IT!");
      })
      .then(this.props.closeModal)
      .then(this.props.reloadData);
  };

  render() {
    return (
      <div className="modalBody">
        <div className="background" />
        <div className="inside">
          <div className="modal">
            <img
              id="closeIcon"
              src={close}
              alt="close icon"
              onClick={this.props.closeModal}
            />
            <h1>{this.props.nume}</h1>
            <p>{this.props.descriere}</p>

            <h2 id="dataStartRef">Data inceperii</h2>
            <p>{this.props.data_start}</p>

            <h2 id="dataStartRef">ID Database - for debug</h2>
            <p>{this.props._id}</p>

            <h2 id="nrVoturi">Numar Voturi</h2>
            <div className="votes">
              <p>DA</p>
              <h1>{this.props.voturi_da}</h1>
              <p>NU</p>
              <h1>{this.props.voturi_nu}</h1>
            </div>

            <div className="buttons">
              <div className="startVot">
                <p>Start Vot</p>
              </div>
              <div className="stopVot">
                <p>Stop Vot</p>
              </div>
            </div>

            <div
              className="buttonSave"
              id="buttonDelete"
              onClick={this.deleteReferendum}
            >
              <p>Sterge Referendum</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
