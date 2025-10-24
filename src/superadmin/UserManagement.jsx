import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, MoreVertical, Ban, CheckCircle, 
  XCircle, Eye, Edit, Trash2, Shield, AlertTriangle 
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const [users, setUsers] = useState({ streaming: null, dase: null });
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    platform: 'all',
    status: 'all',
    user_type: 'all',
    search: ''
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showActionModal, setShowActionModal] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [actionReason, setActionReason] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('superadmin_token');
      const params = new URLSearchParams(filters).toString();
      
      const response = await axios.get(`/api/v1/superadmin/manage/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(response.data.data.users);
      setStats(response.data.data.stats);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
      setLoading(false);
    }
  };

  const handleSuspendUser = async (platform, userId) => {
    if (!actionReason) {
      toast.error('Please provide a reason');
      return;
    }

    try {
      const token = localStorage.getItem('superadmin_token');
      await axios.post(
        `/api/v1/superadmin/manage/users/${platform}/${userId}/suspend`,
        { reason: actionReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('User suspended successfully');
      setShowActionModal(false);
      setActionReason('');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to suspend user');
    }
  };

  const handleBanUser = async (platform, userId) => {
    if (!actionReason) {
      toast.error('Please provide a reason');
      return;
    }

    try {
      const token = localStorage.getItem('superadmin_token');
      await axios.post(
        `/api/v1/superadmin/manage/users/${platform}/${userId}/ban`,
        { reason: actionReason, permanent: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('User banned successfully');
      setShowActionModal(false);
      setActionReason('');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to ban user');
    }
  };

  const handleVerifyUser = async (platform, userId) => {
    try {
      const token = localStorage.getItem('superadmin_token');
      await axios.post(
        `/api/v1/superadmin/manage/users/${platform}/${userId}/verify`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('User verified successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to verify user');
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.length === 0) {
      toast.error('Please select users first');
      return;
    }

    if (['suspend', 'ban'].includes(action) && !actionReason) {
      toast.error('Please provide a reason');
      return;
    }

    try {
      const token = localStorage.getItem('superadmin_token');
      await axios.post(
        `/api/v1/superadmin/manage/users/bulk-action`,
        {
          action,
          users: selectedUsers,
          reason: actionReason
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Bulk ${action} completed`);
      setSelectedUsers([]);
      setShowActionModal(false);
      setActionReason('');
      fetchUsers();
    } catch (error) {
      toast.error(`Failed to perform bulk ${action}`);
    }
  };

  const UserCard = ({ user, platform }) => {
    const isStreaming = platform === 'streaming';
    const userName = isStreaming ? user.fullname : `${user.first_name} ${user.last_name}`;
    const userRole = isStreaming ? 'Streamer' : user.role?.name || 'User';

    return (
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedUsers.some(u => u.id === user.account_id && u.platform === platform)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedUsers([...selectedUsers, { platform, id: user.account_id }]);
                  } else {
                    setSelectedUsers(selectedUsers.filter(u => u.id !== user.account_id || u.platform !== platform));
                  }
                }}
              />
            </div>
            <div className="dropdown">
              <button className="btn btn-sm btn-link text-muted" data-bs-toggle="dropdown">
                <MoreVertical size={16} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href={`/superadmin/users/${platform}/${user.account_id}`}>
                    <Eye size={14} className="me-2" />
                    View Details
                  </a>
                </li>
                <li>
                  <button 
                    className="dropdown-item" 
                    onClick={() => handleVerifyUser(platform, user.account_id)}
                  >
                    <CheckCircle size={14} className="me-2" />
                    Verify User
                  </button>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item text-warning"
                    onClick={() => {
                      setCurrentAction({ type: 'suspend', platform, id: user.account_id });
                      setShowActionModal(true);
                    }}
                  >
                    <AlertTriangle size={14} className="me-2" />
                    Suspend
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdown-item text-danger"
                    onClick={() => {
                      setCurrentAction({ type: 'ban', platform, id: user.account_id });
                      setShowActionModal(true);
                    }}
                  >
                    <Ban size={14} className="me-2" />
                    Ban
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="d-flex align-items-center mb-3">
            <div className="avatar avatar-md rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center me-3">
              <Users size={20} />
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-0">{userName}</h6>
              <small className="text-muted">{user.email}</small>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-secondary">{userRole}</span>
            <span className="badge bg-info">{platform}</span>
          </div>

          <div className="d-flex gap-1">
            {user.suspended_at && (
              <span className="badge bg-warning bg-opacity-10 text-warning">
                <AlertTriangle size={12} className="me-1" />
                Suspended
              </span>
            )}
            {user.banned_at && (
              <span className="badge bg-danger bg-opacity-10 text-danger">
                <Ban size={12} className="me-1" />
                Banned
              </span>
            )}
            {user.email_verified_at && (
              <span className="badge bg-success bg-opacity-10 text-success">
                <CheckCircle size={12} className="me-1" />
                Verified
              </span>
            )}
          </div>

          <small className="text-muted d-block mt-2">
            ID: {user.account_id}
          </small>
        </div>
      </div>
    );
  };

  return (
    <div className="user-management">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">User Management</h2>
          <p className="text-muted">Manage users across both platforms</p>
        </div>
        <button className="btn btn-primary" onClick={fetchUsers}>
          <i className="ri-refresh-line me-2"></i>
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-muted">Total Users</small>
                  <h4>{stats.total_users?.toLocaleString() || '0'}</h4>
                </div>
                <Users className="text-primary" size={32} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-muted">Active Users</small>
                  <h4>{stats.active_users?.toLocaleString() || '0'}</h4>
                </div>
                <CheckCircle className="text-success" size={32} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-muted">Suspended</small>
                  <h4>{stats.suspended_users?.toLocaleString() || '0'}</h4>
                </div>
                <AlertTriangle className="text-warning" size={32} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-muted">Banned</small>
                  <h4>{stats.banned_users?.toLocaleString() || '0'}</h4>
                </div>
                <Ban className="text-danger" size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label small">Platform</label>
              <select 
                className="form-select"
                value={filters.platform}
                onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
              >
                <option value="all">All Platforms</option>
                <option value="streaming">Live-Streaming</option>
                <option value="dase">DASE Marketplace</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small">Status</label>
              <select 
                className="form-select"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="banned">Banned</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small">User Type</label>
              <select 
                className="form-select"
                value={filters.user_type}
                onChange={(e) => setFilters({ ...filters, user_type: e.target.value })}
              >
                <option value="all">All Types</option>
                <option value="engineer">Engineers</option>
                <option value="client">Clients</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small">Search</label>
              <div className="input-group">
                <span className="input-group-text">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="card shadow-sm mb-4 border-primary">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{selectedUsers.length} user(s) selected</strong>
              </div>
              <div className="btn-group">
                <button 
                  className="btn btn-sm btn-outline-success"
                  onClick={() => handleBulkAction('verify')}
                >
                  <CheckCircle size={16} className="me-1" />
                  Verify
                </button>
                <button 
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => {
                    setCurrentAction({ type: 'bulk-suspend' });
                    setShowActionModal(true);
                  }}
                >
                  <AlertTriangle size={16} className="me-1" />
                  Suspend
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    setCurrentAction({ type: 'bulk-ban' });
                    setShowActionModal(true);
                  }}
                >
                  <Ban size={16} className="me-1" />
                  Ban
                </button>
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setSelectedUsers([])}
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Streaming Users */}
          {(filters.platform === 'all' || filters.platform === 'streaming') && users.streaming && (
            <div className="mb-5">
              <h5 className="mb-3">Live-Streaming Users ({users.streaming.total || 0})</h5>
              <div className="row g-3">
                {users.streaming.data?.map(user => (
                  <div key={user.account_id} className="col-md-4 col-lg-3">
                    <UserCard user={user} platform="streaming" />
                  </div>
                ))}
              </div>
              {users.streaming.data?.length === 0 && (
                <p className="text-center text-muted py-4">No streaming users found</p>
              )}
            </div>
          )}

          {/* DASE Users */}
          {(filters.platform === 'all' || filters.platform === 'dase') && users.dase && (
            <div className="mb-5">
              <h5 className="mb-3">DASE Marketplace Users ({users.dase.total || 0})</h5>
              <div className="row g-3">
                {users.dase.data?.map(user => (
                  <div key={user.account_id} className="col-md-4 col-lg-3">
                    <UserCard user={user} platform="dase" />
                  </div>
                ))}
              </div>
              {users.dase.data?.length === 0 && (
                <p className="text-center text-muted py-4">No DASE users found</p>
              )}
            </div>
          )}
        </>
      )}

      {/* Action Modal */}
      {showActionModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Action</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowActionModal(false);
                    setActionReason('');
                    setCurrentAction(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Reason *</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Provide a detailed reason for this action..."
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                  ></textarea>
                  <small className="text-muted">Minimum 10 characters required</small>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowActionModal(false);
                    setActionReason('');
                    setCurrentAction(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`btn ${currentAction?.type?.includes('ban') ? 'btn-danger' : 'btn-warning'}`}
                  onClick={() => {
                    if (currentAction?.type === 'suspend') {
                      handleSuspendUser(currentAction.platform, currentAction.id);
                    } else if (currentAction?.type === 'ban') {
                      handleBanUser(currentAction.platform, currentAction.id);
                    } else if (currentAction?.type === 'bulk-suspend') {
                      handleBulkAction('suspend');
                    } else if (currentAction?.type === 'bulk-ban') {
                      handleBulkAction('ban');
                    }
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

