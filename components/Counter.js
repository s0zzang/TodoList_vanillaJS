import { createElement } from "../utils/createElement.js";

function Counter(datas) {
  const div = createElement("div", "todo-counter");

  const completed = createElement("dl", "todo-counter-box");
  const completedLength = datas.filter(({ isCompleted }) => isCompleted).length;
  completed.innerHTML = `<dt>완료</dt><dd>${completedLength}개</dd>`;

  const total = createElement("dl", "todo-counter-box");
  total.innerHTML = `<dt>전체</dt><dd>${datas.length}개</dd>`;

  div.append(completed, " / ", total);

  return div;
}

export default Counter;
