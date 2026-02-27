import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Refunds = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: ''
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchRefunds();
  }, [filters, pagination.current_page]);

  const fetchRefunds = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };

      const response = await axiosInstance.get('/api/v1/superadmin/finance/refunds', { params });
      
      if (response.data.success) {
        setRefunds(response.data.data.items || []);
        setPagination(response.data.data.pagination || pagination);
      }
    } catch (error) {
      console.error('Failed to fetch refunds:', error);
      toast.error('Failed to load refunds');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handleApproveRefund = async (refundId) => {
    if (!window.confirm('Are you sure you want to approve this refund?')) {
      return;
    }

    try {
      await axiosInstance.post(`/api/v1/superadmin/finance/refunds/${refundId}/approve`);
      toast.success('Refund approved successfully');
      fetchRefunds();
    } catch (error) {
      console.error('Failed to approve refund:', error);
      toast.error('Failed to approve refund');
    }
  };

  const handleRejectRefund = async (refundId) => {
    if (!window.confirm('Are you sure you want to reject this refund?')) {
      return;
    }

    try {
      await axiosInstance.post(`/api/v1/superadmin/finance/refunds/${refundId}/reject`);
      toast.success('Refund rejected');
      fetchRefunds();
    } catch (error) {
      console.error('Failed to reject refund:', error);
      toast.error('Failed to reject refund');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'warning',
      approved: 'success',
      rejected: 'danger',
      processed: 'info'
    };
    return <span className={`badge bg-${badges[status] || 'secondary'}`}>{status}</span>;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Refunds</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/superadmin/finance">Finance</Link></li>
                <li className="breadcrumb-item active">Refunds</li>
              </ol>
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
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by transaction ID, user, or email..."
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="processed">Processed</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <button
                    className="btn btn-primary w-100"
                    onClick={fetchRefunds}
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

      {/* Refunds List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Refund Requests</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : refunds.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Request ID</th>
                        <th>Transaction ID</th>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Reason</th>
                        <th>Date Requested</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {refunds.map((refund) => (
                        <tr key={refund.id}>
                          <td className="fw-medium">#{refund.id}</td>
                          <td>{refund.transaction_id}</td>
                          <td>
                            <div>
                              <div className="fw-medium">{refund.user_name}</div>
                              <small className="text-muted">{refund.user_email}</small>
                            </div>
                          </td>
                          <td className="fw-medium">${refund.amount}</td>
                          <td>
                            <span className="text-truncate d-inline-block" style={{ maxWidth: '200px' }}>
                              {refund.reason}
                            </span>
                          </td>
                          <td>{new Date(refund.created_at).toLocaleString()}</td>
                          <td>{getStatusBadge(refund.status)}</td>
                          <td>
                            {refund.status === 'pending' ? (
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-soft-success"
                                  onClick={() => handleApproveRefund(refund.id)}
                                >
                                  <i className="ri-check-line"></i>
                                </button>
                                <button
                                  className="btn btn-soft-danger"
                                  onClick={() => handleRejectRefund(refund.id)}
                                >
                                  <i className="ri-close-line"></i>
                                </button>
                              </div>
                            ) : (
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => toast.info('Refund details coming soon')}
                              >
                                <i className="ri-eye-line"></i>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-soft-success text-success rounded-circle fs-24">
                      <i className="ri-refund-line"></i>
                    </div>
                  </div>
                  <h5>No Refund Requests</h5>
                  <p className="text-muted">
                    {filters.search || filters.status
                      ? 'No refund requests match your search criteria'
                      : 'All clear! No pending refund requests'}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {refunds.length > 0 && (
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

export default Refunds;
