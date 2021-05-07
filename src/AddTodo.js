import React, { Component } from "react";
import "./AddTodo.css";

class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = { todo: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ todo: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const req = {
      uid: this.props.uid,
      task_description: this.state.todo,
      is_completed: false,
    };

    if (this.state.todo !== "") {
      fetch("http://127.0.0.1:8000/", {
        method: "POST",
        body: JSON.stringify(req),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => console.log(response))
        .then(() => this.setState({ todo: "" }));
    }
  }

  render() {
    return (
      <form action="">
        <input
          type="text"
          placeholder="Add Todo"
          onChange={this.handleChange}
          value={this.state.todo}
        />
        &nbsp;
        <button onClick={this.handleSubmit} className="add-button">
          +
        </button>
      </form>
    );
  }
}

export default AddTodo;
