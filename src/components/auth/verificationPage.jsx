import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './style.css';

export default function VerificationPage() {
    const navigate = useNavigate();
    const email = localStorage.getItem('pending_verification_email');

    return (
        <div className="auth-page-wrapper pt-5">
            <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
                <div className="bg-overlay"></div>
                <div className="shape"></div>
            </div>

            <div className="auth-page-content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="card mt-4">
                                <div className="card-body p-4 text-center">
                                    <div className="avatar-lg mx-auto mt-2">
                                        <div className="avatar-title bg-light text-primary display-3 rounded-circle">
                                            <i className="ri-mail-check-line"></i>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-2">
                                        <h4>Verify Your Email</h4>
                                        <p className="text-muted">
                                            We've sent a verification link to your email address.
                                            Please check your email and click on the verification link to activate your account.
                                        </p>
                                        <p className="text-muted">
                                            {/* Email sent to: <strong>{email}</strong> */}
                                        </p>
                                        <div className="mt-4">
                                            <p className="my-4"> Click here to return to the login page. <Link to="/dase/login" className="fw-bold text-primary">Back to Login</Link></p>
                                            <button 
                                                className="btn btn-primary w-100"
                                                onClick={() => {
                                                    localStorage.removeItem('pending_verification_email');
                                                    navigate('/dase/login');
                                                }}
                                            >
                                                Resend Verification Otp
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}