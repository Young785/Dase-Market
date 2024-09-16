import PhoneInput from 'react-phone-input-2';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// src/App.js
import { Link } from 'react-router-dom';
// import Link from 'next/link';
// import PhoneCode from './phone_code';
import toast from 'react-hot-toast';
import './register.css'
import axiosInstance from '../axiosInstance';
// import CircularProgress from '@mui/material/CircularProgress';

export default function Register() {
    const navigate = useNavigate();
  let getAuth;
  const [IsUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    business_email: "",
    business_phone_code: "",
    business_phone: "",
    role: "",
    business_name: "",
    business_website: "",
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
      business_website: "",
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
    e.preventDefault();
    setIsUploading(true);

    const role = activeTab;
    const updatedFormData = { ...formData, role: role };

    // Conditionally validate fields based on the active tab
    const requiredFields = [
        'first_name',
        'last_name',
        'business_email',
        'password',
        'password_confirmation'
    ];

    if (activeTab === 'engineer') {
        requiredFields.push('business_name');
    } else if (activeTab === 'client') {
        requiredFields.push('business_name', 'business_website');
    }

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

                try {
                    const response = await axiosInstance.post('/register', dataToSend, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (response.data.status === false) {
                        notifyError(`Registration failed: ${response.data.message || 'Unknown error'}`);
                        return;
                    }

                    const data = response.data;
                    notifySuccess(data.message);
                    localStorage.setItem('signup_record', JSON.stringify(data.user));
                    navigate('/dase/verifyotp');
                } catch (error) {
                    notifyError(`An error occurred: ${error.message}`);
                } finally {
                    setIsUploading(false);
                }
            } else {
                notifyError('Phone number should not be more than 11 characters');
            }
        } else {
            notifyError('Passwords do not match');
        }
    } else {
        notifyError('Please fill in all required fields');
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
        <div>
          <h5>Engineer Terms of Use</h5>
          <p>
            I attest that details of my registration as required and subsequently supplied by me are absolutely true, and that I shall operate on DASE MARKET PLACE platform within the scope of DASE MARKET PLACE regulations, and that I shall completely embrace the standard of professional conducts in relating with clients who request my professional “Digital Audio Sound Engineer” services.
          </p>
          <p>
            I pledge to always treat DASE MARKET PLACE clients just right, and that I shall steadily relate with my customers with mutual respect, and that I shall always do the best possible to help DASE MARKET PLACE clients attain their desires on every productions contracted to me in trust.
          </p>
          <p>
            I agree without reservation that with or without formal notice, my registered DASE MARKET PLACE account...
          </p>
        </div>
      );
    } else if (activeTab === 'client') {
      return (
        <div>
         
          <p>
            I attest that details of my registration as required and subsequently supplied by me are absolutely true, and that I shall operate on DASE MARKET PLACE platform within the scope of DASE MARKET PLACE regulations, and that I shall completely embrace the standard of professional conducts in relating with clients who request my professional “Digital Audio Sound Engineer” services.
          </p>
          <p>
            I pledge to always treat DASE MARKET PLACE clients just right, and that I shall steadily relate with my customers with mutual respect, and that I shall always do the best possible to help DASE MARKET PLACE clients attain their desires on every productions contracted to me in trust.
          </p>
          <p>
            I agree without reservation that with or without formal notice, my registered DASE MARKET PLACE account...
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      

       
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

            <button className="btn btn-success
            w-100" type="submit">Register</button>
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
  );
}
