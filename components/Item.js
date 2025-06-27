import { createElement } from "../utils/createElement.js";

function Item({ name, isCompleted }, idx, removeItem, changeItem) {
  const li = createElement("li", "todo-item");
  if (isCompleted) li.classList.add("is-completed");

  const input = createElement("input");
  input.setAttribute("id", name);
  input.type = "checkbox";

  const span = createElement("span", "todo-subject");
  span.textContent = name;

  const button = createElement("button", "delete-btn");
  button.type = "button";
  button.textContent = "삭제";

  li.append(input, span, button);
  li.addEventListener("click", (e) => {
    const target = e.target.className;
    if (target === "todo-subject") {
      li.classList.toggle("is-completed");
      changeItem(idx);
    }
    if (target === "delete-btn") removeItem(idx);
  });

  return li;
}

export default Item;
