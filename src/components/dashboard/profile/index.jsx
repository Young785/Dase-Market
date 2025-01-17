import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import './style.css'
import { UsersAvater2 } from '../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');

    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    // const [selectedOption, setSelectedOption] = useState('');
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
    // const options = ['Email', 'Google2FA', 'SMS'];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const options = ['Email', 'Google', 'SMS']; // Dropdown options

    const handleInputClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (option) => {
        setSearchTerm(option);
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    const clearSelection = () => {
        setSearchTerm('');
        setSelectedOption('');
        setIsDropdownOpen(false);
    };

    const handleEnable2FA = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!selectedOption) {
            
            toast.error("Please select a 2FA method.");
            notifyError("Please select a 2FA method.");
            return;
        }

        try {
            let response;

            if (selectedOption === 'Email') {
                response = await axiosInstance.get('/user/2fa/request/email');
                
                notifySuccess(response.data.message);
                setIsModalOpen(true); // Open Email verification modal
            } else if (selectedOption === 'Google') {
                response = await axiosInstance.get('/user/2fa/enable/google2fa');
                
                notifySuccess(response.data.message);
                setQrCodeUrl(response.data.qrcode_url); 
                setIsGoogleModalOpen(true); // Open Google 2FA modal
            } else if (selectedOption === 'SMS') {
                // Handle SMS 2FA request here
                
                notifyError("SMS 2FA is not implemented yet.");
            }
        } catch (error) {
            notifyError(`Error: ${error.response?.data?.message || "An error occurred."}`);
            toast.error(`Error: ${error.response?.data?.message || "An error occurred."}`);
            
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode) {
           
            notifyError("The code field is required.");
            return;
        }

        try {
            const response = await axiosInstance.post('/user/2fa/verify', { code: verificationCode });
            if (response.data.status) {
                
                notifySuccess(response.data.message);
                closeModal(); // Close modal on success
            } else {
               
                notifyError(response.data.message);
            }
        } catch (error) {
            notifyError(response.data.message);
            toast.error(`Error: ${error.response?.data?.message || "An error occurred."}`);
        }
    };

    const handleVerifyGoogleOTP = async () => {
        if (!verificationCode) {
            // toast.error("The OTP field is required.");
            notifyError(response.data.message);
            notifyError(data.message);
            return;
        }

        try {
            const response = await axiosInstance.post('/user/2fa/verify', { code: verificationCode });
            if (response.data.status) {
                
                notifySuccess(response.data.message);
                setIsGoogleModalOpen(false); // Close modal on success
            } else {
                
                notifyError(response.data.message);
            }
        } catch (error) {
            toast.error(`Error: ${error.response?.data?.message || "An error occurred."}`);
        }
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setIsGoogleModalOpen(false);
        setVerificationCode('');
    };

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

    useEffect(() => {
        let didCancel = false; 
        
        const fetchProfile = async () => {
            if (didCancel) return;
            try {
            const authData = JSON.parse(localStorage.getItem('auth_data'));
            const token = authData?.access_token;
        
            if (!token) {
                notifyError("No token found. User is not authenticated.");
                return;
            }
        
            const response = await axiosInstance.get('/user/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
        
            if (!didCancel) {
                setProfile(response.data.data);
                setUserEmail(response.data.data.email); // Set the user's email from the profile data
            }
            } catch (error) {
            if (!didCancel) notifyError("Error fetching profile data:", error);
            } finally {
            if (!didCancel) setLoading(false);
            }
        };
        
        fetchProfile();
        return () => { didCancel = true; }; 
    }, []);
      

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>Error: Profile data could not be fetched.</div>;
    }
  
    const {
        first_name,
        last_name,
        business_name,
        business_email,
        business_phone,
        email_verified_at,
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
                                <div className="profile-foreground position-relative mx-n4 mt-n4">
                                    <div className="profile-wid-bg">
                                        {/* <img src="assets/images/profile-bg.jpg" alt="" className="profile-wid-img" /> */}
                                        <img  src={profile_photo ? UsersAvater2 : UsersAvater2} alt="user-img" className="img-thumbnail rounded-circle" />
                                    </div>
                                </div>
                                <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
                                    <div className="row g-4">
                                        <div className="col-auto">
                                            <div className="avatar-lg">
                                                <img  src={profile_photo ? UsersAvater2 : UsersAvater2} alt="user-img" className="img-thumbnail rounded-circle" />
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
                                                        <a className="nav-link fs-14 active" data-bs-toggle="tab" href="#overview-tab" role="tab">
                                                            <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Overview</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#activities" role="tab">
                                                            <i className="ri-list-unordered d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Activities</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#enable2FA" role="tab">
                                                            <i className="ri-price-tag-line d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Enable 2FA</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#settings" role="tab">
                                                            <i className="ri-folder-4-line d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Setting</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="flex-shrink-0">
                                                    <Link  to="/dase/profile/edit" className="btn btn-success"><i className="ri-edit-box-line align-bottom"></i> Edit Profile</Link>
                                                </div>
                                            </div>
                                            
                                            <div className="tab-content pt-4 text-muted">
                                                <div className="tab-pane active" id="overview-tab" role="tabpanel">
                                                    <div className="row">
                                                        <div className="col-xxl-3">
                                                            

                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title mb-3">Info</h5>
                                                                    <div className="table-responsive profile" style={{border: "none"}}>
                                                                        <table className="table border-none table-borderless mb-0" style={{border: "none"}}>
                                                                            <tbody style={{border: "none"}}>
                                                                                <tr style={{border: "none"}}>
                                                                                    <th className="ps-0 border-none" style={{border: "none"}} scope="row">Full Name :</th>
                                                                                    <td className="text-muted border-none" style={{border: "none"}}>{`${first_name} ${last_name}`}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Mobile :</th>
                                                                                    <td className="text-muted">{business_phone}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">E-mail :</th>
                                                                                    <td className="text-muted">{business_email}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Website :</th>
                                                                                    <td className="text-muted">
                                                                                        <a href={business_website} target="_blank" rel="noopener noreferrer">{business_website}</a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Location :</th>
                                                                                    <td className="text-muted">{street_address || "Location not provided"}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Joining Date</th>
                                                                                    <td className="text-muted">{email_verified_at}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Created Date</th>
                                                                                    <td className="text-muted">{created_at}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Last Login Date</th>
                                                                                    <td className="text-muted">{last_login}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Status</th>
                                                                                    <td className="text-muted">{status}</td>
                                                                                </tr>

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            

                                                        </div>
                                                        
                                                        <div className="col-xxl-9">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title mb-3">About</h5>
                                                                    <p>{bio}</p>
                                                                    {/* <p>Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family.</p>
                                                                    <p>You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. This may be the most commonly encountered tip I received from the designers I spoke with. They highly encourage that you use different fonts in one design, but do not over-exaggerate and go overboard.</p> */}
                                                                    <div className="row">
                                                                        <div className="col-6 col-md-4">
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                                    <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                                                                        <i className="ri-user-2-fill"></i>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex-grow-1 overflow-hidden">
                                                                                    <p className="mb-1">Designation :</p>
                                                                                    <h6 className="text-truncate mb-0">Lead Designer / Developer</h6>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="col-6 col-md-4">
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                                    <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                                                                        <i className="ri-global-line"></i>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex-grow-1 overflow-hidden">
                                                                                    <p className="mb-1">Website :</p>
                                                                                    <a href="#" className="fw-semibold">{business_website}</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                
                                                                </div>
                                                                
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="card">
                                                                        <div className="card-header align-items-center d-flex">
                                                                            <h4 className="card-title mb-0  me-2">Recent Activity</h4>
                                                                            <div className="flex-shrink-0 ms-auto">
                                                                                <ul className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                                                                    <li className="nav-item">
                                                                                        <a className="nav-link active" data-bs-toggle="tab" href="#today" role="tab">
                                                                                            Today
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="nav-item">
                                                                                        <a className="nav-link" data-bs-toggle="tab" href="#weekly" role="tab">
                                                                                            Weekly
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="nav-item">
                                                                                        <a className="nav-link" data-bs-toggle="tab" href="#monthly" role="tab">
                                                                                            Monthly
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <div className="tab-content text-muted">
                                                                                <div className="tab-pane active" id="today" role="tabpanel">
                                                                                    <div className="profile-timeline">
                                                                                        <div className="accordion accordion-flush" id="todayExample">
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="headingOne">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseOne" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-2.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Jacqueline Steve
                                                                                                                </h6>
                                                                                                                <small className="text-muted">We has changed 2 attributes on 05:16PM</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        In an awareness campaign, it is vital for people to begin put 2 and 2 together and begin to recognize your cause. Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="headingTwo">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseTwo" aria-expanded="false">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                                                <div className="avatar-title bg-light text-success rounded-circle">
                                                                                                                    M
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Megan Elmore
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Adding a new event with attachments - 04:45PM</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        <div className="row g-2">
                                                                                                            <div className="col-auto">
                                                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                                    <div className="flex-shrink-0">
                                                                                                                        <i className="ri-image-2-line fs-17 text-danger"></i>
                                                                                                                    </div>
                                                                                                                    <div className="flex-grow-1 ms-2">
                                                                                                                        <h6>
                                                                                                                            <a  className="stretched-link">Business Template - UI/UX design</a>
                                                                                                                        </h6>
                                                                                                                        <small>685 KB</small>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="col-auto">
                                                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                                    <div className="flex-shrink-0">
                                                                                                                        <i className="ri-file-zip-line fs-17 text-info"></i>
                                                                                                                    </div>
                                                                                                                    <div className="flex-grow-1 ms-2">
                                                                                                                        <h6 className="mb-0">
                                                                                                                            <a  className="stretched-link">Bank Management System - PSD</a>
                                                                                                                        </h6>
                                                                                                                        <small>8.78 MB</small>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="headingThree">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapsethree" aria-expanded="false">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1"> New ticket received</h6>
                                                                                                                <small className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket - 02:33PM</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="headingFour">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseFour" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                                                <div className="avatar-title bg-light text-muted rounded-circle">
                                                                                                                    <i className="ri-user-3-fill"></i>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Nancy Martino
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Commented on 12:57PM</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5 fst-italic">
                                                                                                        " A wonderful serenity has
                                                                                                        taken possession of my
                                                                                                        entire soul, like these
                                                                                                        sweet mornings of spring
                                                                                                        which I enjoy with my whole
                                                                                                        heart. Each design is a new,
                                                                                                        unique piece of art birthed
                                                                                                        into this world, and while
                                                                                                        you have the opportunity to
                                                                                                        be creative and make your
                                                                                                        own style choices. "
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="headingFive">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseFive" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-7.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Lewis Arnold
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Create new project buildng product - 10:05AM</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapseFive" className="accordion-collapse collapse show" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        <p className="text-muted mb-2"> Every team project can have a velzon. Use the velzon to share information with your team to understand and contribute to your project.</p>
                                                                                                        <div className="avatar-group">
                                                                                                            <a  className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title="Christi">
                                                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle avatar-xs"/>
                                                                                                            </a>
                                                                                                            <a  className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title="Frank Hook">
                                                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle avatar-xs"/>
                                                                                                            </a>
                                                                                                            <a  className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title=" Ruby">
                                                                                                                <div className="avatar-xs">
                                                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                                                        R
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </a>
                                                                                                            <a  className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title="more">
                                                                                                                <div className="avatar-xs">
                                                                                                                    <div className="avatar-title rounded-circle">
                                                                                                                        2+
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                                <div className="tab-pane" id="weekly" role="tabpanel">
                                                                                    <div className="profile-timeline">
                                                                                        <div className="accordion accordion-flush" id="weeklyExample">
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading6">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse6" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Joseph Parker
                                                                                                                </h6>
                                                                                                                <small className="text-muted">New people joined with our company - Yesterday</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse6" className="accordion-collapse collapse show" aria-labelledby="heading6" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        It makes a statement, it's
                                                                                                        impressive graphic design.
                                                                                                        Increase or decrease the
                                                                                                        letter spacing depending on
                                                                                                        the situation and try, try
                                                                                                        again until it looks right,
                                                                                                        and each letter has the
                                                                                                        perfect spot of its own.
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading7">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse7" aria-expanded="false">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="avatar-xs">
                                                                                                                <div className="avatar-title rounded-circle bg-light text-danger">
                                                                                                                    <i className="ri-shopping-bag-line"></i>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Your order is placed <span className="badge bg-success-subtle text-success align-middle">Completed</span>
                                                                                                                </h6>
                                                                                                                <small className="text-muted">These customers can rest assured their order has been placed - 1 week Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading8">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse8" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                                                <div className="avatar-title bg-light text-success rounded-circle">
                                                                                                                    <i className="ri-home-3-line"></i>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Velzon admin dashboard templates layout upload
                                                                                                                </h6>
                                                                                                                <small className="text-muted">We talked about a project on linkedin - 1 week Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse8" className="accordion-collapse collapse show" aria-labelledby="heading8" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5 fst-italic">
                                                                                                        Powerful, clean & modern
                                                                                                        responsive bootstrap 5 admin
                                                                                                        template. The maximum file
                                                                                                        size for uploads in this demo :
                                                                                                        <div className="row mt-2">
                                                                                                            <div className="col-xxl-6">
                                                                                                                <div className="row border border-dashed gx-2 p-2">
                                                                                                                    <div className="col-3">
                                                                                                                        <img src="assets/images/small/img-3.jpg" alt="" className="img-fluid rounded" />
                                                                                                                    </div>
                                                                                                                    
                                                                                                                    <div className="col-3">
                                                                                                                        <img src="assets/images/small/img-5.jpg" alt="" className="img-fluid rounded" />
                                                                                                                    </div>
                                                                                                                    
                                                                                                                    <div className="col-3">
                                                                                                                        <img src="assets/images/small/img-7.jpg" alt="" className="img-fluid rounded" />
                                                                                                                    </div>
                                                                                                                    
                                                                                                                    <div className="col-3">
                                                                                                                        <img src="assets/images/small/img-9.jpg" alt="" className="img-fluid rounded" />
                                                                                                                    </div>
                                                                                                                    
                                                                                                                </div>
                                                                                                            
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading9">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse9" aria-expanded="false">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-6.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    New ticket created <span className="badge bg-info-subtle text-info align-middle">Inprogress</span>
                                                                                                                </h6>
                                                                                                                <small className="text-muted mb-2">User <span className="text-secondary">Jack365</span> submitted a ticket - 2 week Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading10">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse10" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Jennifer Carter
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Commented - 4 week Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse10" className="accordion-collapse collapse show" aria-labelledby="heading10" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        <p className="text-muted fst-italic mb-2">
                                                                                                            " This is an awesome
                                                                                                            admin dashboard
                                                                                                            template. It is
                                                                                                            extremely well
                                                                                                            structured and uses
                                                                                                            state of the art
                                                                                                            components (e.g. one of
                                                                                                            the only templates using
                                                                                                            boostrap 5.1.3 so far).
                                                                                                            I integrated it into a
                                                                                                            Rails 6 project. Needs
                                                                                                            manual integration work
                                                                                                            of course but the
                                                                                                            template structure made
                                                                                                            it easy. "</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                                <div className="tab-pane" id="monthly" role="tabpanel">
                                                                                    <div className="profile-timeline">
                                                                                        <div className="accordion accordion-flush" id="monthlyExample">
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading11">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse11" aria-expanded="false">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                                                <div className="avatar-title bg-light text-success rounded-circle">
                                                                                                                    M
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Megan Elmore
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Adding a new event with attachments - 1 month Ago.</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse11" className="accordion-collapse collapse show" aria-labelledby="heading11" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        <div className="row g-2">
                                                                                                            <div className="col-auto">
                                                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                                    <div className="flex-shrink-0">
                                                                                                                        <i className="ri-image-2-line fs-17 text-danger"></i>
                                                                                                                    </div>
                                                                                                                    <div className="flex-grow-1 ms-2">
                                                                                                                        <h6 className="mb-0">
                                                                                                                            <a  className="stretched-link">Business Template - UI/UX design</a>
                                                                                                                        </h6>
                                                                                                                        <small>685 KB</small>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="col-auto">
                                                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                                    <div className="flex-shrink-0">
                                                                                                                        <i className="ri-file-zip-line fs-17 text-info"></i>
                                                                                                                    </div>
                                                                                                                    <div className="flex-grow-1 ms-2">
                                                                                                                        <h6 className="mb-0">
                                                                                                                            <a  className="stretched-link">Bank Management System - PSD</a>
                                                                                                                        </h6>
                                                                                                                        <small>8.78 MB</small>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="col-auto">
                                                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                                    <div className="flex-shrink-0">
                                                                                                                        <i className="ri-file-zip-line fs-17 text-info"></i>
                                                                                                                    </div>
                                                                                                                    <div className="flex-grow-1 ms-2">
                                                                                                                        <h6 className="mb-0">
                                                                                                                            <a  className="stretched-link">Bank Management System - PSD</a>
                                                                                                                        </h6>
                                                                                                                        <small>8.78 MB</small>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading12">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse12" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-2.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Jacqueline Steve
                                                                                                                </h6>
                                                                                                                <small className="text-muted">We has changed 2 attributes on 3 month Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse12" className="accordion-collapse collapse show" aria-labelledby="heading12" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        In an awareness campaign, it
                                                                                                        is vital for people to begin
                                                                                                        put 2 and 2 together and
                                                                                                        begin to recognize your
                                                                                                        cause. Too much or too
                                                                                                        little spacing, as in the
                                                                                                        example below, can make
                                                                                                        things unpleasant for the
                                                                                                        reader. The goal is to make
                                                                                                        your text as comfortable to
                                                                                                        read as possible. A
                                                                                                        wonderful serenity has taken
                                                                                                        possession of my entire
                                                                                                        soul, like these sweet
                                                                                                        mornings of spring which I
                                                                                                        enjoy with my whole heart.
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading13">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse13" aria-expanded="false">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    New ticket received
                                                                                                                </h6>
                                                                                                                <small className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket - 5 month Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading14">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse14" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                                                <div className="avatar-title bg-light text-muted rounded-circle">
                                                                                                                    <i className="ri-user-3-fill"></i>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Nancy Martino
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Commented on 24 Nov, 2021.</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse14" className="accordion-collapse collapse show" aria-labelledby="heading14" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5 fst-italic">
                                                                                                        " A wonderful serenity has
                                                                                                        taken possession of my
                                                                                                        entire soul, like these
                                                                                                        sweet mornings of spring
                                                                                                        which I enjoy with my whole
                                                                                                        heart. Each design is a new,
                                                                                                        unique piece of art birthed
                                                                                                        into this world, and while
                                                                                                        you have the opportunity to
                                                                                                        be creative and make your
                                                                                                        own style choices. "
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading15">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse15" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-7.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Lewis Arnold
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Create new project buildng product - 8 month Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse15" className="accordion-collapse collapse show" aria-labelledby="heading15" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        <p className="text-muted mb-2">
                                                                                                            Every team project can
                                                                                                            have a velzon. Use the
                                                                                                            velzon to share
                                                                                                            information with your
                                                                                                            team to understand and
                                                                                                            contribute to your
                                                                                                            project.</p>
                                                                                                        <div className="avatar-group">
                                                                                                            <a  className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title="Christi">
                                                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle avatar-xs" />
                                                                                                            </a>
                                                                                                            <a  className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title="Frank Hook">
                                                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle avatar-xs" />
                                                                                                            </a>
                                                                                                            <a  className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title=" Ruby">
                                                                                                                <div className="avatar-xs">
                                                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                                                        R
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </a>
                                                                                                            <a  className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title="more">
                                                                                                                <div className="avatar-xs">
                                                                                                                    <div className="avatar-title rounded-circle">
                                                                                                                        2+
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </a>
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
                                                
                                                </div>

                                                <div className="tab-pane fade" id="activities" role="tabpanel">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title mb-3">Activities</h5>
                                                            <div className="acitivity-timeline">
                                                                <div className="acitivity-item d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-1.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Oliver Phillips <span className="badge bg-primary-subtle text-primary align-middle">New</span></h6>
                                                                        <p className="text-muted mb-2">We talked about a project on linkedin.</p>
                                                                        <small className="mb-0 text-muted">Today</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item py-3 d-flex">
                                                                    <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                                                        <div className="avatar-title bg-success-subtle text-success rounded-circle">
                                                                            N
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Nancy Martino <span className="badge bg-secondary-subtle text-secondary align-middle">In Progress</span></h6>
                                                                        <p className="text-muted mb-2"><i className="ri-file-text-line align-middle ms-2"></i> Create new project Buildng product</p>
                                                                        <div className="avatar-group mb-2">
                                                                            <a  className="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Christi">
                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle avatar-xs" />
                                                                            </a>
                                                                            <a  className="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Frank Hook">
                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle avatar-xs" />
                                                                            </a>
                                                                            <a  className="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title=" Ruby">
                                                                                <div className="avatar-xs">
                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                        R
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                            <a  className="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="more">
                                                                                <div className="avatar-xs">
                                                                                    <div className="avatar-title rounded-circle">
                                                                                        2+
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <small className="mb-0 text-muted">Yesterday</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item py-3 d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-2.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Natasha Carey <span className="badge bg-success-subtle text-success align-middle">Completed</span>
                                                                        </h6>
                                                                        <p className="text-muted mb-2">Adding a new event with attachments</p>
                                                                        <div className="row">
                                                                            <div className="col-xxl-4">
                                                                                <div className="row border border-dashed gx-2 p-2 mb-2">
                                                                                    <div className="col-4">
                                                                                        <img src="assets/images/small/img-2.jpg" alt="" className="img-fluid rounded" />
                                                                                    </div>
                                                                                    
                                                                                    <div className="col-4">
                                                                                        <img src="assets/images/small/img-3.jpg" alt="" className="img-fluid rounded" />
                                                                                    </div>
                                                                                    
                                                                                    <div className="col-4">
                                                                                        <img src="assets/images/small/img-4.jpg" alt="" className="img-fluid rounded" />
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                            
                                                                            </div>
                                                                        </div>
                                                                        <small className="mb-0 text-muted">25 Nov</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item py-3 d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-6.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Bethany Johnson</h6>
                                                                        <p className="text-muted mb-2">added a new member to velzon dashboard</p>
                                                                        <small className="mb-0 text-muted">19 Nov</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item py-3 d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <div className="avatar-xs acitivity-avatar">
                                                                            <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                                                                                <i className="ri-shopping-bag-line"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Your order is placed <span className="badge bg-danger-subtle text-danger align-middle ms-1">Out of Delivery</span></h6>
                                                                        <p className="text-muted mb-2">These customers can rest assured their order has been placed.</p>
                                                                        <small className="mb-0 text-muted">16 Nov</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item py-3 d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-7.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Lewis Pratt</h6>
                                                                        <p className="text-muted mb-2">They all have something to say
                                                                            beyond the words on the page. They can come across as
                                                                            casual or neutral, exotic or graphic. </p>
                                                                        <small className="mb-0 text-muted">22 Oct</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item py-3 d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <div className="avatar-xs acitivity-avatar">
                                                                            <div className="avatar-title rounded-circle bg-info-subtle text-info">
                                                                                <i className="ri-line-chart-line"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Monthly sales report</h6>
                                                                        <p className="text-muted mb-2">
                                                                            <span className="text-danger">2 days left</span> notification to submit the monthly sales report. <a  className="link-warning text-decoration-underline">Reports Builder</a>
                                                                        </p>
                                                                        <small className="mb-0 text-muted">15 Oct</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-8.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">New ticket received <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                                                        <p className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket.</p>
                                                                        <small className="mb-0 text-muted">26 Aug</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div className="tab-pane fade" id="enable2FA" role="tabpanel">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                        <h5 className="mb-0 pt-1 col-lg-9 col-md-9 col-sm-4 col-xs-4 col-5">Account Options</h5>
                                                                        
                                                            </div>
                                                              
                                                            <form className="mt-2">
                                                                <div className="row">
                                                                    <div className="mt-1 col-12 pb-2">

                                                                        <div className="row">

                                                                            <div className="col-sm-12 col-xs-12 col-12 col-md-6 col-6 col-6">
                                                                                <p className="my-2">Two Factor Authentication Mode</p> 
                                                                                <div className="dropdown my-3">
                                                                                    <div className="input-group">
                                                                                        <input 
                                                                                            type="text" 
                                                                                            className="form-control dropdown-toggle" 
                                                                                            placeholder="Select an option" 
                                                                                            onClick={handleInputClick} 
                                                                                            onChange={(e) => setSearchTerm(e.target.value)} 
                                                                                            value={searchTerm}
                                                                                        />
                                                                                        {searchTerm && (
                                                                                            <span className="input-group-append" onClick={clearSelection}>
                                                                                                <button className="btn btn-outline-secondary" type="button">
                                                                                                    <FontAwesomeIcon icon={faTimes} />
                                                                                                </button>
                                                                                            </span>
                                                                                        )}
                                                                                        <span className="input-group-append" onClick={handleInputClick}>
                                                                                            <button className="btn btn-outline-secondary" type="button">
                                                                                                <FontAwesomeIcon icon={faChevronDown} />
                                                                                            </button>
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="dropdown">
                                                                                        {/* <button className="btn btn-secondary dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                                                                            {selectedOption || "Select 2FA Method"}
                                                                                        </button> */}
                                                                                        {isDropdownOpen && (
                                                                                            <div className="dropdown-menu show">
                                                                                                {options.map((option, index) => (
                                                                                                    <button 
                                                                                                        key={index} 
                                                                                                        className="dropdown-item" 
                                                                                                        onClick={() => handleOptionClick(option)}
                                                                                                    >
                                                                                                        {option}
                                                                                                    </button>
                                                                                                ))}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                                <button onClick={handleEnable2FA} className="btn btn-primary mt-2">Enable 2FA</button>

                                                                            </div>

                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Modal for Email Verification */}
                                                                {isModalOpen && (
                                                                    <div className="modal show" style={{ display: 'block' }} onClick={closeModal}>
                                                                        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    {/* <button type="button" className="close" onClick={closeModal}>
                                                                                        &times;
                                                                                        </button> */}
                                                                                     <button type="button" class="btn-close" onClick={closeModal}></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <div className="row text-center w-100">

                                                                                        <h5 className="modal-title mb-2">Enable Two Factor Authentication</h5>
                                                                                        <p>Verify your Email for a mail</p>
                                                                                    </div>
                                                                                    <p className='text-center'>Below is the default email for this account, we will send you a verification code.</p>
                                                                                    
                                                                                    
                                                                                    <div className="col-lg-12">
                                                                                        
                                                                                        <div className="input-group">
                                                                                            <span className="input-group-text" id="basic-addon3">Email</span>
                                                                                            <input type="email" className="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={userEmail}/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='pt-5'>

                                                                                        <p className='text-center'>Enter the code sent to you in the box below.</p>
                                                                                        <div className="form-group">
                                                                                            {/* <input type="text" className="form-control" placeholder="Enter verification code" /> */}
                                                                                            <input 
                                                                                                type="text" 
                                                                                                className="form-control" 
                                                                                                placeholder="Enter verification code" 
                                                                                                value={verificationCode}
                                                                                                onChange={(e) => setVerificationCode(e.target.value)}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-light" onClick={closeModal}>Close</button>
                                                                                    <button type="button" className="btn btn-primary" onClick={handleVerifyCode}>Verify Code</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Modal for Google2FA Setup */}
                                                                {isGoogleModalOpen && (
                                                                    <div className="modal show" style={{ display: 'block' }} onClick={closeModal}>
                                                                        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                                                                            <div className="modal-content">
                                                                                <div className="modal-header bg-light text-center py-2">
                                                                                   
                                                                                    <h5 className="modal-title" style={{fontWeight: '400'}}>Google 2FA Profile Setup</h5>
                                                                                    <button type="button" class="btn-close" onClick={closeModal}></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <ol className=''>
                                                                                        <li className='py-2'>Download Google Authenticator from either Play Store or App Store.</li>
                                                                                        <li className='py-2'>Open your Google Authenticator mobile app and scan the following QR barcode:</li>
                                                                                        <li className='py-2'>If your 2FA mobile app does not support QR barcodes, enter in the following number: <strong>H2FDRLLE5HN55VUJ</strong></li>
                                                                                    </ol>
                                                                                    <div className="text-center">
                                                                                        <img src={qrCodeUrl} alt="QR Code" style={{ width: '100%', height: 'auto' }} />
                                                                                    </div>
                                                                                    <p>Enter the code sent to you in the box below.</p>
                                                                                    <div className="form-group">
                                                                                    <input 
                                                                                        type="text" 
                                                                                        className="form-control" 
                                                                                        placeholder="Enter OTP" 
                                                                                        value={verificationCode} 
                                                                                        onChange={(e) => setVerificationCode(e.target.value)} 
                                                                                    />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-light" onClick={() => setIsGoogleModalOpen(false)}>Close</button>
                                                                                    <button type="button" className="btn btn-primary" onClick={handleVerifyGoogleOTP}>Verify OTP</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </form>
                                                                    
                                                                    
                                                            
                                                        
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div className="tab-pane fade" id="settings" role="tabpanel">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="d-flex align-items-center mb-4">
                                                                <h5 className="card-title flex-grow-1 mb-0">Documents</h5>
                                                                <div className="flex-shrink-0">
                                                                    <input className="form-control d-none" type="file" id="formFile"/>
                                                                    <label for="formFile" className="btn btn-danger"><i className="ri-upload-2-fill me-1 align-bottom"></i> Upload File</label>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="table-responsive">
                                                                        <table className="table table-borderless align-middle mb-0">
                                                                            <thead className="table-light">
                                                                                <tr>
                                                                                    <th scope="col">File Name</th>
                                                                                    <th scope="col">Type</th>
                                                                                    <th scope="col">Size</th>
                                                                                    <th scope="col">Upload Date</th>
                                                                                    <th scope="col">Action</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="avatar-sm">
                                                                                                <div className="avatar-title bg-primary-subtle text-primary rounded fs-20">
                                                                                                    <i className="ri-file-zip-fill"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ms-3 flex-grow-1">
                                                                                                <h6 className="fs-15 mb-0"><a >Artboard-documents.zip</a>
                                                                                                </h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>Zip File</td>
                                                                                    <td>4.57 MB</td>
                                                                                    <td>12 Dec 2021</td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <a  className="btn btn-light btn-icon" id="dropdownMenuLink15" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                                <i className="ri-equalizer-fill"></i>
                                                                                            </a>
                                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink15">
                                                                                                <li><a className="dropdown-item" ><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</a></li>
                                                                                                <li><a className="dropdown-item" ><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</a></li>
                                                                                                <li className="dropdown-divider"></li>
                                                                                                <li><a className="dropdown-item" ><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="avatar-sm">
                                                                                                <div className="avatar-title bg-danger-subtle text-danger rounded fs-20">
                                                                                                    <i className="ri-file-pdf-fill"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ms-3 flex-grow-1">
                                                                                                <h6 className="fs-15 mb-0"><a >Bank Management System</a></h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>PDF File</td>
                                                                                    <td>8.89 MB</td>
                                                                                    <td>24 Nov 2021</td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <a  className="btn btn-light btn-icon" id="dropdownMenuLink3" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                                <i className="ri-equalizer-fill"></i>
                                                                                            </a>
                                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink3">
                                                                                                <li><a className="dropdown-item" ><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</a></li>
                                                                                                <li><a className="dropdown-item" ><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</a></li>
                                                                                                <li className="dropdown-divider"></li>
                                                                                                <li><a className="dropdown-item" ><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="avatar-sm">
                                                                                                <div className="avatar-title bg-secondary-subtle text-secondary rounded fs-20">
                                                                                                    <i className="ri-video-line"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ms-3 flex-grow-1">
                                                                                                <h6 className="fs-15 mb-0"><a >Tour-video.mp4</a></h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>MP4 File</td>
                                                                                    <td>14.62 MB</td>
                                                                                    <td>19 Nov 2021</td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <a  className="btn btn-light btn-icon" id="dropdownMenuLink4" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                                <i className="ri-equalizer-fill"></i>
                                                                                            </a>
                                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink4">
                                                                                                <li><a className="dropdown-item" ><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</a></li>
                                                                                                <li><a className="dropdown-item" ><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</a></li>
                                                                                                <li className="dropdown-divider"></li>
                                                                                                <li><a className="dropdown-item" ><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="avatar-sm">
                                                                                                <div className="avatar-title bg-success-subtle text-success rounded fs-20">
                                                                                                    <i className="ri-file-excel-fill"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ms-3 flex-grow-1">
                                                                                                <h6 className="fs-15 mb-0"><a >Account-statement.xsl</a></h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>XSL File</td>
                                                                                    <td>2.38 KB</td>
                                                                                    <td>14 Nov 2021</td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <a  className="btn btn-light btn-icon" id="dropdownMenuLink5" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                                <i className="ri-equalizer-fill"></i>
                                                                                            </a>
                                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink5">
                                                                                                <li><a className="dropdown-item" ><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</a></li>
                                                                                                <li><a className="dropdown-item" ><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</a></li>
                                                                                                <li className="dropdown-divider"></li>
                                                                                                <li><a className="dropdown-item" ><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="avatar-sm">
                                                                                                <div className="avatar-title bg-info-subtle text-info rounded fs-20">
                                                                                                    <i className="ri-folder-line"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ms-3 flex-grow-1">
                                                                                                <h6 className="fs-15 mb-0"><a >Project Screenshots Collection</a></h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>Floder File</td>
                                                                                    <td>87.24 MB</td>
                                                                                    <td>08 Nov 2021</td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <a  className="btn btn-light btn-icon" id="dropdownMenuLink6" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                                <i className="ri-equalizer-fill"></i>
                                                                                            </a>
                                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink6">
                                                                                                <li><a className="dropdown-item" ><i className="ri-eye-fill me-2 align-middle"></i>View</a></li>
                                                                                                <li>
                                                                                                    <a className="dropdown-item" ><i className="ri-download-2-fill me-2 align-middle"></i>Download</a>
                                                                                                </li>
                                                                                                <li><a className="dropdown-item" ><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="avatar-sm">
                                                                                                <div className="avatar-title bg-danger-subtle text-danger rounded fs-20">
                                                                                                    <i className="ri-image-2-fill"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ms-3 flex-grow-1">
                                                                                                <h6 className="fs-15 mb-0">
                                                                                                    <a >Velzon-logo.png</a>
                                                                                                </h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>PNG File</td>
                                                                                    <td>879 KB</td>
                                                                                    <td>02 Nov 2021</td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <a  className="btn btn-light btn-icon" id="dropdownMenuLink7" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                                <i className="ri-equalizer-fill"></i>
                                                                                            </a>
                                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink7">
                                                                                                <li><a className="dropdown-item" ><i className="ri-eye-fill me-2 align-middle"></i>View</a></li>
                                                                                                <li><a className="dropdown-item" ><i className="ri-download-2-fill me-2 align-middle"></i>Download</a></li>
                                                                                                <li>
                                                                                                    <a className="dropdown-item" ><i className="ri-delete-bin-5-line me-2 align-middle"></i>Delete</a>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <div className="text-center mt-3">
                                                                        <a  className="text-success"><i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i> Load more </a>
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
            </div>
        </>
    )

}