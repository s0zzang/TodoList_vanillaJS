import { createElement } from "../utils/createElement.js";

function Item(data, idx, handlers, inputState) {
  const { name, isCompleted } = data;
  const { removeItem, toggleItem, prepareEditItem } = handlers;
  const { targetIndex, targetValue } = inputState;

  const li = createElement("li", "todo-item");
  if (isCompleted) li.classList.add("is-completed");

  const input = createElement("input", "todo-check");
  input.id = idx;
  input.type = "checkbox";
  input.checked = idx === targetIndex && name === targetValue;
  input.addEventListener("change", (e) => {
    if (e.target.checked) prepareEditItem(idx, name, isCompleted);
  });

  const title = createElement("span", "todo-title");
  title.textContent = name;

  const deleteBtn = createElement("button", "delete-btn");
  const hiddenText = createElement("span", "hidden");
  deleteBtn.type = "button";
  hiddenText.textContent = "삭제";
  deleteBtn.append(hiddenText);

  li.append(input, title, deleteBtn);
  li.addEventListener("click", (e) => {
    const target = e.target.className;
    if (target === "todo-title") toggleItem(li, idx);
    if (target === "delete-btn") removeItem(idx);
  });

  return li;
}

export default Item;
