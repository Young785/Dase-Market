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
// Remove remixicon import and use CDN instead
// import 'remixicon/fonts/remixicon.css'

// Use swiper CSS from node_modules instead of local assets
import 'swiper/css/bundle'

// Local CSS
import './dashboard/style.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </Router>
  </StrictMode>,
);








