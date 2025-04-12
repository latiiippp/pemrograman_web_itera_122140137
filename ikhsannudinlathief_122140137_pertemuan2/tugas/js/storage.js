const Storage = {
  // User data
  saveUser: function (userData) {
    localStorage.setItem("dashboard_user", JSON.stringify(userData));
  },

  getUser: function () {
    const data = localStorage.getItem("dashboard_user");
    return data ? JSON.parse(data) : null;
  },

  // Schedule
  saveSchedule: function (scheduleData) {
    localStorage.setItem("dashboard_schedule", JSON.stringify(scheduleData));
  },

  getSchedule: function () {
    const data = localStorage.getItem("dashboard_schedule");
    return data
      ? JSON.parse(data)
      : [
          { id: 1, day: "Senin", courses: [] },
          { id: 2, day: "Selasa", courses: [] },
          { id: 3, day: "Rabu", courses: [] },
          { id: 4, day: "Kamis", courses: [] },
          { id: 5, day: "Jumat", courses: [] },
        ];
  },

  // Tasks
  saveTasks: function (tasksData) {
    localStorage.setItem("dashboard_tasks", JSON.stringify(tasksData));
  },

  getTasks: function () {
    const data = localStorage.getItem("dashboard_tasks");
    return data ? JSON.parse(data) : [];
  },

  // Notes
  saveNotes: function (notesData) {
    localStorage.setItem("dashboard_notes", JSON.stringify(notesData));
  },

  getNotes: function () {
    const data = localStorage.getItem("dashboard_notes");
    return data ? JSON.parse(data) : [];
  },

  // Calendar Events
  saveEvents: function (eventsData) {
    localStorage.setItem("dashboard_events", JSON.stringify(eventsData));
  },

  getEvents: function () {
    const data = localStorage.getItem("dashboard_events");
    return data ? JSON.parse(data) : [];
  },
};

export default Storage;
