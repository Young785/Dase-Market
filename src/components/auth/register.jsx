import PhoneInput from 'react-phone-input-2';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// src/App.js
import { Link } from 'react-router-dom';
// import Link from 'next/link';
// import PhoneCode from './phone_code';
import './register.css'
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import axiosInstance from '../../axiosInstance';

// import CircularProgress from '@mui/material/CircularProgress';

export default function Register() {
    const navigate = useNavigate();
  let getAuth;
  const [IsUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    business_email: "",
    business_phone_code: "",
    business_phone: "",
    role: "engineer",
    business_name: "",
    business_website: null,
    profile_photo: null,
    bio: "",
    work_experience: "",
    password: "",
    password_confirmation: ""
  });
  const [activeTab, setActiveTab] = useState('engineer');

  const notifySuccess = (text) => toast.success(`${text}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notifyError = (text) => toast.error(`${text}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  useEffect(() => {
    getAuth = JSON.parse(localStorage.getItem('auth_data'));
    if (getAuth) {
      notifySuccess("Authorized!");
      setTimeout(() => {
        window.location.href = '/dase/dashboard';
      }, 2000);
    }
  }, []);



  // const handlePhoneChange = (phone, code) => {

  //   console.log('phone vals:', phone, code);
  //   setFormData({ ...formData, phone: phone, phone_code: code });
  // };

  const handlePhoneChange = (value, country) => {
    setFormData({ 
      ...formData, 
      business_phone: value.slice(country.dialCode.length), 
      business_phone_code: country.dialCode 
    });
  };



  const handleSetRole = (role) => {
    // Reset form fields based on the selected role
    const initialFormData = {
      first_name: "",
      last_name: "",
      business_email: "",
      business_phone_code: "",
      business_phone: "",
      role: role,
      business_name: "",
      business_website: null,
      profile_photo: "",
      bio: "",
      work_experience: "",
      password: "",
      password_confirmation: ""
    };
  
    // Clear form fields based on the selected role
    if (role === 'engineer') {
      setFormData({
        ...initialFormData,
        // Set default values specific to 'engineer' role if needed
      });
    } else if (role === 'client') {
      setFormData({
        ...initialFormData,
        // Set default values specific to 'client' role if needed
      });
    }
  };
  
  const handleTabChange = (tab) => {
    handleSetRole(tab);
    setActiveTab(tab);
  };
 


  const handleChange = (e, val) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} with value: ${value}`);
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile_photo: file });
  };
  const handleEngineerFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile_photo: file });
  };


 


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsUploading(true);
    setLoading(true); 

    const role = activeTab;
    const updatedFormData = { ...formData, role:role };
    console.log("payload after updatedFormData", formData);
    

    // Conditionally validate fields based on the active tab
    const requiredFields = [
        'first_name',
        'last_name',
        'business_email',
        'password',
        'password_confirmation'
    ];
    console.log("Payload after required", formData);
    

    if (activeTab === 'engineer') {
        requiredFields.push('business_name');
    } else if (activeTab === 'client') {
        requiredFields.push('business_name', 'business_website');
    }
    // console.log("payload after activeTab", formData);
    

    // Check if all required fields are filled
    const missingFields = requiredFields.filter(field => !updatedFormData[field]);

    if (missingFields.length === 0) {
        if (updatedFormData.password === updatedFormData.password_confirmation) {
            let business_phone = updatedFormData.business_phone;
            if (business_phone.startsWith('0')) {
                business_phone = business_phone.slice(1);
            }
            if (business_phone.length <= 11) {
                const dataToSend = new FormData();

                // Append other form data fields to FormData object
                Object.keys(updatedFormData).forEach(key => {
                    if (key !== 'profile_photo') {
                        dataToSend.append(key, updatedFormData[key]);
                    }
                });

                // Append the profile_photo file
                if (formData.profile_photo) {
                    dataToSend.append('profile_photo', formData.profile_photo);
                }
                // console.log("Payload before try", formData);

                try {
                    const response = await axiosInstance.post('/register', dataToSend, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    // Check for response status
                    if (response.data.status) {
                        // Handle successful registration
                        notifySuccess(response.data.message);
                        localStorage.setItem('signup_record', JSON.stringify(response.data.user));
                        setTimeout(() => {
                            navigate('/dase/verifyotp');
                        }, 2000);
                    } else {
                        notifyError(response.data.message);
                    }
                } catch (error) {
                    // Handle errors
                    if (error.response) {
                        notifyError(error.response.data.message || 'An unexpected error occurred');
                    } else {
                        notifyError('Network error or server not responding');
                    }
                } finally {
                    setIsUploading(false);
                    setLoading(false);
                }
            } else {
                notifyError('Phone number should not be more than 11 characters');
                setLoading(false);
            }
        } else {
            notifyError('Passwords do not match');
            setLoading(false);
        }
    } else {
        notifyError('Please fill in all required fields');
        setLoading(false);
    }
};



  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [recipient, setRecipient] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (recipientName) => {
    setRecipient(recipientName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderModalContent = () => {
    if (activeTab === 'engineer') {
      return (
        <div className='px-0 mx-0 py-0 my-0'>
          <div>
              <div className="main-content p-0 m-0">

                  <div className="page-content p-0 m-0">
                      <div className="container-fluid p-0 m-0">

                  
                          
                      
                          <div className="row justify-content-center">
                              <div className="col-lg-12">
                                  <div className="card">
                                      <div className="bg-warning-subtle position-relative">
                                          <div className="card-body p-5">
                                              <div className="text-center">
                                                  <h3>Privacy Policy</h3>
                                                  <p className="mb-0 text-muted">Last update: 16 Sept, 2024</p>
                                              </div>
                                          </div>
                                          <div className="shape">
                                              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="1440" height="60" preserveAspectRatio="none" viewBox="0 0 1440 60">
                                                  <g mask="url(&quot;#SvgjsMask1001&quot;)" fill="none">
                                                      <path d="M 0,4 C 144,13 432,48 720,49 C 1008,50 1296,17 1440,9L1440 60L0 60z" style={{fill: "var(--vz-secondary-bg)"}}></path>
                                                  </g>
                                                  <defs>
                                                      <mask id="SvgjsMask1001">
                                                          <rect width="1440" height="60" fill="#ffffff"></rect>
                                                      </mask>
                                                  </defs>
                                              </svg>
                                          </div>
                                      </div>
                                      <div className="card-body p-4">
                                          <div className="d-flex">
                                              <div className="flex-shrink-0 me-3">
                                                  <i data-feather="check-circle" className="text-success icon-dual-success icon-xs"></i>
                                              </div>
                                              <div className="flex-grow-1">
                                                  <h5>Privacy Policy for Engineer Register</h5>
                                                  <p className="text-muted">At Website Name, accessible at Website.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Website Name and how we use it.</p>
                                                  <p className="text-muted">If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at Email@Website.com</p>
                                                  <p className="text-muted">This privacy policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Website Name. This policy is not applicable to any information collected offline or via channels other than this website.</p>
                                                  <p className="text-muted">How we use your information:</p>
                                                  <ul className="text-muted">
                                                      <li>
                                                          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                      </li>
                                                      <li>
                                                          <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                                                      </li>
                                                      <li>
                                                          <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.</p>
                                                      </li>
                                                      <li>
                                                          <p>It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                          
                                          <div className="d-flex">
                                              <div className="flex-shrink-0 me-3">
                                                  <i data-feather="check-circle" className="text-success icon-dual-success icon-xs"></i>
                                              </div>
                                              <div className="flex-grow-1">
                                                  <h5>How we use your information</h5>
                                                  <p className="text-muted">If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
                                                  <p className="text-muted">Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</p>
                                                  <p className="text-muted">When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>
                                                  <p className="text-muted">We use the information we collect in various ways, including to:</p>
                                                  <ul className="text-muted vstack gap-2">
                                                      <li>
                                                          Provide, operate, and maintain our website
                                                      </li>
                                                      <li>
                                                          Improve, personalize, and expand our website
                                                      </li>
                                                      <li>
                                                          Understand and analyze how you use our website
                                                      </li>
                                                      <li>
                                                          Develop new products, services, features, and functionality
                                                      </li>
                                                      <li>
                                                          Send you emails
                                                      </li>
                                                      <li>
                                                      Find and prevent fraud
                                                      </li>
                                                  </ul>
                                                  <p className="text-muted">Like any other website, Website Name uses ‘cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
                                              </div>
                                          </div>

                                          <div className="d-flex">
                                              <div className="flex-shrink-0 me-3">
                                                  <i data-feather="check-circle" className="text-success icon-dual-success icon-xs"></i>
                                              </div>
                                              <div className="flex-grow-1">
                                                  <p className="text-muted">Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.</p>
                                                  <p className="text-muted"><b>Website Name's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You may find a complete list of these Privacy Policies and their links here: Privacy Policy Links.</b></p>
                                              </div>
                                          </div>


                                          <div className="text-end">
                                              <a className="btn btn-danger" onClick={handleCloseModal}>I'm Understand</a>
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
      );
    } else if (activeTab === 'client') {
      return (
        <div className='px-0 mx-0 py-0 my-0'>
          <div>
              <div className="main-content p-0 m-0">

                  <div className="page-content p-0 m-0">
                      <div className="container-fluid p-0 m-0">

                  
                          
                      
                          <div className="row justify-content-center">
                              <div className="col-lg-12">
                                  <div className="card">
                                      <div className="bg-warning-subtle position-relative">
                                          <div className="card-body p-5">
                                              <div className="text-center">
                                                  <h3>Privacy Policy</h3>
                                                  <p className="mb-0 text-muted">Last update: 16 Sept, 2024</p>
                                              </div>
                                          </div>
                                          <div className="shape">
                                              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="1440" height="60" preserveAspectRatio="none" viewBox="0 0 1440 60">
                                                  <g mask="url(&quot;#SvgjsMask1001&quot;)" fill="none">
                                                      <path d="M 0,4 C 144,13 432,48 720,49 C 1008,50 1296,17 1440,9L1440 60L0 60z" style={{fill: "var(--vz-secondary-bg)"}}></path>
                                                  </g>
                                                  <defs>
                                                      <mask id="SvgjsMask1001">
                                                          <rect width="1440" height="60" fill="#ffffff"></rect>
                                                      </mask>
                                                  </defs>
                                              </svg>
                                          </div>
                                      </div>
                                      <div className="card-body p-4">
                                          <div className="d-flex">
                                              <div className="flex-shrink-0 me-3">
                                                  <i data-feather="check-circle" className="text-success icon-dual-success icon-xs"></i>
                                              </div>
                                              <div className="flex-grow-1">
                                                  <h5>Privacy Policy for Client Register</h5>
                                                  <p className="text-muted">At Website Name, accessible at Website.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Website Name and how we use it.</p>
                                                  <p className="text-muted">If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at Email@Website.com</p>
                                                  <p className="text-muted">This privacy policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Website Name. This policy is not applicable to any information collected offline or via channels other than this website.</p>
                                                  <p className="text-muted">How we use your information:</p>
                                                  <ul className="text-muted">
                                                      <li>
                                                          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                      </li>
                                                      <li>
                                                          <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                                                      </li>
                                                      <li>
                                                          <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.</p>
                                                      </li>
                                                      <li>
                                                          <p>It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                          
                                          <div className="d-flex">
                                              <div className="flex-shrink-0 me-3">
                                                  <i data-feather="check-circle" className="text-success icon-dual-success icon-xs"></i>
                                              </div>
                                              <div className="flex-grow-1">
                                                  <h5>How we use your information</h5>
                                                  <p className="text-muted">If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
                                                  <p className="text-muted">Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</p>
                                                  <p className="text-muted">When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>
                                                  <p className="text-muted">We use the information we collect in various ways, including to:</p>
                                                  <ul className="text-muted vstack gap-2">
                                                      <li>
                                                          Provide, operate, and maintain our website
                                                      </li>
                                                      <li>
                                                          Improve, personalize, and expand our website
                                                      </li>
                                                      <li>
                                                          Understand and analyze how you use our website
                                                      </li>
                                                      <li>
                                                          Develop new products, services, features, and functionality
                                                      </li>
                                                      <li>
                                                          Send you emails
                                                      </li>
                                                      <li>
                                                      Find and prevent fraud
                                                      </li>
                                                  </ul>
                                                  <p className="text-muted">Like any other website, Website Name uses ‘cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
                                              </div>
                                          </div>

                                          <div className="d-flex">
                                              <div className="flex-shrink-0 me-3">
                                                  <i data-feather="check-circle" className="text-success icon-dual-success icon-xs"></i>
                                              </div>
                                              <div className="flex-grow-1">
                                                  <p className="text-muted">Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.</p>
                                                  <p className="text-muted"><b>Website Name's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You may find a complete list of these Privacy Policies and their links here: Privacy Policy Links.</b></p>
                                              </div>
                                          </div>


                                          <div className="text-end">
                                              <a className="btn btn-danger" onClick={handleCloseModal}>I'm Understand</a>
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
      );
    }
    return null;
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      <div className="auth-page-wrapper pt-5">
        <Toaster />
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>
          <div className="shape"></div>
        </div>
        <div className="auth-page-content row">
          <div className="container col-lg-10">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                 
                  <h1 className=" bg-transparent login-title" style={{color: '#fff'}}>Register</h1>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-9">
                <div className="card mt-4">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Create New Account</h5>
                      <p className="text-muted">Get your free dase account now</p>
                    </div>
                    {/* <h4 className="card-title text-center">Register</h4> */}
                    <ul className="nav nav-tabs" id="registrationTabs" role="tablist">
                      <li className="nav-item col-6" role="presentation">
                        <button
                          className={`nav-link ${activeTab === 'engineer' ? 'active' : ''}`}
                          id="engineer-tab"
                          style={{width:'100%'}}
                          onClick={() => handleTabChange('engineer')}
                          type="button"
                          role="tab"
                          aria-controls="engineer"
                          aria-selected={activeTab === 'engineer'}
                        >
                          Engineer
                        </button>
                      </li>
                      <li className="nav-item col-6" role="presentation">
                        <button
                          className={`nav-link ${activeTab === 'client' ? 'active' : ''}`}
                          style={{width:'100%'}}
                          id="client-tab"
                          onClick={() => handleTabChange('client')}
                          type="button"
                          role="tab"
                          aria-controls="client"
                          aria-selected={activeTab === 'client'}
                        >
                          Client
                        </button>
                      </li>
                    </ul>

                    <div className="tab-content" id="registrationTabsContent">
                      {/* Engineer Tab */}
                      <div className={`tab-pane fade ${activeTab === 'engineer' ? 'show active' : ''} p-2 mt-2`}
                        id="engineer"
                        role="tabpanel"
                        aria-labelledby="engineer-tab">
                          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                            {/* Common Fields */}
                            <div className='row mb-3'>
                            <div className="col-md-6 col-sm-12 pb-sm-3 ">
                                <label htmlFor="first_name" className="form-label">
                                First Name <span className="text-danger">*</span>
                                </label>
                                <input type="text" value={formData.first_name} onChange={handleChange} className="form-control" name="first_name" id="first_name" placeholder="Enter first name" required />
                                <div className="invalid-feedback">Please enter first name</div>
                            </div>
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                                <label htmlFor="last_name" className="form-label">
                                Last Name <span className="text-danger">*</span>
                                </label>
                                <input type="text" value={formData.last_name} onChange={handleChange} className="form-control" name="last_name" id="last_name" placeholder="Enter last name" required />
                                <div className="invalid-feedback">Please enter last name</div>
                            </div>
                            </div>

                            <div className='row mb-3'>
                            <div className='col-md-6 col-sm-12 pb-sm-3'>
                                <label htmlFor="business_email" className="form-label">
                                Business Email <span className="text-danger">*</span>
                                </label>
                                <input type="email" value={formData.business_email} onChange={handleChange} className="form-control" name="business_email" id="business_email" placeholder="Enter email" required />
                                <div className="invalid-feedback">Please enter email</div>
                            </div>
                            {/* <div className="col-md-6 col-sm-12 pb-sm-3">
                                <label htmlFor="phone_code" className="form-label">
                                Phone Code <span className="text-danger">*</span>
                                </label>
                                <PhoneCode onChange={handlePhoneChange} />
                                <div className="invalid-feedback">Please select phone code</div>
                            </div> */}

                            {/* <div className="col-md-6 col-sm-12 pb-sm-3">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <PhoneInput
                                country={'ng'}
                                value={phone}
                                onChange={(e) => handlePhoneChange(e.target.value)}
                                enableSearch={true}
                                inputProps={{
                                    placeholder: 'Enter phone number',
                                    style: { width: '100%' }
                                }}
                                />
                                <div className="invalid-feedback">Please select phone code</div>
                            </div> */}

                            <div className="col-md-6 col-sm-12 pb-sm-3">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <PhoneInput
                                    country={'ngn'}
                                    value={`${formData.business_phone_code}${formData.business_phone}`}
                                    onChange={handlePhoneChange}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true,
                                        placeholder: 'Enter phone number',
                                    }}
                                    containerClass="phone-input-container"
                                    inputClass="form-control phone-input" // Custom class here
                                />

                            </div>

                            </div>
                            <div className="row mb-3">
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                                <label htmlFor="profile_photo" className="form-label">Profile Photo</label>

                                {/* <input type="file" onChange={handleFileChange} className="form-control" name="profile_photo" id="profile_photo" accept=".png, .jpg, .jpeg" /> */}
                                <input
                                type="file"
                                name="profile_photo"
                                onChange={handleEngineerFileChange}
                                className="form-control"
                                accept="image/*"
                                />

                            </div>
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                                <label htmlFor="business_name" className="form-label">
                                Business Name <span className="text-danger">*</span>
                                </label>
                                <input type="text" value={formData.business_name} onChange={handleChange} className="form-control" name="business_name" id="business_name" placeholder="Enter business name" required />
                                <div className="invalid-feedback">Please enter business name</div>
                            </div>
                            </div>
                            <div className="row mb-3">
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                                <label htmlFor="bio" className="form-label">Bio</label>
                                <textarea value={formData.bio} onChange={handleChange} className="form-control" name="bio" id="bio" placeholder="Enter your bio" rows="3"></textarea>
                            </div>
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                                <label htmlFor="work_experience" className="form-label">Work Experience</label>
                                <textarea value={formData.work_experience} onChange={handleChange} className="form-control" name="work_experience" id="work_experience" placeholder="Enter your work experience" rows="3"></textarea>
                            </div>
                            </div>
                            <div className="mb-3 row">
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                                <label className="form-label" htmlFor="password-input">
                                Password
                                </label>
                                <div className="position-relative auth-pass-inputgroup">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control pe-5 password-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    name="password"
                                    placeholder="Enter password"
                                    id="password-input"
                                    required
                                />
                                <button
                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                >
                                    <i className={`ri-${showPassword ? 'eye-off-fill' : 'eye-fill'} align-middle`}></i>
                                </button>
                                <div className="invalid-feedback">Please enter password</div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                                <label className="form-label" htmlFor="confirm-password-input">
                                Confirm Password
                                </label>
                                <div className="position-relative auth-pass-inputgroup">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className="form-control pe-5 password-input"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    id="confirm-password-input"
                                    required
                                />
                                <button
                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    <i className={`ri-${showConfirmPassword ? 'eye-off-fill' : 'eye-fill'} align-middle`}></i>
                                </button>
                                <div className="invalid-feedback">Please confirm password</div>
                                </div>
                            </div>
                            </div>

                            <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="" id="termsCheckEngineer" required />
                            <label className="form-check-label" htmlFor="termsCheckEngineer">
                                I agree to the <a  onClick={() => handleShowModal('Engineer')}>Terms of Use</a>
                            </label>
                            <div className="invalid-feedback">You must agree before submitting</div>
                            </div>

                            
                           
                            <button className="btn py-3 btn-success w-100" type="submit" disabled={loading}>
                              {loading ? (
                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                              ) : (
                                'Register'
                              )}
                            </button>

                            <div className="mt-4 text-center">
                            <div className="">
                                <h2 className="fs-13 mb-4 title">OR</h2>
                            </div>
                            <div className="signin-other-title">
                                <h5 className="fs-13 mb-4 title">Sign In with</h5>
                            </div>
                            <div className="gap-1 d-flex justify-content-center align-items-center">
                                <button type="button" className="btn center text-center btn-primary btn-icon waves-effect waves-light px-0">
                                <i className="ri-facebook-fill fs-16 text-center center"></i>
                                </button>
                                <button type="button" className="btn btn-danger btn-icon waves-effect waves-light px-0">
                                <i className="ri-google-fill fs-16"></i>
                                </button>
                                <button type="button" className="btn btn-dark btn-icon waves-effect waves-light px-0">
                                <i className="ri-github-fill fs-16"></i>
                                </button>
                                <button type="button" className="btn btn-info btn-icon waves-effect waves-light px-0">
                                <i className="ri-twitter-fill fs-16"></i>
                                </button>
                            </div>
                            </div>
                          </form>
                      </div>

                      {/* Client Tab */}
                      <div className={`tab-pane fade ${activeTab === 'client' ? 'show active' : ''} p-2 mt-3`}
                        id="client"
                        role="tabpanel"
                        aria-labelledby="client-tab">
                        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                          {/* Common Fields */}
                          <div className='row mb-3'>
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                              <label htmlFor="first_name" className="form-label">
                                First Name <span className="text-danger">*</span>
                              </label>
                              <input type="text" value={formData.first_name} onChange={handleChange} className="form-control" name="first_name" id="first_name" placeholder="Enter first name" required />
                              <div className="invalid-feedback">Please enter first name</div>
                            </div>
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                              <label htmlFor="last_name" className="form-label">
                                Last Name <span className="text-danger">*</span>
                              </label>
                              <input type="text" value={formData.last_name} onChange={handleChange} className="form-control" name="last_name" id="last_name" placeholder="Enter last name" required />
                              <div className="invalid-feedback">Please enter last name</div>
                            </div>
                          </div>

                          <div className='row mb-3'>
                            <div className='col-md-6 col-sm-12 pb-sm-3'>
                              <label htmlFor="business_email" className="form-label">
                                Business Email <span className="text-danger">*</span>
                              </label>
                              <input type="email" value={formData.business_email} onChange={handleChange} className="form-control" name="business_email" id="business_email" placeholder="Enter email" required />
                              <div className="invalid-feedback">Please enter email</div>
                            </div>
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                              <label htmlFor="phone" className="form-label">Phone Number</label>
                              <PhoneInput
                                  country={'ngn'}
                                  value={`${formData.business_phone_code}${formData.business_phone}`}
                                  onChange={handlePhoneChange}
                                  inputProps={{
                                      name: 'phone',
                                      required: true,
                                      autoFocus: true,
                                      placeholder: 'Enter phone number',
                                  }}
                                  containerClass="phone-input-container"
                                  inputClass="form-control phone-input" // Custom class here
                              />

                            </div>

                          </div>

                          <div className="row mb-3">
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                              <label htmlFor="profile_photo" className="form-label">Profile Photo</label>
                              {/* <input type="file" onChange={handleChange} className="form-control" name="profile_photo" id="profile_photo" /> */}
                            
                              <input
                                type="file"
                                name="profile_photo"
                                onChange={handleFileChange}
                                className="form-control"
                                accept="image/*"
                              />

                            </div>

                            <div className="col-md-6 col-sm-12 pb-sm-3">
                              <label htmlFor="business_name" className="form-label">
                                Business Name <span className="text-danger">*</span>
                              </label>
                              <input type="text" value={formData.business_name} onChange={handleChange} className="form-control" name="business_name" id="business_name" placeholder="Enter business name" required />
                              <div className="invalid-feedback">Please enter business name</div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-12 col-sm-12 pb-sm-3">
                              <label htmlFor="business_website" className="form-label">Business Website</label>
                              <input type="url" value={formData.business_website} onChange={handleChange} className="form-control" name="business_website" id="business_website" placeholder="Enter business website" />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                              <label className="form-label" htmlFor="password-input">
                                Password
                              </label>
                              <div className="position-relative auth-pass-inputgroup">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  className="form-control pe-5 password-input"
                                  value={formData.password}
                                  onChange={handleChange}
                                  name="password"
                                  placeholder="Enter password"
                                  id="password-input"
                                  required
                                />
                                <button
                                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                  type="button"
                                  onClick={togglePasswordVisibility}
                                >
                                  <i className={`ri-${showPassword ? 'eye-off-fill' : 'eye-fill'} align-middle`}></i>
                                </button>
                                <div className="invalid-feedback">Please enter password</div>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12 pb-sm-3">
                              <label className="form-label" htmlFor="confirm-password-input">
                                Confirm Password
                              </label>
                              <div className="position-relative auth-pass-inputgroup">
                                <input
                                  type={showConfirmPassword ? 'text' : 'password'}
                                  className="form-control pe-5 password-input"
                                  value={formData.password_confirmation}
                                  onChange={handleChange}
                                  name="password_confirmation"
                                  placeholder="Confirm password"
                                  id="confirm-password-input"
                                  required
                                />
                                <button
                                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                  type="button"
                                  onClick={toggleConfirmPasswordVisibility}
                                >
                                  <i className={`ri-${showConfirmPassword ? 'eye-off-fill' : 'eye-fill'} align-middle`}></i>
                                </button>
                                <div className="invalid-feedback">Please confirm password</div>
                              </div>
                            </div>
                          </div>
                          <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="" id="termsCheckClient" required />
                            <label className="form-check-label" htmlFor="termsCheckClient">
                              I agree to the <a href="#"  onClick={() => handleShowModal('Clients')}>Terms of Use</a>
                            </label>
                            <div className="invalid-feedback">You must agree before submitting</div>
                          </div>
                          
                          
                          <button className="btn btn-success py-3 w-100" type="submit" disabled={loading}>
                            {loading ? (
                              <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              'Register'
                            )}
                          </button>

                          <div className="mt-4 text-center">
                            <div className="">
                              <h2 className="fs-13 mb-4 title">OR</h2>
                            </div>
                            <div className="signin-other-title">
                              <h5 className="fs-13 mb-4 title">Sign In with</h5>
                            </div>
                            <div className="gap-1 d-flex justify-content-center align-items-center">
                              <button type="button" className="btn center text-center btn-primary btn-icon waves-effect waves-light px-0">
                                <i className="ri-facebook-fill fs-16 text-center center"></i>
                              </button>
                              <button type="button" className="btn btn-danger btn-icon waves-effect waves-light px-0">
                                <i className="ri-google-fill fs-16"></i>
                              </button>
                              <button type="button" className="btn btn-dark btn-icon waves-effect waves-light px-0">
                                <i className="ri-github-fill fs-16"></i>
                              </button>
                              <button type="button" className="btn btn-info btn-icon waves-effect waves-light px-0">
                                <i className="ri-twitter-fill fs-16"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="mb-0">Already have an account ? <Link to="/" className="fw-semibold text-primary text-decoration-underline">Sign In</Link> </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Terms of Use Modal */}





            </div>



          </div>
        </div>


      </div>
      <div className='w-100'>

      {showModal && (
        <div
          className="modal    show"
          tabIndex="-1"
          role="dialog"
          style={{
           
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            display: 'block',
            
          }}
        >
          <div className="modal-dialog py-4 mb-4    modal-md" role="document" style={{ margin: 'auto', maxWidth: '70%' }}>
            <div className="modal-content " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
              
              <div className="modal-body">
                {renderModalContent()}
            
              </div>
            </div>
          </div>
        </div>
      )}


      </div>

     

    </div>
  );
}