import { useState } from 'react';
import DashboardHeader from '../../components/dashboard/header';
import SideBar from '../../components/dashboard/sidebar';
import UploadFiles from '../../components/dashboard/file-sharing/UploadFiles';
import ManageFiles from '../../components/dashboard/file-sharing/ManageFiles';
import { useProfile } from '../../context/ProfileContext';

export default function FileSharing() {
    const [title, setTitle] = useState('File Sharing');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { profile } = useProfile();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleUploadSuccess = () => {
        // Trigger refresh of the manage files component
        setRefreshTrigger(prev => prev + 1);
    };

    const isEngineer = profile?.role === 'engineer';
    const fileType = isEngineer ? 'production' : 'recording';

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
                                        <h4 className="mb-sm-0">
                                            {isEngineer ? 'Upload Finished Productions' : 'Upload Raw Recordings'}
                                        </h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item">
                                                    <a href="/dase/dashboard">Dashboard</a>
                                                </li>
                                                <li className="breadcrumb-item active">File Sharing</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Banner */}
                            <div className="row mb-4">
                                <div className="col-12">
                                    <div className={`alert ${isEngineer ? 'alert-primary' : 'alert-info'}`}>
                                        <h5 className="alert-heading">
                                            <i className="ri-information-line me-2"></i>
                                            {isEngineer ? 'Share Finished Productions' : 'Share Raw Recordings'}
                                        </h5>
                                        <p className="mb-0">
                                            {isEngineer 
                                                ? 'Upload your completed audio productions and share them with clients. After upload, you\'ll get a download link that you can paste in your chat conversations.'
                                                : 'Upload your raw audio recordings to send to engineers for production. After upload, you\'ll get a download link that you can share in your chat with the engineer.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Upload Section */}
                            <div className="row mb-4">
                                <div className="col-lg-6">
                                    <UploadFiles 
                                        fileType={fileType} 
                                        onUploadSuccess={handleUploadSuccess} 
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <i className="ri-lightbulb-line me-2 text-warning"></i>
                                                Quick Tips
                                            </h5>
                                            <ul className="list-unstyled mb-0">
                                                <li className="mb-2">
                                                    <i className="ri-check-line text-success me-2"></i>
                                                    Files are stored securely and are only accessible via the download link
                                                </li>
                                                <li className="mb-2">
                                                    <i className="ri-check-line text-success me-2"></i>
                                                    {isEngineer 
                                                        ? 'Add client Account ID to notify them automatically'
                                                        : 'Add engineer Account ID to share directly with them'}
                                                </li>
                                                <li className="mb-2">
                                                    <i className="ri-check-line text-success me-2"></i>
                                                    Copy the download link and paste it in your chat conversations
                                                </li>
                                                <li className="mb-2">
                                                    <i className="ri-check-line text-success me-2"></i>
                                                    Track how many times your file has been downloaded
                                                </li>
                                                <li className="mb-0">
                                                    <i className="ri-check-line text-success me-2"></i>
                                                    Delete files anytime to manage your storage
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Manage Files Section */}
                            <div className="row">
                                <div className="col-12">
                                    <ManageFiles 
                                        fileType={fileType} 
                                        refreshTrigger={refreshTrigger} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

