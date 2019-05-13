import React from "react";
import "../styles/app.css";
import stema from "../assets/stema.png";
import Context from "../Context";

const LeftToolBar = () => {
  return (
    <Context.Consumer>
      {context => (
        <div className="toolBar">
          <div className="logo">
            <img id="stema" src={stema} alt="Stema Romaniei" />
            <h2>Biroul Electoral</h2>
          </div>

          <div className="list">
            <ul>
              {context.pages.map(function(item, i) {
                return (
                  <li key={i} onClick={() => context.setCurrentPage(i)}>
                    <div className={whatClass(i, context)}>
                      <p>{item}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </Context.Consumer>
  );
};

function whatClass(i, context) {
  if (i === context.currentPage) return "listItemSelected";
  else return "listItem";
}

export default LeftToolBar;
