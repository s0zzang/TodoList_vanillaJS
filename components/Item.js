import { createElement } from "../utils/createElement.js";

function Item(data, idx, handlers) {
  const { name, isCompleted } = data;
  const {
    todos: { deleteItem, toggleItem, prepareEditItem },
    checked,
  } = handlers;

  const li = createElement("li", "todo-item");
  if (isCompleted) li.classList.add("is-completed");

  const input = createElement("input", "todo-check");
  input.id = idx;
  input.type = "checkbox";
  input.checked = idx === checked.get.index && name === checked.get.value;
  input.addEventListener("change", (e) => {
    if (e.target.checked) prepareEditItem(idx, name, isCompleted);
    else checked.reset();
  });

  const title = createElement("h3", "todo-title");
  title.textContent = name;

  const deleteBtn = createElement("button", "delete-btn");
  const hiddenText = createElement("span", "hidden");
  deleteBtn.type = "button";
  hiddenText.textContent = "삭제";
  deleteBtn.append(hiddenText);

  li.append(input, title, deleteBtn);
  li.addEventListener("click", (e) => {
    const target = e.target.className;
    if (target === "todo-check") return;
    if (target === "delete-btn") return deleteItem(idx);
    toggleItem(li, idx);
  });

  return li;
}

export default Item;
