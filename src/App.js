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
      option: "all",
    };

    this.getTodos = this.getTodos.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.showTodos = this.showTodos.bind(this);
    this.renderTodos = this.renderTodos.bind(this);
  }

  renderTodos() {
    let option = this.state.option;
    if (option === "all") {
      return this.state.todos;
    } else if (option === "complete") {
      return this.state.todos.filter((todo) => {
        if (todo.is_completed) {
          return true;
        }
        return false;
      });
    } else {
      return this.state.todos.filter((todo) => {
        if (todo.is_completed) {
          return false;
        }
        return true;
      });
    }
  }

  showTodos(option) {
    this.setState({ option: option });
  }

  getTodos() {
    const url = `http://127.0.0.1:8000/${this.state.user.uid}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ todos: data });
      });
  }

  handleAdd(todo) {
    this.getTodos();
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
    }).catch((err) => alert(err));

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
    }).catch((err) => alert(err));

    this.setState({ todos: todos });
  }

  render() {
    return (
      <div>
        <Navbar user={this.state.user} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <TodoList
                user={this.state.user}
                //todos={this.state.todos}
                todos={this.renderTodos()}
                handleDelete={this.handleDelete}
                handleUpdate={this.handleUpdate}
                handleAdd={this.handleAdd}
                showTodos={this.showTodos}
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
