let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const text = taskInput.value;
  const date = dateInput.value;
  const priority = priorityInput.value;

  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    date,
    priority,
    completed: false
  });

  taskInput.value = "";
  saveTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks
    .filter(t => filter === "all" || (filter === "completed" ? t.completed : !t.completed))
    .forEach(task => {
      const li = document.createElement("li");
      li.className = `${task.priority} ${task.completed ? "completed" : ""}`;

      li.innerHTML = `
        <div class="task-info" onclick="toggleTask(${task.id})">
          <strong>${task.text}</strong>
          <small>${task.date || "No due date"} • ${task.priority}</small>
        </div>
        <div class="actions">
          <button onclick="editTask(${task.id})">✏️</button>
          <button onclick="deleteTask(${task.id})">❌</button>
        </div>
      `;
      taskList.appendChild(li);
    });
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
  saveTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit task", task.text);
  if (newText) task.text = newText;
  saveTasks();
}

function filterTasks(type) {
  filter = type;
  renderTasks();
}

renderTasks();
