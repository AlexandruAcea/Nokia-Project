import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import ListItem from "./components/ListItem";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Voturi",
    headerTitleStyle: {
      fontWeight: "normal"
    }
  };

  rowPressed = () => {
    const { navigate } = this.props.navigation;
    navigate("DetailsScreen");
  };

  renderRow(item) {
    return <ListItem titlu={item.titlu} func={this.rowPressed} />;
  }

  render() {
    const { textStyle, containerStyle } = styles;
    return (
      <View style={containerStyle}>
        <FlatList
          data={list}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text onPress={() => this.props.mutate()}>Click me</Text>
      </View>
    );
  }
}

const list = [{ titlu: "Europarlamentare" }, { titlu: "Prezidentiale" }];

const styles = {
  containerStyle: {
    height: "80%",
    flex: 1,
    paddingTop: 30
  },

  textStyle: {
    fontSize: 20,
    color: "black",
    marginRight: 20,
    marginLeft: 20,
    textAlign: "center"
  }
};

const Query = gql`
  mutation {
    addSong(title: "yolo song 2") {
      id
      title
    }
  }
`;

export default graphql(Query)(HomeScreen);
