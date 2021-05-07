import React, { Component } from "react";
import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.del = this.del.bind(this);
  }

  del() {
    this.props.delete(this.props.todo);
  }

  render() {
    return (
      <div className="todo-item">
        <p>{this.props.todo.task_description}</p>
        <div className="todo-images">
          <img src="trash.png" alt="Trash" onClick={this.del} />
          <img src="check.png" alt="Check" />
        </div>
      </div>
    );
  }
}

export default Todo;
