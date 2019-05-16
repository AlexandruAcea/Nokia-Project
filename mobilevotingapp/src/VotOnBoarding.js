import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

class VotOnBoarding extends Component {
  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
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
          Atentie
        </Text>

        <Text
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            fontSize: 22,
            color: "white"
          }}
        >
          Prin continuarea dupa acest punct nu va mai puteti intoarce decat dupa
          ce a-ti votat.
        </Text>

        <Text
          style={{
            marginLeft: 20,
            marginRight: 20,
            color: "white",
            marginTop: 20,
            fontSize: 25,
            fontWeight: "bold"
          }}
        >
          Votul tau conteaza
        </Text>

        <Text
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            fontSize: 22,
            color: "white"
          }}
        >
          Doar exprimandu-va dreptul la vot puteti schimba ceva.
          {"\n"}
          Daca nu sunteti de acord cu niciunul din candidati sau optiuni puteti
          opta pentru vot nul.
        </Text>

        <Text
          style={{
            marginLeft: 20,
            marginRight: 20,
            color: "white",
            marginTop: 20,
            fontSize: 25,
            fontWeight: "bold"
          }}
        >
          De asemenea
        </Text>

        <Text
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            fontSize: 22,
            color: "white"
          }}
        >
          Orice tentativa de frauda rezulta cu jandarmii la usa.
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigate("VotScreen", {
              ...params,
              idUser: this.props.navigation.state.params.idUser
            })
          }
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
            <Text style={{ fontSize: 22 }}>Continua</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default VotOnBoarding;
