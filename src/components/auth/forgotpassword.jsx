// Signup.jsx

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LordIcon from './lordIcon.jsx';
import './style.css'

import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../axiosInstance.js';


export default function ForgotPassword() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Email) {
      toast.error("Please enter your email.");
      return;
    }

    setIsUploading(true); // Set loading state to true

    try {
      const response = await axiosInstance.post('/change-password', {
        business_email: Email,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Navigate to the OTP verification page
        navigate('/dase/verifypasswordotp', { state: { email: Email } });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsUploading(false); // Reset loading state
    }
  };

  return (
    <>
      <Toaster />
      <div className="auth-page-wrapper pt-5">
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>

          <div className="shape">
            {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                  <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
              </svg> */}
          </div>
        </div>

        <div className="auth-page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  {/* <div>
                    <a href="index.html" className="d-inline-block auth-logo">
                      <img src="/public/dase/assets/images/logo-light.png" alt="" height="20" />
                    </a>
                  </div> */}
                  <div>
                      <a href="index.html" className="d-inline-block auth-logo">
                          <span className='dase-logo' height="20">DASE</span>
                      </a>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5">
                  <div className="card mt-4">
                    <div className="card-body p-4">
                      <div className="text-center mt-2">
                        <h5 className="text-primary">Forgot Password?</h5>
                        <p className="text-muted">Reset password with dase</p>

                        <LordIcon
                          src="https://cdn.lordicon.com/rhvddzym.json"
                          trigger="loop"
                          colors="primary:#0ab39c"
                          className="avatar-xl"
                          
                        />

                      </div>

                      <div className="alert border-0 alert-warning text-center mb-2 mx-2" role="alert">
                        Enter your email and instructions will be sent to you!
                      </div>
                      <div className="p-2">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter your email"
                              value={Email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>

                          <div className="mt-4">
                            <button className="btn btn-success w-100" type="submit" disabled={isUploading}>
                              {isUploading ? 'Sending...' : 'Send OTP'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="mb-0">Wait, I remember my password... <a href="/" className="fw-semibold text-primary cursor text-decoration-underline"> Click here </a> </p>
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
                    {/* <p className="mb-0 text-muted">&copy;
                      <script>document.write(new Date().getFullYear())</script> Velzon. Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand
                    </p> */}
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
