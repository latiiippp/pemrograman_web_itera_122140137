import { closeModal } from "./utilsModule.js";
import { updateDashboardPreviews } from "./dashboardModule.js";
import Storage from "../storage.js";

// Task Class Implementation
class Task {
  constructor(
    title,
    course,
    deadline,
    description,
    completed = false,
    completedDate = null
  ) {
    this.title = title;
    this.course = course;
    this.deadline = deadline;
    this.description = description;
    this.completed = completed;
    this.completedDate = completedDate;
  }

  // Mark task as completed
  complete() {
    this.completed = true;
    this.completedDate = new Date().toISOString();
    return this;
  }

  // Check if task should be auto-deleted (completed more than 1 day ago)
  shouldAutoDelete() {
    if (!this.completed || !this.completedDate) return false;

    const completedTime = new Date(this.completedDate).getTime();
    const currentTime = new Date().getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    return currentTime - completedTime > oneDayInMs;
  }

  // Static method to create Task from plain object
  static fromObject(obj) {
    return new Task(
      obj.title,
      obj.course,
      obj.deadline,
      obj.description,
      obj.completed || false,
      obj.completedDate || null
    );
  }
}

// TaskManager class to handle task operations asynchronously
class TaskManager {
  constructor() {
    // Check for tasks that should be auto-deleted on initialization
    this.cleanupCompletedTasks();

    // Set interval to check for completed tasks every hour
    setInterval(() => this.cleanupCompletedTasks(), 3600000);
  }

  // Get all tasks as Task objects
  async getTasks() {
    return new Promise((resolve) => {
      const tasksData = Storage.getTasks();
      const tasks = tasksData.map((task) => Task.fromObject(task));
      setTimeout(() => resolve(tasks), 100); // Simulate async delay
    });
  }

  // Save tasks
  async saveTasks(tasks) {
    return new Promise((resolve, reject) => {
      try {
        // Convert Task instances to plain objects
        const tasksData = tasks.map((task) => ({
          title: task.title,
          course: task.course,
          deadline: task.deadline,
          description: task.description,
          completed: task.completed,
          completedDate: task.completedDate,
        }));

        Storage.saveTasks(tasksData);
        setTimeout(() => resolve(true), 100); // Simulate async delay
      } catch (error) {
        reject(error);
      }
    });
  }

  // Add a new task
  async addTask(title, course, deadline, description) {
    try {
      const tasks = await this.getTasks();
      const newTask = new Task(
        title,
        course,
        new Date(deadline).toISOString(),
        description
      );
      tasks.push(newTask);
      await this.saveTasks(tasks);
      return true;
    } catch (error) {
      console.error("Error adding task:", error);
      return false;
    }
  }

  // Update existing task
  async updateTask(index, title, course, deadline, description) {
    try {
      const tasks = await this.getTasks();
      if (index < 0 || index >= tasks.length) return false;

      tasks[index].title = title;
      tasks[index].course = course;
      tasks[index].deadline = new Date(deadline).toISOString();
      tasks[index].description = description;

      await this.saveTasks(tasks);
      return true;
    } catch (error) {
      console.error("Error updating task:", error);
      return false;
    }
  }

  // Delete a task
  async deleteTask(index) {
    try {
      const tasks = await this.getTasks();
      if (index < 0 || index >= tasks.length) return false;

      tasks.splice(index, 1);
      await this.saveTasks(tasks);
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      return false;
    }
  }

  // Mark task as completed
  async completeTask(index) {
    try {
      const tasks = await this.getTasks();
      if (index < 0 || index >= tasks.length) return false;

      tasks[index].complete();
      await this.saveTasks(tasks);
      return true;
    } catch (error) {
      console.error("Error completing task:", error);
      return false;
    }
  }

  // Check and remove tasks completed more than a day ago
  async cleanupCompletedTasks() {
    try {
      const tasks = await this.getTasks();
      const activeTasks = tasks.filter((task) => !task.shouldAutoDelete());

      if (activeTasks.length < tasks.length) {
        await this.saveTasks(activeTasks);
        console.log(
          `Auto-removed ${tasks.length - activeTasks.length} completed tasks`
        );
      }
    } catch (error) {
      console.error("Error cleaning up tasks:", error);
    }
  }
}

// Create a singleton task manager
const taskManager = new TaskManager();

