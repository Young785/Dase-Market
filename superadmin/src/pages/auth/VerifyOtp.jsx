import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { verify2FA } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);

    try {
      await verify2FA(otp);
      toast.success('Verification successful!');
      navigate('/superadmin/dashboard');
    } catch (error) {
      toast.error(error.message || 'Verification failed. Please try again.');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper pt-5">
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div className="bg-overlay"></div>
        <div className="shape">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1440 120">
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
          </svg>
        </div>
      </div>

      <div className="auth-page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link to="/login" className="d-inline-block auth-logo">
                    <img src="/src/assets/images/logo-light.png" alt="Logo" height="20" />
                  </Link>
                </div>
                <p className="mt-3 fs-15 fw-medium">Superadmin Portal</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Two-Factor Authentication</h5>
                    <p className="text-muted">Enter the 6-digit code from your authenticator app</p>
                  </div>
                  <div className="p-2 mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          renderInput={(props) => <input {...props} />}
                          containerStyle="justify-content-center gap-2"
                          inputStyle={{
                            width: '45px',
                            height: '45px',
                            fontSize: '20px',
                            borderRadius: '8px',
                            border: '1px solid #ced4da',
                            textAlign: 'center'
                          }}
                          shouldAutoFocus
                        />
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-success w-100"
                          type="submit"
                          disabled={loading || otp.length !== 6}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Verifying...
                            </>
                          ) : (
                            'Verify Code'
                          )}
                        </button>
                      </div>

                      <div className="mt-3 text-center">
                        <Link to="/login" className="text-muted">
                          <i className="mdi mdi-arrow-left me-1"></i> Back to Login
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="mb-0 text-white-50">
                  © {new Date().getFullYear()} Dase Market. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;

