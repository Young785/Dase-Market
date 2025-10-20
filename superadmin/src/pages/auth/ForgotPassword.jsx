import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      await forgotPassword(email);
      setSent(true);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset link');
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
                    <h5 className="text-primary">Forgot Password?</h5>
                    <p className="text-muted">
                      {sent
                        ? 'Check your email for password reset instructions'
                        : 'Enter your email and we\'ll send you reset instructions'}
                    </p>
                  </div>

                  {sent ? (
                    <div className="p-2 mt-4">
                      <div className="text-center">
                        <div className="avatar-md mx-auto">
                          <div className="avatar-title bg-light text-success rounded-circle display-5">
                            <i className="ri-checkbox-circle-line"></i>
                          </div>
                        </div>
                        <div className="mt-4 pt-2">
                          <h4>Email Sent!</h4>
                          <p className="text-muted mx-4">
                            We've sent password reset instructions to <strong>{email}</strong>
                          </p>
                          <div className="mt-4">
                            <Link to="/login" className="btn btn-success w-100">
                              Back to Login
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 mt-4">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Sending...
                              </>
                            ) : (
                              'Send Reset Link'
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
                  )}
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

export default ForgotPassword;

