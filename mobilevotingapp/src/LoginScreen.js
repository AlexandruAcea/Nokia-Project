import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import stema from "./assets/stema.png";

export default class LoginScreen extends Component {
  state = { value1: "", value2: "" };

  login() {
    const { navigate } = this.props.navigation;

    axios({
      method: "post",
      url: `http://192.168.1.28:1234/login`,
      headers: {},
      data: {
        cnp: this.state.value1,
        parola: this.state.value2
      }
    }).then(res => {
      //console.log(res.data.user._id);
      if (res.data.message === "LOGGED IN")
        navigate("Home", { idUser: res.data.user._id });
    });
  }

  render() {
    return (
      <View
        style={{
          height: "100%",
          backgroundColor: "#D9D7D8",
          paddingTop: 30,
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Image
          source={stema}
          style={{
            height: 120,
            width: 120,
            resizeMode: "contain",
            marginTop: 100
          }}
        />

        <Text style={{ color: "#4A5569", fontSize: 25, fontWeight: "bold" }}>
          Votare Online
        </Text>
        <Text style={{ color: "#4A5569", fontSize: 20 }}>
          Biroul Electoral Central
        </Text>

        <View
          style={{
            height: 150,
            width: "80%",
            backgroundColor: "white",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            marginTop: 70
          }}
        >
          <TextInput
            placeholder="Cod numeric personal"
            style={[
              styles.inputStyle,
              { borderBottomColor: "#D2D2D2", borderBottomWidth: 2 }
            ]}
            onChangeText={value1 => this.setState({ value1 })}
            value={this.state.value1}
          />

          <TextInput
            placeholder="Parola"
            style={styles.inputStyle}
            secureTextEntry={true}
            onChangeText={value2 => this.setState({ value2 })}
            value={this.state.value2}
          />
        </View>

        <TouchableOpacity
          onPress={() => this.login()}
          activeOpacity={0.7}
          style={{
            height: 70,
            width: "80%",
            backgroundColor: "#4A5569",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
              Logheaza-te
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderWidth: 0,
    paddingLeft: 20,
    fontSize: 20
  }
};
