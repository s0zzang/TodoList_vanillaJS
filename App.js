import Form from "./components/Form.js";
import Layout from "./components/Layout.Js";
import List from "./components/List.js";
import { getStorage, setStorage } from "./utils/storage.js";

function App() {
  this.data = getStorage();
  this.$app = document.querySelector("#app");

  this.init = () => {
    this.list = new List(this.data, this.removeItem, this.changeItem);
    this.form = new Form(this.addItem);
    this.layout = new Layout(this.$app, this.list, this.form);
  };

  this.render = () => {
    this.$app.innerHTML = "";
    this.init();
  };

  this.setState = (newData, isRendering = true) => {
    this.data = newData;
    setStorage(newData);
    if (isRendering) this.render();
  };

  this.addItem = (newItem) => {
    const newData = [
      ...this.data,
      {
        name: newItem,
        isCompleted: false,
      },
    ];
    this.setState(newData);
  };

  this.removeItem = (index) => {
    const newData = this.data.filter((_, i) => i !== index);
    this.setState(newData);
  };

  this.changeItem = (index, option = "") => {
    let newData = [];
    if (option === "전체 삭제") newData = [];
    if (option === "전체 완료") {
      newData = this.data.map((item) => ({ ...item, isCompleted: true }));
    }
    if (!option) {
      newData = this.data.map((item, idx) => {
        if (idx !== index) return item;
        return { ...item, isCompleted: !item.isCompleted };
      });
    }

    this.setState(newData, !!option);
  };

  this.init();
}

export default App;
