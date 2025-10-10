import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import axiosInstance from '../../axiosInstance';
import { useProfile } from '../../context/ProfileContext';
// import VerificationModal from './verificationPage';

export default function LogIn() {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    login: '',
    password: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { updateProfile } = useProfile();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,}$/; // Assumes phone number is at least 10 digits

    if (!email) {
      return 'Email or Phone is required';
    }
    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      return 'Please enter a valid email or phone number';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateForm = () => {
    const newErrors = {
      login: validateEmail(formData.login),
      password: validatePassword(formData.password)
    };

    setErrors(newErrors);
    return !newErrors.login && !newErrors.password;
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsUploading(true);

    try {
      const response = await axiosInstance.post('/login', formData);
      console.log('📥 Login response:', response.data);
      
      if (response.data.status) {
        notifySuccess(response.data.message);
        
        // Wait a bit to ensure token is saved in axios interceptor
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Verify token was saved
        const savedAuth = localStorage.getItem('auth_data');
        console.log('✅ Saved auth_data:', savedAuth ? 'Yes' : 'No');
        
        // Now update profile
        const profileUpdated = await updateProfile(true);
        console.log('📋 Profile updated:', profileUpdated);
        
        if (profileUpdated) {
          navigate('/dase/dashboard');
        } else {
          console.error('❌ Failed to load profile after login');
          notifyError('Failed to load profile. Please try logging in again.');
        }
      } else {
        notifyError(response.data.message);
      }
    } catch (err) {
      console.error('❌ Login error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred';
      notifyError(errorMessage);
      
      // Handle specific error cases
      if (err.response?.data?.requiresVerification || err.response?.status === 403) {
        navigate('/dase/verifyotp');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {isUploading && (
        <div className='border d-flex justify-content-center align-items-center'
          style={{
            position: 'sticky',
            top: '10px',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            background: 'white',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '10'
          }}>
          {/* Loading Spinner Here */}
        </div>
      )}
      <div className="auth-page-wrapper pt-5">
        <Toaster />
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>
          <div className="shape"></div>
        </div>

        <div className="auth-page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <h1 className="bg-transparent login-title" style={{ color: '#fff' }}>Login</h1>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card mt-4">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back!</h5>
                      <p className="text-muted">Sign in to continue to Dase.</p>
                    </div>
                    <div className="p-2 mt-4">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="useremail" className="form-label">
                            Email / Phone <span className="text-danger">*</span>
                          </label>
                          <input
                            value={formData.login}
                            onChange={handleChange}
                            className={`form-control ${errors.login ? 'is-invalid' : ''}`}
                            type="text"
                            placeholder="Email / Phone No."
                            name="login"
                            required
                          />
                          {errors.login && (
                            <div className="invalid-feedback">
                              {errors.login}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link to="/dase/forget-password" className="text-muted cursor">
                              Forgot password?
                            </Link>
                          </div>
                          <label className="form-label" htmlFor="password-input">
                            Password <span className="text-danger">*</span>
                          </label>
                          <div className="position-relative auth-pass-inputgroup">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={formData.password}
                              onChange={handleChange}
                              className={`form-control pe-5 password-input ${errors.password ? 'is-invalid' : ''}`}
                              placeholder="Enter password"
                              name="password"
                              required
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              onClick={togglePasswordVisibility}
                            >
                              <i className={`ri-${showPassword ? 'eye-off-fill' : 'eye-fill'} align-middle`}></i>
                            </button>
                            {errors.password && (
                              <div className="invalid-feedback">
                                {errors.password}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                          <label className="form-check-label" htmlFor="auth-remember-check">Remember me</label>
                        </div>

                        <div className="mt-4">
                          <button className="btn btn-success w-100" type="submit" disabled={isUploading}>
                            {isUploading ? (
                              <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              'Sign In'
                            )}
                          </button>
                        </div>

                        {/* <div className="mt-4 text-center">
                          <h2 className="fs-13 mb-4 title">OR</h2>
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">Sign In with</h5>
                          </div>
                          <div className="gap-1 d-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-primary btn-icon waves-effect waves-light px-0">
                              <i className="ri-facebook-fill fs-16"></i>
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
                        </div> */}
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="mb-0">Don't have an account? <Link to="/dase/register" className="fw-bold text-primary">Sign Up</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <VerificationModal 
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={formData.login}
      /> */}
    </div>
  );
}
