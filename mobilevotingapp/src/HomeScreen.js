import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import axios from "axios";
import PullToRefresh from "react-native-pull-to-refresh";

class HomeScreen extends Component {
  state = {
    campanii: [],
    referendumuri: [],
    dataLoaded: false,

    object: {}
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .all([
        axios.get("http://192.168.1.28:1234/vot/votlist"),
        axios.get("http://192.168.1.28:1234/referendum/referendumList")
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

  renderReferendumList() {
    const { navigate } = this.props.navigation;

    //console.log(this.props.navigation.state.params.idUser);

    if (this.state.dataLoaded) {
      return this.state.campanii.map((item, key) => {
        console.log(item.votanti);
        if (item.votStatus === "ongoing")
          if (item.votanti.indexOf(this.props.navigation.state.params.idUser))
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.7}
                onPress={() =>
                  navigate("VotOnBoarding", {
                    ...item,
                    idUser: this.props.navigation.state.params.idUser
                  })
                }
              >
                <View
                  style={{
                    justifyContent: "center",
                    height: 90,
                    backgroundColor: "#fff",
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20,
                    borderRadius: 5
                  }}
                >
                  <Text style={{ marginLeft: 20, fontSize: 22 }}>
                    {item.nume}
                  </Text>
                </View>
              </TouchableOpacity>
            );
      });
    }
  }

  refresh() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.fetchData();
        resolve();
      }, 1000);
    });
  }

  render() {
    return (
      <View
        style={{
          paddingTop: 50,
          flex: 1,
          backgroundColor: "#30323F"
        }}
      >
        <PullToRefresh style={{ flex: 1 }} onRefresh={this.refresh.bind(this)}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              marginLeft: 20,
              color: "white"
            }}
          >
            Lista voturi active
          </Text>
          <View style={{ marginTop: 30 }}>{this.renderReferendumList()}</View>
        </PullToRefresh>
      </View>
    );
  }
}

export default HomeScreen;