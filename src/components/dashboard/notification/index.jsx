import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { Bell } from 'lucide-react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import axiosInstance from '../../../axiosInstance';
import '../style.css';
import { UsersAvater2 } from '../../../assets/images';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useProfile } from '../../../context/ProfileContext';

export default function NotificationPage() {
    const { profile, loading: profileLoading } = useProfile();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview-tab');

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

    // Single data fetching effect
    useEffect(() => {
        
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/dashboard/notifications');
                if (response.data && response.data.data) {
                    setNotifications(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
                notifyError('Failed to load notifications');
            } finally {
                setLoading(false);
            }
        };

        // Only fetch if profile is loaded
        if (!profileLoading && profile) {
            fetchNotifications();
        }
    }, [profileLoading, profile]); 

    
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    if (profileLoading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>Error: Profile data could not be fetched.</div>;
    }
  
    const {
        first_name,
        last_name,
        business_name,
        street_address,
        profile_photo,
    } = profile;

    return (
        <>
            <div>
                <Toaster />
                <div className='layout-wrapper'>
                    <div className="main-content">
                        <div className="page-content">
                            <div className="container-fluid">
                                <div className="profile-foreground position-relative mx-n4 mt-n4">
                                    <div className="profile-wid-bg">
                                        <img src={profile_photo ? UsersAvater2 : UsersAvater2} alt="user-img" className="img-thumbnail rounded-circle" />
                                    </div>
                                </div>
                                <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
                                    <div className="row g-4">
                                        <div className="col-auto">
                                            <div className="avatar-lg">
                                                <img src={profile_photo ? UsersAvater2 : UsersAvater2} alt="user-img" className="img-thumbnail rounded-circle" />
                                            </div>
                                        </div>
                                        
                                        <div className="col">
                                            <div className="p-2">
                                                <h3 className="text-white mb-1">{`${first_name} ${last_name}`}</h3>
                                                <p className="text-white text-opacity-75">{business_name}</p>
                                                <div className="hstack text-white-50 gap-1">
                                                    <div className="me-2"><i className="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>{street_address || "Location not provided"}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div>
                                            <div className="d-flex profile-wrapper">
                                                <ul className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
                                                    <li className="nav-item">
                                                        <a 
                                                            className={`nav-link fs-14 ${activeTab === 'overview-tab' ? 'active' : ''}`}
                                                            href="#overview-tab" 
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleTabClick('overview-tab');
                                                            }}
                                                        >
                                                            <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Notification</span>
                                                        </a>
                                                    </li>
                                                   
                                                    <li className="nav-item">
                                                        <a 
                                                            className={`nav-link fs-14 ${activeTab === 'settings' ? 'active' : ''}`}
                                                            href="#settings" 
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleTabClick('settings');
                                                            }}
                                                        >
                                                            <i className="ri-price-tag-line d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Setting</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            <div className="tab-content pt-4 text-muted">
                                                <div className={`tab-pane ${activeTab === 'overview-tab' ? 'active' : 'fade'}`} id="overview-tab" role="tabpanel">
                                                    <div className="row">
                                                        <div className="col-12">
                                                           
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="row mb-4 mt-2">
                                                                        <h5 className='card-title'>Notification</h5>
                                                                        <label className='' style={{fontSize:'12px', fontWeight:'500', color:'gray'}}>Tell us a little about your business.</label>
                                                                    </div>
                                                                    <div>
                                                                        <SimpleBar style={{ maxHeight: 'calc(80vh - 110px)' }}> 
                                                                            <div className="list-group list-group-flush" style={{ padding: '8px 24px 24px 24px'}}>
                                                                                {loading ? (
                                                                                    <div className="text-center p-3">
                                                                                        <div className="spinner-border text-primary" role="status">
                                                                                            <span className="visually-hidden">Loading...</span>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : notifications && notifications.length > 0 ? (
                                                                                    notifications.map(notification => (
                                                                                        <div className="list-group-item list-group-item-action" key={notification.id} style={{borderBottom: '1px solid #eee', padding: '12px 0'}}>
                                                                                            <div className="d-flex">
                                                                                                <div className="flex-shrink-0 me-3">
                                                                                                    <Bell className="fs-16 text-primary" />
                                                                                                </div>
                                                                                                <div className="flex-grow-1">
                                                                                                    <h6 className="mb-1">{notification.title}</h6>
                                                                                                    <p className="text-muted mb-1" style={{fontSize: '0.85rem'}}>{notification.message}</p>
                                                                                                    <small className="text-muted">
                                                                                                        {new Date(notification.created_at).toLocaleString()}
                                                                                                    </small>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                ) : (
                                                                                    <div className="list-group-item text-center">
                                                                                        <p className="text-muted mb-0">No notifications.</p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </SimpleBar>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                      
                                                <div className={`tab-pane ${activeTab === 'settings' ? 'active' : 'fade'}`} id="settings" role="tabpanel">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <h5 className="mb-3 col-12">Notification Setting</h5>
                                                                <p className="text-muted mb-4">Select the Notification you're interested in and we'll stay in touch</p>
                                                            </div>
                                                              
                                                            <div className="subscription-settings">
                                                                <div className="subscription-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                                                    <div>
                                                                        <h6 className="mb-1">Login Notifications</h6>
                                                                        <p className="text-muted mb-0 small">Get notified when someone logs into your account</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" id="loginNotifications" defaultChecked />
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="subscription-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                                                    <div>
                                                                        <h6 className="mb-1">Log Out Notifications</h6>
                                                                        <p className="text-muted mb-0 small">Get notified when you log out of your account</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" id="logoutNotifications" defaultChecked />
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="subscription-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                                                    <div>
                                                                        <h6 className="mb-1">Account Deletion Notifications</h6>
                                                                        <p className="text-muted mb-0 small">Get notified when your account is deleted</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" id="deleteAccountNotifications" defaultChecked />
                                                                    </div>
                                                                </div>

                                                                <div className="subscription-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                                                    <div>
                                                                        <h6 className="mb-1">Password Change Notifications</h6>
                                                                        <p className="text-muted mb-0 small">Get notified when your password is changed.</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" id="passwordChangeNotifications" defaultChecked />
                                                                    </div>
                                                                </div>

                                                                <div className="subscription-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                                                    <div>
                                                                        <h6 className="mb-1">Profile Update Notifications</h6>
                                                                        <p className="text-muted mb-0 small">Get notified when your profile information is updated.</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" id="profileUpdateNotifications" defaultChecked />
                                                                    </div>
                                                                </div>

                                                                <div className="subscription-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                                                    <div>
                                                                        <h6 className="mb-1">New Message Notifications</h6>
                                                                        <p className="text-muted mb-0 small">Get notified when you receive a new message.</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" id="newMessageNotifications" defaultChecked />
                                                                    </div>
                                                                </div>

                                                                <div className="subscription-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                                                    <div>
                                                                        <h6 className="mb-1">Invoice Notifications</h6>
                                                                        <p className="text-muted mb-0 small">Get notified when a new invoice is generated.</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" id="invoiceNotifications" defaultChecked />
                                                                    </div>
                                                                </div>

                                                                <div className="subscription-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                                                    <div>
                                                                        <h6 className="mb-1">Project Notifications</h6>
                                                                        <p className="text-muted mb-0 small">Get notified about updates on your projects.</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" id="projectNotifications" defaultChecked />
                                                                    </div>
                                                                </div>

                                                                <div className="subscription-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                                                    <div>
                                                                        <h6 className="mb-1">Chat Notifications</h6>
                                                                        <p className="text-muted mb-0 small">Get notified when you receive a new chat message.</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" id="chatNotifications" defaultChecked />
                                                                    </div>
                                                                </div>

                                                                <div className="subscription-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                                                    <div>
                                                                        <h6 className="mb-1">Engineer Notifications</h6>
                                                                        <p className="text-muted mb-0 small">Get notified about updates from your engineering team.</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" id="engineerNotifications" defaultChecked />
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="mt-4">
                                                                    <p className="text-muted">Feel like you've got it all sorted already? <a href="#" className="text-primary">Unsubscribe from all</a></p>
                                                                    <button className="btn btn-primary mt-2">Save Preferences</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}