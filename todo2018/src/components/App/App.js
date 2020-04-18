import React, { Component } from "react";
import Header from "../Header";
import ItemAddForm from "../ItemAddForm";
import SearchPanel from "../SearchPanel/";
import TodoList from "../TodoList";
import ItemStatusFilter from "../ItemStatusFilter";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make App"),
      this.createTodoItem("Play Games")
    ],
    term: "",
    filter: "all"
  };

  //create items
  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  //delete item from array
  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr
      };
    });
  };

  // add new item
  additem = text => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr
      };
    });
  };

  // property done and important
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  //important depends id
  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  // done depends id
  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  // search items
  search(item, term) {
    if (term.length === 0) {
      return item;
    }

    return item.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onSearchChange = term => {
    this.setState({ term });
  };

  // filter
  filter(item, filter) {
    switch (filter) {
      case "all":
        return item;
      case "active":
        return item.filter(item => !item.done);
      case "done":
        return item.filter(item => item.done);
      default:
        return item;
    }
  }

  onFilterChange = filter => {
    this.setState({ filter });
  };
  render() {
    const { todoData, term, filter } = this.state;

    const visibleItem = this.filter(this.search(todoData, term), filter);
    const doneCnt = todoData.filter(el => el.done).length;
    const toDoCnt = todoData.length - doneCnt;
    return (
      <div className="app container">
        <Header toDo={toDoCnt} done={doneCnt} />
        <div className="search-panel">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          appTodo={visibleItem}
          onDeleteItemApp={this.deleteItem}
          onToggleImportantApp={this.onToggleImportant}
          onToggleDoneApp={this.onToggleDone}
        />
        <ItemAddForm onAddItem={this.additem} />
      </div>
    );
  }
}
