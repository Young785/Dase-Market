import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import toast from 'react-hot-toast';
import axiosInstance from '../../axiosInstance';


export default function ConfirmAccount() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleConfirmAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/confirm-account', {
        
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
        })
      });

      const data = await response.json();
      if (data.status) {
        toast.success(data.message);
        navigate('/verify-code');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error confirming account:', error);
      toast.error('Account confirmation failed. Please try again.');
    }
  };

  return (
    <div>
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
                      <h5 className="text-primary">Confirm Your Account</h5>
                      <p className="text-muted">Get your free dase account now</p>
                    </div>
                    <div className="p-2 mt-4">
                      <form className="needs-validation" noValidate onSubmit={handleConfirmAccount}>
                        <div className="mb-3">
                          <label htmlFor="useremail" className="form-label">Email <span className="text-danger">*</span></label>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="useremail" placeholder="Enter email address" required />
                          <div className="invalid-feedback">Please enter email</div>
                        </div>
                        <div className="mt-4">
                          <button className="btn btn-success w-100" type="submit">Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="mb-0">Already have an account? <Link href="/" className="fw-semibold text-primary text-decoration-underline"> Signin </Link> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
