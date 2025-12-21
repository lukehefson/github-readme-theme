// Sidebar collapse functionality with localStorage persistence

(function() {
  'use strict';
  
  const STORAGE_KEY = 'github-readme-theme-sidebar-collapsed';
  const SIDEBAR_TOGGLE_ID = 'sidebar-toggle';
  const SITE_CONTAINER_CLASS = 'site-container';
  const COLLAPSED_CLASS = 'sidebar-collapsed';
  
  function updateIcons(isCollapsed) {
    // Update sidebar toggle icon (in sidebar header)
    // When sidebar is open: show sidebar-expand icon
    // When sidebar is collapsed: show sidebar-collapse icon
    const toggle = document.getElementById(SIDEBAR_TOGGLE_ID);
    if (toggle) {
      const collapseIcon = toggle.querySelector('.icon-collapse');
      const expandIcon = toggle.querySelector('.icon-expand');
      if (collapseIcon && expandIcon) {
        // When open (not collapsed), show expand icon
        expandIcon.style.display = isCollapsed ? 'none' : 'inline';
        collapseIcon.style.display = isCollapsed ? 'inline' : 'none';
      }
    }
    
    // Update mobile toggle icon (in main header)
    // When sidebar is collapsed: show sidebar-collapse icon
    // When sidebar is open: show sidebar-expand icon
    const toggleMobile = document.getElementById('sidebar-toggle-mobile');
    if (toggleMobile) {
      const collapseIcon = toggleMobile.querySelector('.icon-collapse');
      const expandIcon = toggleMobile.querySelector('.icon-expand');
      if (collapseIcon && expandIcon) {
        // When collapsed, show collapse icon
        collapseIcon.style.display = isCollapsed ? 'inline' : 'none';
        expandIcon.style.display = isCollapsed ? 'none' : 'inline';
      }
    }
  }
  
  function toggleSidebar() {
    const container = document.querySelector('.' + SITE_CONTAINER_CLASS);
    if (!container) return;
    
    const currentlyCollapsed = container.classList.contains(COLLAPSED_CLASS);
    const newState = !currentlyCollapsed;
    
    if (newState) {
      container.classList.add(COLLAPSED_CLASS);
      localStorage.setItem(STORAGE_KEY, 'true');
    } else {
      container.classList.remove(COLLAPSED_CLASS);
      localStorage.setItem(STORAGE_KEY, 'false');
    }
    
    updateIcons(newState);
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
    
    // Update icons based on initial state
    updateIcons(isCollapsed);
    
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

