// Signup.jsx

import { useState, useEffect } from "react";
import {  useNavigate } from 'react-router-dom';
import LordIcon from './lordIcon.jsx';
import './style.css'

import toast from 'react-hot-toast';
import axiosInstance from '../../axiosInstance.js';


export default function ForgotPassword() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  let getAuth
  const [ setIsUploading] = useState(null);

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
          notifySuccess("Authorized!")
          setTimeout(() => {
              window.location.href = '/dase/dashboard';
              
              // navigate('/streamers/dashboard');
          }, 2000);
      }
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (Email) {
          let email = Email.trim();

          const dataToSend = {
              email: email
          };
          setIsUploading(true)

          try {
              const response = await axiosInstance.post('/dase/change-password', {
                 
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(dataToSend)
              });
              const data = await response.json();
              // handle response
              if (response.ok) {
                  notifySuccess(data.message)
                  localStorage.setItem('fp_email', email)

                  setTimeout(() => {

                      navigate('/dase/verifypasswordotp');
                  }, 2000);
                  // navigate('/streamers/newpassword');
              } else {
                  notifyError(data.message)
                  // handle error response
                  console.error('Registration failed:', data);
              }
          } catch (error) {
              console.error('Error:', error);
          } finally {
          setIsUploading(false)
          }
      }
  }
  return (
    <>
      
      <div>
        {/* {IsUploading &&
          <div className='border d-flex justify-content-center align-items-center' 
          style={{position: 'sticky', top: '10px', width: '35px', height: '35px', borderRadius: '50%', background: 'white', left: '50%', transform: 'translateX(-50%)', zIndex: '10'}}>
              <CircularProgress
                  style={{ stroke: "#000", strokeWidth: '4px' }}
                  className="position-relative"
                  size="1rem"
                  sx={{ strokeWidth: '4px' }}
              />
          </div>
        }
        <ToastContainer /> */}
        
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
                            <input type="email" className="form-control" name="email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                          </div>

                          <div className="text-center mt-4">
                            <button className="btn mb-3 btn-success w-100" type="submit">Send Reset Link</button>
                            <span className="black" >We'll send an otp to your Email</span>
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
