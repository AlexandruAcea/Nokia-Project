import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./src/LoginScreen";
import HomeScreen from "./src/HomeScreen";
import VotOnBoarding from "./src/VotOnBoarding";
import VotScreen from "./src/VotingScreen";
import RefScreen from "./src/ReferendumScreen";

const MainNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },

  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },

  VotOnBoarding: {
    screen: VotOnBoarding,
    navigationOptions: {
      header: null
    }
  },
  VotScreen: {
    screen: VotScreen,
    navigationOptions: {
      header: null
    }
  },

  RefScreen: {
    screen: RefScreen,
    navigationOptions: {
      header: null
    }
  }
});

const App = createAppContainer(MainNavigator);

export default App;
