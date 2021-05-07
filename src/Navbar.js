import React, { Component } from "react";
import firebase from "firebase/app";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.logout = this.logout.bind(this);
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        alert("You have logged out");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  }

  render() {
    return (
      <nav className="navbar-container">
        <NavLink
          exact
          to="/"
          activeClassName="active-class"
          className="navbar-element"
        >
          Todo List
        </NavLink>
        <ul className="user">
          <NavLink
            exact
            to="/login"
            className="navbar-element"
            activeClassName="active-class"
          >
            Login
          </NavLink>
          <NavLink
            exact
            to="/"
            className="navbar-element"
            onClick={this.logout}
          >
            Logout
          </NavLink>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
