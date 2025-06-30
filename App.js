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

  this.setTodo = (newTodo) => {
    const sortedData = newTodo.sort((a, b) => a.isCompleted - b.isCompleted);
    setStorage(sortedData);
    this.todo = sortedData;
    this.render();
  };

  this.inputField = {
    value: null,
    index: null,
    completed: false,
  };

  this.inputFieldSet = (value, index, isCompleted) => {
    this.inputField.value = value;
    this.inputField.index = index;
    this.inputField.completed = isCompleted;
  };

  this.inputFieldReset = () => {
    this.inputField.value = null;
    this.inputField.index = null;
    this.inputField.completed = false;
    this.render();
  };

  this.inputFieldHandler = {
    get: this.inputField,
    set: this.inputFieldSet,
    reset: this.inputFieldReset,
  };

  this.addItem = (newItem) => {
    const newTodo = [
      {
        name: newItem,
        isCompleted: false,
      },
      ...this.todo,
    ];
    this.setTodo(newTodo);
  };

  this.deleteItem = (index) => {
    const newTodo = this.todo.filter((_, i) => i !== index);
    this.inputFieldReset();
    this.setTodo(newTodo);
  };

  this.toggleItem = (el, index) => {
    el.classList.toggle("is-completed");
    const newTodo = this.todo.map((item, idx) => {
      if (idx !== index) return item;
      return { ...item, isCompleted: !item.isCompleted };
    });
    setTimeout(() => this.setTodo(newTodo), 500);
  };

  this.prepareEditItem = (idx, name, isCompleted) => {
    this.inputFieldSet(name, idx, isCompleted);
    this.render();
  };

  this.editItem = (name, index) => {
    const newTodo = this.todo.map((item, idx) => {
      if (idx !== index) return item;
      return { ...item, name };
    });
    this.inputFieldReset();
    this.setTodo(newTodo);
  };

  this.completeAllItems = () => {
    const newTodo = this.todo.map((item) => ({ ...item, isCompleted: true }));
    this.setTodo(newTodo);
  };

  this.deleteAllItems = () => {
    this.setTodo([]);
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
    inputField: this.inputFieldHandler,
  };

  this.init();
}

export default App;
