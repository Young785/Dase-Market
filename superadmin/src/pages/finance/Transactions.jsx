import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    date_from: '',
    date_to: ''
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    failed: 0
  });

  useEffect(() => {
    fetchTransactions();
  }, [filters, pagination.current_page]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };

      // TODO: Replace with actual API endpoint when available
      // const response = await axiosInstance.get('/api/v1/superadmin/transactions', { params });
      // setTransactions(response.data.data.items || []);
      // setPagination(response.data.data.pagination);
      // setStats(response.data.data.stats);
      
      // Mock data for now
      setTimeout(() => {
        setTransactions([]);
        setStats({
          total: 0,
          pending: 0,
          completed: 0,
          failed: 0
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast.error('Failed to load transactions');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: 'success',
      pending: 'warning',
      failed: 'danger',
      cancelled: 'secondary',
      refunded: 'info'
    };
    return <span className={`badge bg-${badges[status] || 'secondary'}`}>{status}</span>;
  };

  const getTypeBadge = (type) => {
    const badges = {
      payment: 'primary',
      refund: 'info',
      payout: 'warning',
      subscription: 'success'
    };
    return <span className={`badge bg-soft-${badges[type] || 'secondary'} text-${badges[type] || 'secondary'}`}>{type}</span>;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Transactions</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/superadmin/finance">Finance</Link></li>
                <li className="breadcrumb-item active">Transactions</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-3">
        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Transactions</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                    <span className="counter-value">{stats.total}</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary rounded fs-3">
                    <i className="bx bx-transfer text-primary"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Completed</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                    <span className="counter-value">{stats.completed}</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-success rounded fs-3">
                    <i className="bx bx-check-circle text-success"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Pending</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                    <span className="counter-value">{stats.pending}</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-warning rounded fs-3">
                    <i className="bx bx-time text-warning"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Failed</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                    <span className="counter-value">{stats.failed}</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-danger rounded fs-3">
                    <i className="bx bx-error-circle text-danger"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search transactions..."
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value="payment">Payment</option>
                    <option value="refund">Refund</option>
                    <option value="payout">Payout</option>
                    <option value="subscription">Subscription</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <input
                    type="date"
                    className="form-control"
                    name="date_from"
                    value={filters.date_from}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <button
                    className="btn btn-primary w-100"
                    onClick={fetchTransactions}
                  >
                    <i className="ri-search-line me-1"></i>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Transaction History</h5>
                <div>
                  <button className="btn btn-soft-primary btn-sm">
                    <i className="ri-download-line me-1"></i>
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : transactions.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Transaction ID</th>
                        <th>Type</th>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="fw-medium">{transaction.transaction_id}</td>
                          <td>{getTypeBadge(transaction.type)}</td>
                          <td>{transaction.user_name}</td>
                          <td>${transaction.amount}</td>
                          <td>
                            <span className="text-muted">
                              <i className="ri-bank-card-line me-1"></i>
                              {transaction.payment_method}
                            </span>
                          </td>
                          <td>{new Date(transaction.created_at).toLocaleString()}</td>
                          <td>{getStatusBadge(transaction.status)}</td>
                          <td>
                            <button
                              className="btn btn-soft-primary btn-sm"
                              onClick={() => toast.info('Transaction details coming soon')}
                            >
                              <i className="ri-eye-line"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                      <i className="ri-exchange-dollar-line"></i>
                    </div>
                  </div>
                  <h5>No Transactions Found</h5>
                  <p className="text-muted">
                    {filters.search || filters.status || filters.type
                      ? 'Try adjusting your search or filter criteria'
                      : 'No transactions have been recorded yet'}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {transactions.length > 0 && (
              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to{' '}
                    {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of{' '}
                    {pagination.total} entries
                  </div>
                  <nav>
                    <ul className="pagination mb-0">
                      <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setPagination(prev => ({ ...prev, current_page: prev.current_page - 1 }))}
                          disabled={pagination.current_page === 1}
                        >
                          Previous
                        </button>
                      </li>
                      <li className="page-item active">
                        <span className="page-link">{pagination.current_page}</span>
                      </li>
                      <li className={`page-item ${pagination.current_page >= Math.ceil(pagination.total / pagination.per_page) ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setPagination(prev => ({ ...prev, current_page: prev.current_page + 1 }))}
                          disabled={pagination.current_page >= Math.ceil(pagination.total / pagination.per_page)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
