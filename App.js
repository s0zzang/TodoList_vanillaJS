import Form from "./components/Form.js";
import Layout from "./components/Layout.Js";
import List from "./components/List.js";
import { getStorage, setStorage } from "./utils/storage.js";

function App() {
  this.todo = getStorage();
  this.$app = document.querySelector("#app");

  this.init = () => {
    this.list = new List(this.todo, this.handlers, this.inputState);
    this.form = new Form(this.handlers, this.inputState);
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

  this.inputState = {
    targetValue: null,
    targetIndex: null,
    targetComplited: false,
    set: function (value, index, isCompleted) {
      this.targetValue = value;
      this.targetIndex = index;
      this.targetComplited = isCompleted;
    },
    reset: function () {
      this.targetValue = null;
      this.targetIndex = null;
      this.targetComplited = false;
    },
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
    this.setTodoState(newTodo);
  };

  this.prepareEditItem = (idx, name, isCompleted) => {
    this.inputState.set(name, idx, isCompleted);
    this.render();
  };

  this.editItem = (name, index) => {
    const newTodo = this.todo.map((item, idx) => {
      if (idx !== index) return item;
      return { ...item, name };
    });
    this.inputState.reset();
    this.setTodoState(newTodo);
  };

  this.completeAllItems = () => {
    const newTodo = this.todo.map((item) => ({ ...item, isCompleted: true }));
    this.setTodoState(newTodo);
  };

  this.deleteAllItems = () => {
    this.setTodoState([]);
  };

  this.handlers = {
    addItem: this.addItem,
    deleteItem: this.deleteItem,
    toggleItem: this.toggleItem,
    prepareEditItem: this.prepareEditItem,
    editItem: this.editItem,
    completeAllItems: this.completeAllItems,
    deleteAllItems: this.deleteAllItems,
  };

  this.init();
}

export default App;
