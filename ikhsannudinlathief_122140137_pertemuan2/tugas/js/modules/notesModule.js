import { closeModal } from "./utilsModule.js";
import { updateDashboardPreviews } from "./dashboardModule.js";
import Storage from "../storage.js";

// Note Class Implementation
class Note {
  constructor(title, content, createdAt = new Date().toISOString()) {
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }

  // Get formatted creation date
  getFormattedDate() {
    return new Date(this.createdAt).toLocaleString();
  }

  // Get preview of the content (first 50 chars)
  getPreview(length = 50) {
    return this.content.length > length
      ? this.content.substring(0, length) + "..."
      : this.content;
  }

  // Static method to create Note from plain object
  static fromObject(obj) {
    return new Note(
      obj.title,
      obj.content,
      obj.createdAt || new Date().toISOString()
    );
  }
}

// NoteManager class to handle note operations asynchronously
class NoteManager {
  // Get all notes as Note objects
  async getNotes() {
    return new Promise((resolve) => {
      const notesData = Storage.getNotes();
      const notes = notesData.map((note) => Note.fromObject(note));
      setTimeout(() => resolve(notes), 100); // Simulate async delay
    });
  }

  // Save notes
  async saveNotes(notes) {
    return new Promise((resolve, reject) => {
      try {
        // Convert Note instances to plain objects
        const notesData = notes.map((note) => ({
          title: note.title,
          content: note.content,
          createdAt: note.createdAt,
        }));

        Storage.saveNotes(notesData);
        setTimeout(() => resolve(true), 100); // Simulate async delay
      } catch (error) {
        reject(error);
      }
    });
  }

  // Add a new note
  async addNote(title, content) {
    try {
      const notes = await this.getNotes();
      const newNote = new Note(title, content);
      notes.push(newNote);
      await this.saveNotes(notes);
      return true;
    } catch (error) {
      console.error("Error adding note:", error);
      return false;
    }
  }

  // Update existing note
  async updateNote(index, title, content) {
    try {
      const notes = await this.getNotes();
      if (index < 0 || index >= notes.length) return false;

      notes[index].title = title;
      notes[index].content = content;
      // Keep the original creation date

      await this.saveNotes(notes);
      return true;
    } catch (error) {
      console.error("Error updating note:", error);
      return false;
    }
  }

  // Delete a note
  async deleteNote(index) {
    try {
      const notes = await this.getNotes();
      if (index < 0 || index >= notes.length) return false;

      notes.splice(index, 1);
      await this.saveNotes(notes);
      return true;
    } catch (error) {
      console.error("Error deleting note:", error);
      return false;
    }
  }
}

// Create a singleton note manager
const noteManager = new NoteManager();

// Module functions
export function initializeNotes() {
  document
    .getElementById("addNoteBtn")
    .addEventListener("click", showAddNoteModal);

  renderNotesList();
}

export async function renderNotesList() {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML =
    '<p class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading notes...</p>';

  try {
    const notes = await noteManager.getNotes();

    notesList.innerHTML = "";

    if (notes.length === 0) {
      notesList.innerHTML =
        '<p class="text-gray-500 italic text-center py-4 col-span-3">Tidak ada catatan. Klik tombol Tambah Catatan untuk membuat catatan baru.</p>';
      return;
    }

    notes.forEach((note, index) => {
      const noteCard = document.createElement("div");
      noteCard.className =
        "bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-sm";

      noteCard.innerHTML = `
        <div class="flex justify-between">
          <h2 class="text-lg font-semibold">${note.title}</h2>
          <div class="flex space-x-2">
            <button class="text-blue-500 hover:text-blue-700" onclick="editNote(${index})">
              <i class="fas fa-edit"></i>
            </button>
            <button class="text-red-500 hover:text-red-700" onclick="deleteNote(${index})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <p class="mt-2 mb-3">${note.content}</p>
        <p class="text-xs text-gray-500">${note.getFormattedDate()}</p>
      `;

      notesList.appendChild(noteCard);
    });
  } catch (error) {
    console.error("Error rendering notes:", error);
    notesList.innerHTML =
      '<p class="text-red-500 text-center py-4">Error loading notes. Please try again.</p>';
  }
}

function showAddNoteModal() {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  modal.id = "noteModal";

  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full modal-content">
      <h2 class="text-xl font-bold mb-4">Tambah Catatan Baru</h2>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="noteTitle">Judul</label>
        <input type="text" id="noteTitle" class="w-full p-2 border rounded">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="noteContent">Isi Catatan</label>
        <textarea id="noteContent" class="w-full p-2 border rounded" rows="5"></textarea>
      </div>
      <div class="flex space-x-2">
        <button id="saveNoteBtn" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Simpan</button>
        <button id="cancelNoteBtn" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
      </div>
    </div>
  `;

  document.getElementById("modalsContainer").appendChild(modal);

  // Set up event listeners
  document
    .getElementById("saveNoteBtn")
    .addEventListener("click", async function () {
      const title = document.getElementById("noteTitle").value.trim();
      const content = document.getElementById("noteContent").value.trim();

      if (title && content) {
        try {
          const saveButton = this;
          saveButton.disabled = true;
          saveButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Saving...';

          await noteManager.addNote(title, content);
          closeModal("noteModal");
          await renderNotesList();
          updateDashboardPreviews();
        } catch (error) {
          console.error("Error saving note:", error);
          alert("There was an error saving your note. Please try again.");
        }
      } else {
        alert("Please fill out all fields.");
      }
    });

  document
    .getElementById("cancelNoteBtn")
    .addEventListener("click", function () {
      closeModal("noteModal");
    });
}

export async function editNote(index) {
  try {
    const notes = await noteManager.getNotes();
    const note = notes[index];

    if (!note) return;

    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modal.id = "editNoteModal";

    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full modal-content">
        <h2 class="text-xl font-bold mb-4">Edit Catatan</h2>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="editNoteTitle">Judul</label>
          <input type="text" id="editNoteTitle" class="w-full p-2 border rounded" value="${note.title}">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="editNoteContent">Isi Catatan</label>
          <textarea id="editNoteContent" class="w-full p-2 border rounded" rows="5">${note.content}</textarea>
        </div>
        <div class="flex space-x-2">
          <button id="updateNoteBtn" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
          <button id="cancelEditNoteBtn" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
        </div>
      </div>
    `;

    document.getElementById("modalsContainer").appendChild(modal);

    // Set up event listeners
    document
      .getElementById("updateNoteBtn")
      .addEventListener("click", async function () {
        const title = document.getElementById("editNoteTitle").value.trim();
        const content = document.getElementById("editNoteContent").value.trim();

        if (title && content) {
          try {
            const updateButton = this;
            updateButton.disabled = true;
            updateButton.innerHTML =
              '<i class="fas fa-spinner fa-spin"></i> Updating...';

            await noteManager.updateNote(index, title, content);
            closeModal("editNoteModal");
            await renderNotesList();
            updateDashboardPreviews();
          } catch (error) {
            console.error("Error updating note:", error);
            alert("There was an error updating your note. Please try again.");
          }
        } else {
          alert("Please fill out all fields.");
        }
      });

    document
      .getElementById("cancelEditNoteBtn")
      .addEventListener("click", function () {
        closeModal("editNoteModal");
      });
  } catch (error) {
    console.error("Error editing note:", error);
  }
}

export async function deleteNote(index) {
  if (confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
    try {
      await noteManager.deleteNote(index);
      await renderNotesList();
      updateDashboardPreviews();
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("There was an error deleting your note. Please try again.");
    }
  }
}
