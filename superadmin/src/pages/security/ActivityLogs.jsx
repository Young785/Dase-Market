import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    action: '',
    user: '',
    date_from: '',
    date_to: ''
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 50,
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

      // TODO: Replace with actual API endpoint when available
      // const response = await axiosInstance.get('/api/v1/superadmin/activity-logs', { params });
      // setLogs(response.data.data.items || []);
      // setPagination(response.data.data.pagination);
      
      setTimeout(() => {
        setLogs([]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch activity logs:', error);
      toast.error('Failed to load activity logs');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const getActionBadge = (action) => {
    const actions = {
      login: { color: 'success', icon: 'ri-login-box-line' },
      logout: { color: 'secondary', icon: 'ri-logout-box-line' },
      create: { color: 'primary', icon: 'ri-add-line' },
      update: { color: 'info', icon: 'ri-edit-line' },
      delete: { color: 'danger', icon: 'ri-delete-bin-line' },
      view: { color: 'secondary', icon: 'ri-eye-line' },
      suspend: { color: 'warning', icon: 'ri-pause-circle-line' },
      ban: { color: 'danger', icon: 'ri-forbid-line' }
    };

    const config = actions[action] || { color: 'secondary', icon: 'ri-information-line' };

    return (
      <span className={`badge bg-soft-${config.color} text-${config.color}`}>
        <i className={`${config.icon} me-1`}></i>
        {action}
      </span>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Activity Logs</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Activity Logs</li>
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
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search logs..."
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select"
                    name="action"
                    value={filters.action}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Actions</option>
                    <option value="login">Login</option>
                    <option value="logout">Logout</option>
                    <option value="create">Create</option>
                    <option value="update">Update</option>
                    <option value="delete">Delete</option>
                    <option value="suspend">Suspend</option>
                    <option value="ban">Ban</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filter by user"
                    name="user"
                    value={filters.user}
                    onChange={handleFilterChange}
                  />
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
                    onClick={fetchLogs}
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

      {/* Activity Logs */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Recent Activities</h5>
                <div>
                  <button className="btn btn-soft-primary btn-sm">
                    <i className="ri-download-line me-1"></i>
                    Export Logs
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
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '50px' }}>#</th>
                        <th>Action</th>
                        <th>User</th>
                        <th>Description</th>
                        <th>IP Address</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log, index) => (
                        <tr key={log.id}>
                          <td>{((pagination.current_page - 1) * pagination.per_page) + index + 1}</td>
                          <td>{getActionBadge(log.action)}</td>
                          <td>
                            <div>
                              <div className="fw-medium">{log.user_name}</div>
                              <small className="text-muted">{log.user_email}</small>
                            </div>
                          </td>
                          <td>
                            <span className="text-muted">{log.description}</span>
                          </td>
                          <td>
                            <code className="text-muted">{log.ip_address}</code>
                          </td>
                          <td>
                            <div>
                              <div>{new Date(log.created_at).toLocaleDateString()}</div>
                              <small className="text-muted">
                                {new Date(log.created_at).toLocaleTimeString()}
                              </small>
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
                    <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                      <i className="ri-history-line"></i>
                    </div>
                  </div>
                  <h5>No Activity Logs</h5>
                  <p className="text-muted">
                    {filters.search || filters.action || filters.user
                      ? 'No activity logs match your search criteria'
                      : 'Activity logs will appear here as actions are performed'}
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

export default ActivityLogs;
