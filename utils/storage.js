export const setStorage = (data) => {
  if (!data) return;
  window.localStorage.setItem("todoList", JSON.stringify(data));
};

export const getStorage = () => {
  if (!window.localStorage.getItem("todoList")) setStorage([]);
  return JSON.parse(window.localStorage.getItem("todoList"));
};
