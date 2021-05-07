import React, { Component } from "react";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.renderTodos = this.renderTodos.bind(this);
  }

  renderTodos() {
    return this.props.todos.map((todo) => {
      return (
        <Todo
          todo={todo}
          key={todo.uid + todo.id}
          delete={this.props.handleDelete}
          handleUpdate={this.props.handleUpdate}
        />
      );
    });
  }

  render() {
    if (this.props.user) {
      return (
        <div className="main-container">
          <div className="todo-container">
            <h1>
              {this.props.user.displayName.split(" ")[0] + `'s Todo List`}
            </h1>
            <hr />
            <AddTodo
              uid={this.props.user.uid}
              handleAdd={this.props.handleAdd}
            />
            {this.renderTodos()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="main-container">
          <h1>Please Login To Continue</h1>
        </div>
      );
    }
  }
}

export default TodoList;
