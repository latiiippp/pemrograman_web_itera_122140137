import { closeModal } from "./utilsModule.js";
import { updateDashboardPreviews } from "./dashboardModule.js";
import Storage from "../storage.js";

// Event Class Implementation
class CalendarEvent {
  constructor(title, type, date) {
    this.title = title;
    this.type = type;
    this.date = date;
  }

  // Check if event is in the past
  isPast() {
    return new Date(this.date) < new Date();
  }

  // Calculate time left or time passed
  getTimeStatus() {
    const eventDate = new Date(this.date);
    const now = new Date();
    const timeDiff = eventDate - now;

    if (timeDiff < 0) {
      return { isPast: true, text: "Sudah lewat" };
    } else {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      return {
        isPast: false,
        days,
        hours,
        text: `${days} hari ${hours} jam lagi`,
      };
    }
  }

  // Get type display with icon
  getTypeDisplay() {
    switch (this.type) {
      case "exam":
        return '<i class="fas fa-file-alt text-red-500 mr-1"></i> Ujian';
      case "assignment":
        return '<i class="fas fa-tasks text-blue-500 mr-1"></i> Penugasan';
      case "holiday":
        return '<i class="fas fa-umbrella-beach text-yellow-500 mr-1"></i> Libur';
      default:
        return '<i class="fas fa-calendar-day text-purple-500 mr-1"></i> Event';
    }
  }

  // Static method to create Event from plain object
  static fromObject(obj) {
    return new CalendarEvent(obj.title, obj.type, obj.date);
  }
}

// EventManager class to handle calendar events asynchronously
class EventManager {
  // Get all events as CalendarEvent objects
  async getEvents() {
    return new Promise((resolve) => {
      const eventsData = Storage.getEvents();
      const events = eventsData.map((event) => CalendarEvent.fromObject(event));
      setTimeout(() => resolve(events), 100); // Simulate async delay
    });
  }

  // Save events
  async saveEvents(events) {
    return new Promise((resolve, reject) => {
      try {
        // Convert CalendarEvent instances to plain objects
        const eventsData = events.map((event) => ({
          title: event.title,
          type: event.type,
          date: event.date,
        }));

        Storage.saveEvents(eventsData);
        setTimeout(() => resolve(true), 100); // Simulate async delay
      } catch (error) {
        reject(error);
      }
    });
  }

  // Add a new event
  async addEvent(title, type, date) {
    try {
      const events = await this.getEvents();
      const newEvent = new CalendarEvent(
        title,
        type,
        new Date(date).toISOString()
      );
      events.push(newEvent);
      await this.saveEvents(events);
      return true;
    } catch (error) {
      console.error("Error adding event:", error);
      return false;
    }
  }

  // Update existing event
  async updateEvent(index, title, type, date) {
    try {
      const events = await this.getEvents();
      if (index < 0 || index >= events.length) return false;

      events[index].title = title;
      events[index].type = type;
      events[index].date = new Date(date).toISOString();

      await this.saveEvents(events);
      return true;
    } catch (error) {
      console.error("Error updating event:", error);
      return false;
    }
  }

  // Delete an event
  async deleteEvent(index) {
    try {
      const events = await this.getEvents();
      if (index < 0 || index >= events.length) return false;

      events.splice(index, 1);
      await this.saveEvents(events);
      return true;
    } catch (error) {
      console.error("Error deleting event:", error);
      return false;
    }
  }
}

// Create a singleton event manager
const eventManager = new EventManager();

export function initializeCalendar() {
  document
    .getElementById("addEventBtn")
    .addEventListener("click", showAddEventModal);

  renderEventsList();
}

export async function renderEventsList() {
  const eventsList = document.getElementById("eventsList");
  eventsList.innerHTML =
    '<p class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading events...</p>';

  try {
    const events = await eventManager.getEvents();

    eventsList.innerHTML = "";

    if (events.length === 0) {
      eventsList.innerHTML =
        '<p class="text-gray-500 italic text-center py-4">Tidak ada event. Klik tombol Tambah Event untuk membuat event baru.</p>';
      return;
    }

    // Sort by date (closest first)
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    events.forEach((event, index) => {
      const timeStatus = event.getTimeStatus();
      const isPast = timeStatus.isPast;

      let timeLeftDisplay = isPast
        ? '<span class="text-gray-600">Sudah lewat</span>'
        : `<span class="text-purple-600">${timeStatus.text}</span>`;

      const eventCard = document.createElement("div");
      eventCard.className = `bg-white border ${
        isPast ? "border-gray-300" : "border-purple-300"
      } rounded-lg p-4 shadow-sm`;

      eventCard.innerHTML = `
        <div class="flex justify-between">
          <h2 class="text-lg font-semibold">${event.title}</h2>
          <div class="flex space-x-2">
            <button class="text-blue-500 hover:text-blue-700" onclick="editEvent(${index})">
              <i class="fas fa-edit"></i>
            </button>
            <button class="text-red-500 hover:text-red-700" onclick="deleteEvent(${index})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <p class="text-sm mb-2"><span class="font-medium">${event.getTypeDisplay()}</span></p>
        <div class="flex justify-between text-sm">
          <span>Tanggal: ${new Date(event.date).toLocaleString()}</span>
          ${timeLeftDisplay}
        </div>
      `;

      eventsList.appendChild(eventCard);
    });
  } catch (error) {
    console.error("Error rendering events:", error);
    eventsList.innerHTML =
      '<p class="text-red-500 text-center py-4">Error loading events. Please try again.</p>';
  }
}

