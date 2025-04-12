import Storage from "../storage.js";

// Dashboard class to handle dashboard operations
class Dashboard {
  constructor() {
    this.previewsUpdated = false;
  }

  // Get today's schedule preview
  async getTodaySchedulePreview() {
    return new Promise((resolve) => {
      const schedule = Storage.getSchedule();
      const today = new Date().toLocaleString("en-us", { weekday: "long" });
      const todaySchedule = schedule.find(
        (s) => s.day.toLowerCase() === today.toLowerCase()
      );

      let previewText;
      if (todaySchedule && todaySchedule.courses.length > 0) {
        previewText = `${today}: ${todaySchedule.courses.length} mata kuliah`;
      } else {
        previewText = `${today}: Tidak ada jadwal`;
      }

      setTimeout(() => resolve(previewText), 50);
    });
  }

  // Get tasks preview
  async getTasksPreview() {
    return new Promise((resolve) => {
      const tasks = Storage.getTasks();
      let previewText;

      if (tasks.length > 0) {
        // Find the closest deadline
        const now = new Date();
        let closestTask = null;
        let minTime = Infinity;

        tasks.forEach((task) => {
          if (task.completed) return; // Skip completed tasks

          const deadline = new Date(task.deadline);
          const timeDiff = deadline - now;
          if (timeDiff > 0 && timeDiff < minTime) {
            minTime = timeDiff;
            closestTask = task;
          }
        });

        if (closestTask) {
          const hours = Math.floor(minTime / (1000 * 60 * 60));
          previewText = `Deadline: ${closestTask.course} (${hours} jam)`;
        } else {
          const completedCount = tasks.filter((t) => t.completed).length;
          if (completedCount > 0) {
            previewText = `${completedCount}/${tasks.length} tugas selesai`;
          } else {
            previewText = `${tasks.length} tugas (semua belum selesai)`;
          }
        }
      } else {
        previewText = "Tidak ada tugas";
      }

      setTimeout(() => resolve(previewText), 50);
    });
  }

  // Get notes preview
  async getNotesPreview() {
    return new Promise((resolve) => {
      const notes = Storage.getNotes();
      const previewText = `Total catatan: ${notes.length}`;
      setTimeout(() => resolve(previewText), 50);
    });
  }

  // Get calendar preview
  async getCalendarPreview() {
    return new Promise((resolve) => {
      const events = Storage.getEvents();
      let previewText;

      if (events.length > 0) {
        // Find the closest event
        const now = new Date();
        let closestEvent = null;
        let minTime = Infinity;

        events.forEach((event) => {
          const eventDate = new Date(event.date);
          const timeDiff = eventDate - now;
          if (timeDiff > 0 && timeDiff < minTime) {
            minTime = timeDiff;
            closestEvent = event;
          }
        });

        if (closestEvent) {
          const hours = Math.floor(minTime / (1000 * 60 * 60));
          previewText = `${closestEvent.title} (${hours} jam)`;
        } else {
          previewText = `${events.length} event`;
        }
      } else {
        previewText = "Tidak ada event";
      }

      setTimeout(() => resolve(previewText), 50);
    });
  }

  // Update all dashboard previews
  async updateAllPreviews() {
    try {
      const [schedulePreview, tasksPreview, notesPreview, calendarPreview] =
        await Promise.all([
          this.getTodaySchedulePreview(),
          this.getTasksPreview(),
          this.getNotesPreview(),
          this.getCalendarPreview(),
        ]);

      document.getElementById("schedulePreview").textContent = schedulePreview;
      document.getElementById("tasksPreview").textContent = tasksPreview;
      document.getElementById("notesPreview").textContent = notesPreview;
      document.getElementById("calendarPreview").textContent = calendarPreview;

      this.previewsUpdated = true;
      return true;
    } catch (error) {
      console.error("Error updating dashboard previews:", error);
      return false;
    }
  }
}

// Create singleton dashboard instance
const dashboardInstance = new Dashboard();

export function initializeDashboard() {
  updateDashboardPreviews();
}

export async function updateDashboardPreviews() {
  // Add loading indicators
  document.getElementById("schedulePreview").innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Loading...';
  document.getElementById("tasksPreview").innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Loading...';
  document.getElementById("notesPreview").innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Loading...';
  document.getElementById("calendarPreview").innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Loading...';

  // Update all previews
  await dashboardInstance.updateAllPreviews();
}
