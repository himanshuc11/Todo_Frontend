import React, { Component } from "react";
import TodoList from "./TodoList";
import SignUp from "./SignUp";
import Navbar from "./Navbar";

import { Switch, Route } from "react-router-dom";

import firebase from "./Authentication";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user }, () => this.forceUpdate());
      } else {
        this.setState({ user: null });
      }
    });
  }

  componentWillUnmount() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <TodoList user={this.state.user} />}
          ></Route>
          <Route exact path="/login" render={() => <SignUp />}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
