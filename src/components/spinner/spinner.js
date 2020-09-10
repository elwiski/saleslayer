import React from "react";
import "./spinner.scss";

function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <div className="spinner-text">patience, many requests to the server...</div>
    </div>
  );
}

export default Spinner;