import { createElement } from "../utils/createElement.js";

function Item({ name, isCompleted }, idx, removeItem, changeItem) {
  const li = createElement("li", "todo-item");
  if (isCompleted) li.classList.add("is-completed");

  const input = createElement("input");
  input.setAttribute("id", name);
  input.type = "checkbox";

  const span = createElement("span", "todo-title");
  span.textContent = name;

  const button = createElement("button", "delete-btn");
  const hiddenText = createElement("span", "hidden");
  button.type = "button";
  hiddenText.textContent = "삭제";
  button.append(hiddenText);

  li.append(input, span, button);
  li.addEventListener("click", (e) => {
    const target = e.target.className;
    if (target === "todo-title") {
      li.classList.toggle("is-completed");
      changeItem(idx);
    }
    if (target === "delete-btn") removeItem(idx);
  });

  return li;
}

export default Item;
