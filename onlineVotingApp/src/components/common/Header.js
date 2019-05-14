//import libraries for making a component
import React from "react";
import { Text, View } from "react-native";

//make a component
const Header = props => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    height: 60,

    backgroundColor: "#F8F8F8",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    elevation: 5,
    position: "relative"
  },

  textStyle: {
    fontSize: 20,
    color: "#000"
  }
};

//make the component available to other parts of the app
export { Header };
