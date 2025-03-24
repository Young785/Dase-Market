import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const updateProfile = async () => {
        setLoading(true);
        try {
            const authData = JSON.parse(localStorage.getItem('auth_data'));
            if (!authData?.access_token) {
                setLoading(false);
                return false;
            }

            const response = await axiosInstance.get('/user/profile');
            
            if (response.data.success) {
                setProfile(response.data.data);
                setIsVerified(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.response?.data?.requiresVerification) {
                setIsVerified(false);
                localStorage.removeItem('auth_data');
                navigate('/dase/login');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Check if current route is a protected route
    const isProtectedRoute = (pathname) => {
        // List of public routes
        const publicRoutes = [
            '/dase/login',
            '/dase/register',
            '/dase/verify-account',
            '/dase/forget-password',
            '/dase/verifyotp'
        ];

        // If the path is not in public routes and starts with /dase/, it's protected
        return !publicRoutes.includes(pathname) && pathname.startsWith('/dase/');
    };

    useEffect(() => {
        const loadProfile = async () => {
            const authData = JSON.parse(localStorage.getItem('auth_data'));
            if (authData?.access_token && isProtectedRoute(location.pathname)) {
                setLoading(true);
                await updateProfile();
            }
        };

        if (isProtectedRoute(location.pathname)) {
            loadProfile();
        } else {
            // Reset states for public routes
            setLoading(false);
            setProfile(null);
        }
    }, [location.pathname]);

    return (
        <ProfileContext.Provider value={{ 
            profile, 
            loading, 
            setProfile, 
            updateProfile,
            isVerified,
            setIsVerified 
        }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}