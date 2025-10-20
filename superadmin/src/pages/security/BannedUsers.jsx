import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const BannedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    userType: ''
  });
  const [stats, setStats] = useState({
    banned: 0,
    suspended: 0,
    temporary: 0,
    permanent: 0
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchBannedUsers();
  }, [filters, pagination.current_page]);

  const fetchBannedUsers = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };
      // TODO: API call
      setTimeout(() => {
        setUsers([]);
        setStats({
          banned: 0,
          suspended: 0,
          temporary: 0,
          permanent: 0
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch banned users:', error);
      toast.error('Failed to load banned users');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handleUnban = async (userId) => {
    if (!window.confirm('Are you sure you want to unban this user?')) {
      return;
    }

    try {
      // TODO: API call
      // await axiosInstance.post(`/api/v1/superadmin/users/${userId}/unban`);
      toast.success('User unbanned successfully');
      fetchBannedUsers();
    } catch (error) {
      toast.error('Failed to unban user');
    }
  };

  const handleUnsuspend = async (userId) => {
    try {
      // TODO: API call
      // await axiosInstance.post(`/api/v1/superadmin/users/${userId}/unsuspend`);
      toast.success('User unsuspended successfully');
      fetchBannedUsers();
    } catch (error) {
      toast.error('Failed to unsuspend user');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      banned: 'danger',
      suspended: 'warning',
      temporary_ban: 'warning',
      permanent_ban: 'danger'
    };
    return <span className={`badge bg-${badges[status] || 'secondary'}`}>{status.replace('_', ' ')}</span>;
  };

  const getUserTypeBadge = (type) => {
    const badges = {
      streamer: 'primary',
      engineer: 'success',
      client: 'info',
      admin: 'danger'
    };
    return <span className={`badge bg-soft-${badges[type]} text-${badges[type]}`}>{type}</span>;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Banned Users</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Banned Users</li>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Banned Users</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.banned}</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-danger rounded fs-3">
                    <i className="ri-user-forbid-line text-danger"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Suspended</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.suspended}</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-warning rounded fs-3">
                    <i className="ri-user-unfollow-line text-warning"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Temporary Ban</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.temporary}</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-warning rounded fs-3">
                    <i className="ri-time-line text-warning"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Permanent Ban</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.permanent}</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-danger rounded fs-3">
                    <i className="ri-close-circle-line text-danger"></i>
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
                <div className="col-lg-5">
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control search"
                      placeholder="Search by name, email, or ID..."
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </div>
                <div className="col-lg-3">
                  <select
                    className="form-select"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Status</option>
                    <option value="banned">Banned</option>
                    <option value="suspended">Suspended</option>
                    <option value="temporary_ban">Temporary Ban</option>
                    <option value="permanent_ban">Permanent Ban</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <select
                    className="form-select"
                    name="userType"
                    value={filters.userType}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value="streamer">Streamer</option>
                    <option value="engineer">Engineer</option>
                    <option value="client">Client</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <button className="btn btn-primary w-100" onClick={fetchBannedUsers}>
                    <i className="ri-filter-3-line align-bottom me-1"></i> Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banned Users Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Banned & Suspended Users</h5>
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
              ) : users.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>User</th>
                        <th>User Type</th>
                        <th>Status</th>
                        <th>Reason</th>
                        <th>Banned By</th>
                        <th>Banned Date</th>
                        <th>Expires</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar-xs me-2">
                                <div className="avatar-title bg-soft-primary text-primary rounded-circle">
                                  {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                                </div>
                              </div>
                              <div>
                                <div className="fw-medium">{user.first_name} {user.last_name}</div>
                                <small className="text-muted">{user.email}</small>
                              </div>
                            </div>
                          </td>
                          <td>{getUserTypeBadge(user.account_type)}</td>
                          <td>{getStatusBadge(user.ban_status)}</td>
                          <td>
                            <div className="text-truncate" style={{ maxWidth: '200px' }} title={user.ban_reason}>
                              {user.ban_reason || 'N/A'}
                            </div>
                          </td>
                          <td>{user.banned_by_name || 'System'}</td>
                          <td>{new Date(user.banned_at).toLocaleDateString()}</td>
                          <td>
                            {user.ban_expires_at ? (
                              <span className="text-warning">
                                {new Date(user.ban_expires_at).toLocaleDateString()}
                              </span>
                            ) : (
                              <span className="text-danger">Permanent</span>
                            )}
                          </td>
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
                                  <Link to={`/superadmin/users/${user.id}`} className="dropdown-item">
                                    <i className="ri-eye-fill me-2"></i>View Profile
                                  </Link>
                                </li>
                                {user.ban_status === 'suspended' && (
                                  <li>
                                    <button
                                      className="dropdown-item text-success"
                                      onClick={() => handleUnsuspend(user.id)}
                                    >
                                      <i className="ri-user-add-line me-2"></i>Unsuspend
                                    </button>
                                  </li>
                                )}
                                {(user.ban_status === 'banned' || user.ban_status === 'temporary_ban' || user.ban_status === 'permanent_ban') && (
                                  <li>
                                    <button
                                      className="dropdown-item text-success"
                                      onClick={() => handleUnban(user.id)}
                                    >
                                      <i className="ri-user-add-line me-2"></i>Unban
                                    </button>
                                  </li>
                                )}
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                  <a className="dropdown-item text-danger" href="#">
                                    <i className="ri-delete-bin-line me-2"></i>Delete Account
                                  </a>
                                </li>
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
                  <h5>No Banned Users</h5>
                  <p className="text-muted">
                    {filters.search || filters.status || filters.userType
                      ? 'No users match your search criteria'
                      : 'There are currently no banned or suspended users'}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {users.length > 0 && (
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

export default BannedUsers;
