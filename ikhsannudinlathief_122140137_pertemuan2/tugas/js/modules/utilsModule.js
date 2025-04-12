// Utils class for utility functions
class ModalUtils {
  // Close modal with animation
  static async closeModal(modalId) {
    return new Promise((resolve) => {
      const modal = document.getElementById(modalId);
      if (!modal) {
        resolve(false);
        return;
      }

      // Add fade-out animation
      const modalContent = modal.querySelector(".modal-content");
      if (modalContent) {
        modalContent.classList.add("opacity-0", "scale-95");
        modalContent.classList.remove("opacity-100", "scale-100");

        // Remove after animation
        setTimeout(() => {
          modal.remove();
          resolve(true);
        }, 300);
      } else {
        // No animation, remove immediately
        modal.remove();
        resolve(true);
      }
    });
  }

  // Create a notification toast
  static async showNotification(message, type = "success", duration = 3000) {
    return new Promise((resolve) => {
      // Create notification element
      const notification = document.createElement("div");

      // Set type-specific styles
      let typeClass, icon;
      switch (type) {
        case "success":
          typeClass = "bg-green-100 border-green-500 text-green-700";
          icon = '<i class="fas fa-check-circle text-green-500 mr-2"></i>';
          break;
        case "error":
          typeClass = "bg-red-100 border-red-500 text-red-700";
          icon = '<i class="fas fa-times-circle text-red-500 mr-2"></i>';
          break;
        case "warning":
          typeClass = "bg-yellow-100 border-yellow-500 text-yellow-700";
          icon =
            '<i class="fas fa-exclamation-circle text-yellow-500 mr-2"></i>';
          break;
        default:
          typeClass = "bg-blue-100 border-blue-500 text-blue-700";
          icon = '<i class="fas fa-info-circle text-blue-500 mr-2"></i>';
      }

      // Set classes and content
      notification.className = `fixed bottom-4 right-4 ${typeClass} border-l-4 p-4 rounded shadow-md transition-opacity duration-500 opacity-0`;
      notification.innerHTML = `
          <div class="flex items-center">
            ${icon}
            <span>${message}</span>
          </div>
        `;

      // Add to document
      document.body.appendChild(notification);

      // Fade in
      setTimeout(() => {
        notification.classList.remove("opacity-0");
        notification.classList.add("opacity-100");
      }, 10);

      // Fade out and remove
      setTimeout(() => {
        notification.classList.remove("opacity-100");
        notification.classList.add("opacity-0");
        setTimeout(() => {
          notification.remove();
          resolve(true);
        }, 500);
      }, duration);
    });
  }
}

// Export specific functions for compatibility with existing code
export function closeModal(modalId) {
  return ModalUtils.closeModal(modalId);
}

// Export the class for new code
export default ModalUtils;
