import { createElement } from "../utils/createElement.js";

function Layout(app, list, form) {
  const header = createElement("header", "todo-header");
  header.innerHTML = `
        <div class="todo-title-box">
            <h1 class="todo-header-title">Todo List</h1>
            <h2 class="todo-circle">프론트엔드 지원자 이소정 </h2>
        </div>
        <p class="todo-header-subTitle">체크리스트를 작성해보세요.</p>
    `;

  const main = createElement("main", "todo-main");
  main.append(list);

  const footer = createElement("footer", "todo-footer");
  footer.append(form);

  app.append(header, main, footer);
}

export default Layout;
