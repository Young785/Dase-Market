import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: searchParams.get('email') || '',
    code: searchParams.get('code') || '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.code || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(
        formData.email,
        formData.code,
        formData.password,
        formData.password_confirmation
      );
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
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
                    <h5 className="text-primary">Reset Password</h5>
                    <p className="text-muted">Create your new password</p>
                  </div>
                  <div className="p-2 mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          readOnly={!!searchParams.get('email')}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Reset Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="code"
                          value={formData.code}
                          onChange={handleChange}
                          required
                          readOnly={!!searchParams.get('code')}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <div className="position-relative auth-pass-inputgroup">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control pe-5"
                            name="password"
                            placeholder="Enter new password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <i className={`ri-eye${showPassword ? '-off' : ''}-fill align-middle`}></i>
                          </button>
                        </div>
                        <small className="text-muted">Minimum 8 characters</small>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <div className="position-relative auth-pass-inputgroup">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control pe-5"
                            name="password_confirmation"
                            placeholder="Confirm new password"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                          />
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <i className={`ri-eye${showConfirmPassword ? '-off' : ''}-fill align-middle`}></i>
                          </button>
                        </div>
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
                              Resetting...
                            </>
                          ) : (
                            'Reset Password'
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

export default ResetPassword;

