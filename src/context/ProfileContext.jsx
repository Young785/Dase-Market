import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const updateProfile = useCallback(async (force = false) => {
        if (profile && !force) {
            return true;
        }

        setLoading(true);
        try {
            const authData = JSON.parse(localStorage.getItem('auth_data'));
            console.log('🔍 ProfileContext - auth_data:', authData);
            
            if (!authData?.access_token) {
                console.error('❌ No access token found');
                setProfile(null);
                return false;
            }

            console.log('📤 Fetching profile from /user/profile');
            const response = await axiosInstance.get('/user/profile');
            console.log('📥 Profile response:', response.data);
            
            // Backend returns response.data.status instead of response.data.success
            if (response.data.status === true || response.data.success) {
                setProfile(response.data.data || response.data.user);
                setIsVerified(true);
                console.log('✅ Profile updated successfully');
                return true;
            }
            console.error('❌ Profile fetch failed:', response.data.message);
            return false;
        } catch (error) {
            console.error("❌ Error updating profile:", error.response?.data || error.message);
            if (error.response?.status === 403 || error.response?.data?.requiresVerification) {
                setIsVerified(false);
                localStorage.removeItem('auth_data');
                navigate('/dase/verifyotp');
            }
            return false;
        } finally {
            setLoading(false);
        }
    }, [profile, navigate]);

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('auth_data'));
        if (authData?.access_token) {
            updateProfile();
        } else {
            setLoading(false);
        }
    }, []);

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

        
        return !publicRoutes.includes(pathname) && pathname.startsWith('/dase/');
    };

    useEffect(() => {
        const loadProfile = async () => {
            const authData = JSON.parse(localStorage.getItem('auth_data'));
            if (authData?.access_token && isProtectedRoute(location.pathname)) {
                setLoading(true);
                await updateProfile(true); 
            } else {
                setLoading(false);
            }
        };

        loadProfile();
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