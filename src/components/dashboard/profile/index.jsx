import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css'; 
import axiosInstance from '../../../axiosInstance';
import './style.css'
import './MusicPlayer.css'
import { UsersAvater2 } from '../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import PostCard from "../../posts/page"
import MusicPlayer from './MusicPlayer'; 
import { useProfile } from '../../../context/ProfileContext';

export default function ProfilePage() {
    const { profile, loading } = useProfile();
    const scrollbarRef = useRef(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const options = ['Email', 'Google', 'SMS']; // Dropdown options
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const [tracks, setTracks] = useState([
        {
            title: "SoundHelix Song 1",
            artist: "SoundHelix",
            duration: "3:00",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        },
        {
            title: "SoundHelix Song 2",
            artist: "SoundHelix",
            duration: "3:30",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        },
        {
            title: "The Big Bang",
            artist: "Kevin MacLeod",
            duration: "2:45",
            url: "https://freemusicarchive.org/music/Kevin_MacLeod/The_Big_Bang/The_Big_Bang.mp3"
        },
    ]);

    const currentTrack = tracks[currentTrackIndex];

    const handleInputClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    const clearSelection = () => {
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
            const response = await axiosInstance.get('/user/2fa/verify', { code: verificationCode });
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
                setIsGoogleModalOpen(false); 
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

    const handleNext = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
        setIsPlaying(true);
    };

    const handlePrevious = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
        setIsPlaying(true);
    };

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    useEffect(() => {
        if (profile) {
            // setUserEmail(profile.email);
        }
    }, [profile]);
      

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
                                                            <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Business Info</span>
                                                        </a>
                                                    </li>
                                                   
                                                    <li className="nav-item">
                                                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#enable2FA" role="tab">
                                                            <i className="ri-price-tag-line d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Enable 2FA</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#changePassword" role="tab">
                                                            <i className="ri-folder-4-line d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Change Password</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#musicPlayer" role="tab">
                                                            <i className="ri-folder-4-line d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Music Sample</span>
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
                                                        <div className="col-12">
                                                           
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="row mb-4 mt-2">

                                                                        <h5 className='card-title'>Business Information</h5>
                                                                        <label className='' style={{fontSize:'12px', fontWeight:'500', color:'gray'}}>Tell us a little about your business.</label>
                                                                    </div>

                                                                    <form action="">
                                                
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="mb-3">
                                                                                    <label for="firstnameInput" className="form-label">First Name</label>
                                                                                    <input type="text" className="form-control" id="firstnameInput" disabled value={first_name} />
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div className="col-lg-6">
                                                                                <div className="mb-3">
                                                                                    <label for="lastnameInput" className="form-label">Last Name</label>
                                                                                    <input type="text" className="form-control" id="lastnameInput" disabled value={last_name} />
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-lg-4">
                                                                                <div className="mb-3">
                                                                                    <label for="businessName" className="form-label">Business Name</label>
                                                                                    <input type="text" className="form-control" id="businessName" disabled  value={business_name} />
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div className="col-lg-4">
                                                                                <div className="mb-3">
                                                                                    <label for="phonenumberInput" className="form-label">Business Phone Number</label>
                                                                                    <input type="text" className="form-control" id="phonenumberInput" disabled value={business_phone_number}/>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div className="col-lg-4">
                                                                                <div className="mb-3">
                                                                                    <label for="emailInput" className="form-label">Business Email Address</label>
                                                                                    <input type="email" className="form-control" id="emailInput" disabled value={business_email}/>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div className="col-lg-4">
                                                                                <div className="mb-3">
                                                                                    <label for="JoiningdatInput" className="form-label">Joining Date</label>
                                                                                    <input type="text" className="form-control" data-provider="flatpickr" id="JoiningdatInput" data-date-format="d M, Y" data-deafult-date="24 Nov, 2021" disabled value={email_verified_at}  />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-4">
                                                                                <div className="mb-3">
                                                                                    <label for="DOBInput" className="form-label">DOB</label>
                                                                                    <input type="date" className="form-control" id="DOBInput" disabled value={dob}  />
                                                                                </div>
                                                                            </div>
                                                                            
                                                                           
                                                                            
                                                                            <div className="col-lg-4">
                                                                                <div className="mb-3">
                                                                                    <label for="work_experience" className="form-label">Work Experience</label>
                                                                                    <input type="text" className="form-control" id="work_experience" disabled value={work_experience}/>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div className="col-lg-6">
                                                                                <div className="mb-3">
                                                                                    <label for="websiteInput1" className="form-label">Website</label>
                                                                                    <input type="text" className="form-control" id="websiteInput1" disabled value={business_website} 	/>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div className="col-lg-6">
                                                                                <div className="mb-3">
                                                                                    <label for="cityInput" className="form-label">Street Address</label>
                                                                                    <input type="text" className="form-control" id="cityInput" disabled value={street_address} />
                                                                                </div>
                                                                            </div>
                                                                            
                                                                           
                                                                            
                                                                            <div className="col-lg-12">
                                                                                <div className="mb-3 pb-2">
                                                                                    <label for="exampleFormControlTextarea" className="form-label">Bio</label>
                                                                                    <textarea className="form-control" id="exampleFormControlTextarea" rows="3" disabled value={bio}></textarea>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            {/* <div className="col-lg-12">
                                                                                <div className="hstack gap-2 justify-content-end">
                                                                                    <button type="submit" className="btn btn-primary">Updates</button>
                                                                                    <button type="button" className="btn btn-soft-success">Cancel</button>
                                                                                </div>
                                                                            </div> */}
                                                                        
                                                                        </div>
                                                                        
                                                                    </form>
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
                                                                                            onChange={(e) => setSelectedOption(e.target.value)} 
                                                                                            value={selectedOption}
                                                                                        />
                                                                                        {selectedOption && (
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
                                                                                     <button type="button" className="btn-close" onClick={closeModal}></button>
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
                                                                                            {/* <input type="email" className="form-control" id="basic-url" aria-describedby="basic-addon3" readOnly value={userEmail}/> */}
                                                                                            <input 
                                                                                                type="email" 
                                                                                                className="form-control" 
                                                                                                id="basic-url" 
                                                                                                aria-describedby="basic-addon3" 
                                                                                                disabled 
                                                                                                value={business_email} 
                                                                                            />
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
                                                                                    <button type="button" className="btn-close" onClick={closeModal}></button>
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
                                                
                                                <div className="tab-pane fade" id="changePassword" role="tabpanel">
                                                    <div className="card">
                                                        <div className="card-body">
                                                           

                                                            <form action="">
                                                                <div className="row col-12 mb-4">

                                                                    <div className="d-flex profile-wrapper justify-content-between align-items-center">

                                                                        <h5 className='card-title'>Change Password </h5>
                                                                        

                                                                    </div>
                                                                </div>
                                                                
                                                                <div class="row g-3">
                                                                    <div class="col-4">
                                                                        <div>
                                                                            <label for="oldPasswordInput" class="form-label">Old Password</label>
                                                                            <input type="password" class="form-control" id="oldPasswordInput" value="451326546"/>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-4">
                                                                        <div>
                                                                            <label for="newPasswordInput" class="form-label">New Password</label>
                                                                            <input type="password" class="form-control" id="newPasswordInput" />
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div class="col-4">
                                                                        <div>
                                                                            <label for="confirmPasswordInput" class="form-label">Confirm Password</label>
                                                                            <input type="password" class="form-control" id="confirmPasswordInput"/>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div class="col-lg-12">
                                                                        <div class="hstack gap-2 justify-content-end">
                                                                            
                                                                            <button class="btn btn-primary">Change Password</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="tab-pane fade main" id="musicPlayer" role="tabpanel">
                                                   <div className="card ">

                                                        <div className="card-body">
                                                            <div className="row row--grid">
                                                                
                                                                
                                                                
                                                                <div className="col-12"> 
                                                                    <div className="release">

                                                                       
                                                                        <div className="release__list"  style={{ position: 'relative', height: '400px', }}>
                                                                            <PerfectScrollbar >
                                                                                <div className="scroll-content">

                                                                                        <ul className="main__list main__list--playlist main__list--dashbox">
                                                                                            {tracks.map((track, index) => (
                                                                                                <li key={index} className="single-item" onClick={() => handleTrackClick(track)}>
                                                                                                    <div style={{cursor: "pointer"}}  className="single-item__cover" onClick={togglePlayPause}>
                                                                                                        <img style={{cursor: "pointer"}}  src="https://blast.volkovdesign.com/img/covers/cover.svg" alt=""/>
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z"></path></svg>
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16,2a3,3,0,0,0-3,3V19a3,3,0,0,0,6,0V5A3,3,0,0,0,16,2Zm1,17a1,1,0,0,1-2,0V5a1,1,0,0,1,2,0ZM8,2A3,3,0,0,0,5,5V19a3,3,0,0,0,6,0V5A3,3,0,0,0,8,2ZM9,19a1,1,0,0,1-2,0V5A1,1,0,0,1,9,5Z"></path></svg>
                                                                                                    </div>
                                                                                                    <div className='single-item__title'>
                                                                                                        <h4>{`${index + 1}. ${track.title}`}</h4>
                                                                                                        <span>{track.artist}</span>
                                                                                                    </div>
                                                                                                    <a href="#" className="single-item__add">
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"></path></svg>
                                                                                                    </a>
                                                                                                    <a href={track.url} className="single-item__export" download>
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Zm-9.71,1.71a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l4-4a1,1,0,0,0-1.42-1.42L13,12.59V3a1,1,0,0,0-2,0v9.59l-2.29-2.3a1,1,0,1,0-1.42,1.42Z"></path></svg>
                                                                                                    </a>
                                                                                                    <span class="single-item__time">{track.duration}</span>
                                                                                                    
                                                                                                
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                </div>
                                                                            </PerfectScrollbar>
                                                                        
                                                                        </div>
                                                                    </div>

                                                                </div>
                                        
                                                               
                                                            </div>
                                                            {/* <PostCard/> */}
                                                        </div>
                                                   </div>
                                                </div>



                                                
                                            </div>
                                        
                                        </div>
                                    </div>
                                    
                                </div>
                            

                            </div>
                        </div>

                        {/* Music Player in Footer */}
                        <MusicPlayer 
                            track={currentTrack} 
                            isPlaying={isPlaying} 
                            onPlayPause={togglePlayPause} 
                            onNext={handleNext} 
                            onPrevious={handlePrevious} 
                        />
                        
                    </div>
                </div>
            </div>

        </>
    )

}