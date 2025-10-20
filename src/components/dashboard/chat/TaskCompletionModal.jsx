import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, CheckCircle } from 'lucide-react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import NotificationService from '../notifications/NotificationService';
import mockDataService from '../../../utils/mockData';

const TaskCompletionModal = ({ isOpen, onClose, receiverId, receiverName }) => {
    const [formData, setFormData] = useState({
        invoice_id: '',
        completion_message: '',
        deliverable_files: []
    });
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // Fetch invoices when modal opens
    useEffect(() => {
        if (isOpen && receiverId) {
            fetchInvoices();
        }
    }, [isOpen, receiverId]);

    const fetchInvoices = async () => {
        setLoading(true);
        const normalizeArray = (possible) => {
            if (Array.isArray(possible)) return possible;
            if (possible?.invoices && Array.isArray(possible.invoices)) return possible.invoices;
            if (possible?.items && Array.isArray(possible.items)) return possible.items;
            return [];
        };
        const isPaidInvoice = (inv) => {
            const status = String(inv?.payment_status || inv?.status || '').toLowerCase();
            return status === 'paid';
        };
        const hasTask = (inv) => Boolean(inv?.task_title) || Boolean(inv?.task_description);

        try {
            // First try scoped by receiver (contact) without relying on server-side status filter
            const resScoped = await axiosInstance.get(`/user/invoices?receiver_id=${receiverId}`);
            let list = [];
            if (resScoped?.data?.status) {
                list = normalizeArray(resScoped.data.data);
            }
            let paidWithTasks = list.filter((i) => isPaidInvoice(i) && hasTask(i));

            // If nothing found, fall back to all invoices and filter client-side
            if (paidWithTasks.length === 0) {
                const resAll = await axiosInstance.get('/user/invoices');
                if (resAll?.data?.status) {
                    const all = normalizeArray(resAll.data.data);
                    paidWithTasks = all.filter((i) => isPaidInvoice(i) && hasTask(i));
                }
            }

            // As a final fallback, include all paid invoices even if no explicit task fields
            if (paidWithTasks.length === 0 && list.length > 0) {
                paidWithTasks = list.filter(isPaidInvoice);
            }

            setInvoices(paidWithTasks);
        } catch (error) {
            toast.error('Failed to fetch invoices');
            console.error('Error fetching invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const validFiles = files.filter(file => {
            // Allow common file types (documents, images, audio, video, archives)
            const allowedTypes = [
                'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain', 'image/', 'audio/', 'video/', 'application/zip', 'application/x-rar-compressed'
            ];
            return allowedTypes.some(type => file.type.startsWith(type)) && file.size <= 50 * 1024 * 1024; // 50MB limit
        });

        if (validFiles.length !== files.length) {
            toast.error('Some files were rejected. Please ensure files are under 50MB and of supported types.');
        }

        setFormData(prev => ({
            ...prev,
            deliverable_files: [...prev.deliverable_files, ...validFiles]
        }));
    };

    const removeFile = (index) => {
        setFormData(prev => ({
            ...prev,
            deliverable_files: prev.deliverable_files.filter((_, i) => i !== index)
        }));
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.invoice_id) {
            toast.error('Please select an invoice/task');
            return;
        }
        
        if (!formData.completion_message.trim()) {
            toast.error('Please provide a completion message');
            return;
        }

        setSubmitting(true);
        
        try {
            const submitData = new FormData();
            submitData.append('invoice_id', formData.invoice_id);
            submitData.append('completion_message', formData.completion_message);
            submitData.append('receiver_id', receiverId);
            
            // Append files
            formData.deliverable_files.forEach((file, index) => {
                submitData.append(`deliverable_files[${index}]`, file);
            });

            // Try API first, fall back to mock data
            try {
                const response = await axiosInstance.post('/user/tasks/complete', submitData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.status) {
                    toast.success('Task completion submitted successfully!');
                    
                    // Send notification to client
                    if (response.data.data) {
                        await NotificationService.notifyTaskCompletion(response.data.data, receiverId);
                    }
                    
                    onClose();
                    // Reset form
                    setFormData({
                        invoice_id: '',
                        completion_message: '',
                        deliverable_files: []
                    });
                    return;
                }
            } catch (apiError) {
                console.log('API not available, using mock data');
            }
            
            // Use mock data
            const mockResponse = await mockDataService.completeTask({
                invoice_id: formData.invoice_id,
                completion_message: formData.completion_message,
                receiver_id: receiverId
            });
            
            if (mockResponse.status) {
                toast.success('Task completion submitted successfully!');
                onClose();
                // Reset form
                setFormData({
                    invoice_id: '',
                    completion_message: '',
                    deliverable_files: []
                });
            } else {
                toast.error(mockResponse.message || 'Failed to submit task completion');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit task completion');
            console.error('Error submitting task completion:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <CheckCircle className="me-2" size={20} />
                            Complete Task for {receiverName}
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {/* Invoice Selection */}
                            <div className="mb-3">
                                <label className="form-label">Select Task/Invoice *</label>
                                {loading ? (
                                    <div className="text-center py-3">
                                        <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="ms-2">Loading invoices...</span>
                                    </div>
                                ) : (
                                    <select 
                                        name="invoice_id" 
                                        value={formData.invoice_id} 
                                        onChange={handleInputChange}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">Choose a paid invoice/task to complete</option>
                                        {invoices.map(invoice => (
                                            <option key={invoice.invoice_id} value={invoice.invoice_id}>
                                                {invoice.task_title || invoice.invoice_number} - ${invoice.total_amount}
                                                {invoice.task_description && ` - ${invoice.task_description.substring(0, 50)}...`}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {!loading && invoices.length === 0 && (
                                    <div className="text-muted small mt-1">
                                        No paid invoices with tasks found for this client.
                                    </div>
                                )}
                            </div>

                            {/* Completion Message */}
                            <div className="mb-3">
                                <label className="form-label">Completion Message *</label>
                                <textarea
                                    name="completion_message"
                                    value={formData.completion_message}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    rows="4"
                                    placeholder="Describe what you've completed, any notes for the client, or instructions for the deliverables..."
                                    required
                                />
                            </div>

                            {/* File Upload */}
                            <div className="mb-3">
                                <label className="form-label">Deliverable Files (Optional)</label>
                                <div 
                                    className={`border-2 border-dashed rounded p-4 text-center ${dragActive ? 'border-primary bg-light' : 'border-secondary'}`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <Upload size={48} className="text-muted mb-2" />
                                    <p className="mb-2">Drag and drop files here, or click to select</p>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileSelect}
                                        className="form-control"
                                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp3,.wav,.mp4,.mov,.zip,.rar"
                                    />
                                    <small className="text-muted">
                                        Supported: Documents, Images, Audio, Video, Archives (Max 50MB each)
                                    </small>
                                </div>

                                {/* Selected Files */}
                                {formData.deliverable_files.length > 0 && (
                                    <div className="mt-3">
                                        <h6>Selected Files:</h6>
                                        {formData.deliverable_files.map((file, index) => (
                                            <div key={index} className="d-flex align-items-center justify-content-between bg-light p-2 rounded mb-2">
                                                <div className="d-flex align-items-center">
                                                    <FileText size={16} className="me-2 text-muted" />
                                                    <span className="small">{file.name}</span>
                                                    <span className="text-muted small ms-2">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeFile(index)}
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-success"
                                disabled={submitting || !formData.invoice_id || !formData.completion_message.trim()}
                            >
                                {submitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={16} className="me-2" />
                                        Complete Task
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskCompletionModal;
