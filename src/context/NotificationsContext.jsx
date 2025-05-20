import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance'; // Adjust path as needed
import { toast } from 'react-hot-toast'; // Import your preferred toast library

// Create the context
const NotificationsContext = createContext(null);

// Create a provider component
export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastFetched, setLastFetched] = useState(null);

    // Toast notification functions
    const notifySuccess = (text) => toast.success(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyError = (text) => toast.error(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    // Function to fetch notifications
    const fetchNotifications = async (forceRefresh = false) => {
        // Skip fetching if we have recent data (within last 30 seconds) unless forced refresh
        const thirtySecondsAgo = Date.now() - 30000;
        if (!forceRefresh && lastFetched && lastFetched > thirtySecondsAgo) {
            return;
        }

        try {
            setLoading(true);
            const response = await axiosInstance.get('/dashboard/notifications');
            
            if (response.data && response.data.data) {
                setNotifications(response.data.data);
                setLastFetched(Date.now());
            }
            setError(null);
        } catch (err) {
            console.error('Error fetching notifications:', err);
            setError('Failed to load notifications');
            notifyError('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    // Function to mark notification as read
    const markAsRead = async (notificationId) => {
        try {
            const response = await axiosInstance.post(`/dashboard/notifications/${notificationId}/read`);
            if (response.data && response.data.status) {
                // Update local state
                setNotifications(prevNotifications => 
                    prevNotifications.map(notification => 
                        notification.id === notificationId 
                            ? { ...notification, read_at: new Date().toISOString() } 
                            : notification
                    )
                );
                return true;
            }
            return false;
        } catch (err) {
            console.error('Error marking notification as read:', err);
            notifyError('Failed to mark notification as read');
            return false;
        }
    };

    // Function to mark all notifications as read
    const markAllAsRead = async () => {
        try {
            const response = await axiosInstance.post('/dashboard/notifications/read-all');
            if (response.data && response.data.status) {
                // Update local state
                setNotifications(prevNotifications => 
                    prevNotifications.map(notification => ({
                        ...notification,
                        read_at: notification.read_at || new Date().toISOString()
                    }))
                );
                notifySuccess('All notifications marked as read');
                return true;
            }
            return false;
        } catch (err) {
            console.error('Error marking all notifications as read:', err);
            notifyError('Failed to mark all notifications as read');
            return false;
        }
    };

    // Fetch notifications on mount
    useEffect(() => {
        fetchNotifications();
    }, []);

    // The value that will be given to the context
    const value = {
        notifications,
        loading,
        error,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        unreadCount: notifications.filter(n => !n.read_at).length
    };

    return (
        <NotificationsContext.Provider value={value}>
            {children}
        </NotificationsContext.Provider>
    );
};

// Custom hook to use the notifications context
export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (context === null) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
};

export default NotificationsContext;