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
    'Content-Type': 'application/json',
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
        
        // For login endpoint
        if (response.config.url.includes('/login') && response.data.status) {
            try {
                // Store auth data temporarily to make profile check
                localStorage.setItem('auth_data', JSON.stringify({
                    access_token: response.data.access_token,
                    user: response.data.user,
                    permissions: response.data.permissions,
                }));

                // Make profile check after successful login
                const profileCheck = await axiosInstance.get('/user/profile');
                
                // If profile check indicates unverified account
                if (profileCheck.data.message === "You need to verify your account to gain full access." && 
                    profileCheck.data.status === false) {
                    localStorage.clear();
                    window.location.href = '/dase/verify-account';
                    return Promise.reject({
                        response: {
                            data: {
                                message: "Please verify your account to continue"
                            }
                        }
                    });
                }

                // If we get here, user is verified, let the login proceed
                return response;
                
            } catch (error) {
                localStorage.clear();
                window.location.href = '/dase/verify-account';
                return Promise.reject(error);
            }
        }

        // For profile endpoint
        if (response.config.url.includes('/user/profile')) {
            if (response.data.message === "You need to verify your account to gain full access." && 
                response.data.status === false) {
                localStorage.clear();
                window.location.href = '/dase/verify-account';
                return Promise.reject(response);
            }
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
        
        if (response?.status === 401) {
            localStorage.clear();
            window.location.href = '/dase/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;