import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateProfile = async () => {
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
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
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
                } else {
                    console.error(response.data.message || "Failed to fetch profile data.");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, loading, setProfile, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    return useContext(ProfileContext);
}