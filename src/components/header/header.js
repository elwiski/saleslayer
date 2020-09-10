import React from "react";
import "./header.scss"
import { Link, withRouter } from "react-router-dom";
function Header() {
  let isHomePage = window.location.pathname === "/" ? true : false;
  return (
    <>
      {isHomePage ? (
        <div className="main">
          <div className="heading">EL WISKI</div>
          <div className="subHeading">
          wants to be hired
          </div>
        </div>
      ) : (
        <header>
          <Link to="/">git board</Link>
        </header>
      )}
    </>
  );
}

export default withRouter(Header);