// Load from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");

// Render function
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className =
      "flex items-center justify-between bg-white p-2 rounded shadow";

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = todo.completed
      ? "line-through text-gray-400"
      : "text-gray-700";

    // Container untuk tombol
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "flex items-center gap-2";

    // Tombol ceklis
    const checkBtn = document.createElement("button");
    checkBtn.textContent = "✔";
    checkBtn.className = `px-2 py-1 rounded ${
      todo.completed ? "bg-green-400" : "bg-gray-200"
    }`;
    checkBtn.addEventListener("click", () => {
      todos[index].completed = !todos[index].completed;
      saveAndRender();
    });

    // Tombol hapus
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "bg-red-400 text-white px-2 py-1 rounded";
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveAndRender();
    });

    // Tambahkan kedua tombol ke container
    buttonContainer.appendChild(checkBtn);
    buttonContainer.appendChild(deleteBtn);

    // Gabungkan semua ke dalam li
    li.appendChild(span);
    li.appendChild(buttonContainer);
    todoList.appendChild(li);
  });
}

// Save to localStorage and render
function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Add new todo
addBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (text !== "") {
    todos.push({ text, completed: false });
    todoInput.value = "";
    saveAndRender();
  }
});

// Press Enter to add
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// Initial render
renderTodos();
