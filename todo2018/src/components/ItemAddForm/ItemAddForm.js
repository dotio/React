import React, { Component } from "react";

import "./ItemAddForm.css";

class ItemAddForm extends Component {
  state = {
    value: ""
  };

  onSubmit = e => {
    const { value } = this.state;
    const { onAddItem } = this.props;
    e.preventDefault();
    if (value !== "") {
      onAddItem(value);
      this.setState({
        value: ""
      });
    }
  };

  onlabelChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="itemAddForm">
        <input
          type="text"
          className="form-control"
          onChange={this.onlabelChange}
          placeholder="What needs to be done?"
          value={value}
        />
        <button className="btn btn-info itemAddForm-btn">Add new</button>
      </form>
    );
  }
}

export default ItemAddForm;
