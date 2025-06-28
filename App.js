import Form from "./components/Form.js";
import Layout from "./components/Layout.Js";
import List from "./components/List.js";
import { getStorage, setStorage } from "./utils/storage.js";

function App() {
  this.todo = getStorage();
  this.$app = document.querySelector("#app");

  this.init = () => {
    this.list = new List(this.todo, this.handlers);
    this.form = new Form(this.handlers);
    this.layout = new Layout(this.$app, this.list, this.form);
  };

  this.render = () => {
    this.$app.innerHTML = "";
    this.init();
  };

  this.setTodoState = (newTodo) => {
    const sortedData = newTodo.sort((a, b) => a.isCompleted - b.isCompleted);
    setStorage(sortedData);
    this.todo = sortedData;
    this.render();
  };

  this.checkedState = {
    value: null,
    index: null,
    completed: false,
  };

  this.checkedSet = (value, index, isCompleted) => {
    this.checkedState.value = value;
    this.checkedState.index = index;
    this.checkedState.completed = isCompleted;
  };

  this.checkedReset = () => {
    this.checkedState.value = null;
    this.checkedState.index = null;
    this.checkedState.completed = false;
    this.render();
  };

  this.checkedHandler = {
    get: this.checkedState,
    set: this.checkedSet,
    reset: this.checkedReset,
  };

  this.addItem = (newItem) => {
    const newTodo = [
      {
        name: newItem,
        isCompleted: false,
      },
      ...this.todo,
    ];
    this.setTodoState(newTodo);
  };

  this.deleteItem = (index) => {
    const newTodo = this.todo.filter((_, i) => i !== index);
    this.setTodoState(newTodo);
  };

  this.toggleItem = (el, index) => {
    el.classList.toggle("is-completed");
    const newTodo = this.todo.map((item, idx) => {
      if (idx !== index) return item;
      return { ...item, isCompleted: !item.isCompleted };
    });
    setTimeout(() => this.setTodoState(newTodo), 500);
  };

  this.prepareEditItem = (idx, name, isCompleted) => {
    this.checkedSet(name, idx, isCompleted);
    this.render();
  };

  this.editItem = (name, index) => {
    const newTodo = this.todo.map((item, idx) => {
      if (idx !== index) return item;
      return { ...item, name };
    });
    this.checkedReset();
    this.setTodoState(newTodo);
  };

  this.completeAllItems = () => {
    const newTodo = this.todo.map((item) => ({ ...item, isCompleted: true }));
    this.setTodoState(newTodo);
  };

  this.deleteAllItems = () => {
    this.setTodoState([]);
  };

  this.todosHandlers = {
    addItem: this.addItem,
    deleteItem: this.deleteItem,
    toggleItem: this.toggleItem,
    prepareEditItem: this.prepareEditItem,
    editItem: this.editItem,
    completeAllItems: this.completeAllItems,
    deleteAllItems: this.deleteAllItems,
  };

  this.handlers = {
    todos: this.todosHandlers,
    checked: this.checkedHandler,
  };

  this.init();
}

export default App;
