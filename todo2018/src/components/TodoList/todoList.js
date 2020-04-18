import React from "react";
import "./todoList.css";
import TodoListItem from "../TodoListItem";

const TodoList = ({
  appTodo,
  onDeleteItemApp,
  onToggleImportantApp,
  onToggleDoneApp
}) => {
  const elements = appTodo.map(item => {
    const { id, ...itemProps } = item;
    return (
      <li key={item.id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          onDeleteItem={() => onDeleteItemApp(item.id)}
          onToggleImportantApp={() => onToggleImportantApp(item.id)}
          onToggleDoneApp={() => onToggleDoneApp(item.id)}
        />
      </li>
    );
  });

  return <ul className="list-group todoList">{elements}</ul>;
};

export default TodoList;