// Module functions
export function initializeTasks() {
  document
    .getElementById("addTaskBtn")
    .addEventListener("click", showAddTaskModal);

  renderTasksList();
}

export async function renderTasksList() {
  const tasksList = document.getElementById("tasksList");
  tasksList.innerHTML =
    '<p class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading tasks...</p>';

  try {
    const tasks = await taskManager.getTasks();

    tasksList.innerHTML = "";

    if (tasks.length === 0) {
      tasksList.innerHTML =
        '<p class="text-gray-500 italic text-center py-4">Tidak ada tugas. Klik tombol Tambah Tugas untuk membuat tugas baru.</p>';
      return;
    }

    tasks.forEach((task, index) => {
      const deadline = new Date(task.deadline);
      const now = new Date();
      const timeDiff = deadline - now;
      const isOverdue = timeDiff < 0;
      const isCompleted = task.completed;

      let statusClass = isCompleted
        ? "border-green-300"
        : isOverdue
        ? "border-red-300"
        : "border-orange-300";
      let statusBg = isCompleted ? "bg-green-50" : "bg-white";

      let timeLeftDisplay = "";
      if (isCompleted) {
        const completedDate = new Date(task.completedDate);
        timeLeftDisplay = `<span class="text-green-600 font-medium">Selesai pada ${completedDate.toLocaleDateString()}</span>`;
      } else if (isOverdue) {
        timeLeftDisplay =
          '<span class="text-red-600 font-medium">Sudah lewat deadline</span>';
      } else {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        timeLeftDisplay = `<span class="text-orange-600 font-medium">${hours} jam tersisa</span>`;
      }

      const taskCard = document.createElement("div");
      taskCard.className = `${statusBg} border ${statusClass} rounded-lg p-4 shadow-sm mb-3`;

      taskCard.innerHTML = `
        <div class="flex justify-between items-start">
          <div class="flex items-start">
            ${
              !isCompleted
                ? `
              <button class="text-gray-400 hover:text-green-500 mr-2 mt-1" onclick="completeTask(${index})">
                <i class="far fa-check-circle"></i>
              </button>
            `
                : `
              <span class="text-green-500 mr-2 mt-1">
                <i class="fas fa-check-circle"></i>
              </span>
            `
            }
            <h2 class="text-lg font-semibold ${
              isCompleted ? "line-through text-gray-500" : ""
            }">${task.title}</h2>
          </div>
          <div class="flex space-x-2">
            ${
              !isCompleted
                ? `
              <button class="text-blue-500 hover:text-blue-700" onclick="editTask(${index})">
                <i class="fas fa-edit"></i>
              </button>
            `
                : ""
            }
            <button class="text-red-500 hover:text-red-700" onclick="deleteTask(${index})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <p class="text-sm text-gray-600 mb-2 ml-6">Mata Kuliah: ${
          task.course
        }</p>
        <p class="text-sm mb-2 ml-6 ${isCompleted ? "text-gray-500" : ""}">${
        task.description
      }</p>
        <div class="flex justify-between text-sm ml-6">
          <span>Deadline: ${deadline.toLocaleString()}</span>
          ${timeLeftDisplay}
        </div>
      `;

      tasksList.appendChild(taskCard);
    });
  } catch (error) {
    console.error("Error rendering tasks:", error);
    tasksList.innerHTML =
      '<p class="text-red-500 text-center py-4">Error loading tasks. Please try again.</p>';
  }
}

