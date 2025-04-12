import Storage from "../storage.js";
import { closeModal } from "./utilsModule.js";
import { updateDashboardPreviews } from "./dashboardModule.js";

// Course class for representing a single course
class Course {
  constructor(name, time, room) {
    this.name = name;
    this.time = time;
    this.room = room;
  }

  static fromObject(obj) {
    return new Course(obj.name, obj.time, obj.room);
  }
}

// DaySchedule class for representing a day's schedule
class DaySchedule {
  constructor(id, day, courses = []) {
    this.id = id;
    this.day = day;
    this.courses = courses.map((course) =>
      course instanceof Course ? course : Course.fromObject(course)
    );
  }

  addCourse(course) {
    this.courses.push(
      course instanceof Course ? course : Course.fromObject(course)
    );
  }

  updateCourse(index, course) {
    if (index >= 0 && index < this.courses.length) {
      this.courses[index] =
        course instanceof Course ? course : Course.fromObject(course);
      return true;
    }
    return false;
  }

  deleteCourse(index) {
    if (index >= 0 && index < this.courses.length) {
      this.courses.splice(index, 1);
      return true;
    }
    return false;
  }

  static fromObject(obj) {
    return new DaySchedule(obj.id, obj.day, obj.courses || []);
  }
}

// ScheduleManager class to handle schedule operations asynchronously
class ScheduleManager {
  // Get the full schedule as DaySchedule objects
  async getSchedule() {
    return new Promise((resolve) => {
      const scheduleData = Storage.getSchedule();
      const schedule = scheduleData.map((day) => DaySchedule.fromObject(day));
      setTimeout(() => resolve(schedule), 100); // Simulate async delay
    });
  }

  // Save schedule
  async saveSchedule(schedule) {
    return new Promise((resolve, reject) => {
      try {
        // Convert DaySchedule instances to plain objects
        const scheduleData = schedule.map((day) => ({
          id: day.id,
          day: day.day,
          courses: day.courses.map((course) => ({
            name: course.name,
            time: course.time,
            room: course.room,
          })),
        }));

        Storage.saveSchedule(scheduleData);
        setTimeout(() => resolve(true), 100); // Simulate async delay
      } catch (error) {
        reject(error);
      }
    });
  }

  // Add a course to a specific day
  async addCourse(dayId, name, time, room) {
    try {
      const schedule = await this.getSchedule();
      const dayIndex = schedule.findIndex((day) => day.id === dayId);

      if (dayIndex === -1) return false;

      schedule[dayIndex].addCourse(new Course(name, time, room));
      await this.saveSchedule(schedule);
      return true;
    } catch (error) {
      console.error("Error adding course:", error);
      return false;
    }
  }

