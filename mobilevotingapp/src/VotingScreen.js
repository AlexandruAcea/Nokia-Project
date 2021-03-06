import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from "react-native";
import { URL } from "./types";
import axios from "axios";
import HandleBack from "./back";

class VotingScreen extends Component {
  state = {
    list: this.props.navigation.state.params.candidati
  };

  constructor(props) {
    super(props);
    this.state.list.forEach(function(entry) {
      entry.selected = false;
    });
  }

  vote() {
    var newEntry = {};

    const { navigate } = this.props.navigation;

    this.state.list.forEach(function(entry) {
      if (entry.selected === true) newEntry = entry;
    });

    axios({
      method: "post",
      url: `http://${URL}/vot/${
        this.props.navigation.state.params._id
      }/voteaza`,
      headers: {},
      data: {
        id_candidat: newEntry.candidat._id,
        id_votant: this.props.navigation.state.params.idUser
      }
    }).then(res => {
      navigate("Home", {
        token: true
      });
    });
  }

  selectThis(key) {
    var newArr = this.state.list;

    newArr.forEach(function(entry) {
      entry.selected = false;
    });

    newArr[key].selected = true;

    this.setState({ list: newArr });
  }

  onBack = () => {
    console.log("YOU SHALL NOT GO BACK");
    ToastAndroid.show("You shall not return ¯\\_(ツ)_/¯", ToastAndroid.SHORT);

    return true;
  };

  renderCandidati() {
    return this.state.list.map((item, key) => {
      if (item.tip !== "partid")
        return (
          <TouchableOpacity
            key={key}
            activeOpacity={0.7}
            onPress={() => this.selectThis(key)}
          >
            <View
              style={item.selected ? styles.selectedStyle : styles.normalStyle}
            >
              <Text
                style={item.selected ? styles.selectedText : styles.normalText}
              >
                {item.candidat.nume} {item.candidat.prenume}
              </Text>
              <Text
                style={
                  item.selected
                    ? styles.selectedSubtitle
                    : styles.normalSubtitle
                }
              >
                {typeof item.candidat.partid.nume !== "undefined"
                  ? item.candidat.partid.nume +
                    " (" +
                    item.candidat.partid.abreviere +
                    ")"
                  : "Candidat Independent"}
              </Text>
            </View>
          </TouchableOpacity>
        );
      else {
        console.log(item);
        return (
          <TouchableOpacity
            key={key}
            activeOpacity={0.7}
            onPress={() => this.selectThis(key)}
          >
            <View
              style={item.selected ? styles.selectedStyle : styles.normalStyle}
            >
              <Text
                style={item.selected ? styles.selectedText : styles.normalText}
              >
                {item.candidat.nume} {item.candidat.abreviere}
              </Text>

              <View style={{ marginBottom: 20, marginTop: 20 }}>
                {item.candidat.membrii.map((item2, key2) => {
                  return (
                    <View key={key2}>
                      {console.log(item2.nume)}
                      <Text style={{ marginLeft: 20, fontSize: 20 }}>
                        {item2.nume} {item2.prenume}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    });
  }

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
          <Text
            style={{
              marginLeft: 20,
              marginRight: 20,
              color: "white",
              fontSize: 25,
              marginTop: 20,
              fontWeight: "bold"
            }}
          >
            Lista Optiuni
          </Text>

          <Text
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 40,
              fontSize: 22,
              color: "white"
            }}
          >
            Puteti alege o singura optiune de vot
          </Text>

          <ScrollView style={{ marginBottom: 100 }}>
            {this.renderCandidati()}
          </ScrollView>

          <TouchableOpacity
            onPress={() => this.vote()}
            activeOpacity={0.7}
            style={{
              position: "absolute",
              bottom: 20,
              width: "100%"
            }}
          >
            <View
              style={{
                height: 60,
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: "white",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 22 }}>Confirm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </HandleBack>
    );
  }
}

const styles = {
  selectedStyle: {
    backgroundColor: "green",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 5
  },

  normalStyle: {
    backgroundColor: "#fff",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 5
  },

  normalText: {
    marginLeft: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20
  },

  selectedText: {
    marginLeft: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    color: "white"
  },

  normalSubtitle: {
    marginLeft: 20,
    fontSize: 20,
    marginBottom: 20
  },

  selectedSubtitle: {
    marginLeft: 20,
    fontSize: 20,
    marginBottom: 20,
    color: "white"
  }
};

export default VotingScreen;
