import Storage from "./storage.js";
import {
  showUsernameModal,
  updateUserInfo,
  initializeUserModule,
} from "./modules/userModule.js";
import { initializeTabs, switchTab } from "./modules/tabsModule.js";
import {
  initializeDashboard,
  updateDashboardPreviews,
} from "./modules/dashboardModule.js";
import {
  initializeSchedule,
  addCourseToDay,
  editCourse,
  deleteCourse,
} from "./modules/scheduleModule.js";
import {
  initializeTasks,
  editTask,
  deleteTask,
} from "./modules/tasksModule.js";
import {
  initializeNotes,
  editNote,
  deleteNote,
} from "./modules/notesModule.js";
import {
  initializeCalendar,
  editEvent,
  deleteEvent,
} from "./modules/calendarModule.js";
import { completeTask } from "./modules/tasksModule.js";

// Make functions globally available for onclick events
window.addCourseToDay = addCourseToDay;
window.editCourse = editCourse;
window.deleteCourse = deleteCourse;
window.editTask = editTask;
window.deleteTask = deleteTask;
window.completeTask = completeTask;
window.editNote = editNote;
window.deleteNote = deleteNote;
window.editEvent = editEvent;
window.deleteEvent = deleteEvent;

document.addEventListener("DOMContentLoaded", function () {
  // Check if user info exists
  const user = Storage.getUser();
  if (!user) {
    showUsernameModal();
  } else {
    updateUserInfo(user);
  }

  // Initialize the user module (for profile editing)
  initializeUserModule();

  // Initialize the dashboard
  initializeTabs();
  initializeDashboard();
  initializeSchedule();
  initializeTasks();
  initializeNotes();
  initializeCalendar();

  // Set up event listeners for quick access buttons
  document
    .getElementById("goToSchedule")
    .addEventListener("click", () => switchTab("schedule"));
  document
    .getElementById("goToTasks")
    .addEventListener("click", () => switchTab("tasks"));
  document
    .getElementById("goToNotes")
    .addEventListener("click", () => switchTab("notes"));
  document
    .getElementById("goToCalendar")
    .addEventListener("click", () => switchTab("calendar"));
});
