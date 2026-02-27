import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Streamers = () => {
  const [streamers, setStreamers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    verified: 0,
    content: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    status: ''
  });

  useEffect(() => {
    fetchStreamers();
  }, [filters]);

  const fetchStreamers = async () => {
    setLoading(true);
    try {
      const params = {
        type: 'streamer',
        ...filters
      };

      const response = await axiosInstance.get('/api/v1/superadmin/users/streamers', { params });
      const data = response.data.data;
      
      setStreamers(data.items || []);
      setStats({
        total: data.total || 0,
        active: data.active || 0,
        verified: data.verified || 0,
        content: data.content_count || 0
      });
    } catch (error) {
      console.error('Failed to fetch streamers:', error);
      toast.error('Failed to load streamers');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleAction = async (userId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this streamer?`)) {
      return;
    }

    try {
      await axiosInstance.post(`/api/v1/superadmin/users/${userId}/${action}`);
      toast.success(`Streamer ${action}ed successfully`);
      fetchStreamers();
    } catch (error) {
      toast.error(`Failed to ${action} streamer`);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      ACTIVE: 'success',
      INACTIVE: 'warning',
      suspended: 'warning',
      banned: 'danger'
    };
    return <span className={`badge bg-${colors[status] || 'secondary'}`}>{status}</span>;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Streamers Management</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Streamers</li>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Streamers</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.total}</span>
                  </h4>
                  <span className="text-muted">All streamers</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary rounded fs-3">
                    <i className="ri-user-star-line text-primary"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Active Streamers</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.active}</span>
                  </h4>
                  <span className="text-success">Active accounts</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-success rounded fs-3">
                    <i className="ri-user-follow-line text-success"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Verified Channels</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.verified}</span>
                  </h4>
                  <span className="text-info">Verified</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-info rounded fs-3">
                    <i className="ri-verified-badge-line text-info"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Content</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.content}</span>
                  </h4>
                  <span className="text-muted">Posts + Shorts</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-warning rounded fs-3">
                    <i className="ri-play-list-2-line text-warning"></i>
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
                <div className="col-xl-6">
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control search"
                      placeholder="Search streamers..."
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </div>
                <div className="col-xl-3">
                  <select
                    className="form-select"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="suspended">Suspended</option>
                    <option value="banned">Banned</option>
                  </select>
                </div>
                <div className="col-xl-3">
                  <button className="btn btn-soft-primary w-100">
                    <i className="ri-file-download-line align-bottom me-1"></i> Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Streamers List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Streamers ({stats.total})</h5>
              </div>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : streamers.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-nowrap align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Streamer</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Verified</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {streamers.map((streamer) => (
                        <tr key={streamer.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-2">
                                <div className="avatar-sm">
                                  <div className="avatar-title bg-soft-primary text-primary rounded-circle">
                                    {streamer.first_name?.[0]}{streamer.last_name?.[0]}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h6 className="mb-0">
                                  <Link to={`/superadmin/users/${streamer.id}`} className="text-dark">
                                    {streamer.first_name} {streamer.last_name}
                                  </Link>
                                </h6>
                                <small className="text-muted">{streamer.account_id}</small>
                              </div>
                            </div>
                          </td>
                          <td>{streamer.email}</td>
                          <td>{getStatusBadge(streamer.status)}</td>
                          <td>
                            {streamer.email_verified_at ? (
                              <i className="ri-checkbox-circle-fill text-success fs-16"></i>
                            ) : (
                              <i className="ri-close-circle-fill text-danger fs-16"></i>
                            )}
                          </td>
                          <td>{new Date(streamer.created_at).toLocaleDateString()}</td>
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
                                  <Link className="dropdown-item" to={`/superadmin/users/${streamer.id}`}>
                                    <i className="ri-eye-fill me-2"></i>View Details
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleAction(streamer.id, 'suspend')}
                                  >
                                    <i className="ri-forbid-line me-2"></i>Suspend
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => handleAction(streamer.id, 'ban')}
                                  >
                                    <i className="ri-close-circle-line me-2"></i>Ban
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
                  <h5>No streamers found</h5>
                  <p className="text-muted">Streamers will appear here once they register on the platform</p>
                  <Link to="/superadmin/users" className="btn btn-primary btn-sm">
                    <i className="ri-arrow-left-line align-middle me-1"></i> View All Users
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Streamers;

