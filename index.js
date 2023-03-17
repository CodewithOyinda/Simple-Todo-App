//Got all elements from the DOM
const form = document.querySelector("form");
const input = document.querySelector("#new-task");
const todoList = document.querySelector("#todo-list");
//Array that contains all todo. Get existing todo from localStorage or return an empty array if local Storage is empty
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// To add an item to the todo list
function addTodo(event) {
  event.preventDefault();
  const todoItem = input.value;
  console.log(todoItem);
  if (todoItem === "") {
    alert("Please enter a valid todo Name");
  } else {
    const todo = { name: todoItem, completed: false };
    todos.unshift(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    showTodoList();
    input.value = "";
  }
  console.log(todos);
}

//Change the completed status of the todo
function toggleTodo(event) {
  const todoIndex = parseInt(event.target.dataset.todoIndex);
  todos[todoIndex].completed = !todos[todoIndex].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodoList();
}

//To remove an item from the todo list
function removeTodo(event) {
  const todoIndex = parseInt(event.target.dataset.todoIndex);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodoList();
}

//Show all todo list in the webpage
function showTodoList() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.dataset.todoIndex = index;
    checkbox.addEventListener("change", toggleTodo);
    const span = document.createElement("span");
    span.textContent = todo.name;
    if (todo.completed) {
      span.classList.add("completed");
    }
    const button = document.createElement("button");
    button.textContent = "Delete";
    button.dataset.todoIndex = index;
    button.addEventListener("click", removeTodo);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
  });
}

//EventListener to submit form
form.addEventListener("submit", addTodo);
showTodoList();
