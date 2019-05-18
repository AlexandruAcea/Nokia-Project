import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { URL } from "./types";
import axios from "axios";

class ReferendumScreen extends Component {
  state = {
    active: "none"
  };

  vote = () => {
    var vote = this.state.active === "yes" ? "votYES" : "votNO";

    axios({
      method: "post",
      url: `http://${URL}/referendum/${
        this.props.navigation.state.params._id
      }/${vote}`,
      headers: {},
      data: {
        id_votant: this.props.navigation.state.params.idUser
      }
    }).then(res => {
      navigate("Home");
    });
  };

  render() {
    const { params } = this.props.navigation.state;
    //const { candidati } = this.props.navigation.state.params;

    return (
      <View
        style={{
          paddingTop: 50,
          flex: 1,
          backgroundColor: "#30323F"
        }}
      >
        {console.log(params)}
        <Text
          style={{
            marginLeft: 20,
            marginRight: 20,
            color: "white",
            fontSize: 30,
            marginTop: 40,
            fontWeight: "bold"
          }}
        >
          {params.nume}
        </Text>

        <Text
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 40,
            fontSize: 25,
            color: "white"
          }}
        >
          {params.descriere}
        </Text>

        <View style={{ flexDirection: "row", height: 300, marginTop: 50 }}>
          <TouchableOpacity
            onPress={() => this.setState({ active: "yes" })}
            style={[
              {
                flex: 1,
                width: "50%",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginLeft: 20,
                marginRight: 10
              },
              this.state.active === "yes" ? styles.selectedStyle : ""
            ]}
          >
            <View>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: this.state.active === "yes" ? "white" : "black"
                }}
              >
                Da
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setState({ active: "no" })}
            style={[
              {
                flex: 1,
                width: "50%",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginLeft: 10,
                marginRight: 20
              },
              this.state.active === "no" ? styles.selectedStyleNo : ""
            ]}
          >
            <View>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: this.state.active === "no" ? "white" : "black"
                }}
              >
                Nu
              </Text>
            </View>
          </TouchableOpacity>
        </View>

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
    );
  }
}

const styles = {
  selectedStyle: {
    backgroundColor: "green"
  },

  selectedStyleNo: {
    backgroundColor: "red"
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
export default ReferendumScreen;
