import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './style.css';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../axiosInstance.js';

export default function VerificationPage() {
    const navigate = useNavigate();
    const [isUploading, setIsUploading] = useState(false);

    const notifySuccess = (text) =>
        toast.success(text, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    const notifyError = (text) =>
        toast.error(text, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    const handleConfirmAcct = async () => {
        const getrecord = JSON.parse(localStorage.getItem('signup_record'));

        if (!getrecord) {
            notifyError('Kindly proceed to login!');
            setTimeout(() => {
                navigate('/');
            }, 1500);
            return;
        }

        const obj = {
            phone_code: getrecord.business_phone_code,
            phone_number: getrecord.business_phone,
            business_email: getrecord.business_email,
        };

        setIsUploading(true);

        try {
            const response = await axiosInstance.post('/confirm-account', obj);
            if (response.data.status) {
                localStorage.setItem('otp_sent', 'true');
                notifySuccess(response.data.message);
            } else {
                notifyError(response.data.message);
            }
        } catch (error) {
            notifyError('Failed to send verification code.');
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        // If a previous OTP message exists (from registration), show it
        const otpMessage = localStorage.getItem('otp_message');
        if (otpMessage) {
            notifySuccess(otpMessage);
            localStorage.removeItem('otp_message');
        }

        // Only send OTP automatically if it hasn't already been sent
        const otpAlreadySent = localStorage.getItem('otp_sent');
        if (!otpAlreadySent) {
            handleConfirmAcct();
        }
    }, []);

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
                                    <Toaster />
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
                                        <div className="mt-4">
                                            <p className="my-4"> Click here to return to the login page. <Link to="/dase/login" className="fw-bold text-primary">Back to Login</Link></p>
                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={handleConfirmAcct}
                                                disabled={isUploading}
                                            >
                                                {isUploading ? 'Sending...' : 'Resend Verification OTP'}
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