import React, { Component } from "react";
import "../styles/app.css";
import Context from "../Context";
import Campanii from "./screens/campanii";
import Candidati from "./screens/candidati";
import Partide from "./screens/partide";
import Users from "./screens/users";
import Stats from "./screens/stats";

class MainContent extends Component {
  currentContent(context) {
    switch (context.currentPage) {
      case 0:
        return <Campanii />;
      case 1:
        return <Partide />;
      case 2:
        return <Candidati />;
      case 3:
        return <Users />;
      case 4:
        return <Stats />;
      default:
        return <Campanii />;
    }
  }

  render() {
    return (
      <Context.Consumer>
        {context => (
          <div className="mainContent">
            <div className="inside">{this.currentContent(context)}</div>
          </div>
        )}
      </Context.Consumer>
    );
  }
}

export default MainContent;
