/**
 * @format
 */
import React, { Component } from "react";
import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { NETWORK_INTERFACE } from "./src/config";

class Main extends Component {
  constructor(...args) {
    super(...args);

    this.client = new ApolloClient({
      link: new HttpLink({ uri: "https://92.87.91.16:4000/graphql" }),
      cache: new InMemoryCache(),
      dataIdFromObject: r => r.id
    });
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        {console.log(this.client)}
        <App />
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Main);
