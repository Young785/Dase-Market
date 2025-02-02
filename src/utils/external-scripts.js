// Import all external scripts here
export const loadExternalScripts = () => {
  // No need to dynamically import these anymore since they're loaded in index.html
  // The scripts will be available globally
  return Promise.resolve();
} 