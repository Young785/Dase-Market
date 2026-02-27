import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    suspended: 0
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchAdmins();
  }, [filters, pagination.current_page]);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };

      const response = await axiosInstance.get('/api/v1/superadmin/users/admins', { params });
      
      if (response.data.success) {
        const data = response.data.data;
        setAdmins(data.items || []);
        
        // Update stats from response
        setStats({
          total: data.total || 0,
          active: data.active || 0,
          suspended: data.suspended || 0
        });
        
        // Update pagination
        if (data.pagination) {
          setPagination({
            current_page: data.pagination.current_page,
            per_page: data.pagination.per_page,
            total: data.pagination.total
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch admins:', error);
      toast.error('Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handleAction = async (adminId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this admin?`)) {
      return;
    }

    try {
      const response = await axiosInstance.post(`/api/v1/superadmin/users/${adminId}/${action}`);
      
      if (response.data.success) {
        toast.success(response.data.message || `Admin ${action}ed successfully`);
        fetchAdmins();
      }
    } catch (error) {
      console.error(`Failed to ${action} admin:`, error);
      const errorMessage = error.response?.data?.message || `Failed to ${action} admin`;
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Admins Management</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Admins</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row">
        <div className="col-xl-4 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Admins</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? (
                      <span className="placeholder col-6"></span>
                    ) : (
                      <span className="counter-value">{stats.total}</span>
                    )}
                  </h4>
                  <span className="text-muted">All admins</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary rounded fs-3">
                    <i className="ri-shield-user-line text-primary"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6">
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
                    {loading ? (
                      <span className="placeholder col-6"></span>
                    ) : (
                      <span className="counter-value">{stats.active}</span>
                    )}
                  </h4>
                  <span className="text-success">Active</span>
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

        <div className="col-xl-4 col-md-6">
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
                    {loading ? (
                      <span className="placeholder col-6"></span>
                    ) : (
                      <span className="counter-value">{stats.suspended}</span>
                    )}
                  </h4>
                  <span className="text-warning">Suspended</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-warning rounded fs-3">
                    <i className="ri-pause-circle-line text-warning"></i>
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
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search admins..."
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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    name="role"
                    value={filters.role}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="support">Support</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admins List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Admins</h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-primary btn-sm">
                    <i className="ri-add-line align-bottom me-1"></i> Add Admin
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
              ) : admins.length === 0 ? (
                <div className="text-center py-5">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                      <i className="ri-shield-user-line"></i>
                    </div>
                  </div>
                  <h5>No admins found</h5>
                  <p className="text-muted">Add admins to manage the platform</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Admin</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Last Login</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins.map((admin) => (
                        <tr key={admin.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar-xs me-2">
                                <div className="avatar-title bg-soft-primary text-primary rounded-circle">
                                  {admin.name?.charAt(0) || 'A'}
                                </div>
                              </div>
                              <div>
                                <h6 className="mb-0">{admin.name}</h6>
                              </div>
                            </div>
                          </td>
                          <td>{admin.email}</td>
                          <td>
                            <span className="badge bg-soft-info">
                              {admin.role || 'Admin'}
                            </span>
                          </td>
                          <td>
                            <span className={`badge bg-soft-${
                              admin.status === 'active' ? 'success' :
                              admin.status === 'suspended' ? 'warning' : 'danger'
                            }`}>
                              {admin.status}
                            </span>
                          </td>
                          <td>
                            {admin.last_login ? new Date(admin.last_login).toLocaleDateString() : 'Never'}
                          </td>
                          <td>{new Date(admin.created_at).toLocaleDateString()}</td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-sm btn-soft-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                              >
                                Actions
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <Link to={`/superadmin/users/${admin.id}`} className="dropdown-item">
                                    <i className="ri-eye-line me-2"></i>View Details
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleAction(admin.id, 'suspend')}
                                  >
                                    <i className="ri-pause-circle-line me-2"></i>Suspend
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => handleAction(admin.id, 'ban')}
                                  >
                                    <i className="ri-forbid-line me-2"></i>Ban
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admins;

