import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    verified: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    verified: 0,
    suspended: 0
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchChannels();
  }, [filters, pagination.current_page]);

  const fetchChannels = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };

      const response = await axiosInstance.get('/api/v1/superadmin/users/streamers', { params });
      
      if (response.data.success) {
        setChannels(response.data.data.items || []);
        setStats(response.data.data.stats || stats);
        setPagination(response.data.data.pagination || pagination);
      }
    } catch (error) {
      console.error('Failed to fetch channels:', error);
      toast.error('Failed to load channels');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handleAction = async (channelId, action) => {
    try {
      await axiosInstance.post(`/api/v1/superadmin/users/${channelId}/${action}`);
      toast.success(`Channel ${action}d successfully`);
      fetchChannels();
    } catch (error) {
      console.error(`Failed to ${action} channel:`, error);
      toast.error(`Failed to ${action} channel`);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Channels Management</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/superadmin/content">Content</Link></li>
                <li className="breadcrumb-item active">Channels</li>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Channels</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? <span className="placeholder col-6"></span> : <span className="counter-value">{stats.total}</span>}
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary rounded fs-3">
                    <i className="ri-tv-line text-primary"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Active</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? <span className="placeholder col-6"></span> : <span className="counter-value">{stats.active}</span>}
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-success rounded fs-3">
                    <i className="ri-play-circle-line text-success"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Verified</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? <span className="placeholder col-6"></span> : <span className="counter-value">{stats.verified}</span>}
                  </h4>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Suspended</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? <span className="placeholder col-6"></span> : <span className="counter-value">{stats.suspended}</span>}
                  </h4>
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
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search channels..."
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <select className="form-select" name="status" value={filters.status} onChange={handleFilterChange}>
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select className="form-select" name="verified" value={filters.verified} onChange={handleFilterChange}>
                    <option value="">All Verification</option>
                    <option value="verified">Verified</option>
                    <option value="unverified">Unverified</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Channels List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">All Streaming Channels</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : channels.length === 0 ? (
                <div className="text-center py-5">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                      <i className="ri-tv-line"></i>
                    </div>
                  </div>
                  <h5>No channels found</h5>
                  <p className="text-muted">Streaming channels will appear here once streamers register</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Channel</th>
                        <th>Subscribers</th>
                        <th>Content</th>
                        <th>Status</th>
                        <th>Verified</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {channels.map((channel) => (
                        <tr key={channel.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar-xs me-2">
                                <div className="avatar-title bg-soft-primary text-primary rounded-circle">
                                  {channel.channel_name?.charAt(0) || 'C'}
                                </div>
                              </div>
                              <div>
                                <h6 className="mb-0">{channel.channel_name}</h6>
                                <small className="text-muted">{channel.name}</small>
                              </div>
                            </div>
                          </td>
                          <td><i className="ri-user-line me-1"></i>{channel.subscribers_count || 0}</td>
                          <td>{channel.content_count || 0} items</td>
                          <td>
                            <span className={`badge bg-soft-${
                              channel.status === 'active' ? 'success' :
                              channel.status === 'suspended' ? 'warning' : 'danger'
                            }`}>
                              {channel.status}
                            </span>
                          </td>
                          <td>
                            {channel.is_verified ? (
                              <span className="badge bg-soft-info">
                                <i className="ri-verified-badge-line me-1"></i>Verified
                              </span>
                            ) : (
                              <span className="badge bg-soft-secondary">Unverified</span>
                            )}
                          </td>
                          <td>{new Date(channel.created_at).toLocaleDateString()}</td>
                          <td>
                            <div className="dropdown">
                              <button className="btn btn-sm btn-soft-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                Actions
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <Link to={`/superadmin/users/streamers/${channel.id}`} className="dropdown-item">
                                    <i className="ri-eye-line me-2"></i>View Channel
                                  </Link>
                                </li>
                                {!channel.is_verified && (
                                  <li>
                                    <button className="dropdown-item" onClick={() => handleAction(channel.id, 'verify')}>
                                      <i className="ri-verified-badge-line me-2"></i>Verify
                                    </button>
                                  </li>
                                )}
                                <li>
                                  <button className="dropdown-item" onClick={() => handleAction(channel.id, 'suspend')}>
                                    <i className="ri-pause-circle-line me-2"></i>Suspend
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

export default Channels;

