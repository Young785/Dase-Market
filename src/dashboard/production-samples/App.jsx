import { useState } from 'react';
import DashboardHeader from '../../components/dashboard/header';
import SideBar from '../../components/dashboard/sidebar';
import UploadSamples from '../../components/dashboard/production-samples/UploadSamples';
import ManageSamples from '../../components/dashboard/production-samples/ManageSamples';

export default function ProductionSamples() {
    const [title, setTitle] = useState('Production Samples');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleUploadSuccess = () => {
        // Trigger refresh of the manage samples component
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <>
            <div id="layout-wrapper">
                <DashboardHeader onToggleSidebar={toggleSidebar} />
                <SideBar setTitle={setTitle} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            {/* Page Title */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 className="mb-sm-0">Production Samples</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href="/dase/dashboard">Dashboard</a></li>
                                                <li className="breadcrumb-item active">Production Samples</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Upload Section */}
                            <div className="row mb-4">
                                <div className="col-12">
                                    <UploadSamples onUploadSuccess={handleUploadSuccess} />
                                </div>
                            </div>

                            {/* Manage Samples Section */}
                            <div className="row">
                                <div className="col-12">
                                    <ManageSamples refreshTrigger={refreshTrigger} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

