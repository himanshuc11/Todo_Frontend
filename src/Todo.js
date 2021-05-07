import React, { Component } from "react";
import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.del = this.del.bind(this);
    this.update = this.update.bind(this);
  }

  del() {
    this.props.delete(this.props.todo);
  }

  update() {
    this.props.handleUpdate(this.props.todo);
  }

  render() {
    if (!this.props.todo.is_completed) {
      return (
        <div className="todo-item">
          <p style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
            {this.props.todo.task_description}
          </p>
          <div className="todo-images">
            <img src="trash.png" alt="Trash" onClick={this.del} />
            <img src="check.png" alt="Check" onClick={this.update} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="todo-item">
          <strike
            style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
          >
            {this.props.todo.task_description}
          </strike>
          <div className="todo-images">
            <img src="trash.png" alt="Trash" onClick={this.del} />
            <img src="check.png" alt="Check" onClick={this.update} />
          </div>
        </div>
      );
    }
  }
}

export default Todo;
