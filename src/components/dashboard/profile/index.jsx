import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import './style.css'
import { UsersAvater2 } from '../../../assets/images';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useProfile } from '../../../context/ProfileContext';

export default function ProfilePage() {
    const { profile, loading: profileLoading, updateProfile } = useProfile();
    const navigate = useNavigate();
    
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                business_name: profile.business_name || '',
                business_phone: profile.business_phone || '',
                business_email: profile.business_email || '',
                dob: profile.dob || '',
                work_experience: profile.work_experience || '',
                business_website: profile.business_website || '',
                street_address: profile.street_address || '',
                bio: profile.bio || '',
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await axiosInstance.put('/user/profile', formData);
            if (response.data.status) {
                toast.success('Profile updated successfully');
                setEditMode(false);
                await updateProfile(true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to update profile';
            toast.error(msg);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setErrors({});
        if (profile) {
            setFormData({
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                business_name: profile.business_name || '',
                business_phone: profile.business_phone || '',
                business_email: profile.business_email || '',
                dob: profile.dob || '',
                work_experience: profile.work_experience || '',
                business_website: profile.business_website || '',
                street_address: profile.street_address || '',
                bio: profile.bio || '',
            });
        }
    };

    if (profileLoading) {
        return (
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="alert alert-danger">Error: Profile data could not be fetched.</div>
                    </div>
                </div>
            </div>
        );
    }

    const { first_name, last_name, business_name, business_email, email_verified_at, status, profile_photo } = profile;

    return (
        <>
                <Toaster />
                    <div className="main-content">
                        <div className="page-content">
                            <div className="container-fluid">
                        {/* Sticky Profile Header */}
                                <div className="profile-foreground position-relative mx-n4 mt-n4">
                                    <div className="profile-wid-bg">
                                <img src={profile_photo || UsersAvater2} alt="user-img" className="img-thumbnail rounded-circle" />
                                    </div>
                                </div>
                                <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
                                    <div className="row g-4">
                                        <div className="col-auto">
                                            <div className="avatar-lg">
                                        <img src={profile_photo || UsersAvater2} alt="user-img" className="img-thumbnail rounded-circle" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="p-2">
                                        <h3 className="text-white mb-1">{first_name} {last_name}</h3>
                                                <p className="text-white text-opacity-75">{business_name}</p>
                                        <div className="hstack text-white-50 gap-3">
                                            <div>
                                                <i className="ri-mail-line me-1"></i>
                                                {business_email}
                                            </div>
                                            {email_verified_at && (
                                                <div>
                                                    <span className="badge bg-success">Verified</span>
                                                </div>
                                            )}
                                            <div>
                                                <span className={`badge ${status === 'ACTIVE' ? 'bg-success' : 'bg-warning'}`}>
                                                    {status || 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto ms-auto">
                                    <div className="d-flex gap-2">
                                        {!editMode ? (
                                            <button className="btn btn-success" onClick={() => setEditMode(true)}>
                                                <i className="ri-edit-box-line align-bottom me-1"></i> Edit Profile
                                            </button>
                                        ) : (
                                            <>
                                                <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                                                    <i className="ri-save-line me-1"></i>
                                                    {saving ? 'Saving...' : 'Save Changes'}
                                                </button>
                                                <button className="btn btn-light" onClick={handleCancel} disabled={saving}>
                                                    <i className="ri-close-line me-1"></i> Cancel
                                                </button>
                                            </>
                                        )}
                                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>

                        {/* Two Column Layout */}
                        <div className="row">
                            {/* Left: Profile Details */}
                            <div className="col-lg-8">
                                                    <div className="card">
                                                        <div className="card-body">
                                        <h5 className="card-title mb-3">Business Information</h5>
                                        <p className="text-muted mb-4">Tell us a little about your business.</p>

                                                                <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">First Name</label>
                                                                                        <input 
                                                                                            type="text" 
                                                    name="first_name"
                                                    className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                                    value={formData.first_name}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                />
                                                {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                                                                                    </div>
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                                                    value={formData.last_name}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                />
                                                {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                                                                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Business Name</label>
                                                <input
                                                    type="text"
                                                    name="business_name"
                                                    className={`form-control ${errors.business_name ? 'is-invalid' : ''}`}
                                                    value={formData.business_name}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                />
                                                {errors.business_name && <div className="invalid-feedback">{errors.business_name}</div>}
                                                                                    </div>
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Business Phone</label>
                                                <input
                                                    type="text"
                                                    name="business_phone"
                                                    className={`form-control ${errors.business_phone ? 'is-invalid' : ''}`}
                                                    value={formData.business_phone}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                />
                                                {errors.business_phone && <div className="invalid-feedback">{errors.business_phone}</div>}
                                                                                </div>
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Business Email</label>
                                                                                            <input 
                                                                                                type="email" 
                                                    name="business_email"
                                                                                                className="form-control" 
                                                    value={formData.business_email}
                                                                                                disabled 
                                                                                            />
                                                <small className="text-muted">Email cannot be changed</small>
                                                                                        </div>
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Date of Birth</label>
                                                <input
                                                    type="date"
                                                    name="dob"
                                                    className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                                                    value={formData.dob}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                />
                                                {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                                                                                    </div>
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Work Experience</label>
                                                                                                    <input 
                                                    type="text"
                                                    name="work_experience"
                                                    className={`form-control ${errors.work_experience ? 'is-invalid' : ''}`}
                                                    value={formData.work_experience}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                />
                                                {errors.work_experience && <div className="invalid-feedback">{errors.work_experience}</div>}
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Website</label>
                                                <input
                                                    type="text"
                                                    name="business_website"
                                                    className={`form-control ${errors.business_website ? 'is-invalid' : ''}`}
                                                    value={formData.business_website}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                />
                                                {errors.business_website && <div className="invalid-feedback">{errors.business_website}</div>}
                                                                                        </div>
                                            <div className="col-lg-12 mb-3">
                                                <label className="form-label">Street Address</label>
                                                                                    <input 
                                                                                        type="text" 
                                                    name="street_address"
                                                    className={`form-control ${errors.street_address ? 'is-invalid' : ''}`}
                                                    value={formData.street_address}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                />
                                                {errors.street_address && <div className="invalid-feedback">{errors.street_address}</div>}
                                                                                    </div>
                                            <div className="col-lg-12 mb-3">
                                                <label className="form-label">Bio</label>
                                                <textarea
                                                    name="bio"
                                                    className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                                                    rows="3"
                                                    value={formData.bio}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                ></textarea>
                                                {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                        </div>
                                                        
                            {/* Right: Quick Actions */}
                            <div className="col-lg-4">
                                                    <div className="card">
                                                        <div className="card-body">
                                        <h5 className="card-title mb-3">Quick Actions</h5>
                                        <div className="d-grid gap-2">
                                            <Link to="/dase/profile/edit" className="btn btn-outline-primary text-start">
                                                <i className="ri-lock-password-line me-2"></i> Change Password
                                            </Link>
                                            <Link to="/dase/notification" className="btn btn-outline-info text-start">
                                                <i className="ri-notification-3-line me-2"></i> Notification Settings
                                            </Link>
                                            <Link to="/dase/profile/edit" className="btn btn-outline-warning text-start">
                                                <i className="ri-shield-check-line me-2"></i> Enable 2FA
                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>

                                <div className="card mt-3">
                                                        <div className="card-body">
                                        <h5 className="card-title mb-3">Account Stats</h5>
                                        <ul className="list-unstyled mb-0">
                                            <li className="py-2">
                                                <i className="ri-calendar-line text-muted me-2"></i>
                                                <strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}
                                            </li>
                                            <li className="py-2">
                                                <i className="ri-time-line text-muted me-2"></i>
                                                <strong>Last Login:</strong> {profile.last_login ? new Date(profile.last_login).toLocaleString() : 'N/A'}
                                            </li>
                                            <li className="py-2">
                                                <i className="ri-checkbox-circle-line text-muted me-2"></i>
                                                <strong>Status:</strong> <span className={`badge ${status === 'ACTIVE' ? 'bg-success' : 'bg-warning'}`}>{status || 'Pending'}</span>
                                                                                                </li>
                                                                                        </ul>
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
