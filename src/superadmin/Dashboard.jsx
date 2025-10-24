import React, { useState, useEffect } from 'react';
import { 
  Users, FileText, DollarSign, AlertCircle, TrendingUp, 
  Eye, MessageSquare, Flag, CheckCircle, XCircle 
} from 'lucide-react';
import axios from 'axios';

const SuperadminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activityFeed, setActivityFeed] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('superadmin_token');
      const response = await axios.get('/api/v1/superadmin/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setStats(response.data.data.stats);
      
      // Fetch activity feed
      const activityResponse = await axios.get('/api/v1/superadmin/dashboard/activity-feed', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActivityFeed(activityResponse.data.data.activities || []);
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color = 'blue' }) => (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-muted mb-1">{title}</p>
            <h3 className="mb-2">{value?.toLocaleString() || '0'}</h3>
            {change && (
              <span className={`badge bg-${change > 0 ? 'success' : 'danger'} bg-opacity-10 text-${change > 0 ? 'success' : 'danger'}`}>
                <TrendingUp size={12} className="me-1" />
                {Math.abs(change)}%
              </span>
            )}
          </div>
          <div className={`rounded-circle p-3 bg-${color} bg-opacity-10`}>
            <Icon className={`text-${color}`} size={24} />
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="superadmin-dashboard">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Dashboard Overview</h2>
          <p className="text-muted">Welcome back! Here's what's happening across your platforms.</p>
        </div>
        <button className="btn btn-outline-primary" onClick={fetchDashboardData}>
          <i className="ri-refresh-line me-2"></i>
          Refresh
        </button>
      </div>

      {/* Platform Stats */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <StatCard
            icon={Users}
            title="Total Users"
            value={stats?.total_users}
            change={12.5}
            color="primary"
          />
        </div>
        <div className="col-md-3">
          <StatCard
            icon={FileText}
            title="Total Content"
            value={stats?.total_content}
            change={8.2}
            color="success"
          />
        </div>
        <div className="col-md-3">
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${stats?.total_revenue?.toLocaleString() || '0'}`}
            change={15.3}
            color="info"
          />
        </div>
        <div className="col-md-3">
          <StatCard
            icon={AlertCircle}
            title="Pending Reports"
            value={stats?.pending_reports}
            color="warning"
          />
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="row g-4 mb-4">
        {/* Live-Streaming Stats */}
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-transparent border-bottom">
              <h5 className="mb-0">Live-Streaming Platform</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <Users className="text-primary me-2" size={20} />
                    <div>
                      <small className="text-muted d-block">Streamers</small>
                      <strong>{stats?.streamers?.toLocaleString() || '0'}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <FileText className="text-success me-2" size={20} />
                    <div>
                      <small className="text-muted d-block">Posts</small>
                      <strong>{stats?.posts?.toLocaleString() || '0'}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <Eye className="text-info me-2" size={20} />
                    <div>
                      <small className="text-muted d-block">Shorts</small>
                      <strong>{stats?.shorts?.toLocaleString() || '0'}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <DollarSign className="text-warning me-2" size={20} />
                    <div>
                      <small className="text-muted d-block">Ad Revenue</small>
                      <strong>${stats?.ad_revenue?.toLocaleString() || '0'}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DASE Marketplace Stats */}
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-transparent border-bottom">
              <h5 className="mb-0">DASE Marketplace</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <Users className="text-primary me-2" size={20} />
                    <div>
                      <small className="text-muted d-block">Engineers</small>
                      <strong>{stats?.engineers?.toLocaleString() || '0'}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <Users className="text-info me-2" size={20} />
                    <div>
                      <small className="text-muted d-block">Clients</small>
                      <strong>{stats?.clients?.toLocaleString() || '0'}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <FileText className="text-success me-2" size={20} />
                    <div>
                      <small className="text-muted d-block">Projects</small>
                      <strong>{stats?.projects?.toLocaleString() || '0'}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <DollarSign className="text-warning me-2" size={20} />
                    <div>
                      <small className="text-muted d-block">Revenue</small>
                      <strong>${stats?.dase_revenue?.toLocaleString() || '0'}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="row g-4">
        {/* Recent Activity */}
        <div className="col-lg-7">
          <div className="card shadow-sm">
            <div className="card-header bg-transparent border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Activity</h5>
              <a href="/superadmin/activity-logs" className="btn btn-sm btn-outline-secondary">
                View All
              </a>
            </div>
            <div className="card-body">
              {activityFeed.length > 0 ? (
                <div className="list-group list-group-flush">
                  {activityFeed.slice(0, 10).map((activity, index) => (
                    <div key={index} className="list-group-item px-0 border-0 border-bottom">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <MessageSquare className="text-muted" size={16} />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="mb-1">{activity.description}</p>
                          <small className="text-muted">{activity.created_at}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center py-4">No recent activity</p>
              )}
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="col-lg-5">
          <div className="card shadow-sm">
            <div className="card-header bg-transparent border-bottom">
              <h5 className="mb-0">Alerts & Notifications</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {stats?.critical_reports > 0 && (
                  <div className="list-group-item px-0 border-0 border-bottom">
                    <div className="d-flex align-items-start">
                      <AlertCircle className="text-danger flex-shrink-0 mt-1" size={18} />
                      <div className="ms-3 flex-grow-1">
                        <strong className="d-block mb-1">Critical Reports</strong>
                        <p className="mb-0 text-muted small">
                          {stats.critical_reports} reports require immediate attention
                        </p>
                      </div>
                      <a href="/superadmin/moderation" className="btn btn-sm btn-outline-danger">
                        Review
                      </a>
                    </div>
                  </div>
                )}

                {stats?.suspended_users > 0 && (
                  <div className="list-group-item px-0 border-0 border-bottom">
                    <div className="d-flex align-items-start">
                      <Flag className="text-warning flex-shrink-0 mt-1" size={18} />
                      <div className="ms-3 flex-grow-1">
                        <strong className="d-block mb-1">Suspended Users</strong>
                        <p className="mb-0 text-muted small">
                          {stats.suspended_users} users currently suspended
                        </p>
                      </div>
                      <a href="/superadmin/users?status=suspended" className="btn btn-sm btn-outline-warning">
                        View
                      </a>
                    </div>
                  </div>
                )}

                {stats?.failed_payments > 0 && (
                  <div className="list-group-item px-0 border-0 border-bottom">
                    <div className="d-flex align-items-start">
                      <XCircle className="text-danger flex-shrink-0 mt-1" size={18} />
                      <div className="ms-3 flex-grow-1">
                        <strong className="d-block mb-1">Failed Payments</strong>
                        <p className="mb-0 text-muted small">
                          {stats.failed_payments} payment failures today
                        </p>
                      </div>
                      <a href="/superadmin/finance/transactions?status=failed" className="btn btn-sm btn-outline-danger">
                        Review
                      </a>
                    </div>
                  </div>
                )}

                {!stats?.critical_reports && !stats?.suspended_users && !stats?.failed_payments && (
                  <div className="text-center py-4">
                    <CheckCircle className="text-success mb-2" size={32} />
                    <p className="text-muted mb-0">All systems operational</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperadminDashboard;

