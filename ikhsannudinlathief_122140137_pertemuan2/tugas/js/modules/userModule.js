import Storage from "../storage.js";
import { closeModal } from "./utilsModule.js";
import { updateDashboardPreviews } from "./dashboardModule.js";

// User class to represent user data
class User {
  constructor(name, nim, program) {
    this.name = name;
    this.nim = nim;
    this.program = program;
  }

  // Get user's initial for display
  getInitial() {
    return this.name.charAt(0).toUpperCase();
  }

  // Static method to create User from plain object
  static fromObject(obj) {
    if (!obj) return null;
    return new User(obj.name, obj.nim, obj.program);
  }
}

// UserManager class to handle user operations asynchronously
class UserManager {
  // Get current user
  async getUser() {
    return new Promise((resolve) => {
      const userData = Storage.getUser();
      const user = User.fromObject(userData);
      setTimeout(() => resolve(user), 100); // Simulate async delay
    });
  }

  // Save user
  async saveUser(user) {
    return new Promise((resolve, reject) => {
      try {
        // Convert User instance to plain object
        const userData = {
          name: user.name,
          nim: user.nim,
          program: user.program,
        };

        Storage.saveUser(userData);
        setTimeout(() => resolve(true), 100); // Simulate async delay
      } catch (error) {
        reject(error);
      }
    });
  }

  // Update user details
  async updateUser(name, nim, program) {
    try {
      const user = new User(name, nim, program);
      await this.saveUser(user);
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
}

// Create singleton user manager
const userManager = new UserManager();

export function initializeUserModule() {
  // Set up the edit profile button
  const editProfileBtn = document.getElementById("editProfileBtn");
  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", showEditProfileModal);
  }

  // Make the user initial also clickable to edit profile
  const userInitial = document.getElementById("userInitial");
  if (userInitial) {
    userInitial.addEventListener("click", showEditProfileModal);
  }
}

export async function showUsernameModal() {
  const modal = document.getElementById("usernameModal");
  modal.classList.remove("hidden");

  document
    .getElementById("saveUserInfo")
    .addEventListener("click", async function () {
      const name = document.getElementById("username").value.trim();
      const nim = document.getElementById("userNim").value.trim();
      const program = document.getElementById("userProgram").value.trim();

      if (name && nim && program) {
        try {
          const saveButton = this;
          saveButton.disabled = true;
          saveButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Saving...';

          const user = await userManager.updateUser(name, nim, program);
          modal.classList.add("hidden");
          await updateUserInfo(user);
        } catch (error) {
          console.error("Error saving user info:", error);
          alert(
            "There was an error saving your information. Please try again."
          );
        }
      } else {
        alert("Please fill out all fields.");
      }
    });
}

export async function updateUserInfo(user) {
  if (!user) return;

  // Update greeting
  const userGreeting = document.getElementById("userGreeting");
  if (userGreeting) {
    userGreeting.textContent = `Hai, ${user.name}`;
  }

  // Update welcome message if it exists
  const welcomeMessage = document.getElementById("welcomeMessage");
  if (welcomeMessage) {
    welcomeMessage.textContent = `Selamat Datang, ${user.name}`;
  }

  // Update user initial
  const userInitial = document.getElementById("userInitial");
  if (userInitial) {
    userInitial.textContent = user.getInitial();
    userInitial.title = `${user.name} - Click to edit profile`;
  }

  // Update dashboard previews
  await updateDashboardPreviews();
}

async function showEditProfileModal() {
  try {
    const user = await userManager.getUser();
    if (!user) return;

    // Show the modal
    const modal = document.getElementById("editProfileModal");
    modal.classList.remove("hidden");

    // Add animation for better user experience
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
      modalContent.classList.add("opacity-0", "transform", "scale-95");
      
      // Animate in
      setTimeout(() => {
        modalContent.classList.remove("opacity-0", "scale-95");
        modalContent.classList.add(
          "opacity-100",
          "scale-100",
          "transition-all",
          "duration-300"
        );
      }, 10);
    }

    // Pre-fill with current user data
    document.getElementById("editUsername").value = user.name || "";
    document.getElementById("editUserNim").value = user.nim || "";
    document.getElementById("editUserProgram").value = user.program || "";
    
    // Reset update button state
    const updateBtn = document.getElementById("updateProfileBtn");
    updateBtn.disabled = false;
    updateBtn.innerHTML = "Update";
    
    // Remove any existing event listeners by replacing the button with its clone
    const oldUpdateBtn = updateBtn;
    const newUpdateBtn = oldUpdateBtn.cloneNode(true);
    oldUpdateBtn.parentNode.replaceChild(newUpdateBtn, oldUpdateBtn);
    
    // Add new event listener to the fresh button
    newUpdateBtn.addEventListener("click", async function() {
      const name = document.getElementById("editUsername").value.trim();
      const nim = document.getElementById("editUserNim").value.trim();
      const program = document.getElementById("editUserProgram").value.trim();

      if (name && nim && program) {
        try {
          this.disabled = true;
          this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
          
          const updatedUser = await userManager.updateUser(name, nim, program);
          modal.classList.add("hidden");
          await updateUserInfo(updatedUser);
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("There was an error updating your profile. Please try again.");
          
          // Reset button on error
          this.disabled = false;
          this.innerHTML = "Update";
        }
      } else {
        alert("Please fill out all fields.");
      }
    });
    
    // Also fix the cancel button by replacing it 
    const oldCancelBtn = document.getElementById("cancelProfileBtn");
    const newCancelBtn = oldCancelBtn.cloneNode(true);
    oldCancelBtn.parentNode.replaceChild(newCancelBtn, oldCancelBtn);
    
    newCancelBtn.addEventListener("click", function() {
      modal.classList.add("hidden");
    });
    
  } catch (error) {
    console.error("Error showing edit profile modal:", error);
  }
}
