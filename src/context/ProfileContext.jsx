import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateProfile = async () => {
        setLoading(true); // Set loading when updating
        try {
            const authData = JSON.parse(localStorage.getItem('auth_data'));
            const token = authData?.access_token;

            if (!token) {
                console.error("No token found. User is not authenticated.");
                return;
            }

            const response = await axiosInstance.get('/user/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                setProfile(response.data.data);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false); // Always set loading to false when done
        }
    };

    useEffect(() => {
        // Check if we have auth data before fetching
        const authData = JSON.parse(localStorage.getItem('auth_data'));
        if (authData?.access_token) {
            updateProfile();
        } else {
            setLoading(false); // No auth data, so we're not really loading
        }
    }, []); // Only run on mount

    return (
        <ProfileContext.Provider value={{ profile, loading, setProfile, updateProfile }}>
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