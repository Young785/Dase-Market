import { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';

// Paystack public key
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_04410bf321ada7acd4184e58f61c86bef1111f8d';

function PaymentForm({ invoice, onSuccess, onCancel }) {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setProcessing(true);
        setError(null);

        try {
            // Check if PaystackPop is available
            if (!window.PaystackPop) {
                setError('Paystack library not loaded. Please refresh the page.');
                setProcessing(false);
                return;
            }

            // Get user email from auth data
            const authData = JSON.parse(localStorage.getItem('auth_data') || '{}');
            const userEmail = authData.user?.business_email || authData.user?.email;

            if (!userEmail) {
                setError('User email not found. Please login again.');
                setProcessing(false);
                return;
            }

            // Create transaction reference
            const reference = `TXN_${invoice.invoice_id}_${Date.now()}`;

            // Initialize Paystack Inline Payment
            const handler = window.PaystackPop.setup({
                key: PAYSTACK_PUBLIC_KEY,
                email: userEmail,
                amount: Math.round(parseFloat(invoice.total_amount) * 100), // Amount in kobo (cents)
                currency: 'NGN',
                ref: reference,
                metadata: {
                    invoice_id: invoice.invoice_id,
                    invoice_number: invoice.invoice_number,
                    custom_fields: [
                        {
                            display_name: "Invoice Number",
                            variable_name: "invoice_number",
                            value: invoice.invoice_number
                        }
                    ]
                },
                callback: function(response) {
                    // Payment successful - verify on backend
                    axiosInstance.post(`/invoices/${invoice.invoice_id}/verify-payment`, {
                        reference: response.reference,
                        payment_method: 'paystack'
                    })
                    .then(verifyResp => {
                        if (verifyResp.data?.success) {
                            setSuccess(true);
                            toast.success('Payment successful!');
                            setTimeout(() => onSuccess(verifyResp.data.data), 1000);
                        } else {
                            setError('Payment verification failed. Please contact support with reference: ' + response.reference);
                            setProcessing(false);
                        }
                    })
                    .catch(err => {
                        console.error('Verification error:', err);
                        setError('Payment verification failed. Please contact support with reference: ' + response.reference);
                        setProcessing(false);
                    });
                },
                onClose: function() {
                    // User closed the payment modal
                    setProcessing(false);
                    setError('Payment cancelled. Please try again.');
                }
            });

            // Open Paystack payment modal
            handler.openIframe();
        } catch (err) {
            console.error('Payment error:', err);
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            {success ? (
                <div className="text-center py-5">
                    <CheckCircle size={64} className="text-success mx-auto mb-3" />
                    <h4 className="text-success">Payment Successful!</h4>
                    <p className="text-muted">Your payment has been processed.</p>
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        <div className="alert alert-info d-flex align-items-start mb-0">
                            <i className="ri-information-line me-2 fs-5"></i>
                            <div>
                                <strong>Paystack Payment</strong>
                                <p className="mb-0 mt-1">A secure payment popup will appear for you to complete your payment using card, bank transfer, or mobile money.</p>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="alert alert-danger d-flex align-items-start" role="alert">
                            <AlertCircle size={20} className="me-2 flex-shrink-0 mt-1" />
                            <div>{error}</div>
                        </div>
                    )}

                    <div className="d-flex gap-2 mt-4">
                        <button
                            type="button"
                            className="btn btn-light border flex-grow-1"
                            onClick={onCancel}
                            disabled={processing}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success flex-grow-1"
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Lock size={18} className="me-2" />
                                    Pay ₦{parseFloat(invoice.total_amount || 0).toFixed(2)}
                                </>
                            )}
                        </button>
                    </div>

                    <div className="mt-3 text-center">
                        <small className="text-muted d-flex align-items-center justify-content-center">
                            <Lock size={14} className="me-1" />
                            Secure payment powered by Paystack
                        </small>
                    </div>
                </>
            )}
        </form>
    );
}

export default function PaymentModal({ invoice, show, onClose, onSuccess }) {
    if (!show) return null;

    const handleSuccess = (data) => {
        onSuccess(data);
        onClose();
    };

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-light border-bottom">
                        <div>
                            <h5 className="modal-title mb-1">
                                <i className="ri-secure-payment-line me-2"></i>
                                Pay Invoice
                            </h5>
                            <small className="text-muted">Invoice #{invoice.invoice_number}</small>
                        </div>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-4">
                        <div className="card border-0 bg-primary-subtle mb-4">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <div className="mb-2">
                                            <small className="text-muted text-uppercase">Invoice To</small>
                                            <div className="fw-semibold">{invoice.billing_full_name}</div>
                                        </div>
                                        <div>
                                            <small className="text-muted text-uppercase">Date</small>
                                            <div>{new Date(invoice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                                        <small className="text-muted text-uppercase d-block mb-1">Total Amount</small>
                                        <h3 className="text-primary mb-0 fw-bold">
                                            ₦{parseFloat(invoice.total_amount || 0).toFixed(2)}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <PaymentForm 
                            invoice={invoice} 
                            onSuccess={handleSuccess} 
                            onCancel={onClose}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

