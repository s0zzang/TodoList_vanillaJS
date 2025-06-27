import { createElement } from "../utils/createElement.js";
import Counter from "./Counter.js";
import Item from "./Item.js";

function List(datas, removeItem, changeItem) {
  const section = createElement("section", "todo-content");
  const header = createElement("header", "todo-list-header");
  const counter = new Counter(datas);

  const buttonAllRemove = createElement("button", "allRemove-btn");
  buttonAllRemove.classList.add("button-v1");
  buttonAllRemove.textContent = "전체 삭제";
  buttonAllRemove.addEventListener("click", () => {
    changeItem("", "전체 삭제");
  });

  const buttonAllTrue = createElement("button", "allTrue-btn");
  buttonAllTrue.classList.add("button-v1");
  buttonAllTrue.textContent = "전체 완료";
  buttonAllTrue.addEventListener("click", () => {
    changeItem("", "전체 완료");
  });
  header.append(counter, buttonAllRemove, buttonAllTrue);

  const ul = createElement("ul", "todo-list");
  section.append(header, ul);
  datas.map((item, idx) =>
    ul.append(new Item(item, idx, removeItem, changeItem))
  );

  return section;
}

export default List;
