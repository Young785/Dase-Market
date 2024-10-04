
import  { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import toast from 'react-hot-toast';

export default function NewPassword() {
  const navigate = useNavigate();
  let getAuth
  let FPEmail = localStorage.getItem('fp_email');
  let FP_OTP = localStorage.getItem('FP_OTP');
  const [ setIsUploading] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    lower: false,
    upper: false,
    number: false,
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
  const notifyError = (text) => toast.error(text, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  // Update password validations
  useEffect(() => {
    const length = password.length >= 8;
    const lower = /[a-z]/.test(password);
    const upper = /[A-Z]/.test(password);
    const number = /\d/.test(password);
    setValidations({ length, lower, upper, number });
  }, [password]);

  useEffect(() => {
    getAuth = JSON.parse(localStorage.getItem('auth_data'));
    if (getAuth) {
      notifySuccess("Authorized!");
      setTimeout(() => {
        window.location.href = '/dase/dashboard';
      }, 2000);
    }
  }, []);

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

//   const handleChange = (e) => {
//     setPassword(e.target.value);
//     setConfirmPassword(e.target.value);
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
// };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && confirmPassword) {
      if (isPasswordMatching()) {
        const dataToSend = {
          code: FP_OTP,
          business_email: FPEmail,
          password: password.trim(),
          password_confirmation: confirmPassword.trim(),
        };

        setIsUploading(true);

        try {
          const response = await axiosInstance.post('/dase/reset-password', {
            
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          });

          const data = await response.json();

          if (response.ok) {
            notifySuccess(data.message);
            setTimeout(() => {
              navigate('/');
            }, 1500);
          } else {
            notifyError(data.message);
            console.error('Process failed:', data);
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsUploading(false);
        }
      } else {
        notifyError('Passwords do not match');
      }
    } else {
      notifyError('Please fill in all fields');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Check if passwords match
  const isPasswordMatching = () => password === confirmPassword;

  return (
    <>
      
      <div>
        {/* {IsUploading && (
          <div className="border d-flex justify-content-center align-items-center"
            style={{
              position: 'sticky', top: '10px', width: '35px', height: '35px',
              borderRadius: '50%', background: 'white', left: '50%',
              transform: 'translateX(-50%)', zIndex: '10'
            }}>
            <CircularProgress
              style={{ stroke: "#000", strokeWidth: '4px' }}
              className="position-relative"
              size="1rem"
              sx={{ strokeWidth: '4px' }}
            />
          </div>
        )} */}
        <div className="auth-page-wrapper pt-5">
          <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div className="bg-overlay"></div>
            <div className="shape">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 1440 120"
              >
                <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
              </svg>
            </div>
          </div>

          <div className="auth-page-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center mt-sm-5 mb-4 text-white-50">
                    {/* <div>
                      <a href="index.html" className="d-inline-block auth-logo">
                        <img src="assets/images/logo-light.png" alt="" height="20" />
                      </a>
                    </div> */}
                    <div>
                        <a href="index.html" className="d-inline-block auth-logo">
                        <span className='dase-logo' height="20">DASE</span>
                        </a>
                    </div>
                    <p className="mt-3 fs-15 fw-medium">
                      Premium Admin & Dashboard Template
                    </p>
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5">
                  <div className="card mt-4">
                    <div className="card-body p-4">
                      <div className="text-center mt-2">
                        <h5 className="text-primary">Create new password</h5>
                        <p className="text-muted">
                          Your new password must be different from previously used passwords.
                        </p>
                      </div>

                      <div className="p-2">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="password-input">
                              Password
                            </label>
                            <div className="position-relative auth-pass-inputgroup">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control pe-5 password-input"
                                onPaste={(e) => e.preventDefault()} // Prevent paste
                                placeholder="Enter password"
                                id="password-input"
                                aria-describedby="passwordInput"
                                value={password}
                                onChange={handlePasswordChange}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                required
                              />
                              <button
                                type="button"
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                id="password-addon"
                                onClick={togglePasswordVisibility}
                              >
                                <i className={showPassword ? 'ri-eye-off-fill' : 'ri-eye-fill'}></i>
                              </button>
                            </div>
                            <div id="passwordInput" className="form-text">
                              Must be at least 8 characters.
                            </div>
                          </div>

                          <div className="mb-3">
                            <label className="form-label" htmlFor="confirm-password-input">
                              Confirm Password
                            </label>
                            <div className="position-relative auth-pass-inputgroup mb-3">
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="form-control pe-5 password-input"
                                onPaste={(e) => e.preventDefault()} // Prevent paste
                                placeholder="Confirm password"
                                id="confirm-password-input"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                required
                              />
                              <button
                                type="button"
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                id="confirm-password-addon"
                                onClick={toggleConfirmPasswordVisibility}
                              >
                                <i className={showConfirmPassword ? 'ri-eye-off-fill' : 'ri-eye-fill'}></i>
                              </button>
                            </div>
                            {password && confirmPassword && !isPasswordMatching() && (
                              <div className="form-text">
                                Passwords do not match
                              </div>
                            )}
                          </div>

                          {password && (
                            <div className="p-3 bg-light mb-2 rounded">
                              <h5 className="fs-13">Password must contain:</h5>
                              <p
                                id="pass-length"
                                className={`fs-12 mb-2 ${validations.length ? 'valid' : 'invalid'}`}
                              >
                                Minimum <b>8 characters</b>
                              </p>
                              <p
                                id="pass-lower"
                                className={`fs-12 mb-2 ${validations.lower ? 'valid' : 'invalid'}`}
                              >
                                At least <b>one lowercase</b> letter (a-z)
                              </p>
                              <p
                                id="pass-upper"
                                className={`fs-12 mb-2 ${validations.upper ? 'valid' : 'invalid'}`}
                              >
                                At least <b>one uppercase</b> letter (A-Z)
                              </p>
                              <p
                                id="pass-number"
                                className={`fs-12 mb-0 ${validations.number ? 'valid' : 'invalid'}`}
                              >
                                At least <b>one number</b> (0-9)
                              </p>
                            </div>
                          )}

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="auth-remember-check"
                            />
                            <label className="form-check-label" htmlFor="auth-remember-check">
                              Remember me
                            </label>
                          </div>

                          <div className="mt-4">
                            <button className="btn btn-success w-100" type="submit">
                              Reset Password
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="mb-0">
                      Wait, I remember my password...{' '}
                      <a
                        href="/"
                        className="fw-semibold text-primary text-decoration-underline"
                      >
                        Click here
                      </a>{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center">
                    <p className="mb-0 text-muted">
                      &copy; <script>document.write(new Date().getFullYear())</script> Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
