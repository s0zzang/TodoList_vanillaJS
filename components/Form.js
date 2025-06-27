import { createElement } from "../utils/createElement.js";

function Form(addItem) {
  const form = createElement("form", "todo-form");
  form.action = "";

  const input = createElement("input");
  input.type = "text";
  input.name = "addInput";
  input.placeholder = "할 일을 입력하세요.";
  input.autofocus = true;

  const button = createElement("button", "add-btn");
  button.classList.add("button-v1");
  button.textContent = "추가";

  form.append(input, button);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target.addInput;
    // if (!input) return;
    addItem(input.value.trim());
    input.value = "";
  });

  return form;
}

export default Form;
