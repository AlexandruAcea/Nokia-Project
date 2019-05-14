import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input, Button, CardSection } from "./components/common";

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  onButtonPress() {
    const { navigate } = this.props.navigation;
    navigate("HomeScreen");
  }

  render() {
    state = { CNP: "" };

    const { containerStyle, titleStyle, inputStyle, subtitleStyle } = styles;

    return (
      <View style={containerStyle}>
        <Text style={titleStyle}>OnlineVoting</Text>
        <Text style={subtitleStyle}>
          Va rugam sa va introduceti CNP-ul{"\n"}pentru a putea continua
        </Text>
        <Input style={inputStyle} label="CNP" placeholder="1980526115175" />
        <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    justifyContent: "center",
    alignItems: "center"
  },

  titleStyle: {
    fontSize: 30,
    color: "black",
    marginTop: 200
  },

  subtitleStyle: {
    fontSize: 15,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center"
  }
};

export default LoginScreen;
