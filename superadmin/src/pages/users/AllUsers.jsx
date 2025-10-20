import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    verified: ''
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchUsers();
  }, [filters, pagination.current_page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };

      const response = await axiosInstance.get('/api/v1/superadmin/users', { params });
      setUsers(response.data.data.items || []);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleAction = async (userId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return;
    }

    try {
      await axiosInstance.post(`/api/v1/superadmin/users/${userId}/${action}`);
      toast.success(`User ${action}ed successfully`);
      fetchUsers();
    } catch (error) {
      toast.error(`Failed to ${action} user`);
    }
  };

  const getUserTypeBadge = (type) => {
    const colors = {
      streamer: 'primary',
      engineer: 'success',
      client: 'info',
      admin: 'danger'
    };
    return <span className={`badge bg-${colors[type] || 'secondary'}`}>{type}</span>;
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'success',
      suspended: 'warning',
      banned: 'danger',
      pending: 'secondary'
    };
    return <span className={`badge bg-${colors[status] || 'secondary'}`}>{status}</span>;
  };

  return (
    <>
      {/* Page Title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">All Users</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">All Users</li>
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
              <form onSubmit={handleSearch}>
                <div className="row g-3">
                  <div className="col-xl-4">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search users..."
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </div>

                  <div className="col-xl-2">
                    <select
                      className="form-select"
                      name="type"
                      value={filters.type}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Types</option>
                      <option value="streamer">Streamer</option>
                      <option value="engineer">Engineer</option>
                      <option value="client">Client</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="col-xl-2">
                    <select
                      className="form-select"
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="banned">Banned</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div className="col-xl-2">
                    <select
                      className="form-select"
                      name="verified"
                      value={filters.verified}
                      onChange={handleFilterChange}
                    >
                      <option value="">Verification</option>
                      <option value="verified">Verified</option>
                      <option value="unverified">Unverified</option>
                    </select>
                  </div>

                  <div className="col-xl-2">
                    <button type="submit" className="btn btn-primary w-100">
                      <i className="ri-search-line align-bottom me-1"></i> Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">
                  Users List ({pagination.total})
                </h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-soft-info btn-sm">
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
                  <table className="table table-hover table-nowrap align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">User</th>
                        <th scope="col">Type</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Verified</th>
                        <th scope="col">Joined</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-2">
                                <div className="avatar-sm">
                                  <div className="avatar-title bg-soft-primary text-primary rounded-circle">
                                    {user.first_name?.[0]}{user.last_name?.[0]}
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="mb-0">
                                  <Link to={`/superadmin/users/${user.id}`} className="text-dark">
                                    {user.first_name} {user.last_name}
                                  </Link>
                                </h6>
                                <small className="text-muted">{user.account_id}</small>
                              </div>
                            </div>
                          </td>
                          <td>{getUserTypeBadge(user.user_type)}</td>
                          <td>{user.email}</td>
                          <td>{getStatusBadge(user.status)}</td>
                          <td>
                            {user.email_verified_at ? (
                              <i className="ri-checkbox-circle-fill text-success fs-16"></i>
                            ) : (
                              <i className="ri-close-circle-fill text-danger fs-16"></i>
                            )}
                          </td>
                          <td>{new Date(user.created_at).toLocaleDateString()}</td>
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
                                  <Link className="dropdown-item" to={`/superadmin/users/${user.id}`}>
                                    <i className="ri-eye-fill me-2"></i>View Details
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleAction(user.id, user.status === 'suspended' ? 'unsuspend' : 'suspend')}
                                  >
                                    <i className="ri-forbid-line me-2"></i>
                                    {user.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => handleAction(user.id, 'ban')}
                                  >
                                    <i className="ri-close-circle-line me-2"></i>Ban User
                                  </button>
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
                    <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                      <i className="ri-user-search-line"></i>
                    </div>
                  </div>
                  <h5>No users found</h5>
                  <p className="text-muted">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {pagination.total > pagination.per_page && (
              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">
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
                      {[...Array(Math.ceil(pagination.total / pagination.per_page))].map((_, idx) => (
                        <li key={idx} className={`page-item ${pagination.current_page === idx + 1 ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setPagination(prev => ({ ...prev, current_page: idx + 1 }))}
                          >
                            {idx + 1}
                          </button>
                        </li>
                      )).slice(
                        Math.max(0, pagination.current_page - 3),
                        Math.min(Math.ceil(pagination.total / pagination.per_page), pagination.current_page + 2)
                      )}
                      <li className={`page-item ${pagination.current_page === Math.ceil(pagination.total / pagination.per_page) ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setPagination(prev => ({ ...prev, current_page: prev.current_page + 1 }))}
                          disabled={pagination.current_page === Math.ceil(pagination.total / pagination.per_page)}
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

export default AllUsers;

