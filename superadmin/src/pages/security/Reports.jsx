import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    priority: ''
  });
  const [stats, setStats] = useState({
    pending: 0,
    under_review: 0,
    resolved: 0,
    dismissed: 0
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchReports();
  }, [filters, pagination.current_page]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };
      
      const response = await axiosInstance.get('/api/v1/superadmin/security/reports', { params });
      const data = response.data.data;
      
      setReports(data.items || []);
      setStats({
        pending: data.stats?.pending || 0,
        under_review: data.stats?.under_review || 0,
        resolved: data.stats?.resolved || 0,
        dismissed: data.stats?.dismissed || 0
      });
      setPagination(prev => ({
        ...prev,
        total: data.total || 0
      }));
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handleAction = async (reportId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this report?`)) {
      return;
    }

    try {
      await axiosInstance.post(`/api/v1/superadmin/security/reports/${reportId}/${action}`);
      toast.success(`Report ${action}d successfully`);
      fetchReports();
    } catch (error) {
      console.error(`Failed to ${action} report:`, error);
      toast.error(`Failed to ${action} report`);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'warning',
      under_review: 'info',
      resolved: 'success',
      dismissed: 'secondary'
    };
    return <span className={`badge bg-${badges[status]}`}>{status.replace('_', ' ')}</span>;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      critical: 'danger',
      high: 'warning',
      medium: 'info',
      low: 'secondary'
    };
    return <span className={`badge bg-${badges[priority]}`}>{priority}</span>;
  };

  const getCategoryBadge = (category) => {
    const badges = {
      harassment: 'danger',
      spam: 'warning',
      inappropriate: 'danger',
      copyright: 'info',
      impersonation: 'warning',
      other: 'secondary'
    };
    return <span className={`badge bg-soft-${badges[category]} text-${badges[category]}`}>{category}</span>;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">User Reports</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Reports</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row">
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
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className={`counter-value ${stats.pending > 0 ? 'badge bg-warning' : ''}`}>
                      {stats.pending}
                    </span>
                  </h4>
                  <span className={stats.pending > 0 ? "text-warning" : "text-muted"}>
                    {stats.pending > 0 ? 'Needs review' : 'All clear'}
                  </span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className={`avatar-title bg-soft-${stats.pending > 0 ? 'warning' : 'success'} rounded fs-3`}>
                    <i className={`ri-flag-line text-${stats.pending > 0 ? 'warning' : 'success'}`}></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Under Review</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.under_review}</span>
                  </h4>
                  <span className="text-info">In progress</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-info rounded fs-3">
                    <i className="ri-eye-line text-info"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Resolved</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.resolved}</span>
                  </h4>
                  <span className="text-success">Completed</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-success rounded fs-3">
                    <i className="ri-checkbox-circle-line text-success"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Dismissed</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.dismissed}</span>
                  </h4>
                  <span className="text-muted">Closed</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-secondary rounded fs-3">
                    <i className="ri-close-circle-line text-secondary"></i>
                  </span>
                </div>
              </div>
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
                <div className="col-lg-4">
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control search"
                      placeholder="Search reports..."
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </div>
                <div className="col-lg-2">
                  <select
                    className="form-select"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="resolved">Resolved</option>
                    <option value="dismissed">Dismissed</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <select
                    className="form-select"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Categories</option>
                    <option value="harassment">Harassment</option>
                    <option value="spam">Spam</option>
                    <option value="inappropriate">Inappropriate</option>
                    <option value="copyright">Copyright</option>
                    <option value="impersonation">Impersonation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <select
                    className="form-select"
                    name="priority"
                    value={filters.priority}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Priority</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <button className="btn btn-primary w-100" onClick={fetchReports}>
                    <i className="ri-filter-3-line align-bottom me-1"></i> Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">User Reports & Complaints</h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-soft-success btn-sm">
                    <i className="ri-file-download-line align-bottom me-1"></i> Export
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
              ) : reports.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Reporter</th>
                        <th>Reported User/Content</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr key={report.id}>
                          <td className="fw-medium">#{report.id}</td>
                          <td>
                            <div>
                              <div className="fw-medium">{report.reporter_name}</div>
                              <small className="text-muted">{report.reporter_email}</small>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="fw-medium">{report.reported_entity_name}</div>
                              <small className="text-muted">{report.reported_entity_type}</small>
                            </div>
                          </td>
                          <td>{getCategoryBadge(report.category)}</td>
                          <td>{getPriorityBadge(report.priority)}</td>
                          <td>{getStatusBadge(report.status)}</td>
                          <td>{new Date(report.created_at).toLocaleDateString()}</td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-soft-secondary btn-sm dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ri-more-fill"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="ri-eye-fill me-2"></i>View Details
                                  </a>
                                </li>
                                {report.status === 'pending' && (
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => handleAction(report.id, 'review')}
                                    >
                                      <i className="ri-eye-line me-2"></i>Start Review
                                    </button>
                                  </li>
                                )}
                                {report.status === 'under_review' && (
                                  <>
                                    <li>
                                      <button
                                        className="dropdown-item text-success"
                                        onClick={() => handleAction(report.id, 'resolve')}
                                      >
                                        <i className="ri-check-fill me-2"></i>Resolve
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleAction(report.id, 'dismiss')}
                                      >
                                        <i className="ri-close-fill me-2"></i>Dismiss
                                      </button>
                                    </li>
                                  </>
                                )}
                              </ul>
                            </div>
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
                      <i className="ri-shield-check-line"></i>
                    </div>
                  </div>
                  <h5>No Reports Found</h5>
                  <p className="text-muted">
                    {filters.search || filters.status || filters.category || filters.priority
                      ? 'No reports match your search criteria'
                      : 'No user reports or complaints at the moment'}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {reports.length > 0 && (
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

export default Reports;
