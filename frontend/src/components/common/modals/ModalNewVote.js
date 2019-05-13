import React, { Component } from "react";
import axios from "axios";
import close from "../../../assets/close.png";
import "../../../styles/modal.css";

class Modal extends Component {
  state = { value1: "", value2: "", value3: "" };

  handleChange1 = event => {
    this.setState({ value1: event.target.value });
  };

  handleChange2 = event => {
    this.setState({ value2: event.target.value });
  };

  handleChange3 = event => {
    this.setState({ value3: event.target.value });
  };

  sendDataToServer = () => {
    const { value1, value2, value3 } = this.state;

    if (value1 !== "" && value2 !== "" && value3 !== "")
      axios({
        method: "post",
        url: "http://localhost:1234/vot/createVote",
        headers: {},
        data: {
          nume: value1,
          data_start: value2,
          descriere: value3
        }
      })
        .then(this.props.closeModal)
        .then(this.props.reloadData);
    else console.log("You gotta input something yo");
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
            <h1>Creeaza un vot nou</h1>
            <p>Adauga datele necesare pentru a crea un vot nou</p>
            <h2 id="numeRefTitle">Nume Vot</h2>
            <form>
              <input
                type="text"
                value={this.state.value1}
                onChange={this.handleChange1}
              />
            </form>

            <h2 id="dataStartRef">Descriere</h2>
            <form>
              <input
                type="text"
                value={this.state.value3}
                onChange={this.handleChange3}
              />
            </form>

            <h2 id="dataStartRef">Data inceperii</h2>
            <form>
              <input
                type="text"
                value={this.state.value2}
                onChange={this.handleChange2}
              />
            </form>

            <p style={{ marginTop: "20px" }}>
              Dupa ce a-ti creat votul, adaugati candidati!
            </p>

            <div className="buttonSave" onClick={this.sendDataToServer}>
              <p>Creeaza Vot</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
