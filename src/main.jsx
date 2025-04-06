// src/main.jsx
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; 

import App from './App';
import { ProfileProvider } from './context/ProfileContext';

// Core CSS
import './assets/css/app.min.css'
import './assets/css/custom.min.css'
import './assets/css/icons.min.css'
import './assets/css/bootstrap.min.css'

// Third-party CSS
import 'sweetalert2/dist/sweetalert2.css'
import "react-phone-input-2/lib/bootstrap.css"

// Use swiper CSS from node_modules instead of local assets
import 'swiper/css/bundle'

// Local CSS
import './dashboard/style.css';

// Add a comment to explain the development behavior
/**
 * Note: In development mode, React.StrictMode causes components to:
 * 1. Mount -> Unmount -> Mount again (double mounting)
 * 2. This helps catch bugs but causes extra API calls
 * 3. This behavior only happens in development, not production
 */

createRoot(document.getElementById('root')).render(
  <Router>
    <ProfileProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ProfileProvider>
  </Router>
);








