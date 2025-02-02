import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './style.css';
import toast , { Toaster } from 'react-hot-toast';
import axiosInstance from '../../axiosInstance';

export default function VerifyPasswordOtp() {
 const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};
    const [otp, setOtp] = useState('');
    const [isUploading, setIsUploading] = useState(false);

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

  // Redirect if email is not present
  useEffect(() => {
    if (!email) {
        toast.error("Unauthorized access. Please go back to the login page.");
        navigate('/'); // Redirect to login page
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
        toast.error("Please enter the OTP.");
        return;
    }

    setIsUploading(true); 

    


    try {
      const response = await axiosInstance.post('/password/code/check', {
          code: otp,
          business_email: email,
      });

      if (response.data.success) {
          toast.success(response.data.message);
          // Navigate to the New Password page
          navigate('/dase/newpassword', { state: { email, code: otp } });
      } else {
          toast.error(response.data.message);
      }
      } catch (error) {
          toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
      }finally {
        setIsUploading(false); // Reset loading state
    }
  }

// const handleResend = async () => {
//     if (FPEmail) {
//         let business_email = FPEmail.trim();

//         const dataToSend = {
//             business_email: business_email
//         };
//         setIsUploading(true)

//         try {
//             const response = await axiosInstance.post('/change-password', {
               
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(dataToSend)
//             });
//             const data = await response.json();
//             // handle response
//             if (response.ok) {
//                 notifySuccess(data.message)
//             } else {
//                 notifyError(data.message)
//                 // handle error response
//                 console.error('Registration failed:', data);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         } finally {
//         setIsUploading(false)
//         }
//     }
// }

  return (
    <div>
      <Toaster />
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
                      <h5 className="text-primary">Verify OTP</h5>
                      <p className="text-muted">Enter the OTP sent to {email}</p>
                    </div>
                    <div className="p-2 mt-4">
                      <form className="needs-validation"  onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="code" className="form-label">Code <span className="text-danger">*</span></label>
                          <input type="text"  className="form-control"  placeholder="Enter verification code" required
                          
                            name="otp"
                            maxLength={6}
                           
                            pattern="\d{1,6}"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)} />
                          <div className="invalid-feedback">Please enter verification code</div>
                        </div>
                        <div className="mt-4">
                          <button className="btn btn-success w-100" type="submit" disabled={isUploading}>
                              {isUploading ? 'Verifying...' : 'Verify OTP'}
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <p className="mb-2">Verify to continue </p>
                          <span  style={{cursor: 'pointer'}} className="fw-semibold text-primary"> Resend OTP </span> 
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
