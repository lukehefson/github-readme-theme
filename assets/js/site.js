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
  
  let sidebarInitialized = false;
  
  function initSidebar() {
    // Prevent re-initialization on page navigation to avoid flashing
    if (sidebarInitialized) {
      return;
    }
    
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
    
    // Update icons based on initial state (only once)
    updateIcons(isCollapsed);
    
    // Toggle sidebar on button click
    if (toggle) {
      toggle.addEventListener('click', toggleSidebar);
    }
    
    if (toggleMobile) {
      toggleMobile.addEventListener('click', toggleSidebar);
    }
    
    sidebarInitialized = true;
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
  
  // Nav item expand/collapse functionality with persistence
  const NAV_OPENED_KEY = 'github-readme-theme-nav-opened';
  
  function getOpenedItems() {
    const stored = localStorage.getItem(NAV_OPENED_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  
  function setOpenedItems(items) {
    localStorage.setItem(NAV_OPENED_KEY, JSON.stringify(items));
  }
  
  function getItemUrl(item) {
    const link = item.querySelector('a');
    return link ? link.getAttribute('href') : null;
  }
  
  function updateChevron(item, isExpanded) {
    const chevron = item.querySelector('.nav-chevron');
    if (!chevron) return;
    
    const chevronRight = chevron.querySelector('.chevron-right');
    const chevronDown = chevron.querySelector('.chevron-down');
    
    if (isExpanded) {
      if (chevronRight) chevronRight.style.display = 'none';
      if (chevronDown) chevronDown.style.display = 'block';
    } else {
      if (chevronRight) chevronRight.style.display = 'block';
      if (chevronDown) chevronDown.style.display = 'none';
    }
  }
  
  // Initialize chevrons on page load - ensure they start pointing right
  function initializeChevrons() {
    const navItems = document.querySelectorAll('.nav-item.has-children');
    navItems.forEach(item => {
      const isExpanded = item.classList.contains('expanded');
      updateChevron(item, isExpanded);
    });
  }
  
  function toggleItem(item, expand) {
    const itemUrl = getItemUrl(item);
    const openedItems = getOpenedItems();
    const children = item.querySelector('.nav-children');
    
    if (expand) {
      item.classList.remove('collapsed');
      item.classList.add('expanded');
      if (children) {
        children.style.display = 'block';
        
        // CRITICAL: Collapse ALL direct child items (whether they have children or not)
        // This ensures only the first level is visible, nothing deeper
        const directChildItems = children.querySelectorAll(':scope > .nav-item');
        directChildItems.forEach(childItem => {
          // Collapse the child item itself
          childItem.classList.remove('expanded');
          childItem.classList.add('collapsed');
          updateChevron(childItem, false);
          
          // Hide the child's children (grandchildren)
          const childItemChildren = childItem.querySelector('.nav-children');
          if (childItemChildren) {
            childItemChildren.style.display = 'none';
          }
          
          // Remove this child and all its descendants from openedItems
          const childUrl = getItemUrl(childItem);
          if (childUrl) {
            const index = openedItems.indexOf(childUrl);
            if (index > -1) {
              openedItems.splice(index, 1);
            }
          }
        });
        
        // Recursively collapse and hide ALL nested items (grandchildren, great-grandchildren, etc.)
        // and remove them from openedItems
        const allNestedItems = children.querySelectorAll('.nav-item');
        allNestedItems.forEach(nestedItem => {
          // Skip direct children (already handled above)
          if (directChildItems.includes(nestedItem)) {
            return;
          }
          
          nestedItem.classList.remove('expanded');
          nestedItem.classList.add('collapsed');
          updateChevron(nestedItem, false);
          
          const nestedChildren = nestedItem.querySelector('.nav-children');
          if (nestedChildren) {
            nestedChildren.style.display = 'none';
          }
          
          // Remove from openedItems
          const nestedUrl = getItemUrl(nestedItem);
          if (nestedUrl) {
            const index = openedItems.indexOf(nestedUrl);
            if (index > -1) {
              openedItems.splice(index, 1);
            }
          }
        });
        
        // Save updated openedItems (with all descendants removed)
        setOpenedItems(openedItems);
      }
      updateChevron(item, true);
      if (itemUrl && !openedItems.includes(itemUrl)) {
        openedItems.push(itemUrl);
        setOpenedItems(openedItems);
      }
    } else {
      item.classList.remove('expanded');
      item.classList.add('collapsed');
      if (children) children.style.display = 'none';
      updateChevron(item, false);
      if (itemUrl) {
        const newOpened = openedItems.filter(url => url !== itemUrl);
        setOpenedItems(newOpened);
      }
    }
  }
  
  function initNavItems() {
    // First, hide ALL children by default - start completely collapsed
    const allChildren = document.querySelectorAll('.nav-children');
    allChildren.forEach(children => {
      children.style.display = 'none';
    });
    
    const navItems = document.querySelectorAll('.nav-item.has-children');
    const openedItems = getOpenedItems();
    
    // Check if we're on the homepage
    const currentPageUrl = window.location.pathname;
    const isHomepage = currentPageUrl === '/' || currentPageUrl === '/index.html' || (currentPageUrl.endsWith('/') && currentPageUrl.split('/').filter(Boolean).length <= 1);
    
    // Start with everything collapsed - no items expanded by default
    navItems.forEach(item => {
      const itemUrl = getItemUrl(item);
      const children = item.querySelector('.nav-children');
      
      // Ensure collapsed state first
      item.classList.remove('expanded');
      item.classList.add('collapsed');
      updateChevron(item, false);
      
      // Double-check children are hidden
      if (children) {
        children.style.display = 'none';
      }
      
      // Only expand if NOT on homepage AND was previously opened
      if (!isHomepage && itemUrl && openedItems.includes(itemUrl)) {
        toggleItem(item, true);
      }
    });
    
    // Initialize all chevrons to ensure correct state
    initializeChevrons();
    
    // Handle clicks on nav item links
    document.querySelectorAll('.nav-item > a').forEach(link => {
      link.addEventListener('click', function(e) {
        const item = this.closest('.nav-item');
        const clickedOnChevron = e.target.closest('.nav-chevron');
        
        // Don't handle if clicking on chevron (chevron handler will do it)
        if (clickedOnChevron) {
          return;
        }
        
        // If item has children, toggle it (expand if collapsed, navigate if expanded)
        if (item.classList.contains('has-children')) {
          const isExpanded = item.classList.contains('expanded');
          
          if (!isExpanded) {
            e.preventDefault();
            toggleItem(item, true);
          }
          // If already expanded, allow normal navigation
        }
        // If no children, navigate normally
      });
    });
    
    // Handle chevron clicks
    navItems.forEach(item => {
      const chevron = item.querySelector('.nav-chevron');
      
      if (chevron) {
        chevron.style.cursor = 'pointer';
        
        chevron.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const isExpanded = item.classList.contains('expanded');
          toggleItem(item, !isExpanded);
        });
      }
    });
  }
  
  // Initialize nav items immediately - don't wait for DOMContentLoaded
  // This ensures children are hidden before page renders
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initNavItems();
    });
    // Also try to hide immediately if possible
    setTimeout(initNavItems, 0);
  } else {
    initNavItems();
  }
})();

