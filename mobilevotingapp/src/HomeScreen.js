import React, { Component } from "react";
import { Text, View, TouchableOpacity, ToastAndroid } from "react-native";
import axios from "axios";
import PullToRefresh from "react-native-pull-to-refresh";
import { URL } from "./types";
import HandleBack from "./back";

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
        axios.get(`http://${URL}/vot/votlist`),
        axios.get(`http://${URL}/referendum/referendumList`)
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.token) {
      this.refresh();
    }
  }

  renderReferendumList() {
    const { navigate } = this.props.navigation;

    if (this.state.dataLoaded) {
      return this.state.campanii.map((item, key) => {
        //console.log(item.votanti);
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

  renderVotes() {
    const { navigate } = this.props.navigation;

    var counter = 0;

    if (this.state.dataLoaded) {
      return this.state.referendumuri.map((item, key) => {
        if (item.votStatus === "ongoing")
          if (item.votanti)
            if (item.votanti.indexOf(this.props.navigation.state.params.idUser))
              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigate("VotOnBoarding", {
                      ...item,
                      isReferendum:
                        typeof item.voturi_da !== "undefined" ? true : false,
                      idUser: this.props.navigation.state.params.idUser
                    })
                  }
                >
                  {counter++}
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

  onBack = () => {
    console.log("YOU SHALL NOT GO BACK");
    ToastAndroid.show("You shall not return ¯\\_(ツ)_/¯", ToastAndroid.SHORT);

    return true;
  };

  render() {
    return (
      <HandleBack onBack={this.onBack}>
        <View
          style={{
            paddingTop: 50,
            flex: 1,
            backgroundColor: "#30323F"
          }}
        >
          <PullToRefresh
            style={{ flex: 1 }}
            onRefresh={this.refresh.bind(this)}
          >
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
            <View style={{ marginTop: 30 }}>
              {this.renderReferendumList()}
              {this.renderVotes()}
            </View>
          </PullToRefresh>
        </View>
      </HandleBack>
    );
  }
}

export default HomeScreen;
