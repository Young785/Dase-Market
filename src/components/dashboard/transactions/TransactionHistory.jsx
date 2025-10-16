import { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { 
    DollarSign, 
    ArrowUpRight, 
    ArrowDownRight, 
    Filter, 
    RefreshCw,
    FileText,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react';

export default function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: 'all',
        page: 1,
    });

    useEffect(() => {
        fetchTransactions();
    }, [filters]);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            
            if (filters.status !== 'all') {
                params.append('status', filters.status);
            }
            params.append('page', filters.page);

            const response = await axiosInstance.get(`/user/payments?${params.toString()}`);
            
            if (response.data.success) {
                setTransactions(response.data.data.data || []);
            }
        } catch (error) {
            toast.error('Failed to load transactions');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            completed: { color: 'success', icon: CheckCircle, text: 'Completed' },
            pending: { color: 'warning', icon: Clock, text: 'Pending' },
            processing: { color: 'info', icon: RefreshCw, text: 'Processing' },
            failed: { color: 'danger', icon: XCircle, text: 'Failed' },
            refunded: { color: 'secondary', icon: ArrowDownRight, text: 'Refunded' },
        };

        const badge = badges[status] || badges.pending;
        const Icon = badge.icon;

        return (
            <span className={`badge bg-${badge.color} d-inline-flex align-items-center gap-1`}>
                <Icon size={14} />
                {badge.text}
            </span>
        );
    };

    const handleRefund = async (transactionId) => {
        if (!confirm('Are you sure you want to request a refund for this transaction?')) {
            return;
        }

        try {
            const response = await axiosInstance.post(`/transactions/${transactionId}/refund`, {
                reason: 'Customer request'
            });

            if (response.data.success) {
                toast.success('Refund requested successfully');
                fetchTransactions();
            } else {
                toast.error(response.data.message || 'Refund request failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to request refund');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <DollarSign size={20} className="me-2" />
                                    Payment History
                                </h5>
                                <button 
                                    className="btn btn-light btn-sm"
                                    onClick={fetchTransactions}
                                    disabled={loading}
                                >
                                    <RefreshCw size={16} className={loading ? 'spinner-border-sm' : ''} />
                                </button>
                            </div>
                        </div>

                        <div className="card-body">
                            {/* Filters */}
                            <div className="row mb-4">
                                <div className="col-md-3">
                                    <label className="form-label">
                                        <Filter size={16} className="me-1" />
                                        Filter by Status
                                    </label>
                                    <select
                                        className="form-select"
                                        value={filters.status}
                                        onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                                    >
                                        <option value="all">All Transactions</option>
                                        <option value="completed">Completed</option>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="failed">Failed</option>
                                        <option value="refunded">Refunded</option>
                                    </select>
                                </div>
                            </div>

                            {/* Transactions List */}
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : transactions.length === 0 ? (
                                <div className="text-center py-5">
                                    <DollarSign size={64} className="text-muted mb-3" />
                                    <h5 className="text-muted">No transactions found</h5>
                                    <p className="text-muted">Your payment history will appear here</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Transaction ID</th>
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.map((transaction) => (
                                                <tr key={transaction.id}>
                                                    <td>
                                                        <code className="text-primary">
                                                            {transaction.transaction_id}
                                                        </code>
                                                    </td>
                                                    <td>{formatDate(transaction.created_at)}</td>
                                                    <td>
                                                        <div>
                                                            {transaction.description || 'Payment'}
                                                            {transaction.invoice && (
                                                                <div className="text-muted small">
                                                                    <FileText size={12} className="me-1" />
                                                                    Invoice #{transaction.invoice.invoice_number}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <strong className="text-success">
                                                            ${parseFloat(transaction.amount).toFixed(2)}
                                                        </strong>
                                                        <div className="text-muted small text-uppercase">
                                                            {transaction.currency}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {getStatusBadge(transaction.status)}
                                                    </td>
                                                    <td>
                                                        {transaction.status === 'completed' && (
                                                            <button
                                                                className="btn btn-sm btn-outline-warning"
                                                                onClick={() => handleRefund(transaction.transaction_id)}
                                                            >
                                                                <RefreshCw size={14} className="me-1" />
                                                                Refund
                                                            </button>
                                                        )}
                                                        {transaction.status === 'failed' && transaction.failure_reason && (
                                                            <span className="text-danger small">
                                                                {transaction.failure_reason}
                                                            </span>
                                                        )}
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
    );
}

