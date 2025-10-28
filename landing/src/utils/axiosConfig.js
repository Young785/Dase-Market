import axios from 'axios'

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
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
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
          break
        case 403:
          // Forbidden
          console.error('Access forbidden')
          break
        case 404:
          // Not found
          console.error('Resource not found')
          break
        case 500:
          // Server error
          console.error('Server error')
          break
        default:
          console.error('An error occurred')
      }
    }
    return Promise.reject(error)
  }
)

// API endpoints for landing pages
export const landingAPI = {
  // Contact form
  submitContact: (data) => axiosInstance.post('/landing/contact', data),
  
  // Get adverts
  getAdverts: (params) => axiosInstance.get('/landing/adverts', { params }),
  getAdvertById: (id) => axiosInstance.get(`/landing/adverts/${id}`),
  
  // Get producers
  getProducers: (params) => axiosInstance.get('/landing/producers', { params }),
  getProducerById: (id) => axiosInstance.get(`/landing/producers/${id}`),
  
  // Get reviews
  getReviews: (producerId) => axiosInstance.get(`/landing/producers/${producerId}/reviews`),
  
  // Newsletter subscription
  subscribeNewsletter: (email) => axiosInstance.post('/landing/newsletter', { email }),
}

export default axiosInstance

