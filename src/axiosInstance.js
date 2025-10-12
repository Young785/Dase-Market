import axios from 'axios';
import { toast } from 'react-hot-toast';

const baseURL = import.meta.env.VITE_API_URL;

// Log the API URL for debugging (only in development)
if (import.meta.env.DEV) {
  console.log('🔗 API Base URL:', baseURL);
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    // Do NOT set Content-Type globally; let Axios infer it
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
    config => {
        // Log the request in development mode
        if (import.meta.env.DEV) {
            console.log(`📤 ${config.method.toUpperCase()} ${config.url}`, config.data || '');
        }
        
        const data = JSON.parse(localStorage.getItem('auth_data'));

        if (data && data.access_token) {
            config.headers['Authorization'] = `Bearer ${data.access_token}`;
        }

        // Ensure proper Content-Type handling
        // - For FormData: let the browser set multipart boundaries
        // - For JSON payloads: set application/json if not already set
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        } else if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    error => {
        if (import.meta.env.DEV) {
            console.error('❌ Request Error:', error);
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    async response => {
        // Log the response in development mode
        if (import.meta.env.DEV) {
            console.log(`📥 ${response.config.method.toUpperCase()} ${response.config.url}`, response.data);
        }
        
        // For login endpoint - just store auth data
        if (response.config.url.includes('/login') && response.data.status) {
            localStorage.setItem('auth_data', JSON.stringify({
                access_token: response.data.access_token,
                user: response.data.user,
                permissions: response.data.permissions,
            }));
        }
        
        return response;
    },
    error => {
        const { response } = error;
        
        // Log the error in development mode
        if (import.meta.env.DEV) {
            console.error('❌ Response Error:', {
                url: error.config?.url,
                method: error.config?.method,
                status: response?.status,
                data: response?.data,
                message: error.message
            });
        }
        
        // Handle 401 Unauthorized - redirect to login unless on verification routes
        if (response?.status === 401) {
            const url = error.config?.url || '';
            const isVerificationFlow = url.includes('/confirm-account') || url.includes('/verify-code');
            if (!isVerificationFlow) {
                localStorage.clear();
                window.location.href = '/dase/login';
            }
        }
        
        // Handle 403 Forbidden - account not verified
        if (response?.status === 403 && response?.data?.message?.includes('verify your account')) {
            // Do not clear localStorage; we need auth_data for subsequent steps
            window.location.href = '/dase/verifyotp';
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;