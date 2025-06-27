import { createElement } from "../utils/createElement.js";

function Counter(datas) {
  const div = createElement("div", "todo-counter");

  const completed = createElement("span", "todo-counter-completed");
  completed.textContent = datas.filter(({ isCompleted }) => isCompleted).length;

  const total = createElement("span", "todo-counter-total");
  total.textContent = datas.length;

  div.append(completed, " / ", total);

  return div;
}

export default Counter;
