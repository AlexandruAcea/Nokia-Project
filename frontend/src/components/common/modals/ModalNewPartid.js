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
        url: "http://localhost:1234/partid/createPartid",
        headers: {},
        data: {
          nume: value1,
          abreviere: value2,
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
            <h1>Creeaza un partid nou</h1>
            <p>Adauga datele necesare pentru a crea un partid</p>
            <h2 id="numeRefTitle">Nume</h2>
            <form>
              <input
                type="text"
                value={this.state.value1}
                onChange={this.handleChange1}
              />
            </form>

            <h2 id="dataStartRef">Abreviere</h2>
            <form>
              <input
                type="text"
                value={this.state.value2}
                onChange={this.handleChange2}
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

            <p style={{ marginTop: "20px" }}>
              Dupa ce a-ti creat partidul, adaugati membrii!
            </p>

            <div className="buttonSave" onClick={this.sendDataToServer}>
              <p>Creeaza Partid</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
