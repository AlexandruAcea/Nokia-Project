import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ListItem = props => {
  handleClick = () => {
    props.func();
  };

  return (
    <TouchableOpacity onPress={this.handleClick}>
      <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>{props.titlu}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    width: "100%",
    height: 70,
    paddingLeft: 20
  },

  textStyle: { fontSize: 20, color: "black" }
};

export default ListItem;
