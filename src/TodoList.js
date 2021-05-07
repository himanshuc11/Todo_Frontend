import React, { Component } from "react";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
    this.renderTodos = this.renderTodos.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    console.log("It did mount again", this.props.user);
    if (this.props.user) {
      const url = `http://127.0.0.1:8000/${this.props.user.uid}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ todos: data });
        });
    }
  }

  renderTodos() {
    return this.state.todos.map((todo) => {
      return (
        <Todo todo={todo} key={todo.uid + todo.id} delete={this.handleDelete} />
      );
    });
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
    if (this.props.user) {
      return (
        <div className="main-container">
          <p>{this.props.user.displayName}</p>
          <AddTodo uid={this.props.user.uid} />
          {this.renderTodos()}
        </div>
      );
    } else {
      return (
        <div className="main-container">
          <p>Please login to continue</p>
        </div>
      );
    }
  }
}

export default TodoList;
