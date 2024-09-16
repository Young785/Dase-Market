import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import toast from 'react-hot-toast';
import axiosInstance from '../axiosInstance.js';

export default function VerifyCode() {
  
  const [OTPcode, setOTPCode] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const notifySuccess = (text) => toast.success(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });

  const notifyError = (text) => toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });

  useEffect(() => {
    const getAuth = JSON.parse(localStorage.getItem('signup_record'));
    if (!getAuth) {
      notifyError('Kindly proceed to login!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      handleConfirmAcct();
    }
  }, []);

  const handleConfirmAcct = async () => {
    const getrecord = JSON.parse(localStorage.getItem('signup_record'));

    if (getrecord) {
      const obj = {
        phone_code: getrecord.business_phone_code,
        phone_number: getrecord.business_phone,
        business_email: getrecord.business_email,
      };

      setIsUploading(true);

      try {
        const response = await axiosInstance.post('/confirm-account', obj);
        if (response.data.status) {
          notifySuccess('Verification code sent successfully.');
        } else {
          notifyError(response.data.message);
        }
      } catch (error) {
        notifyError('Failed to send verification code.', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const getrecord = JSON.parse(localStorage.getItem('signup_record'));

    if (getrecord) {
      const obj = {
        code: OTPcode,
        account_id: getrecord.account_id,
      };

      setIsUploading(true);

      try {
        const response = await axiosInstance.post('/verify-code', obj);
        if (response.data.status) {
          notifySuccess(response.data.message);
          setTimeout(() => {
            navigate('/dashboard'); // Redirect to the dashboard on success
          }, 1500);
        } else {
          notifyError(response.data.message);
        }
      } catch (error) {
        notifyError('Verification failed.', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
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
            } */}
      <div className="auth-page-wrapper pt-5">
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>
          <div className="shape"></div>
        </div>
        <div className="auth-page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
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
              <div className="col-md-9 col-lg-7 col-xl-6">
                <div className="card mt-4">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Verify Your Code</h5>
                      <p className="text-muted">Get your free dase account now</p>
                    </div>
                    <div className="p-2 mt-4">
                      <form className="needs-validation" noValidate onSubmit={handleSendOTP}>
                        <div className="mb-3">
                          <label htmlFor="code" className="form-label">Code <span className="text-danger">*</span></label>
                          <input type="number"  className="form-control"  placeholder="Enter verification code" required
                          
                            name="phone"
                            maxLength={6}
                            pattern="\d{1,6}"
                            value={OTPcode}
                            onChange={(e) => setOTPCode(e.target.value)} />
                          <div className="invalid-feedback">Please enter verification code</div>
                        </div>
                        <div className="mt-4">
                          {/* <button className="btn btn-success w-100" type="submit">Verify</button> */}
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isUploading}
                          >
                            {isUploading ? 'Verifying...' : 'Verify'}
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <p className="mb-2">Verify to continue </p>
                          <span onClick={handleConfirmAcct} style={{cursor: 'pointer'}} className="fw-semibold text-primary"> Resend OTP </span> 
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="mb-0">Already have an account? <Link to="/" className="fw-semibold text-primary text-decoration-underline"> Signin </Link> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
