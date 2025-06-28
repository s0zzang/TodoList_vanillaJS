import { createElement } from "../utils/createElement.js";
import Counter from "./Counter.js";
import Item from "./Item.js";

function List(datas, handlers, inputState) {
  const { removeAllItems, completeAllItems } = handlers;
  const section = createElement("section", "todo-content");
  const header = createElement("header", "todo-list-header");
  const counter = new Counter(datas);

  const removeAllBtn = createElement("button", "button-v1");
  removeAllBtn.id = "REMOVE_ALL";
  removeAllBtn.type = "button";
  removeAllBtn.textContent = "전체 삭제";

  const completeAllBtn = createElement("button", "button-v1");
  completeAllBtn.id = "COMPLETE_ALL";
  completeAllBtn.type = "button";
  completeAllBtn.textContent = "전체 완료";

  header.append(counter, removeAllBtn, completeAllBtn);
  header.addEventListener("click", (e) => {
    const target = e.target.id;
    if (target === "REMOVE_ALL") removeAllItems();
    if (target === "COMPLETE_ALL") completeAllItems();
  });

  const ul = createElement("ul", "todo-list");
  section.append(header, ul);
  datas.map((item, idx) =>
    ul.append(new Item(item, idx, handlers, inputState))
  );

  return section;
}

export default List;
