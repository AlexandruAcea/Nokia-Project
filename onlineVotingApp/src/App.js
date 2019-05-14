import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import Details from "./components/Details";
import React, { Component } from "react";

const MainNavigator = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  HomeScreen: { screen: HomeScreen },
  DetailsScreen: { screen: Details }
});

const App = createAppContainer(MainNavigator);

export default App;
