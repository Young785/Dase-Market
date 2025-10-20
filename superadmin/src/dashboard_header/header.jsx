import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bell, LifeBuoy, Settings, Search, Sun, Moon } from 'lucide-react'; 
import axiosInstance from '../axiosInstance';
import mockDataService from '../utils/mockData';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import NotificationModal from '../components/dashboard/ui/NotificationModal';

function Header() {
    const [showAllNotificationsModal, setShowAllNotificationsModal] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch notifications with graceful fallback
        const load = async () => {
            try {
                const res = await axiosInstance.get('/dashboard/notifications?per_page=10');
                if (res.data?.status) {
                    const payload = res.data.data;
                    setNotifications(payload.items || payload || []);
                    return;
                }
            } catch (err) {
                // Fallback to mock data
                try {
                    const mock = await mockDataService.getNotifications();
                    if (mock?.status) setNotifications(mock.data.items || []);
                } catch {}
            }
        };
        load();
    }, []);

    return (
        <header className="header">
            <div className="container-fluid">
                <div className="header-content">
                    <div className="ms-1 header-item d-none d-sm-flex">
                        {/* Full screen button or other items can go here */}
                    </div>

                    {/* Other header items */}

                    <NotificationModal 
                        isOpen={showAllNotificationsModal}
                        onClose={() => setShowAllNotificationsModal(false)}
                        notifications={notifications} 
                    />

                </div>
            </div>
        </header>
    );
}

export default Header; 