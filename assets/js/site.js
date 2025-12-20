// Sidebar collapse functionality with localStorage persistence

(function() {
  'use strict';
  
  const STORAGE_KEY = 'github-readme-theme-sidebar-collapsed';
  const SIDEBAR_TOGGLE_ID = 'sidebar-toggle';
  const SITE_CONTAINER_CLASS = 'site-container';
  const COLLAPSED_CLASS = 'sidebar-collapsed';
  
  function toggleSidebar() {
    const container = document.querySelector('.' + SITE_CONTAINER_CLASS);
    if (!container) return;
    
    const currentlyCollapsed = container.classList.contains(COLLAPSED_CLASS);
    
    if (currentlyCollapsed) {
      container.classList.remove(COLLAPSED_CLASS);
      localStorage.setItem(STORAGE_KEY, 'false');
    } else {
      container.classList.add(COLLAPSED_CLASS);
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  }
  
  function initSidebar() {
    const toggle = document.getElementById(SIDEBAR_TOGGLE_ID);
    const toggleMobile = document.getElementById('sidebar-toggle-mobile');
    const container = document.querySelector('.' + SITE_CONTAINER_CLASS);
    
    if (!container) {
      return;
    }
    
    // Load saved state from localStorage
    const savedState = localStorage.getItem(STORAGE_KEY);
    const isCollapsed = savedState === 'true';
    
    if (isCollapsed) {
      container.classList.add(COLLAPSED_CLASS);
    }
    
    // Toggle sidebar on button click
    if (toggle) {
      toggle.addEventListener('click', toggleSidebar);
    }
    
    if (toggleMobile) {
      toggleMobile.addEventListener('click', toggleSidebar);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();

