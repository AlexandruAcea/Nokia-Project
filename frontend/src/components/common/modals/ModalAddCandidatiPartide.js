import React, { Component } from "react";
import axios from "axios";
import close from "../../../assets/close.png";
import "../../../styles/modal.css";

export default class ModalAddCandidatiPartide extends Component {
  render() {
    const { props } = this;

    return (
      <div className="miniWrapper">
        <div className="modal" id="miniModal">
          <img
            id="closeIcon"
            src={close}
            alt="close icon"
            onClick={this.props.closeModal}
          />

          <h2 style={{ marginTop: "45px" }}>Adauga Candidati</h2>
          <ul id="miniModalUl">
            {(() => {
              return props.listaCandidati.map((item, key) => {
                return (
                  <li
                    key={key}
                    onClick={() => {
                      if (item._id)
                        axios({
                          method: "post",
                          url: `http://localhost:1234/vot/${
                            this.props.idVotItself
                          }/addCandidat`,
                          headers: {},
                          data: {
                            id_candidat: item._id
                          }
                        }).then(props.closeModal);
                    }}
                  >
                    <p>
                      {item.nume} {item.prenume}
                    </p>
                  </li>
                );
              });
            })()}
          </ul>
        </div>
      </div>
    );
  }
}
