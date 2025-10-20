import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const ModerationQueue = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    content_type: '',
    reason: '',
    priority: ''
  });
  const [stats, setStats] = useState({
    pending: 0,
    under_review: 0,
    approved_today: 0,
    rejected_today: 0
  });

  useEffect(() => {
    fetchQueue();
  }, [filters]);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API
      setTimeout(() => {
        setItems([]);
        setStats({
          pending: 0,
          under_review: 0,
          approved_today: 0,
          rejected_today: 0
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch moderation queue:', error);
      toast.error('Failed to load moderation queue');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSelect = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  const handleApprove = async (itemId) => {
    setProcessing(itemId);
    try {
      // TODO: API call
      // await axiosInstance.post(`/api/v1/superadmin/content/moderation/${itemId}/approve`);
      toast.success('Content approved successfully');
      fetchQueue();
    } catch (error) {
      toast.error('Failed to approve content');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (itemId, reason = '') => {
    setProcessing(itemId);
    try {
      // TODO: API call
      // await axiosInstance.post(`/api/v1/superadmin/content/moderation/${itemId}/reject`, { reason });
      toast.success('Content rejected successfully');
      fetchQueue();
    } catch (error) {
      toast.error('Failed to reject content');
    } finally {
      setProcessing(null);
    }
  };

  const handleBulkApprove = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please select items first');
      return;
    }

    try {
      // TODO: API call
      // await axiosInstance.post('/api/v1/superadmin/content/moderation/bulk-approve', { ids: selectedItems });
      toast.success(`${selectedItems.length} items approved`);
      setSelectedItems([]);
      fetchQueue();
    } catch (error) {
      toast.error('Failed to approve items');
    }
  };

  const handleBulkReject = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please select items first');
      return;
    }

    if (!window.confirm(`Reject ${selectedItems.length} items?`)) {
      return;
    }

    try {
      // TODO: API call
      // await axiosInstance.post('/api/v1/superadmin/content/moderation/bulk-reject', { ids: selectedItems });
      toast.success(`${selectedItems.length} items rejected`);
      setSelectedItems([]);
      fetchQueue();
    } catch (error) {
      toast.error('Failed to reject items');
    }
  };

  const getContentTypeBadge = (type) => {
    const badges = {
      post: 'primary',
      short: 'success',
      comment: 'info',
      profile: 'warning'
    };
    return <span className={`badge bg-soft-${badges[type]} text-${badges[type]}`}>{type}</span>;
  };

  const getReasonBadge = (reason) => {
    const badges = {
      spam: 'danger',
      inappropriate: 'warning',
      copyright: 'info',
      other: 'secondary'
    };
    return <span className={`badge bg-soft-${badges[reason]} text-${badges[reason]}`}>{reason}</span>;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'danger',
      medium: 'warning',
      low: 'secondary'
    };
    return <span className={`badge bg-${badges[priority]}`}>{priority}</span>;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Moderation Queue</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/superadmin/content">Content</Link></li>
                <li className="breadcrumb-item active">Moderation</li>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Pending Review</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className={`counter-value ${stats.pending > 0 ? 'badge bg-danger' : ''}`}>
                      {stats.pending}
                    </span>
                  </h4>
                  <span className={stats.pending > 0 ? "text-danger" : "text-muted"}>
                    {stats.pending > 0 ? 'Needs attention' : 'All clear'}
                  </span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className={`avatar-title bg-soft-${stats.pending > 0 ? 'danger' : 'success'} rounded fs-3`}>
                    <i className={`ri-flag-line text-${stats.pending > 0 ? 'danger' : 'success'}`}></i>
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
                  <span className="text-warning">In progress</span>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Approved Today</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.approved_today}</span>
                  </h4>
                  <span className="text-success">Approved</span>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Rejected Today</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.rejected_today}</span>
                  </h4>
                  <span className="text-muted">Rejected</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-info rounded fs-3">
                    <i className="ri-close-circle-line text-info"></i>
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
                <div className="col-lg-3">
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control search"
                      placeholder="Search flagged content..."
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
                    name="content_type"
                    value={filters.content_type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Content Types</option>
                    <option value="post">Posts</option>
                    <option value="short">Shorts</option>
                    <option value="comment">Comments</option>
                    <option value="profile">Profiles</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <select
                    className="form-select"
                    name="reason"
                    value={filters.reason}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Reasons</option>
                    <option value="spam">Spam</option>
                    <option value="inappropriate">Inappropriate</option>
                    <option value="copyright">Copyright</option>
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
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary w-100" onClick={fetchQueue}>
                      <i className="ri-filter-3-line align-bottom me-1"></i> Filter
                    </button>
                    <button className="btn btn-soft-danger" onClick={() => setFilters({ search: '', content_type: '', reason: '', priority: '' })}>
                      <i className="ri-refresh-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moderation Queue List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <div className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedItems.length === items.length && items.length > 0}
                    onChange={handleSelectAll}
                  />
                </div>
                <h5 className="card-title mb-0 flex-grow-1">
                  Flagged Content
                  {selectedItems.length > 0 && (
                    <span className="badge bg-primary ms-2">{selectedItems.length} selected</span>
                  )}
                </h5>
                <div className="flex-shrink-0">
                  <button
                    className="btn btn-soft-success btn-sm me-2"
                    onClick={handleBulkApprove}
                    disabled={selectedItems.length === 0}
                  >
                    <i className="ri-check-double-line align-bottom me-1"></i> Bulk Approve
                  </button>
                  <button
                    className="btn btn-soft-danger btn-sm"
                    onClick={handleBulkReject}
                    disabled={selectedItems.length === 0}
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Bulk Reject
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
              ) : items.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '40px' }}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedItems.length === items.length}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>Content</th>
                        <th>Type</th>
                        <th>Author</th>
                        <th>Reason</th>
                        <th>Priority</th>
                        <th>Flagged Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleSelect(item.id)}
                            />
                          </td>
                          <td>
                            <div>
                              <h6 className="mb-0">{item.title || item.content?.substring(0, 50)}</h6>
                              <small className="text-muted">{item.description?.substring(0, 80)}...</small>
                            </div>
                          </td>
                          <td>{getContentTypeBadge(item.content_type)}</td>
                          <td>{item.author_name}</td>
                          <td>{getReasonBadge(item.reason)}</td>
                          <td>{getPriorityBadge(item.priority)}</td>
                          <td>{new Date(item.flagged_at).toLocaleDateString()}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-soft-success"
                                onClick={() => handleApprove(item.id)}
                                disabled={processing === item.id}
                              >
                                <i className="ri-check-line"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-soft-danger"
                                onClick={() => handleReject(item.id)}
                                disabled={processing === item.id}
                              >
                                <i className="ri-close-line"></i>
                              </button>
                              <button className="btn btn-sm btn-soft-info">
                                <i className="ri-eye-line"></i>
                              </button>
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
                  <h5>All Clear!</h5>
                  <p className="text-muted">
                    {filters.search || filters.content_type || filters.reason || filters.priority
                      ? 'No flagged content matches your filters'
                      : 'No flagged content in moderation queue'}
                  </p>
                  <small className="text-muted">Flagged content will appear here for review</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModerationQueue;
