import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    projects: 0,
    spent: 0
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchClients();
  }, [filters, pagination.current_page]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };

      const response = await axiosInstance.get('/api/v1/superadmin/users/clients', { params });
      
      if (response.data.success) {
        const data = response.data.data;
        setClients(data.items || []);
        
        // Update stats from response
        setStats({
          total: data.total || 0,
          active: data.active || 0,
          projects: data.projects_count || 0,
          spent: data.total_spent || 0
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
      console.error('Failed to fetch clients:', error);
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handleAction = async (clientId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this client?`)) {
      return;
    }

    try {
      const response = await axiosInstance.post(`/api/v1/superadmin/users/${clientId}/${action}`);
      
      if (response.data.success) {
        toast.success(response.data.message || `Client ${action}ed successfully`);
        fetchClients();
      }
    } catch (error) {
      console.error(`Failed to ${action} client:`, error);
      const errorMessage = error.response?.data?.message || `Failed to ${action} client`;
      toast.error(errorMessage);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Clients Management</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Clients</li>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Clients</p>
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
                  <span className="text-muted">All clients</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-info rounded fs-3">
                    <i className="ri-user-line text-info"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Active Clients</p>
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

        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Projects</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? (
                      <span className="placeholder col-6"></span>
                    ) : (
                      <span className="counter-value">{stats.projects}</span>
                    )}
                  </h4>
                  <span className="text-muted">All time</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary rounded fs-3">
                    <i className="ri-briefcase-4-line text-primary"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Spent</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? (
                      <span className="placeholder col-6"></span>
                    ) : (
                      formatCurrency(stats.spent)
                    )}
                  </h4>
                  <span className="text-muted">All time</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-warning rounded fs-3">
                    <i className="ri-money-dollar-circle-line text-warning"></i>
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
                    placeholder="Search clients..."
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clients List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Clients</h5>
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
              ) : clients.length === 0 ? (
                <div className="text-center py-5">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-soft-info text-info rounded-circle fs-24">
                      <i className="ri-user-search-line"></i>
                    </div>
                  </div>
                  <h5>No clients found</h5>
                  <p className="text-muted">Clients will appear here once they register on the platform</p>
                  <Link to="/superadmin/users" className="btn btn-info btn-sm">
                    <i className="ri-arrow-left-line align-middle me-1"></i> View All Users
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Projects</th>
                        <th>Total Spent</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client) => (
                        <tr key={client.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar-xs me-2">
                                <div className="avatar-title bg-soft-primary text-primary rounded-circle">
                                  {(client.first_name?.charAt(0) || client.name?.charAt(0) || 'C').toUpperCase()}
                                </div>
                              </div>
                              <div>
                                <h6 className="mb-0">
                                  {client.first_name && client.last_name 
                                    ? `${client.first_name} ${client.last_name}`
                                    : client.name || client.business_name || 'Unknown'}
                                </h6>
                                {client.business_name && (
                                  <small className="text-muted">{client.business_name}</small>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>{client.business_email || client.email}</td>
                          <td>{client.projects_count || 0}</td>
                          <td>{formatCurrency(client.total_spent || 0)}</td>
                          <td>
                            <span className={`badge bg-soft-${
                              client.status === 'active' || client.status === 'ACTIVE' ? 'success' :
                              client.status === 'suspended' ? 'warning' : 'danger'
                            }`}>
                              {client.status}
                            </span>
                          </td>
                          <td>{new Date(client.created_at).toLocaleDateString()}</td>
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
                                  <Link to={`/superadmin/users/${client.id}`} className="dropdown-item">
                                    <i className="ri-eye-line me-2"></i>View Details
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleAction(client.id, 'suspend')}
                                  >
                                    <i className="ri-pause-circle-line me-2"></i>Suspend
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => handleAction(client.id, 'ban')}
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

export default Clients;

