import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { X, CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        },
        invalid: {
            color: '#9e2146',
        },
    },
    hidePostalCode: false,
};

function PaymentForm({ invoice, onSuccess, onCancel }) {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            // Create payment method
            const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (stripeError) {
                setError(stripeError.message);
                setProcessing(false);
                return;
            }

            // Send payment method to backend
            const response = await axiosInstance.post(`/invoices/${invoice.invoice_id}/pay`, {
                payment_method: 'card',
                payment_method_id: paymentMethod.id,
                save_card: false,
            });

            if (response.data.success) {
                setSuccess(true);
                toast.success('Payment successful!');
                setTimeout(() => {
                    onSuccess(response.data.data);
                }, 1500);
            } else if (response.data.requires_action) {
                // Handle 3D Secure
                const { error: confirmError } = await stripe.confirmCardPayment(
                    response.data.client_secret
                );

                if (confirmError) {
                    setError(confirmError.message);
                    setProcessing(false);
                } else {
                    // Confirm payment with backend
                    const confirmResponse = await axiosInstance.post('/payment/confirm', {
                        payment_intent_id: response.data.client_secret.split('_secret_')[0],
                    });

                    if (confirmResponse.data.success) {
                        setSuccess(true);
                        toast.success('Payment confirmed!');
                        setTimeout(() => {
                            onSuccess(confirmResponse.data.data);
                        }, 1500);
                    } else {
                        setError('Payment confirmation failed');
                        setProcessing(false);
                    }
                }
            } else {
                setError(response.data.message || 'Payment failed');
                setProcessing(false);
            }
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
                        <label className="form-label fw-bold">
                            <CreditCard size={18} className="me-2" />
                            Card Details
                        </label>
                        <div className="card-element-container p-3 border rounded">
                            <CardElement options={CARD_ELEMENT_OPTIONS} />
                        </div>
                    </div>

                    {error && (
                        <div className="alert alert-danger d-flex align-items-start" role="alert">
                            <AlertCircle size={20} className="me-2 flex-shrink-0 mt-1" />
                            <div>{error}</div>
                        </div>
                    )}

                    <div className="d-flex gap-2">
                        <button
                            type="button"
                            className="btn btn-outline-secondary flex-grow-1"
                            onClick={onCancel}
                            disabled={processing}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary flex-grow-1"
                            disabled={!stripe || processing}
                        >
                            {processing ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Lock size={18} className="me-2" />
                                    Pay ${parseFloat(invoice.total_amount || 0).toFixed(2)}
                                </>
                            )}
                        </button>
                    </div>

                    <div className="mt-3 text-center">
                        <small className="text-muted">
                            <Lock size={14} className="me-1" />
                            Secure payment powered by Stripe
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
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title">
                            Pay Invoice #{invoice.invoice_number}
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body pt-2">
                        <div className="invoice-summary mb-4 p-3 bg-light rounded">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Invoice To:</span>
                                <strong>{invoice.billing_full_name}</strong>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Date:</span>
                                <span>{new Date(invoice.date).toLocaleDateString()}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <strong>Total Amount:</strong>
                                <strong className="text-primary fs-5">
                                    ${parseFloat(invoice.total_amount || 0).toFixed(2)}
                                </strong>
                            </div>
                        </div>

                        <Elements stripe={stripePromise}>
                            <PaymentForm 
                                invoice={invoice} 
                                onSuccess={handleSuccess} 
                                onCancel={onClose}
                            />
                        </Elements>

                        <div className="mt-3">
                            <div className="alert alert-info d-flex align-items-start" role="alert">
                                <AlertCircle size={20} className="me-2 flex-shrink-0 mt-1" />
                                <small>
                                    <strong>Test Mode:</strong> Use card number 4242 4242 4242 4242 with any future expiry date and any 3-digit CVC for testing.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

