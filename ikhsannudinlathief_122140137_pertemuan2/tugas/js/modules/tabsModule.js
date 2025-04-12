// TabManager class to handle tab operations
class TabManager {
  constructor() {
    this.tabs = [];
    this.activeTab = null;
  }

  // Initialize tabs from DOM
  initializeTabs() {
    // Get all tab buttons
    const tabButtons = document.querySelectorAll(".tab-button");

    // Store tab info
    tabButtons.forEach((button) => {
      const tabId = button.getAttribute("data-tab");
      this.tabs.push({
        id: tabId,
        button: button,
        content: document.getElementById(tabId),
      });

      // Add click event
      button.addEventListener("click", () => this.switchToTab(tabId));

      // Check if active
      if (button.classList.contains("bg-gray-200")) {
        this.activeTab = tabId;
      }
    });

    // If no active tab is set, default to first tab
    if (!this.activeTab && this.tabs.length > 0) {
      this.switchToTab(this.tabs[0].id);
    }
  }

  // Switch to a specific tab
  async switchToTab(tabId) {
    return new Promise((resolve) => {
      // Update active state of buttons
      this.tabs.forEach((tab) => {
        tab.button.classList.remove("bg-gray-200");
        tab.content.classList.remove("active");

        if (tab.id === tabId) {
          tab.button.classList.add("bg-gray-200");
          tab.content.classList.add("active");
        }
      });

      this.activeTab = tabId;

      // Add a small delay to simulate async transition
      setTimeout(() => resolve(true), 50);
    });
  }

  // Get the currently active tab
  getActiveTab() {
    return this.activeTab;
  }
}

// Create singleton instance
const tabManager = new TabManager();

export function initializeTabs() {
  tabManager.initializeTabs();
}

export async function switchTab(tabId) {
  await tabManager.switchToTab(tabId);
}
