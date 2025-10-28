import axios from 'axios'

// API Base URL - Update this to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      console.error('Network Error:', error.message)
    }
    return Promise.reject(error)
  }
)

// Landing Page API endpoints
export const landingAPI = {
  // Contact form
  submitContact: (data) => api.post('/landing/contact', data),
  
  // Newsletter
  subscribeNewsletter: (email) => api.post('/landing/newsletter', { email }),
  
  // Adverts
  getAdverts: (params) => api.get('/landing/adverts', { params }),
  getAdvertById: (id) => api.get(`/landing/adverts/${id}`),
  
  // Producers/Engineers
  getProducers: (params) => api.get('/landing/producers', { params }),
  getProducerById: (id) => api.get(`/landing/producers/${id}`),
  getProducerReviews: (id, params) => api.get(`/landing/producers/${id}/reviews`, { params }),
  
  // Statistics
  getStatistics: () => api.get('/landing/statistics'),
}

export default api

