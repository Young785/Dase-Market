import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    admin: '',
    action: '',
    dateFrom: '',
    dateTo: ''
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchLogs();
  }, [filters, pagination.current_page]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };
      // TODO: API call
      // const response = await axiosInstance.get('/api/v1/superadmin/security/audit-logs', { params });
      // setLogs(response.data.data.items);
      // setPagination(response.data.data.pagination);
      setTimeout(() => {
        setLogs([]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
      toast.error('Failed to load audit logs');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const getActionBadge = (action) => {
    const badges = {
      create: 'success',
      update: 'info',
      delete: 'danger',
      login: 'primary',
      logout: 'secondary',
      suspend: 'warning',
      ban: 'danger',
      approve: 'success',
      reject: 'danger'
    };
    return <span className={`badge bg-${badges[action] || 'secondary'}`}>{action}</span>;
  };

  const exportLogs = () => {
    toast.info('Export feature coming soon');
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Audit Logs</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Audit Logs</li>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Today's Actions</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">0</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary rounded fs-3">
                    <i className="ri-file-list-line text-primary"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Active Admins</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">1</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-success rounded fs-3">
                    <i className="ri-user-star-line text-success"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Critical Actions</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">0</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-danger rounded fs-3">
                    <i className="ri-alert-line text-danger"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Records</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{pagination.total}</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-info rounded fs-3">
                    <i className="ri-database-line text-info"></i>
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
                <div className="col-lg-3">
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control search"
                      placeholder="Search logs..."
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </div>

                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filter by Admin"
                    name="admin"
                    value={filters.admin}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="col-lg-2">
                  <select
                    className="form-select"
                    name="action"
                    value={filters.action}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Actions</option>
                    <option value="create">Create</option>
                    <option value="update">Update</option>
                    <option value="delete">Delete</option>
                    <option value="login">Login</option>
                    <option value="logout">Logout</option>
                    <option value="suspend">Suspend</option>
                    <option value="ban">Ban</option>
                  </select>
                </div>

                <div className="col-lg-2">
                  <input
                    type="date"
                    className="form-control"
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleFilterChange}
                    placeholder="From Date"
                  />
                </div>

                <div className="col-lg-2">
                  <input
                    type="date"
                    className="form-control"
                    name="dateTo"
                    value={filters.dateTo}
                    onChange={handleFilterChange}
                    placeholder="To Date"
                  />
                </div>

                <div className="col-lg-1">
                  <button className="btn btn-primary w-100" onClick={fetchLogs}>
                    <i className="ri-filter-3-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Audit Trail</h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-soft-success btn-sm" onClick={exportLogs}>
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
              ) : logs.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-sm align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Timestamp</th>
                        <th>Admin</th>
                        <th>Action</th>
                        <th>Resource</th>
                        <th>Description</th>
                        <th>IP Address</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log) => (
                        <tr key={log.id}>
                          <td>
                            <div>{new Date(log.created_at).toLocaleDateString()}</div>
                            <small className="text-muted">{new Date(log.created_at).toLocaleTimeString()}</small>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar-xs me-2">
                                <div className="avatar-title bg-soft-primary text-primary rounded-circle">
                                  {log.admin_name?.charAt(0)}
                                </div>
                              </div>
                              <div>
                                <div className="fw-medium">{log.admin_name}</div>
                                <small className="text-muted">{log.admin_role}</small>
                              </div>
                            </div>
                          </td>
                          <td>{getActionBadge(log.action)}</td>
                          <td><span className="badge bg-soft-info text-info">{log.resource_type}</span></td>
                          <td>{log.description}</td>
                          <td><code className="text-muted">{log.ip_address}</code></td>
                          <td>
                            <button className="btn btn-sm btn-soft-info">
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
                    <div className="avatar-title bg-soft-info text-info rounded-circle fs-24">
                      <i className="ri-file-list-line"></i>
                    </div>
                  </div>
                  <h5>No audit logs found</h5>
                  <p className="text-muted">
                    {filters.search || filters.admin || filters.action || filters.dateFrom || filters.dateTo
                      ? 'No logs match your search criteria'
                      : 'Audit logs will appear here as admins perform actions'}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {logs.length > 0 && (
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

export default AuditLogs;
