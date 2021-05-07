import React, { Component } from "react";
import firebase from "./Authentication";
import "firebase/auth";
import "./SignUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
        var user = result.user;
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  facebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  gitHubLogin() {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  }

  render() {
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
        <button className="flex-item zocial github" onClick={this.gitHubLogin}>
          Github
        </button>
      </div>
    );
  }
}

export default SignUp;
