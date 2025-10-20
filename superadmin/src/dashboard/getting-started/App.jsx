import { useState } from 'react';
import DashboardHeader from '../../components/dashboard/header';
import SideBar from '../../components/dashboard/sidebar';
import GettingStarted from '../../components/onboarding/GettingStarted';

export default function GettingStartedPage() {
    const [title, setTitle] = useState('Getting Started');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div id="layout-wrapper">
                <DashboardHeader onToggleSidebar={toggleSidebar} />
                <SideBar 
                    setTitle={setTitle} 
                    isSidebarOpen={isSidebarOpen} 
                    toggleSidebar={toggleSidebar} 
                />
                
                <div className="main-content">
                    <div className="page-content">
                        <GettingStarted />
                    </div>
                </div>
            </div>
        </>
    );
}

