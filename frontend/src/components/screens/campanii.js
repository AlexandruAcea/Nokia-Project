import React, { Component } from "react";
import RoundedSquare from "../common/RoundedSquare";
import Modal from "../common/modals/ModalNewRef";
import ModalViewRef from "../common/modals/ModelViewRef";
import ModalNewVote from "../common/modals/ModalNewVote";
import ModalViewVote from "../common/modals/ModalViewVote";
import addIcon from "../../assets/add.png";
import axios from "axios";

class campanii extends Component {
  state = {
    campanii: [],
    referendumuri: [],
    dataLoaded: false,

    modalNewVoteVisible: false,
    modalViewVote: false,

    modalRefVisible: false,
    modalRefViewVisible: false,

    object: {}
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .all([
        axios.get("http://localhost:1234/vot/votlist"),
        axios.get("http://localhost:1234/referendum/referendumList")
      ])
      .then(
        axios.spread((res1, res2) => {
          this.setState({
            campanii: res1.data,
            referendumuri: res2.data,
            dataLoaded: true
          });
        })
      );
  };

  showData() {
    const { dataLoaded, campanii } = this.state;

    if (dataLoaded) {
      return campanii.map((item, key) => {
        return (
          <li
            key={key}
            onClick={() => this.setState({ modalViewVote: true, object: item })}
          >
            <RoundedSquare nume={item.nume} />
          </li>
        );
      });
    }
  }

  showReferendumuri() {
    const { dataLoaded, referendumuri } = this.state;

    if (dataLoaded) {
      return referendumuri.map((item, key) => {
        return (
          <li
            key={key}
            onClick={() =>
              this.setState({ modalRefViewVisible: true, object: item })
            }
          >
            <RoundedSquare nume={item.nume} />
          </li>
        );
      });
    }
  }

  showNewVoteModal = () => {
    if (this.state.modalNewVoteVisible)
      return (
        <ModalNewVote
          closeModal={() => this.setState({ modalNewVoteVisible: false })}
          reloadData={this.fetchData}
        />
      );
  };

  renderViewVoteModal() {
    if (this.state.modalViewVote) {
      return (
        <ModalViewVote
          {...this.state.object}
          closeModal={() => this.setState({ modalViewVote: false })}
          reloadData={this.fetchData}
        />
      );
    }
  }

  renderRefModal = () => {
    if (this.state.modalRefVisible)
      return (
        <Modal
          closeModal={() => this.setState({ modalRefVisible: false })}
          reloadData={this.fetchData}
        />
      );
  };

  renderRefViewModal() {
    if (this.state.modalRefViewVisible) {
      return (
        <ModalViewRef
          {...this.state.object}
          closeModal={() => this.setState({ modalRefViewVisible: false })}
          reloadData={this.fetchData}
        />
      );
    }
  }

  render() {
    return (
      <div className="insideInside">
        <h2>Campanii electorale</h2>
        <p>Aici poti vedea campaniile electorale active</p>

        <div className="separator">
          <p>Vot Multiplu</p>
          <div className="linie" />
        </div>
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
        <div className="separator">
          <p>Referendum</p>
          <div className="linie" />
        </div>
        <ul>
          {this.showReferendumuri()}
          <li>
            <div
              className="newItem"
              onClick={() => this.setState({ modalRefVisible: true })}
            >
              <img src={addIcon} alt="plus symbol" />
            </div>
          </li>
        </ul>
        {this.renderRefModal()}
        {this.renderRefViewModal()}

        {this.showNewVoteModal()}
        {this.renderViewVoteModal()}
      </div>
    );
  }
}

export default campanii;