function showAddEventModal() {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  modal.id = "eventModal";

  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full modal-content">
      <h2 class="text-xl font-bold mb-4">Tambah Event Baru</h2>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="eventTitle">Judul Event</label>
        <input type="text" id="eventTitle" class="w-full p-2 border rounded">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="eventType">Jenis Event</label>
        <select id="eventType" class="w-full p-2 border rounded">
          <option value="exam">Ujian</option>
          <option value="assignment">Penugasan</option>
          <option value="holiday">Libur</option>
          <option value="other">Lainnya</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="eventDate">Tanggal & Waktu</label>
        <input type="datetime-local" id="eventDate" class="w-full p-2 border rounded">
      </div>
      <div class="flex space-x-2">
        <button id="saveEventBtn" class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Simpan</button>
        <button id="cancelEventBtn" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
      </div>
    </div>
  `;

  document.getElementById("modalsContainer").appendChild(modal);

  // Set up event listeners
  document
    .getElementById("saveEventBtn")
    .addEventListener("click", async function () {
      const title = document.getElementById("eventTitle").value.trim();
      const type = document.getElementById("eventType").value;
      const date = document.getElementById("eventDate").value;

      if (title && date) {
        try {
          const saveButton = this;
          saveButton.disabled = true;
          saveButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Saving...';

          await eventManager.addEvent(title, type, date);
          closeModal("eventModal");
          await renderEventsList();
          updateDashboardPreviews();
        } catch (error) {
          console.error("Error saving event:", error);
          alert("There was an error saving your event. Please try again.");
        }
      } else {
        alert("Please fill out all required fields.");
      }
    });

  document
    .getElementById("cancelEventBtn")
    .addEventListener("click", function () {
      closeModal("eventModal");
    });
}

export async function editEvent(index) {
  try {
    const events = await eventManager.getEvents();
    const event = events[index];

    if (!event) return;

    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modal.id = "editEventModal";

    // Format the date for datetime-local input
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toISOString().slice(0, 16);

    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full modal-content">
        <h2 class="text-xl font-bold mb-4">Edit Event</h2>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="editEventTitle">Judul Event</label>
          <input type="text" id="editEventTitle" class="w-full p-2 border rounded" value="${
            event.title
          }">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="editEventType">Jenis Event</label>
          <select id="editEventType" class="w-full p-2 border rounded">
            <option value="exam" ${
              event.type === "exam" ? "selected" : ""
            }>Ujian</option>
            <option value="assignment" ${
              event.type === "assignment" ? "selected" : ""
            }>Penugasan</option>
            <option value="holiday" ${
              event.type === "holiday" ? "selected" : ""
            }>Libur</option>
            <option value="other" ${
              event.type === "other" ? "selected" : ""
            }>Lainnya</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="editEventDate">Tanggal & Waktu</label>
          <input type="datetime-local" id="editEventDate" class="w-full p-2 border rounded" value="${formattedDate}">
        </div>
        <div class="flex space-x-2">
          <button id="updateEventBtn" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
          <button id="cancelEditEventBtn" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
        </div>
      </div>
    `;

    document.getElementById("modalsContainer").appendChild(modal);

    // Set up event listeners
    document
      .getElementById("updateEventBtn")
      .addEventListener("click", async function () {
        const title = document.getElementById("editEventTitle").value.trim();
        const type = document.getElementById("editEventType").value;
        const date = document.getElementById("editEventDate").value;

        if (title && date) {
          try {
            const updateButton = this;
            updateButton.disabled = true;
            updateButton.innerHTML =
              '<i class="fas fa-spinner fa-spin"></i> Updating...';

            await eventManager.updateEvent(index, title, type, date);
            closeModal("editEventModal");
            await renderEventsList();
            updateDashboardPreviews();
          } catch (error) {
            console.error("Error updating event:", error);
            alert("There was an error updating your event. Please try again.");
          }
        } else {
          alert("Please fill out all required fields.");
        }
      });

    document
      .getElementById("cancelEditEventBtn")
      .addEventListener("click", function () {
        closeModal("editEventModal");
      });
  } catch (error) {
    console.error("Error editing event:", error);
  }
}

export async function deleteEvent(index) {
  if (confirm("Apakah Anda yakin ingin menghapus event ini?")) {
    try {
      await eventManager.deleteEvent(index);
      await renderEventsList();
      updateDashboardPreviews();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("There was an error deleting your event. Please try again.");
    }
  }
}
