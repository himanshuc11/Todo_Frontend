import React, { Component } from "react";
import TodoList from "./TodoList";
import SignUp from "./SignUp";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { Switch, Route } from "react-router-dom";

import firebase from "./Authentication";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      todos: [],
    };

    this.getTodos = this.getTodos.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  getTodos() {
    const url = `http://127.0.0.1:8000/${this.state.user.uid}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ todos: data });
      });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user }, this.getTodos);
      } else {
        this.setState({ user: null, todos: [] });
      }
    });
  }

  handleUpdate(toUpdateTodo) {
    let todo = { ...toUpdateTodo };
    todo.is_completed = !todo.is_completed;

    const todos = this.state.todos.map((todo) => {
      if (toUpdateTodo.id === todo.id) {
        let newTodo = { ...todo };
        newTodo.is_completed = !newTodo.is_completed;
        return newTodo;
      }
      return todo;
    });

    const url = `http://127.0.0.1:8000/${toUpdateTodo.uid}/${toUpdateTodo.id}/`;
    fetch(url, {
      method: "PATCH",
      body: JSON.stringify(todo),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((response) => console.log(response));

    this.setState({ todos: todos });
  }

  handleDelete(toDeleteTodo) {
    const todos = this.state.todos.filter((todo) => {
      if (toDeleteTodo.id === todo.id) {
        return false;
      }
      return true;
    });

    const url = `http://127.0.0.1:8000/${toDeleteTodo.uid}/${toDeleteTodo.id}`;
    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(toDeleteTodo),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((response) => console.log(response));

    this.setState({ todos: todos });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <TodoList
                user={this.state.user}
                todos={this.state.todos}
                handleDelete={this.handleDelete}
                handleUpdate={this.handleUpdate}
              />
            )}
          ></Route>
          <Route exact path="/login" render={() => <SignUp />}></Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
