import React from "react";
import AppProvider from "./components/AppProvider";
import "./styles/app.css";
import LeftToolBar from "./components/LeftToolBar";
import MainContent from "./components/MainContent";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <div className="line" />
        <LeftToolBar />
        <MainContent />
      </div>
    </AppProvider>
  );
}

export default App;
