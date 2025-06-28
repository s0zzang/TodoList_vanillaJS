import { createElement } from "../utils/createElement.js";

function Form(handlers) {
  const {
    todos: { addItem, editItem },
    checked,
  } = handlers;

  const form = createElement("form", "todo-form");
  form.action = "";

  const input = createElement("input");
  input.type = "text";
  input.name = "addInput";
  input.value = checked.get.value;
  input.readOnly = checked.get.completed;
  input.placeholder = "할 일을 입력하세요.";

  const button = createElement("button", "add-btn");
  button.classList.add("button-v1");
  button.textContent = "추가";

  form.append(input, button);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target.addInput;
    const value = input.value.trim();
    if (!value) return;
    if (targetValue) editItem(value, targetIndex);
    else addItem(value);
  });

  // input focus
  if (!checked.get.completed) setTimeout(() => input.focus(), 0);

  return form;
}

export default Form;
