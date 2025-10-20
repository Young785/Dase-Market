import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/superadmin/users/${id}`);
      setUser(response.data.data);
    } catch (error) {
      toast.error('Failed to load user details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="alert alert-danger">User not found</div>;
  }

  return (
    <>
      {/* Page Title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">User Details</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/superadmin/users">Users</Link></li>
                <li className="breadcrumb-item active">Details</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Header */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3">
                  <div className="text-center">
                    <div className="avatar-xl mx-auto mb-3">
                      <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-1">
                        {user.first_name?.[0]}{user.last_name?.[0]}
                      </div>
                    </div>
                    <h5 className="mb-1">{user.first_name} {user.last_name}</h5>
                    <p className="text-muted mb-2">{user.account_id}</p>
                    <span className={`badge bg-${user.status === 'active' ? 'success' : 'danger'} mb-3`}>
                      {user.status}
                    </span>
                  </div>
                </div>

                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-medium">Email</label>
                        <p className="text-muted">{user.email}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-medium">Phone</label>
                        <p className="text-muted">{user.phone || 'Not provided'}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-medium">User Type</label>
                        <p className="text-muted text-capitalize">{user.user_type}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-medium">Joined</label>
                        <p className="text-muted">{new Date(user.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-medium">Last Login</label>
                        <p className="text-muted">
                          {user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-medium">2FA Status</label>
                        <p className="text-muted">
                          {user.two_factor_enabled ? (
                            <span className="badge bg-success">Enabled</span>
                          ) : (
                            <span className="badge bg-secondary">Disabled</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <button className="btn btn-primary btn-sm me-2">Edit User</button>
                    <button className="btn btn-warning btn-sm me-2">Suspend</button>
                    <button className="btn btn-danger btn-sm">Ban User</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs-custom card-header-tabs border-bottom-0" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                    role="tab"
                  >
                    Overview
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`}
                    onClick={() => setActiveTab('activity')}
                    role="tab"
                  >
                    Activity
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'financial' ? 'active' : ''}`}
                    onClick={() => setActiveTab('financial')}
                    role="tab"
                  >
                    Financial
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content">
                {activeTab === 'overview' && (
                  <div>
                    <h6 className="mb-3">Account Overview</h6>
                    <p className="text-muted">User activity and statistics will be displayed here.</p>
                  </div>
                )}
                {activeTab === 'activity' && (
                  <div>
                    <h6 className="mb-3">Recent Activity</h6>
                    <p className="text-muted">User activity logs will be displayed here.</p>
                  </div>
                )}
                {activeTab === 'financial' && (
                  <div>
                    <h6 className="mb-3">Financial Information</h6>
                    <p className="text-muted">Financial transactions and statistics will be displayed here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;

