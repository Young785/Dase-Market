import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { UsersAvater2 } from '../../../assets/images';
import axiosInstance from '../../../axiosInstance'; // Adjust the import path as necessary
import { toast, Toaster } from 'react-hot-toast';
import { useProfile } from '../../../context/ProfileContext'; 
import './style.css'

export default function ProfileEditPage() {
    const navigate = useNavigate();
    
    const { profile, updateProfile } = useProfile(); 
    const notifyError = (text) => toast.error(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const notifySuccess = (text) => toast.success(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        business_name: '',
        business_phone_code: '',
        business_phone: '',
        business_website: '',
        // profile_photo: '',
        business_phone_number: '',
        business_email: '',
        email_verified_at: '',
        bio: '',
        work_experience: '',
        dob: '',
        street_address: ''
        
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                business_name: profile.business_name || '',
                business_phone_code: profile.business_phone_code || '',
                business_phone: profile.business_phone || '',
                business_website: profile.business_website || '',
                business_phone_number: profile.business_phone_number || '',
                business_email: profile.business_email || '',
                email_verified_at: profile.email_verified_at || '',
                bio: profile.bio || '',
                dob: profile.dob || '',
                work_experience: profile.work_experience || '',
                street_address: profile.street_address || ''
            });
        }
    }, [profile]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare the data to send as JSON, excluding profile_photo
        const { profile_photo, ...dataToSend } = formData; 
        
        try {
            const response = await axiosInstance.put('/user/profile', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
           
            if (response.data.status === false) {
                notifyError(response.data.message);
                
                return;
            } 
            const data = response.data;
            notifySuccess(data.message);
            
            await updateProfile();
            setTimeout(() => {
                navigate('/dase/profile');
            }, 2000);
        } catch (error) {
            toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <>
            <div>
                
                <div className='layout-wrapper'>
                    <div className="main-content">
                        <div className="page-content">
                            <div className="container-fluid">

                                <div className="position-relative mx-n4 mt-n4">
                                    <div className="profile-wid-bg profile-setting-img">
                                        <img src={formData.profile_photo ? UsersAvater2 : UsersAvater2} className="profile-wid-img" alt=""/>
                                        <div className="overlay-content">
                                            <div className="text-end p-3">
                                                <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                                                    <input id="profile-foreground-img-file-input" type="file" className="profile-foreground-img-file-input"/>
                                                    <label for="profile-foreground-img-file-input" className="profile-photo-edit btn btn-light">
                                                        <i className="ri-image-edit-line align-bottom me-1"></i> Change Cover
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Toaster/>

                              
                                    {/* <div className="col-xxl-3">
                                        <div className="card mt-n5">
                                            <div className="card-body p-4">
                                                <div className="text-center">
                                                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                                        
                                                        <img  src={formData.profile_photo ? UsersAvater2 : UsersAvater2} alt="user-img" className="img-thumbnail rounded-circle" />
                                                        <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                            <input id="profile-img-file-input" type="file" className="profile-img-file-input" />
                                                            <label for="profile-img-file-input" className="profile-photo-edit avatar-xs">
                                                                <span className="avatar-title rounded-circle bg-light text-body">
                                                                    <i className="ri-camera-fill"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <h5 className="fs-16 mb-1">{formData.first_name} {formData.last_name}</h5>
                                                    <p className="text-muted mb-0">Lead Designer / Developer</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>  */}

                                    



                              




                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="card mt-xxl-n5">
                                            <div className="card-header">
                                                <ul className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" data-bs-toggle="tab" href="#personalDetails" role="tab">
                                                            <i className="fas fa-home"></i> Personal Details
                                                        </a>
                                                    </li>
                                                    
                                                </ul>
                                            </div>
                                            <div className="card-body p-4">
                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="personalDetails" role="tabpanel">
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label for="first_name" className="form-label">First Name</label>
                                                                        <input type="text" className="form-control" id="first_name" name="first_name" value={formData.first_name} onChange={handleInputChange}/>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label for="last_name" className="form-label">Last Name</label>
                                                                        <input type="text" className="form-control" id="last_name" name="last_name" value={formData.last_name} onChange={handleInputChange}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="mb-3">
                                                                        <label for="business_name" className="form-label">Business Name</label>
                                                                        <input type="text" className="form-control" id="business_name" name="business_name" value={formData.business_name} onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-lg-4">
                                                                    <div className="mb-3">
                                                                        <label for="business_phone_number" className="form-label">Phone Number</label>
                                                                        <input type="text" className="form-control" id="business_phone_number" name="business_phone_number" value={formData.business_phone_number} onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-lg-4">
                                                                    <div className="mb-3">
                                                                        <label for="business_email" className="form-label">Email Address</label>
                                                                        <input type="email" className="form-control" id="business_email" name="business_email" value={formData.business_email} onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                                
                                                            
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label for="dob" className="form-label">DOB</label>
                                                                        <input type="text" className="form-control" data-provider="flatpickr" id="dob" data-date-format="d M, Y" value={formData.dob} onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                                
                                                                
                                                                
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label for="work_experience" className="form-label">Work Experience</label>
                                                                        <input type="text" className="form-control" id="work_experience" name="work_experience" value={formData.work_experience} onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label for="business_website" className="form-label">Website</label>
                                                                        <input type="text" className="form-control" id="business_website" name="business_website" value={formData.business_website} onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label for="street_address" className="form-label">Street Address</label>
                                                                        <input type="text" className="form-control" id="street_address" name="street_address" value={formData.street_address} onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                                
                                                            
                                                            
                                                                
                                                                <div className="col-lg-12">
                                                                    <div className="mb-3 pb-2">
                                                                        <label for="bio" className="form-label">Bio</label>
                                                                        <textarea className="form-control" id="bio" name="bio" value={formData.bio} onChange={handleInputChange} ></textarea>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-lg-12">
                                                                    <div className="hstack gap-2 justify-content-end">
                                                                        <button type="submit" className="btn btn-primary">Updates</button>
                                                                        <button type="button" className="btn btn-soft-success">Cancel</button>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                        
                                                        </form>
                                                    </div>
                                                    
                                                    <div className="tab-pane" id="changePassword" role="tabpanel">
                                                        <form action="javascript:void(0);">
                                                            <div className="row g-2">
                                                                <div className="col-lg-4">
                                                                    <div>
                                                                        <label for="oldpasswordInput" className="form-label">Old Password*</label>
                                                                        <input type="password" className="form-control" id="oldpasswordInput" placeholder="Enter current password"/>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-lg-4">
                                                                    <div>
                                                                        <label for="newpasswordInput" className="form-label">New Password*</label>
                                                                        <input type="password" className="form-control" id="newpasswordInput" placeholder="Enter new password" />
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-lg-4">
                                                                    <div>
                                                                        <label for="confirmpasswordInput" className="form-label">Confirm Password*</label>
                                                                        <input type="password" className="form-control" id="confirmpasswordInput" placeholder="Confirm password"/>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-lg-12">
                                                                    <div className="mb-3">
                                                                        <a href="javascript:void(0);" className="link-primary text-decoration-underline">Forgot Password ?</a>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-lg-12">
                                                                    <div className="text-end">
                                                                        <button type="submit" className="btn btn-success">Change Password</button>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                        
                                                        </form>
                                                        <div className="mt-4 mb-3 border-bottom pb-2">
                                                            <div className="float-end">
                                                                <a href="javascript:void(0);" className="link-primary">All Logout</a>
                                                            </div>
                                                            <h5 className="card-title">Login History</h5>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-3">
                                                            <div className="flex-shrink-0 avatar-sm">
                                                                <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                                    <i className="ri-smartphone-line"></i>
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h6>iPhone 12 Pro</h6>
                                                                <p className="text-muted mb-0">Los Angeles, United States - March 16 at 2:47PM</p>
                                                            </div>
                                                            <div>
                                                                <a href="javascript:void(0);">Logout</a>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-3">
                                                            <div className="flex-shrink-0 avatar-sm">
                                                                <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                                    <i className="ri-tablet-line"></i>
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h6>Apple iPad Pro</h6>
                                                                <p className="text-muted mb-0">Washington, United States - November 06 at 10:43AM</p>
                                                            </div>
                                                            <div>
                                                                <a href="javascript:void(0);">Logout</a>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-3">
                                                            <div className="flex-shrink-0 avatar-sm">
                                                                <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                                    <i className="ri-smartphone-line"></i>
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h6>Galaxy S21 Ultra 5G</h6>
                                                                <p className="text-muted mb-0">Conneticut, United States - June 12 at 3:24PM</p>
                                                            </div>
                                                            <div>
                                                                <a href="javascript:void(0);">Logout</a>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar-sm">
                                                                <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                                    <i className="ri-macbook-line"></i>
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h6>Dell Inspiron 14</h6>
                                                                <p className="text-muted mb-0">Phoenix, United States - July 26 at 8:10AM</p>
                                                            </div>
                                                            <div>
                                                                <a href="javascript:void(0);">Logout</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="tab-pane" id="experience" role="tabpanel">
                                                        <form>
                                                            <div id="newlink">
                                                                <div id="1">
                                                                    <div className="row">
                                                                        <div className="col-lg-12">
                                                                            <div className="mb-3">
                                                                                <label for="jobTitle" className="form-label">Job Title</label>
                                                                                <input type="text" className="form-control" id="jobTitle" placeholder="Job title" value="Lead Designer / Developer"/>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="col-lg-6">
                                                                            <div className="mb-3">
                                                                                <label for="companyName" className="form-label">Company Name</label>
                                                                                <input type="text" className="form-control" id="companyName" placeholder="Company name" value="Themesbrand"/>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="col-lg-6">
                                                                            <div className="mb-3">
                                                                                <label for="experienceYear" className="form-label">Experience Years</label>
                                                                                <div className="row">
                                                                                    <div className="col-lg-5">
                                                                                        <select className="form-control" data-choices data-choices-search-false name="experienceYear" id="experienceYear">
                                                                                            <option value="">Select years</option>
                                                                                            <option value="Choice 1">2001</option>
                                                                                            <option value="Choice 2">2002</option>
                                                                                            <option value="Choice 3">2003</option>
                                                                                            <option value="Choice 4">2004</option>
                                                                                            <option value="Choice 5">2005</option>
                                                                                            <option value="Choice 6">2006</option>
                                                                                            <option value="Choice 7">2007</option>
                                                                                            <option value="Choice 8">2008</option>
                                                                                            <option value="Choice 9">2009</option>
                                                                                            <option value="Choice 10">2010</option>
                                                                                            <option value="Choice 11">2011</option>
                                                                                            <option value="Choice 12">2012</option>
                                                                                            <option value="Choice 13">2013</option>
                                                                                            <option value="Choice 14">2014</option>
                                                                                            <option value="Choice 15">2015</option>
                                                                                            <option value="Choice 16">2016</option>
                                                                                            <option value="Choice 17" selected>2017</option>
                                                                                            <option value="Choice 18">2018</option>
                                                                                            <option value="Choice 19">2019</option>
                                                                                            <option value="Choice 20">2020</option>
                                                                                            <option value="Choice 21">2021</option>
                                                                                            <option value="Choice 22">2022</option>
                                                                                        </select>
                                                                                    </div>
                                                                                    
                                                                                    <div className="col-auto align-self-center">
                                                                                        to
                                                                                    </div>
                                                                                    
                                                                                    <div className="col-lg-5">
                                                                                        <select className="form-control" data-choices data-choices-search-false name="choices-single-default2">
                                                                                            <option value="">Select years</option>
                                                                                            <option value="Choice 1">2001</option>
                                                                                            <option value="Choice 2">2002</option>
                                                                                            <option value="Choice 3">2003</option>
                                                                                            <option value="Choice 4">2004</option>
                                                                                            <option value="Choice 5">2005</option>
                                                                                            <option value="Choice 6">2006</option>
                                                                                            <option value="Choice 7">2007</option>
                                                                                            <option value="Choice 8">2008</option>
                                                                                            <option value="Choice 9">2009</option>
                                                                                            <option value="Choice 10">2010</option>
                                                                                            <option value="Choice 11">2011</option>
                                                                                            <option value="Choice 12">2012</option>
                                                                                            <option value="Choice 13">2013</option>
                                                                                            <option value="Choice 14">2014</option>
                                                                                            <option value="Choice 15">2015</option>
                                                                                            <option value="Choice 16">2016</option>
                                                                                            <option value="Choice 17">2017</option>
                                                                                            <option value="Choice 18">2018</option>
                                                                                            <option value="Choice 19">2019</option>
                                                                                            <option value="Choice 20" selected>2020</option>
                                                                                            <option value="Choice 21">2021</option>
                                                                                            <option value="Choice 22">2022</option>
                                                                                        </select>
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                            
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="col-lg-12">
                                                                            <div className="mb-3">
                                                                                <label for="jobDescription" className="form-label">Job Description</label>
                                                                                <textarea className="form-control" id="jobDescription" rows="3" placeholder="Enter description">You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. </textarea>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="hstack gap-2 justify-content-end">
                                                                            <a className="btn btn-success" href="javascript:deleteEl(1)">Delete</a>
                                                                        </div>
                                                                    </div>
                                                                
                                                                </div>
                                                            </div>
                                                            <div id="newForm" style={{display: "none"}}>

                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="hstack gap-2">
                                                                    <button type="submit" className="btn btn-success">Update</button>
                                                                    <a href="javascript:new_link()" className="btn btn-primary">Add New</a>
                                                                </div>
                                                            </div>
                                                            
                                                        </form>
                                                    </div>
                                                    
                                                    <div className="tab-pane" id="privacy" role="tabpanel">
                                                        <div className="mb-4 pb-2">
                                                            <h5 className="card-title text-decoration-underline mb-3">Security:</h5>
                                                            <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                                                                <div className="flex-grow-1">
                                                                    <h6 className="fs-14 mb-1">Two-factor Authentication</h6>
                                                                    <p className="text-muted">Two-factor authentication is an enhanced security meansur. Once enabled, you'll be required to give two types of identification when you log into Google Authentication and SMS are Supported.</p>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-sm-3">
                                                                    <a href="javascript:void(0);" className="btn btn-sm btn-primary">Enable Two-facor Authentication</a>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                                <div className="flex-grow-1">
                                                                    <h6 className="fs-14 mb-1">Secondary Verification</h6>
                                                                    <p className="text-muted">The first factor is a password and the second commonly includes a text with a code sent to your smartphone, or biometrics using your fingerprint, face, or retina.</p>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-sm-3">
                                                                    <a href="javascript:void(0);" className="btn btn-sm btn-primary">Set up secondary method</a>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                                <div className="flex-grow-1">
                                                                    <h6 className="fs-14 mb-1">Backup Codes</h6>
                                                                    <p className="text-muted mb-sm-0">A backup code is automatically generated for you when you turn on two-factor authentication through your iOS or Android Twitter app. You can also generate a backup code on twitter.com.</p>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-sm-3">
                                                                    <a href="javascript:void(0);" className="btn btn-sm btn-primary">Generate backup codes</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <h5 className="card-title text-decoration-underline mb-3">Application Notifications:</h5>
                                                            <ul className="list-unstyled mb-0">
                                                                <li className="d-flex">
                                                                    <div className="flex-grow-1">
                                                                        <label for="directMessage" className="form-check-label fs-14">Direct messages</label>
                                                                        <p className="text-muted">Messages from people you follow</p>
                                                                    </div>
                                                                    <div className="flex-shrink-0">
                                                                        <div className="form-check form-switch">
                                                                            <input className="form-check-input" type="checkbox" role="switch" id="directMessage" checked />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="d-flex mt-2">
                                                                    <div className="flex-grow-1">
                                                                        <label className="form-check-label fs-14" for="desktopNotification">
                                                                            Show desktop notifications
                                                                        </label>
                                                                        <p className="text-muted">Choose the option you want as your default setting. Block a site: Next to "Not allowed to send notifications," click Add.</p>
                                                                    </div>
                                                                    <div className="flex-shrink-0">
                                                                        <div className="form-check form-switch">
                                                                            <input className="form-check-input" type="checkbox" role="switch" id="desktopNotification" checked />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="d-flex mt-2">
                                                                    <div className="flex-grow-1">
                                                                        <label className="form-check-label fs-14" for="emailNotification">
                                                                            Show email notifications
                                                                        </label>
                                                                        <p className="text-muted"> Under Settings, choose Notifications. Under Select an account, choose the account to enable notifications for. </p>
                                                                    </div>
                                                                    <div className="flex-shrink-0">
                                                                        <div className="form-check form-switch">
                                                                            <input className="form-check-input" type="checkbox" role="switch" id="emailNotification" />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="d-flex mt-2">
                                                                    <div className="flex-grow-1">
                                                                        <label className="form-check-label fs-14" for="chatNotification">
                                                                            Show chat notifications
                                                                        </label>
                                                                        <p className="text-muted">To prevent duplicate mobile notifications from the Gmail and Chat apps, in settings, turn off Chat notifications.</p>
                                                                    </div>
                                                                    <div className="flex-shrink-0">
                                                                        <div className="form-check form-switch">
                                                                            <input className="form-check-input" type="checkbox" role="switch" id="chatNotification" />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="d-flex mt-2">
                                                                    <div className="flex-grow-1">
                                                                        <label className="form-check-label fs-14" for="purchaesNotification">
                                                                            Show purchase notifications
                                                                        </label>
                                                                        <p className="text-muted">Get real-time purchase alerts to protect yourself from fraudulent charges.</p>
                                                                    </div>
                                                                    <div className="flex-shrink-0">
                                                                        <div className="form-check form-switch">
                                                                            <input className="form-check-input" type="checkbox" role="switch" id="purchaesNotification" />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <h5 className="card-title text-decoration-underline mb-3">Delete This Account:</h5>
                                                            <p className="text-muted">Go to the Data & Privacy section of your profile Account. Scroll to "Your data & privacy options." Delete your Profile Account. Follow the instructions to delete your account :</p>
                                                            <div>
                                                                <input type="password" className="form-control" id="passwordInput" placeholder="Enter your password" value="make@321654987" style={{ maxWidth: "265px"}} />
                                                            </div>
                                                            <div className="hstack gap-2 mt-3">
                                                                <a href="javascript:void(0);" className="btn btn-soft-danger">Close & Delete This Account</a>
                                                                <a href="javascript:void(0);" className="btn btn-light">Cancel</a>
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
    )

}