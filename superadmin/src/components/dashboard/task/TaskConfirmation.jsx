import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Download, Music, AlertCircle, User, DollarSign, Calendar, FileText } from 'lucide-react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { useProfile } from '../../../context/ProfileContext';

const TaskConfirmation = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const { profile } = useProfile();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [action, setAction] = useState(null); // 'confirm' or 'reject'

    useEffect(() => {
        fetchTask();
    }, [taskId]);

    const fetchTask = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/user/tasks/${taskId}`);
            if (response.data.status) {
                setTask(response.data.data);
            } else {
                toast.error('Task not found');
                navigate('/dase/task/active');
            }
        } catch (error) {
            console.error('Error fetching task:', error);
            toast.error('Failed to load task details');
            navigate('/dase/task/active');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async () => {
        if (!confirmationMessage.trim()) {
            toast.error('Please enter a confirmation message');
            return;
        }

        try {
            setSubmitting(true);
            const response = await axiosInstance.post(`/user/tasks/${taskId}/confirm`, {
                confirmed: true,
                confirmation_message: confirmationMessage
            });

            if (response.data.status || response.data.success) {
                toast.success('Task confirmed successfully!');
                setTimeout(() => {
                    navigate('/dase/task/completed');
                }, 1500);
            } else {
                toast.error(response.data.message || 'Failed to confirm task');
            }
        } catch (error) {
            console.error('Error confirming task:', error);
            toast.error(error.response?.data?.message || 'Failed to confirm task');
        } finally {
            setSubmitting(false);
        }
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) {
            toast.error('Please provide a reason for rejection');
            return;
        }

        try {
            setSubmitting(true);
            const response = await axiosInstance.post(`/user/tasks/${taskId}/confirm`, {
                confirmed: false,
                rejection_reason: rejectionReason
            });

            if (response.data.status || response.data.success) {
                toast.success('Task rejected. Engineer has been notified.');
                setTimeout(() => {
                    navigate('/dase/task/active');
                }, 1500);
            } else {
                toast.error(response.data.message || 'Failed to reject task');
            }
        } catch (error) {
            console.error('Error rejecting task:', error);
            toast.error(error.response?.data?.message || 'Failed to reject task');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                            <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-2">Loading task details...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!task) return null;

    const isClient = profile?.account_type === 'Client';
    const canConfirm = isClient && task.status === 'awaiting_review';

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* Page Title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Review Task</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dase/dashboard">Dashboard</Link></li>
                                        <li className="breadcrumb-item"><Link to="/dase/task/active">Tasks</Link></li>
                                        <li className="breadcrumb-item active">Review</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Alert */}
                    {task.status === 'awaiting_review' && isClient && (
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-info d-flex align-items-center">
                                    <AlertCircle size={20} className="me-2" />
                                    <div>
                                        <strong>Review Required:</strong> The engineer has completed this task. Please review the work and either confirm or request revisions.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {task.status === 'completed' && (
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-success d-flex align-items-center">
                                    <CheckCircle size={20} className="me-2" />
                                    <div>
                                        <strong>Task Completed:</strong> This task has been confirmed and marked as complete.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Task Details */}
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Task Details</h5>
                                </div>
                                <div className="card-body">
                                    <h4>{task.title}</h4>
                                    <p className="text-muted">{task.description}</p>

                                    <div className="row mt-4">
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center mb-3">
                                                <User size={18} className="me-2 text-muted" />
                                                <div>
                                                    <small className="text-muted d-block">Engineer</small>
                                                    <strong>{task.engineer?.business_name || `${task.engineer?.first_name} ${task.engineer?.last_name}`}</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center mb-3">
                                                <DollarSign size={18} className="me-2 text-muted" />
                                                <div>
                                                    <small className="text-muted d-block">Amount</small>
                                                    <strong>${task.invoice?.total_amount}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {task.completion_message && (
                                        <div className="alert alert-light mt-4">
                                            <h6 className="mb-2">Engineer's Message:</h6>
                                            <p className="mb-0">{task.completion_message}</p>
                                        </div>
                                    )}

                                    {task.confirmation_message && task.status === 'completed' && (
                                        <div className="alert alert-success mt-4">
                                            <h6 className="mb-2">Your Confirmation:</h6>
                                            <p className="mb-0">{task.confirmation_message}</p>
                                        </div>
                                    )}

                                    {task.rejection_reason && task.status === 'rejected' && (
                                        <div className="alert alert-warning mt-4">
                                            <h6 className="mb-2">Revision Request:</h6>
                                            <p className="mb-0">{task.rejection_reason}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Finished Productions */}
                            {task.files && task.files.length > 0 && (
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Finished Productions</h5>
                                    </div>
                                    <div className="card-body">
                                        {task.files.filter(f => f.file_category === 'finished_production').map((file) => (
                                            <div key={file.id} className="border rounded p-3 mb-3">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div className="flex-grow-1">
                                                        <h6 className="mb-1">
                                                            <Music size={16} className="me-2" />
                                                            {file.title}
                                                        </h6>
                                                        {file.description && (
                                                            <p className="text-muted mb-2 small">{file.description}</p>
                                                        )}
                                                        <div className="d-flex gap-3">
                                                            <small className="text-muted">
                                                                {(file.file_size / 1024 / 1024).toFixed(2)} MB
                                                            </small>
                                                            <small className="text-muted">
                                                                {file.downloads} downloads
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <a 
                                                        href={file.download_link} 
                                                        className="btn btn-sm btn-primary"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Download size={14} className="me-1" />
                                                        Download
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Panel */}
                        <div className="col-xl-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Task Status</h5>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <span className={`badge bg-${
                                            task.status === 'completed' ? 'success' :
                                            task.status === 'awaiting_review' ? 'warning' :
                                            task.status === 'rejected' ? 'danger' : 'primary'
                                        } p-2`}>
                                            {task.status.replace('_', ' ').toUpperCase()}
                                        </span>
                                    </div>

                                    {task.due_date && (
                                        <div className="mb-3">
                                            <small className="text-muted d-block mb-1">Due Date</small>
                                            <div className="d-flex align-items-center">
                                                <Calendar size={16} className="me-2" />
                                                <span>{new Date(task.due_date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    )}

                                    {task.invoice && (
                                        <div className="mb-3">
                                            <small className="text-muted d-block mb-1">Related Invoice</small>
                                            <Link 
                                                to={`/dase/invoice/view/${task.invoice.invoice_id}`}
                                                className="btn btn-sm btn-outline-primary w-100"
                                            >
                                                <FileText size={14} className="me-1" />
                                                View Invoice #{task.invoice.invoice_number}
                                            </Link>
                                        </div>
                                    )}

                                    {canConfirm && (
                                        <>
                                            <hr />
                                            <h6 className="mb-3">Review Decision</h6>
                                            
                                            <div className="btn-group w-100 mb-3" role="group">
                                                <button
                                                    type="button"
                                                    className={`btn ${action === 'confirm' ? 'btn-success' : 'btn-outline-success'}`}
                                                    onClick={() => setAction('confirm')}
                                                >
                                                    <CheckCircle size={16} className="me-1" />
                                                    Approve
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`btn ${action === 'reject' ? 'btn-danger' : 'btn-outline-danger'}`}
                                                    onClick={() => setAction('reject')}
                                                >
                                                    <XCircle size={16} className="me-1" />
                                                    Request Revision
                                                </button>
                                            </div>

                                            {action === 'confirm' && (
                                                <div>
                                                    <label className="form-label">Confirmation Message *</label>
                                                    <textarea
                                                        className="form-control mb-3"
                                                        rows="4"
                                                        placeholder="Express your satisfaction with the completed work..."
                                                        value={confirmationMessage}
                                                        onChange={(e) => setConfirmationMessage(e.target.value)}
                                                    />
                                                    <button
                                                        className="btn btn-success w-100"
                                                        onClick={handleConfirm}
                                                        disabled={submitting || !confirmationMessage.trim()}
                                                    >
                                                        {submitting ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2" />
                                                                Confirming...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckCircle size={16} className="me-1" />
                                                                Confirm Completion
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            )}

                                            {action === 'reject' && (
                                                <div>
                                                    <label className="form-label">Revision Notes *</label>
                                                    <textarea
                                                        className="form-control mb-3"
                                                        rows="4"
                                                        placeholder="Please explain what needs to be revised or improved..."
                                                        value={rejectionReason}
                                                        onChange={(e) => setRejectionReason(e.target.value)}
                                                    />
                                                    <button
                                                        className="btn btn-danger w-100"
                                                        onClick={handleReject}
                                                        disabled={submitting || !rejectionReason.trim()}
                                                    >
                                                        {submitting ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2" />
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <XCircle size={16} className="me-1" />
                                                                Request Revisions
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskConfirmation;
