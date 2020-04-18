import React, { Component } from "react";
import "./todoListItem.css";
import "font-awesome/css/font-awesome.css";

export default class TodoListItem extends Component {
  render() {
    const {
      label,
      onDeleteItem,
      onToggleDoneApp,
      onToggleImportantApp,
      done,
      important
    } = this.props;

    let clazz = "todoListItem";

    if (done) {
      clazz += " done";
    }
    if (important) {
      clazz += " important";
    }

    return (
      <div className={clazz}>
        <span className="todoListItem-label" onClick={onToggleDoneApp}>
          {label}
        </span>
        <div className="todoListItem-btn">
          <button
            type="button"
            className="btn btn-outline-success btn-sm "
            onClick={onToggleImportantApp}
          >
            <i className="fa fa-exclamation" />
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={onDeleteItem}
          >
            <i className="fa fa-trash-o" />
          </button>
        </div>
      </div>
    );
  }
}
