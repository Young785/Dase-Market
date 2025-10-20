/**
 * Load external scripts for Bootstrap and other libraries
 */
export const loadExternalScripts = () => {
  // Bootstrap is loaded via CDN in index.html
  // This function can be used to initialize any JavaScript libraries that need manual setup
  
  // Initialize Bootstrap tooltips if needed
  if (typeof window !== 'undefined') {
    // Auto-initialize Bootstrap components
    const initBootstrap = () => {
      // Tooltips
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      if (tooltipTriggerList.length > 0 && window.bootstrap) {
        [...tooltipTriggerList].map(tooltipTriggerEl => 
          new window.bootstrap.Tooltip(tooltipTriggerEl)
        );
      }

      // Popovers
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
      if (popoverTriggerList.length > 0 && window.bootstrap) {
        [...popoverTriggerList].map(popoverTriggerEl => 
          new window.bootstrap.Popover(popoverTriggerEl)
        );
      }
    };

    // Run after DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initBootstrap);
    } else {
      initBootstrap();
    }
  }
};
