import { createElement } from "../utils/createElement.js";
import Counter from "./Counter.js";
import Item from "./Item.js";

function List(datas, handlers, inputState) {
  const { deleteAllItems, completeAllItems } = handlers;
  const section = createElement("section", "todo-content");
  const header = createElement("header", "todo-list-header");
  const counter = new Counter(datas);

  const deleteAllBtn = createElement("button", "button-v1");
  deleteAllBtn.id = "delete_ALL";
  deleteAllBtn.type = "button";
  deleteAllBtn.textContent = "전체 삭제";

  const completeAllBtn = createElement("button", "button-v1");
  completeAllBtn.id = "COMPLETE_ALL";
  completeAllBtn.type = "button";
  completeAllBtn.textContent = "전체 완료";

  header.append(counter, deleteAllBtn, completeAllBtn);
  header.addEventListener("click", (e) => {
    const target = e.target.id;
    if (target === "delete_ALL") deleteAllItems();
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
