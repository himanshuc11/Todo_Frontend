import React, { Component } from "react";
import "./AddTodo.css";

class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = { todo: "", selected: "all" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(evt) {
    console.log(evt.target);
    this.setState({ selected: evt.target.value }, () =>
      this.props.showTodos(this.state.selected)
    );
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
      fetch("https://fullstacktodoapi.herokuapp.com/", {
        method: "POST",
        body: JSON.stringify(req),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then(() => this.setState({ todo: "" }))
        .then(() => this.props.handleAdd())
        .catch((err) => alert(err));
    }
  }

  render() {
    return (
      <form action="">
        <select
          name="todo-type"
          id="todo-type"
          value={this.state.selected}
          onChange={this.handleSelectChange}
        >
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
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
