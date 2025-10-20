import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('superadmin_token');
    if (token) {
      try {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axiosInstance.get('/api/v1/superadmin/auth/profile');
        setUser(response.data.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('superadmin_token');
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/v1/superadmin/auth/login', {
        email,
        password
      });

      const { token, user, requires_2fa } = response.data.data;

      if (requires_2fa) {
        // Store temporary data for 2FA verification
        sessionStorage.setItem('temp_email', email);
        return { requires_2fa: true };
      }

      localStorage.setItem('superadmin_token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  };

  const verify2FA = async (code) => {
    try {
      const email = sessionStorage.getItem('temp_email');
      const response = await axiosInstance.post('/api/v1/superadmin/auth/verify-2fa', {
        email,
        code
      });

      const { token, user } = response.data.data;
      
      localStorage.setItem('superadmin_token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      sessionStorage.removeItem('temp_email');
      
      return { success: true };
    } catch (error) {
      throw error.response?.data || { message: '2FA verification failed' };
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/api/v1/superadmin/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('superadmin_token');
      delete axiosInstance.defaults.headers.common['Authorization'];
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axiosInstance.post('/api/v1/superadmin/auth/forgot-password', {
        email
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Request failed' };
    }
  };

  const resetPassword = async (email, code, password, password_confirmation) => {
    try {
      const response = await axiosInstance.post('/api/v1/superadmin/auth/reset-password', {
        email,
        code,
        password,
        password_confirmation
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Reset failed' };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    verify2FA,
    logout,
    forgotPassword,
    resetPassword,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

