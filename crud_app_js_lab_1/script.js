// ====== Работа с хранилищем ======

const STORAGE_KEY = "tasks";

/**
 * Получить все задачи из localStorage
 * @returns {Array} массив задач
 */
function getTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : []; //чтение массивов и объектов
}

/**
 * Сохранить массив задач в localStorage
 * @param {Array} tasks — массив задач
 */
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); //сохранение массивов и объектов
}

// Переменные состояния
let editingTaskId = null; // ID задачи, которую сейчас редактируем
let currentFilter = "all"; // текущий фильтр
let currentSearchTerm = ""; // текущий поисковой запрос
let currentSort = "newest"; // текущий тип сортировки

// ==== DOM элементы ====
const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-desc");
const prioSelect = document.getElementById("task-priority");
const submitBtn = document.getElementById("submit-btn");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");

// обработчик формы
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const priority = prioSelect.value;

  // Валидация
  if (!title) {
    alert("Введите название задачи!");
    return;
  }

  //получение задач из хранилища
  const tasks = getTasks();

  if (editingTaskId) {
    // UPDATE — режим редактирования
    const index = tasks.findIndex((t) => t.id === editingTaskId);
    if (index !== -1) {
      tasks[index].title = title;
      tasks[index].description = description;
      tasks[index].priority = priority;
    }
    // сброс режима редактирования
    editingTaskId = null;
    submitBtn.textContent = "Добавить";
  } else {
    // CREATE — создание новой задачи
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
  }

  saveTasks(tasks);
  form.reset(); //очищаем формы
  renderTasks(); //обновляем отображение
});

//отсортировка задач
const taskList = document.getElementById("task-list");
function renderTasks() {
  let tasks = getTasks();

  // Применяем фильтр(незавершенная/завершенная)
  if (currentFilter === "active") {
    tasks = tasks.filter((t) => !t.completed);
  } else if (currentFilter === "completed") {
    tasks = tasks.filter((t) => t.completed);
  }

  //поиск по названию
  if (currentSearchTerm.trim() !== "") {
    const term = currentSearchTerm.trim().toLocaleLowerCase();
    tasks = tasks.filter((task) => task.title.toLowerCase().includes(term));
  }

  //сортировка
  if (currentSort === "newest") {
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (currentSort === "oldest") {
    tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (currentSort === "priority-high") {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  } else if (currentSort === "priority-low") {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  // Очищаем контейнер
  taskList.innerHTML = "";
  if (tasks.length === 0) {
    taskList.innerHTML = '<p class="empty">Задач нет.</p>';
    return;
  }
  tasks.forEach(function (task) {
    const card = document.createElement("div");
    card.className =
      "task-card" +
      (task.completed ? " completed" : "") +
      " priority-" +
      task.priority;
    card.dataset.id = task.id;
    card.innerHTML = `
<div class="task-header">
<h3>${escapeHTML(task.title)}</h3>
<span class="badge">${task.priority}</span>
</div>
<p>${escapeHTML(task.description)}</p>
<div class="task-actions">
<button onclick="toggleComplete(${task.id})">
${task.completed ? "↩ Вернуть" : "✅ Выполнено"}
</button>
<button onclick="editTask(${task.id})">✏ Изменить</button>
<button onclick="deleteTask(${task.id})">🗑 Удалить</button>
</div>
`;
    taskList.appendChild(card);
  });

  updateCounters();
}

// Защита от XSS
function escapeHTML(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//обновление счетчиков задач
function updateCounters() {
  const allTasks = getTasks();
  const total = allTasks.length;
  const active = allTasks.filter((t) => !t.completed).length;
  const completed = allTasks.filter((t) => t.completed).length;

  document.getElementById("total-count").textContent = total;
  document.getElementById("active-count").textContent = active;
  document.getElementById("completed-count").textContent = completed;
}

/**
 * Переключить статус выполнения задачи
 */
function toggleComplete(id) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(tasks);
    renderTasks();
  }
}
/**
 * Начать редактирование задачи — заполнить форму данными
 */
function editTask(id) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  // Заполняем форму текущими значениями
  titleInput.value = task.title;
  descInput.value = task.description;
  prioSelect.value = task.priority;

  // Переходим в режим редактирования
  editingTaskId = id;
  submitBtn.textContent = "💾 Сохранить изменения";

  // Прокрутка к форме
  form.scrollIntoView({ behavior: "smooth" });
}

/**
 * Удалить задачу с подтверждением
 */
function deleteTask(id) {
  if (!confirm("Вы уверены, что хотите удалить эту задачу?")) {
    return;
  }
  let tasks = getTasks();
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks(tasks);
  renderTasks();
}

// Фильтрация задач
document.querySelectorAll(".filter-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    currentFilter = this.dataset.filter;
    renderTasks();
  });
});

//поиск в реальном времени
searchInput.addEventListener("input", function (e) {
  currentSearchTerm = e.target.value;
  renderTasks();
});

//обработчик изменений сортировки
sortSelect.addEventListener("change", function (e) {
  currentSort = e.target.value;
  renderTasks();
});

// Первоначальная отрисовка при загрузке страницы
document.addEventListener("DOMContentLoaded", renderTasks);
