import React from "react";
import "../../styles/roundedsquare.css";

const RoundedSquare = props => {
  return (
    <div className="roundedSquareBody">
      <h1>{props.nume}</h1>
    </div>
  );
};

export default RoundedSquare;
