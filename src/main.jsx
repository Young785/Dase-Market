// src/main.jsx
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; 
import App from './App';


import './assets/css/app.min.css'
import './assets/css/custom.min.css'
import './assets/css/icons.min.css'
import './assets/css/bootstrap.min.css'
import './assets/libs/@simonwep/pickr/themes/classic.min.css'
import './assets/libs/@simonwep/pickr/themes/monolith.min.css'
import './assets/libs/@simonwep/pickr/themes/nano.min.css'
import './assets/libs/@tarekraafat/autocomplete.js/css/autoComplete.css'
import './assets/libs/aos/aos.css'
import './assets/libs/dragula/dragula.min.css'
import './assets/libs/dropzone/dropzone.css'
import './assets/libs/filepond/filepond.min.css'
import './assets/libs/filepond-plugin-image-preview/filepond-plugin-image-preview.min.css'
import './assets/libs/glightbox/css/glightbox.min.css'
import './assets/libs/gridjs/theme/mermaid.min.css'
import './assets/libs/jsvectormap/css/jsvectormap.min.css'
import './assets/libs/leaflet/leaflet.css'
import './assets/libs/nouislider/nouislider.min.css'
import './assets/libs/quill/quill.bubble.css'
import './assets/libs/quill/quill.core.css'
import './assets/libs/quill/quill.snow.css'
import './assets/libs/sweetalert2/sweetalert2.min.css'
import './assets/libs/swiper/swiper-bundle.min.css'
import "react-phone-input-2/lib/bootstrap.css";



// import './assets/libs/glightbox/js/glightbox.min.js'

// import './assets/libs/fg-emoji-picker/fgEmojiPicker.js'

// import './assets/js/pages/chat.init.js'
import './dashboard/style.css';
// import './index.css';
// Swiper CSS and JS
import './assets/libs/swiper/swiper-bundle.min.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);








