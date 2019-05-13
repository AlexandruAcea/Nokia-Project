import React, { Component } from "react";
import axios from "axios";
import close from "../../../assets/close.png";
import "../../../styles/modal.css";

class Modal extends Component {
  state = { value1: "", value2: "" };

  handleChange1 = event => {
    this.setState({ value1: event.target.value });
  };

  handleChange2 = event => {
    this.setState({ value2: event.target.value });
  };

  sendDataToServer = () => {
    const { value1, value2 } = this.state;

    if (value1 !== "" && value2 !== "")
      axios({
        method: "post",
        url: "http://localhost:1234/candidat/create",
        headers: {},
        data: {
          nume: value1,
          prenume: value2
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
            <h1>Adauga un candidat nou</h1>
            <p>Adauga datele necesare pentru adauga un candidat</p>
            <h2 id="numeRefTitle">Nume</h2>
            <form>
              <input
                type="text"
                value={this.state.value1}
                onChange={this.handleChange1}
              />
            </form>

            <h2 id="dataStartRef">Prenume</h2>
            <form>
              <input
                type="text"
                value={this.state.value2}
                onChange={this.handleChange2}
              />
            </form>

            <p style={{ marginTop: "20px", width: "70%" }}>
              Dupa ce a-ti creat candidatul il puteti adauga intr-un partid, sau
              nu si acesta va ramane automat independent :v
            </p>

            <div className="buttonSave" onClick={this.sendDataToServer}>
              <p>Adauga Candidat</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
