import React, { Component } from "react";
import axios from "axios";
import { URL } from "../../types";

class stats extends Component {
  state = {
    listaPartide: [],
    dataLoaded: false,

    candidati: [],
    partide: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get(`http://${URL}/vot/votList`)
      .then(res => this.setState({ listaPartide: res.data, dataLoaded: true }));

    axios
      .all([
        axios.get(`http://${URL}/vot/votlist`),
        axios.get(`http://${URL}/candidat/listaCandidati`),
        axios.get(`http://${URL}/partid/listaPartide`)
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          this.setState({
            dataLoaded: true,
            listaPartide: res1.data,

            candidati: res2.data,
            partide: res3.data,

            dataLoaded: true
          });
        })
      );
  };

  showData() {
    const { dataLoaded, listaPartide } = this.state;

    if (dataLoaded) {
      return listaPartide.map((item, key) => {
        console.log(item);
        if (item.votStatus === "stopped")
          return (
            <li key={key}>
              <h3 style={{ marginTop: "20px", color: "white" }}>
                {key + 1}. {item.nume} {item.prenume}
              </h3>
              <p style={{ marginTop: "0px", marginLeft: "20px" }}>{item._id}</p>
              <p
                style={{
                  marginTop: "10px",
                  marginLeft: "20px",
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Rezultate:
              </p>

              <ul>
                {item.candidati.map((item2, key2) => {
                  console.log(item2.candidat);

                  if (item2.tip === "partid")
                    return (
                      <li
                        key={key2}
                        style={{ display: "block", marginLeft: 20 }}
                      >
                        {(() => {
                          var value = 0;
                          item.results.forEach(function(entry) {
                            if (item2.candidat._id === entry.candidatID)
                              value = entry.voturi;
                          });
                          return (
                            <p>
                              {item2.candidat.nume} ({item2.candidat.abreviere})
                              : {value}
                            </p>
                          );
                        })()}
                      </li>
                    );
                  else {
                    return (
                      <li
                        key={key2}
                        style={{ display: "block", marginLeft: 20 }}
                      >
                        {(() => {
                          var value = 0;
                          item.results.forEach(function(entry) {
                            if (item2.candidat._id === entry.candidatID)
                              value = entry.voturi;
                          });
                          return (
                            <p>
                              {item2.candidat.nume} {item2.candidat.prenume} :{" "}
                              {value}
                            </p>
                          );
                        })()}
                      </li>
                    );
                  }
                })}
              </ul>
            </li>
          );
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Statistici</h2>
        <p>Statistici legate de voturi</p>
        <ul>{this.showData()}</ul>
      </div>
    );
  }
}

export default stats;
