import React, { Component } from "react";
import "./searchPanel.css";

class SearchPanel extends Component {
  state = {
    term: ""
  };

  onSearchChange = e => {
    const term = e.target.value;
    this.setState({
      term
    });
    this.props.onSearchChange(term);
  };

  render() {
    const { term } = this.state;
    return (
      <input
        className="form-control search-input"
        placeholder="type to search"
        type="text"
        value={term}
        onChange={this.onSearchChange}
      />
    );
  }
}

export default SearchPanel;
