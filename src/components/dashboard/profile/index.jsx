import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import './style.css'
import { UsersAvater2 } from '../../../assets/images';
import toast, { Toaster } from 'react-hot-toast';
import { useProfile } from '../../../context/ProfileContext';

export default function ProfilePage() {
    const { profile, loading: profileLoading } = useProfile();
    const [saving, setSaving] = useState(false);

    const notifySuccess = (text) => toast.success(text, { position: 'top-right' });
    const notifyError = (text) => toast.error(text, { position: 'top-right' });

    useEffect(() => {
        // placeholder for future effects
    }, [profile]);

    if (profileLoading) return <div>Loading...</div>;
    if (!profile) return <div>Error: Profile data could not be fetched.</div>;

    const {
        first_name,
        last_name,
        business_name,
        work_experience,
        business_email,
        business_phone_number,
        email_verified_at,
        dob,
        profile_photo,
        status,
        street_address,
        bio,
        business_website,
        created_at,
        last_login,
    } = profile;

    return (
        <>
            <div>
                <Toaster />
                <div className='layout-wrapper'>
                    <div className="main-content">
                        <div className="page-content">
                            <div className="container-fluid">
                                {/* Header */}
                                <div className="profile-foreground position-relative mx-n4 mt-n4">
                                    <div className="profile-wid-bg" />
                                </div>
                                <div className="pt-4 mb-4 pb-lg-4 profile-wrapper">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center gap-3">
                                            <img src={profile_photo ? UsersAvater2 : UsersAvater2} alt="avatar" className="img-thumbnail rounded-circle" style={{ width: 72, height: 72 }} />
                                            <div>
                                                <h3 className="mb-1">{first_name} {last_name}</h3>
                                                <div className="d-flex flex-wrap gap-2">
                                                    <span className="badge bg-primary-subtle text-primary">{business_name || '—'}</span>
                                                    <span className="badge bg-success-subtle text-success">{status || 'ACTIVE'}</span>
                                                    {email_verified_at && (<span className="badge bg-info-subtle text-info">Verified</span>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <Link to="/dase/profile/edit" className="btn btn-success">Edit Profile</Link>
                                            <Link to="/dase/profile/security" className="btn btn-outline-primary">Security</Link>
                                            <Link to="/dase/profile/music" className="btn btn-outline-secondary">Music</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="row">
                                    {/* Left: Details */}
                                    <div className="col-lg-8">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className='card-title mb-1'>Business Information</h5>
                                                <p className="text-muted mb-4" style={{fontSize:'12px'}}>Tell us a little about your business.</p>
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">First Name</label>
                                                        <input className="form-control" value={first_name || ''} disabled />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Last Name</label>
                                                        <input className="form-control" value={last_name || ''} disabled />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Business Name</label>
                                                        <input className="form-control" value={business_name || ''} disabled />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Business Phone Number</label>
                                                        <input className="form-control" value={business_phone_number || ''} disabled />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Business Email Address</label>
                                                        <input className="form-control" value={business_email || ''} disabled />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Joined</label>
                                                        <input className="form-control" value={created_at || ''} disabled />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">DOB</label>
                                                        <input className="form-control" value={dob || ''} disabled />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Work Experience</label>
                                                        <input className="form-control" value={work_experience || ''} disabled />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Website</label>
                                                        <input className="form-control" value={business_website || ''} disabled />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Street Address</label>
                                                        <input className="form-control" value={street_address || ''} disabled />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Bio</label>
                                                        <textarea className="form-control" rows={3} value={bio || ''} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Quick Actions */}
                                    <div className="col-lg-4">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h6 className="mb-2">Quick Actions</h6>
                                                <div className="d-grid gap-2">
                                                    <Link to="/dase/profile/security" className="btn btn-outline-primary">Enable 2FA</Link>
                                                    <Link to="/dase/profile/security" className="btn btn-outline-primary">Change Password</Link>
                                                    <Link to="/dase/notification" className="btn btn-outline-secondary">Notification Settings</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="mb-2">Account Status</h6>
                                                <ul className="list-unstyled mb-0">
                                                    <li><strong>Status:</strong> {status || 'ACTIVE'}</li>
                                                    <li><strong>Email Verified:</strong> {email_verified_at ? 'Yes' : 'No'}</li>
                                                    <li><strong>Last Login:</strong> {last_login || '—'}</li>
                                                </ul>
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
    )
}