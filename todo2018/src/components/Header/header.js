import React from "react";
import "./header.css";

const Header = ({ toDo, done }) => {
  return (
    <header className="header">
      <h1>Todo List</h1>
      <h2>
        <span className="header-span-blue">{toDo}</span>
        more to do,
        <span className="header-span-blue">{done}</span>
        done
      </h2>
    </header>
  );
};

export default Header;
