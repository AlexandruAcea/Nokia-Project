import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import { URL } from "./types";
import axios from "axios";
import stema from "./assets/stema.png";

export default class LoginScreen extends Component {
  state = { value1: "", value2: "" };

  login() {
    const { navigate } = this.props.navigation;

    if (this.state.value1 !== "" && this.state.value2 !== "")
      axios({
        method: "post",
        url: `http://${URL}/login`,
        headers: {},
        data: {
          cnp: this.state.value1,
          parola: this.state.value2
        }
      }).then(res => {
        //console.log(res.data.user._id);
        if (res.data.message === "LOGGED IN")
          navigate("Home", { idUser: res.data.user._id });
        else
          ToastAndroid.show("Wrong password ¯\\_(ツ)_/¯", ToastAndroid.SHORT);
      });
    else ToastAndroid.show("Type something yo ¯\\_(ツ)_/¯", ToastAndroid.SHORT);
  }

  render() {
    return (
      <View
        style={{
          height: "100%",
          backgroundColor: "#30323F",
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

        <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>
          Votare Online
        </Text>
        <Text style={{ color: "#fff", fontSize: 20 }}>
          Biroul Electoral Central
        </Text>

        <View
          style={{
            height: 150,
            width: "90%",
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
            width: "90%",
            backgroundColor: "#C6C6C6",
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