  // Update an existing course
  async updateCourse(dayId, courseIndex, name, time, room) {
    try {
      const schedule = await this.getSchedule();
      const dayIndex = schedule.findIndex((day) => day.id === dayId);

      if (dayIndex === -1) return false;

      const result = schedule[dayIndex].updateCourse(
        courseIndex,
        new Course(name, time, room)
      );

      if (result) {
        await this.saveSchedule(schedule);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating course:", error);
      return false;
    }
  }

  // Delete a course
  async deleteCourse(dayId, courseIndex) {
    try {
      const schedule = await this.getSchedule();
      const dayIndex = schedule.findIndex((day) => day.id === dayId);

      if (dayIndex === -1) return false;

      const result = schedule[dayIndex].deleteCourse(courseIndex);

      if (result) {
        await this.saveSchedule(schedule);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting course:", error);
      return false;
    }
  }
}

// Create singleton instance
const scheduleManager = new ScheduleManager();

export function initializeSchedule() {
  document
    .getElementById("addScheduleBtn")
    .addEventListener("click", showAddScheduleModal);
  renderScheduleList();
}

export async function renderScheduleList() {
  const scheduleList = document.getElementById("scheduleList");
  scheduleList.innerHTML =
    '<p class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading schedule...</p>';

  try {
    const schedule = await scheduleManager.getSchedule();

    scheduleList.innerHTML = "";

    schedule.forEach((daySchedule) => {
      const scheduleCard = document.createElement("div");
      scheduleCard.className =
        "bg-teal-50 border border-teal-200 rounded-lg p-4";

      let coursesHtml = "";
      if (daySchedule.courses.length === 0) {
        coursesHtml = '<p class="text-gray-500 italic">Tidak ada jadwal</p>';
      } else {
        coursesHtml = '<div class="grid grid-cols-1 gap-2 mt-2">';
        daySchedule.courses.forEach((course, index) => {
          coursesHtml += `
            <div class="bg-white p-3 rounded border border-teal-100 flex justify-between">
              <div>
                <h3 class="font-medium">${course.name}</h3>
                <p class="text-sm text-gray-600">${course.time} | ${course.room}</p>
              </div>
              <div class="flex space-x-2">
                <button class="text-blue-500 hover:text-blue-700" onclick="editCourse(${daySchedule.id}, ${index})">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-500 hover:text-red-700" onclick="deleteCourse(${daySchedule.id}, ${index})">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          `;
        });
        coursesHtml += "</div>";
      }

      scheduleCard.innerHTML = `
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-teal-800">${daySchedule.day}</h2>
          <button class="bg-teal-500 text-white px-3 py-1 rounded text-sm hover:bg-teal-600" onclick="addCourseToDay(${daySchedule.id})">
            <i class="fas fa-plus mr-1"></i>Tambah
          </button>
        </div>
        ${coursesHtml}
      `;

      scheduleList.appendChild(scheduleCard);
    });
  } catch (error) {
    console.error("Error rendering schedule:", error);
    scheduleList.innerHTML =
      '<p class="text-red-500 text-center py-4">Error loading schedule. Please try again.</p>';
  }
}

export async function addCourseToDay(dayId) {
  try {
    const schedule = await scheduleManager.getSchedule();
    const day = schedule.find((d) => d.id === dayId);

    if (!day) return;

    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modal.id = "courseModal";

    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full modal-content">
        <h2 class="text-xl font-bold mb-4">Tambah Mata Kuliah - ${day.day}</h2>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="courseName">Nama Mata Kuliah</label>
          <input type="text" id="courseName" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="courseTime">Waktu</label>
          <input type="text" id="courseTime" class="w-full p-2 border rounded" placeholder="e.g. 07:30 - 09:10">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="courseRoom">Ruangan</label>
          <input type="text" id="courseRoom" class="w-full p-2 border rounded">
        </div>
        <div class="flex space-x-2">
          <button id="saveCourseBtn" class="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Simpan</button>
          <button id="cancelCourseBtn" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
        </div>
      </div>
    `;

    document.getElementById("modalsContainer").appendChild(modal);

    document
      .getElementById("saveCourseBtn")
      .addEventListener("click", async function () {
        const name = document.getElementById("courseName").value.trim();
        const time = document.getElementById("courseTime").value.trim();
        const room = document.getElementById("courseRoom").value.trim();

        if (name && time && room) {
          try {
            const saveButton = this;
            saveButton.disabled = true;
            saveButton.innerHTML =
              '<i class="fas fa-spinner fa-spin"></i> Saving...';

            await scheduleManager.addCourse(dayId, name, time, room);
            closeModal("courseModal");
            await renderScheduleList();
            updateDashboardPreviews();
          } catch (error) {
            console.error("Error saving course:", error);
            alert("There was an error saving the course. Please try again.");
          }
        } else {
          alert("Please fill out all fields.");
        }
      });

    document
      .getElementById("cancelCourseBtn")
      .addEventListener("click", function () {
        closeModal("courseModal");
      });
  } catch (error) {
    console.error("Error showing add course modal:", error);
  }
}

export async function editCourse(dayId, courseIndex) {
  try {
    const schedule = await scheduleManager.getSchedule();
    const day = schedule.find((d) => d.id === dayId);

    if (!day || !day.courses[courseIndex]) return;

    const course = day.courses[courseIndex];

    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modal.id = "editCourseModal";

    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full modal-content">
        <h2 class="text-xl font-bold mb-4">Edit Mata Kuliah - ${day.day}</h2>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="editCourseName">Nama Mata Kuliah</label>
          <input type="text" id="editCourseName" class="w-full p-2 border rounded" value="${course.name}">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="editCourseTime">Waktu</label>
          <input type="text" id="editCourseTime" class="w-full p-2 border rounded" value="${course.time}">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="editCourseRoom">Ruangan</label>
          <input type="text" id="editCourseRoom" class="w-full p-2 border rounded" value="${course.room}">
        </div>
        <div class="flex space-x-2">
          <button id="updateCourseBtn" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
          <button id="cancelEditCourseBtn" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
        </div>
      </div>
    `;

    document.getElementById("modalsContainer").appendChild(modal);

    document
      .getElementById("updateCourseBtn")
      .addEventListener("click", async function () {
        const name = document.getElementById("editCourseName").value.trim();
        const time = document.getElementById("editCourseTime").value.trim();
        const room = document.getElementById("editCourseRoom").value.trim();

        if (name && time && room) {
          try {
            const updateButton = this;
            updateButton.disabled = true;
            updateButton.innerHTML =
              '<i class="fas fa-spinner fa-spin"></i> Updating...';

            await scheduleManager.updateCourse(
              dayId,
              courseIndex,
              name,
              time,
              room
            );
            closeModal("editCourseModal");
            await renderScheduleList();
            updateDashboardPreviews();
          } catch (error) {
            console.error("Error updating course:", error);
            alert("There was an error updating the course. Please try again.");
          }
        } else {
          alert("Please fill out all fields.");
        }
      });

    document
      .getElementById("cancelEditCourseBtn")
      .addEventListener("click", function () {
        closeModal("editCourseModal");
      });
  } catch (error) {
    console.error("Error editing course:", error);
  }
}

export async function deleteCourse(dayId, courseIndex) {
  if (confirm("Apakah Anda yakin ingin menghapus mata kuliah ini?")) {
    try {
      await scheduleManager.deleteCourse(dayId, courseIndex);
      await renderScheduleList();
      updateDashboardPreviews();
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("There was an error deleting the course. Please try again.");
    }
  }
}

function showAddScheduleModal() {
  alert("Untuk menambahkan jadwal, silakan pilih hari dan klik tombol Tambah.");
}
