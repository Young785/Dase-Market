import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, AlertCircle, Calendar, DollarSign, User, FileText, Eye, XCircle } from 'lucide-react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { useProfile } from '../../../context/ProfileContext';
import mockDataService from '../../../utils/mockData';

const TaskList = ({ type = 'active' }) => {
    const { profile } = useProfile();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        date_from: '',
        date_to: ''
    });

    const isClient = profile?.account_type === 'Client';
    const isEngineer = profile?.account_type === 'Engineer';

    useEffect(() => {
        fetchTasks();
    }, [type, filters]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            
            const params = new URLSearchParams();
            params.append('type', type);
            
            // Add filters
            if (filters.search) params.append('search', filters.search);
            if (filters.status && filters.status !== 'all') params.append('status', filters.status);
            if (filters.date_from) params.append('date_from', filters.date_from);
            if (filters.date_to) params.append('date_to', filters.date_to);

            const response = await axiosInstance.get(`/user/tasks?${params.toString()}`);
            
            if (response.data.status && response.data.data) {
                setTasks(response.data.data.tasks || []);
            } else if (response.data.success && response.data.data) {
                setTasks(response.data.data.tasks || []);
            }
        } catch (error) {
            toast.error('Failed to fetch tasks');
            console.error('Error fetching tasks:', error);
            setTasks([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'warning';
            case 'accepted': return 'info';
            case 'in_progress': return 'primary';
            case 'awaiting_review': return 'warning';
            case 'completed': return 'success';
            case 'rejected': return 'danger';
            case 'cancelled': return 'secondary';
            default: return 'secondary';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock size={16} />;
            case 'accepted': return <CheckCircle size={16} />;
            case 'in_progress': return <Clock size={16} />;
            case 'awaiting_review': return <AlertCircle size={16} />;
            case 'completed': return <CheckCircle size={16} />;
            case 'rejected': return <AlertCircle size={16} />;
            case 'cancelled': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    const getPageTitle = () => {
        switch (type) {
            case 'active': return 'Active Tasks';
            case 'completed': return 'Completed Tasks';
            case 'pending-confirmation': return 'Pending Confirmation';
            default: return 'Tasks';
        }
    };

    const getPageDescription = () => {
        switch (type) {
            case 'active': 
                return isEngineer 
                    ? 'Tasks you are currently working on' 
                    : 'Tasks that have been paid and are in progress';
            case 'completed': 
                return 'Tasks that have been completed and confirmed';
            case 'pending-confirmation': 
                return 'Tasks waiting for your confirmation';
            default: return 'Manage your tasks';
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            status: 'all',
            date_from: '',
            date_to: ''
        });
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
                                <p className="mt-2">Loading tasks...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* Page Title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <div>
                                    <h4 className="mb-sm-0">{getPageTitle()}</h4>
                                    <p className="text-muted mb-0">{getPageDescription()}</p>
                                </div>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dase/dashboard">Dashboard</Link></li>
                                        <li className="breadcrumb-item active">{getPageTitle()}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <label className="form-label">Search</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="search"
                                                value={filters.search}
                                                onChange={handleFilterChange}
                                                placeholder="Search by task title, invoice number..."
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <label className="form-label">Status</label>
                                            <select
                                                className="form-select"
                                                name="status"
                                                value={filters.status}
                                                onChange={handleFilterChange}
                                            >
                                                <option value="all">All Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="accepted">Accepted</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="awaiting_review">Awaiting Review</option>
                                                <option value="completed">Completed</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label className="form-label">From Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="date_from"
                                                value={filters.date_from}
                                                onChange={handleFilterChange}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <label className="form-label">To Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="date_to"
                                                value={filters.date_to}
                                                onChange={handleFilterChange}
                                            />
                                        </div>
                                        <div className="col-md-2 d-flex align-items-end">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={clearFilters}
                                            >
                                                Clear Filters
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tasks List */}
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">{getPageTitle()}</h5>
                                </div>
                                <div className="card-body">
                                    {tasks.length === 0 ? (
                                        <div className="text-center py-5">
                                            <FileText size={48} className="text-muted mb-3" />
                                            <h5>No tasks found</h5>
                                            <p className="text-muted">
                                                {type === 'active' 
                                                    ? 'No active tasks at the moment.' 
                                                    : type === 'completed'
                                                    ? 'No completed tasks yet.'
                                                    : 'No tasks pending confirmation.'
                                                }
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-hover align-middle">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Task</th>
                                                        <th>Invoice</th>
                                                        <th>{isClient ? 'Engineer' : 'Client'}</th>
                                                        <th>Amount</th>
                                                        <th>Status</th>
                                                        <th>Date</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tasks.map((task) => (
                                                        <tr key={task.id}>
                                                            <td>
                                                                <div>
                                                                    <h6 className="mb-1">
                                                                        {task.title || task.invoice?.task_title || 'Untitled Task'}
                                                                    </h6>
                                                                    {task.description && (
                                                                        <small className="text-muted">
                                                                            {task.description.length > 50 
                                                                                ? `${task.description.substring(0, 50)}...`
                                                                                : task.description
                                                                            }
                                                                        </small>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {task.invoice ? (
                                                                    <Link 
                                                                        to={`/dase/invoice/view/${task.invoice.invoice_id}`}
                                                                        className="text-primary fw-medium"
                                                                    >
                                                                        {task.invoice.invoice_number}
                                                                    </Link>
                                                                ) : (
                                                                    <span className="text-muted">-</span>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <User size={16} className="me-2 text-muted" />
                                                                    <span>
                                                                        {isClient 
                                                                            ? (task.engineer?.business_name || `${task.engineer?.first_name || ''} ${task.engineer?.last_name || ''}`.trim() || 'N/A')
                                                                            : (task.client?.business_name || `${task.client?.first_name || ''} ${task.client?.last_name || ''}`.trim() || 'N/A')
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <DollarSign size={16} className="me-1 text-muted" />
                                                                    <span className="fw-medium">${task.invoice?.total_amount || '0.00'}</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className={`badge bg-${getStatusColor(task.status)}`}>
                                                                    {getStatusIcon(task.status)}
                                                                    <span className="ms-1">
                                                                        {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}
                                                                    </span>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Calendar size={16} className="me-2 text-muted" />
                                                                    <span>{new Date(task.created_at).toLocaleDateString()}</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    {task.status === 'awaiting_review' && isClient ? (
                                                                        <Link
                                                                            to={`/dase/task/confirm/${task.id}`}
                                                                            className="btn btn-sm btn-warning"
                                                                        >
                                                                            <AlertCircle size={14} className="me-1" />
                                                                            Review
                                                                        </Link>
                                                                    ) : task.status === 'completed' ? (
                                                                        <Link
                                                                            to={`/dase/task/confirm/${task.id}`}
                                                                            className="btn btn-sm btn-outline-success"
                                                                        >
                                                                            <CheckCircle size={14} className="me-1" />
                                                                            View
                                                                        </Link>
                                                                    ) : (
                                                                        <Link
                                                                            to={`/dase/task/confirm/${task.id}`}
                                                                            className="btn btn-sm btn-outline-primary"
                                                                        >
                                                                            <Eye size={14} className="me-1" />
                                                                            View
                                                                        </Link>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
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

export default TaskList;
