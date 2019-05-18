import React, { Component } from "react";
import RoundedSquare from "../common/RoundedSquare";
import ModalNewPartid from "../common/modals/ModalNewPartid";
import ModalViewPartid from "../common/modals/ModalViewPartid";
import addIcon from "../../assets/add.png";
import axios from "axios";
import { URL } from "../../types";

class partide extends Component {
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
      .get(`http://${URL}/partid/listaPartide`)
      .then(res => this.setState({ listaPartide: res.data, dataLoaded: true }));
  };

  showData() {
    const { dataLoaded, listaPartide } = this.state;

    if (dataLoaded) {
      return listaPartide.map((item, key) => {
        return (
          <li
            key={key}
            onClick={() =>
              this.setState({ modalViewPartid: true, object: item })
            }
          >
            <RoundedSquare nume={item.abreviere} reloadData={this.fetchData} />
          </li>
        );
      });
    }
  }

  renderNewPartidModal() {
    if (this.state.modalNewPartidVisible) {
      return (
        <ModalNewPartid
          closeModal={() => this.setState({ modalNewPartidVisible: false })}
          reloadData={this.fetchData}
        />
      );
    }
  }

  renderViewPartidModal() {
    if (this.state.modalViewPartid) {
      return (
        <ModalViewPartid
          {...this.state.object}
          closeModal={() => this.setState({ modalViewPartid: false })}
          reloadData={this.fetchData}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Partide</h2>
        <p>Aici poti administra partidele</p>

        <ul>
          {this.showData()}
          <li>
            <div
              className="newItem"
              onClick={() => this.setState({ modalNewPartidVisible: true })}
            >
              <img src={addIcon} alt="plus symbol" />
            </div>
          </li>
        </ul>
        {this.renderNewPartidModal()}
        {this.renderViewPartidModal()}
      </div>
    );
  }
}

export default partide;