function showAddTaskModal() {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  modal.id = "taskModal";

  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full modal-content">
      <h2 class="text-xl font-bold mb-4">Tambah Tugas Baru</h2>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="taskTitle">Judul Tugas</label>
        <input type="text" id="taskTitle" class="w-full p-2 border rounded">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="taskCourse">Mata Kuliah</label>
        <input type="text" id="taskCourse" class="w-full p-2 border rounded">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="taskDeadline">Deadline</label>
        <input type="datetime-local" id="taskDeadline" class="w-full p-2 border rounded">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="taskDescription">Deskripsi</label>
        <textarea id="taskDescription" class="w-full p-2 border rounded" rows="3"></textarea>
      </div>
      <div class="flex space-x-2">
        <button id="saveTaskBtn" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Simpan</button>
        <button id="cancelTaskBtn" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
      </div>
    </div>
  `;

  document.getElementById("modalsContainer").appendChild(modal);

  // Set up event listeners
  document
    .getElementById("saveTaskBtn")
    .addEventListener("click", async function () {
      const title = document.getElementById("taskTitle").value.trim();
      const course = document.getElementById("taskCourse").value.trim();
      const deadline = document.getElementById("taskDeadline").value;
      const description = document
        .getElementById("taskDescription")
        .value.trim();

      if (title && course && deadline) {
        try {
          const saveButton = this;
          saveButton.disabled = true;
          saveButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Saving...';

          await taskManager.addTask(title, course, deadline, description);
          closeModal("taskModal");
          await renderTasksList();
          updateDashboardPreviews();
        } catch (error) {
          console.error("Error saving task:", error);
          alert("There was an error saving your task. Please try again.");
        }
      } else {
        alert("Please fill out all required fields.");
      }
    });

  document
    .getElementById("cancelTaskBtn")
    .addEventListener("click", function () {
      closeModal("taskModal");
    });
}

export async function editTask(index) {
  try {
    const tasks = await taskManager.getTasks();
    const task = tasks[index];

    if (!task) return;

    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modal.id = "editTaskModal";

    // Format the date for datetime-local input
    const deadlineDate = new Date(task.deadline);
    const formattedDate = deadlineDate.toISOString().slice(0, 16);

    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full modal-content">
        <h2 class="text-xl font-bold mb-4">Edit Tugas</h2>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="editTaskTitle">Judul Tugas</label>
          <input type="text" id="editTaskTitle" class="w-full p-2 border rounded" value="${task.title}">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="editTaskCourse">Mata Kuliah</label>
          <input type="text" id="editTaskCourse" class="w-full p-2 border rounded" value="${task.course}">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="editTaskDeadline">Deadline</label>
          <input type="datetime-local" id="editTaskDeadline" class="w-full p-2 border rounded" value="${formattedDate}">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="editTaskDescription">Deskripsi</label>
          <textarea id="editTaskDescription" class="w-full p-2 border rounded" rows="3">${task.description}</textarea>
        </div>
        <div class="flex space-x-2">
          <button id="updateTaskBtn" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
          <button id="cancelEditTaskBtn" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
        </div>
      </div>
    `;

    document.getElementById("modalsContainer").appendChild(modal);

    // Set up event listeners
    document
      .getElementById("updateTaskBtn")
      .addEventListener("click", async function () {
        const title = document.getElementById("editTaskTitle").value.trim();
        const course = document.getElementById("editTaskCourse").value.trim();
        const deadline = document.getElementById("editTaskDeadline").value;
        const description = document
          .getElementById("editTaskDescription")
          .value.trim();

        if (title && course && deadline) {
          try {
            const updateButton = this;
            updateButton.disabled = true;
            updateButton.innerHTML =
              '<i class="fas fa-spinner fa-spin"></i> Updating...';

            await taskManager.updateTask(
              index,
              title,
              course,
              deadline,
              description
            );
            closeModal("editTaskModal");
            await renderTasksList();
            updateDashboardPreviews();
          } catch (error) {
            console.error("Error updating task:", error);
            alert("There was an error updating your task. Please try again.");
          }
        } else {
          alert("Please fill out all required fields.");
        }
      });

    document
      .getElementById("cancelEditTaskBtn")
      .addEventListener("click", function () {
        closeModal("editTaskModal");
      });
  } catch (error) {
    console.error("Error editing task:", error);
  }
}

export async function deleteTask(index) {
  if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
    try {
      await taskManager.deleteTask(index);
      await renderTasksList();
      updateDashboardPreviews();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("There was an error deleting your task. Please try again.");
    }
  }
}

export async function completeTask(index) {
  try {
    await taskManager.completeTask(index);
    await renderTasksList();
    updateDashboardPreviews();

    // Show success notification
    const notification = document.createElement("div");
    notification.className =
      "fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md transition-opacity duration-500";
    notification.innerHTML = `
      <div class="flex">
        <div class="py-1"><i class="fas fa-check-circle text-green-500 mr-2"></i></div>
        <div>
          <p class="font-bold">Task Completed!</p>
          <p class="text-sm">Task will be removed automatically after 24 hours.</p>
        </div>
      </div>
    `;
    document.body.appendChild(notification);

    // Fade out and remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  } catch (error) {
    console.error("Error completing task:", error);
    alert("There was an error marking the task as complete. Please try again.");
  }
}

// Export completeTask for global access
window.completeTask = completeTask;
