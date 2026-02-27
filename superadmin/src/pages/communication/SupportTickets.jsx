import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: ''
  });
  const [stats, setStats] = useState({
    open: 0,
    in_progress: 0,
    resolved_today: 0,
    avg_response_time: 0
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchTickets();
  }, [filters, pagination.current_page]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };

      const response = await axiosInstance.get('/api/v1/superadmin/support/tickets', { params });
      const data = response.data.data;
      
      setTickets(data.items || []);
      setStats({
        open: data.stats?.open || 0,
        in_progress: data.stats?.in_progress || 0,
        resolved_today: data.stats?.resolved_today || 0,
        avg_response_time: data.stats?.avg_response_time || 0
      });
      setPagination(prev => ({
        ...prev,
        total: data.total || 0
      }));
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handleUpdateStatus = async (ticketId, status) => {
    if (!window.confirm(`Are you sure you want to update this ticket status to ${status}?`)) {
      return;
    }

    try {
      await axiosInstance.post(`/api/v1/superadmin/support/tickets/${ticketId}/status`, { status });
      toast.success(`Ticket status updated to ${status}`);
      fetchTickets();
    } catch (error) {
      console.error('Failed to update ticket status:', error);
      toast.error('Failed to update ticket status');
    }
  };

  const handleAssignTicket = async (ticketId) => {
    try {
      await axiosInstance.post(`/api/v1/superadmin/support/tickets/${ticketId}/assign`);
      toast.success('Ticket assigned successfully');
      fetchTickets();
    } catch (error) {
      console.error('Failed to assign ticket:', error);
      toast.error('Failed to assign ticket');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      open: 'danger',
      in_progress: 'warning',
      resolved: 'success',
      closed: 'secondary'
    };
    return <span className={`badge bg-${badges[status] || 'secondary'}`}>{status.replace('_', ' ')}</span>;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      urgent: 'danger',
      high: 'warning',
      medium: 'info',
      low: 'secondary'
    };
    return <span className={`badge bg-soft-${badges[priority]} text-${badges[priority]}`}>{priority}</span>;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Support Tickets</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Support Tickets</li>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Open Tickets</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.open}</span>
                  </h4>
                  <span className={stats.open > 0 ? "text-danger" : "text-muted"}>
                    {stats.open > 0 ? 'Needs attention' : 'All clear'}
                  </span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className={`avatar-title bg-soft-${stats.open > 0 ? 'danger' : 'success'} rounded fs-3`}>
                    <i className={`ri-ticket-2-line text-${stats.open > 0 ? 'danger' : 'success'}`}></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">In Progress</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.in_progress}</span>
                  </h4>
                  <span className="text-warning">Being handled</span>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Resolved Today</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.resolved_today}</span>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Avg Response Time</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.avg_response_time}</span>h
                  </h4>
                  <span className="text-muted">Response time</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-info rounded fs-3">
                    <i className="ri-timer-line text-info"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
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
                      placeholder="Search tickets..."
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
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
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
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
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
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="account">Account</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <button className="btn btn-primary w-100" onClick={fetchTickets}>
                    <i className="ri-filter-3-line align-bottom me-1"></i> Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Support Tickets</h5>
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
              ) : tickets.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Ticket ID</th>
                        <th>Subject</th>
                        <th>User</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Created</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                          <td className="fw-medium">#{ticket.id}</td>
                          <td>
                            <h6 className="mb-0">{ticket.subject}</h6>
                            <small className="text-muted">{ticket.message?.substring(0, 50)}...</small>
                          </td>
                          <td>
                            <div>
                              <div className="fw-medium">{ticket.user_name}</div>
                              <small className="text-muted">{ticket.user_email}</small>
                            </div>
                          </td>
                          <td><span className="badge bg-soft-primary text-primary">{ticket.category}</span></td>
                          <td>{getPriorityBadge(ticket.priority)}</td>
                          <td>
                            <div>
                              <div>{new Date(ticket.created_at).toLocaleDateString()}</div>
                              <small className="text-muted">{new Date(ticket.created_at).toLocaleTimeString()}</small>
                            </div>
                          </td>
                          <td>{getStatusBadge(ticket.status)}</td>
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
                                {ticket.status === 'open' && (
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => handleUpdateStatus(ticket.id, 'in_progress')}
                                    >
                                      <i className="ri-play-fill me-2"></i>Start Working
                                    </button>
                                  </li>
                                )}
                                {ticket.status === 'in_progress' && (
                                  <li>
                                    <button
                                      className="dropdown-item text-success"
                                      onClick={() => handleUpdateStatus(ticket.id, 'resolved')}
                                    >
                                      <i className="ri-check-fill me-2"></i>Mark Resolved
                                    </button>
                                  </li>
                                )}
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleAssignTicket(ticket.id)}
                                  >
                                    <i className="ri-user-add-fill me-2"></i>Assign
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
                    <div className="avatar-title bg-soft-success text-success rounded-circle fs-24">
                      <i className="ri-customer-service-2-line"></i>
                    </div>
                  </div>
                  <h5>No support tickets yet</h5>
                  <p className="text-muted">
                    {filters.search || filters.status || filters.priority || filters.category
                      ? 'No tickets match your search criteria'
                      : 'Support tickets from users will appear here'}
                  </p>
                  <small className="text-muted">Users can submit tickets through the platform</small>
                </div>
              )}
            </div>

            {/* Pagination */}
            {tickets.length > 0 && (
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

export default SupportTickets;
