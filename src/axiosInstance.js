import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosInstance;




// axiosInstance.interceptors.request.use(
//     config => {
//         const data = JSON.parse(localStorage.getItem('auth_data'));

//         if (data && data.access_token) {
//             config.headers['Authorization'] = `Bearer ${data.access_token}`;
//         }
//         return config;
//     },
//     error => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//         const { response } = error;
//         if (response) {
            
//             if (response.status === 401 ||
//                 (response.data && response.data.data && response.data.data.errorMessage === "Unauthorized, User is not authenticated.")) {
//                 localStorage.clear();
//                     toast.error('Session timeout!')
//                 localStorage.removeItem('auth_data');
//                 window.location.href = '/login';
//                 return;
//             }
//         }
//         return Promise.reject(error);
//     }
// );


