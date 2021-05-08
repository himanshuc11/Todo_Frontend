import React, { Component } from "react";
import firebase from "./Authentication";
import "firebase/auth";
import "./SignUp.css";

import { Redirect } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { logged: this.props.user ? true : false };
    this.gmailLogin = this.gmailLogin.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.gitHubLogin = this.gitHubLogin.bind(this);
  }

  gmailLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        this.setState({ logged: true });
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }

  facebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        this.setState({ logged: true });
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }

  gitHubLogin() {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        this.setState({ logged: true });
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }

  render() {
    if (this.state.logged) {
      alert("You are already logged in");
      return <Redirect exact to="/" />;
    } else {
      return (
        <div className="flex-container">
          <button className="flex-item zocial gmail" onClick={this.gmailLogin}>
            Gmail
          </button>
          <button
            className="flex-item zocial facebook"
            onClick={this.facebookLogin}
          >
            Facebook
          </button>
          <button
            className="flex-item zocial github"
            onClick={this.gitHubLogin}
          >
            Github
          </button>
        </div>
      );
    }
  }
}

export default SignUp;
