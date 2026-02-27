import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activityRes, alertsRes] = await Promise.all([
        axiosInstance.get('/api/v1/superadmin/dashboard/stats'),
        axiosInstance.get('/api/v1/superadmin/dashboard/activity-feed'),
        axiosInstance.get('/api/v1/superadmin/dashboard/alerts')
      ]);

      setStats(statsRes.data.data);
      setRecentActivity(activityRes.data.data || []);
      setAlerts(alertsRes.data.data || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data');
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

  return (
    <>
      {/* Page Title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Dashboard</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Users</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats?.users?.total || 0}</span>
                  </h4>
                  <Link to="/superadmin/users" className="text-decoration-underline">View All Users</Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-success rounded fs-3">
                    <i className="bx bx-user-circle text-success"></i>
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
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Revenue</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    $<span className="counter-value">{stats?.revenue?.total || 0}</span>
                  </h4>
                  <Link to="/superadmin/finance" className="text-decoration-underline">View Details</Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-info rounded fs-3">
                    <i className="bx bx-dollar-circle text-info"></i>
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
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Content</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats?.content?.total || 0}</span>
                  </h4>
                  <Link to="/superadmin/content" className="text-decoration-underline">Manage Content</Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-warning rounded fs-3">
                    <i className="bx bx-file text-warning"></i>
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
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Pending Reviews</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats?.moderation?.pending || 0}</span>
                  </h4>
                  <Link to="/superadmin/content/moderation" className="text-decoration-underline">Review Now</Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-danger rounded fs-3">
                    <i className="bx bx-error-circle text-danger"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Activity Row */}
      <div className="row">
        {/* Revenue Chart */}
        <div className="col-xl-8">
          <div className="card">
            <div className="card-header align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">Revenue Overview</h4>
              <div className="flex-shrink-0">
                <div className="dropdown card-header-dropdown">
                  <button className="btn btn-soft-primary btn-sm" type="button">
                    <span className="text-uppercase">Last 30 Days</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div id="revenue-chart" className="apex-charts" dir="ltr" style={{ minHeight: '300px' }}>
                {/* Chart will be implemented with ApexCharts or Chart.js */}
                <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                  <p className="text-muted">Revenue chart will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-xl-4">
          <div className="card card-height-100">
            <div className="card-header align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">Recent Activity</h4>
              <div className="flex-shrink-0">
                <Link to="/security/activity-logs" className="btn btn-soft-info btn-sm">
                  View All
                </Link>
              </div>
            </div>

            <div className="card-body">
              <div className="activity-timeline" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, idx) => (
                    <div key={idx} className="acitivity-item d-flex mb-3">
                      <div className="flex-shrink-0">
                        <div className="avatar-xs acitivity-avatar">
                          <div className="avatar-title bg-soft-success text-success rounded-circle">
                            <i className="ri-user-line"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="mb-1">{activity.action}</h6>
                        <p className="text-muted mb-1">{activity.description}</p>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted">
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">System Alerts</h4>
              </div>
              <div className="card-body">
                {alerts.map((alert, idx) => (
                  <div key={idx} className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{alert.title}:</strong> {alert.message}
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">User Statistics</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td>Streamers</td>
                      <td className="text-end">{stats?.users?.streamers || 0}</td>
                    </tr>
                    <tr>
                      <td>Engineers</td>
                      <td className="text-end">{stats?.users?.engineers || 0}</td>
                    </tr>
                    <tr>
                      <td>Clients</td>
                      <td className="text-end">{stats?.users?.clients || 0}</td>
                    </tr>
                    <tr>
                      <td>Active Today</td>
                      <td className="text-end"><span className="badge bg-success">{stats?.users?.active_today || 0}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Content Statistics</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td>Posts</td>
                      <td className="text-end">{stats?.content?.posts || 0}</td>
                    </tr>
                    <tr>
                      <td>Shorts</td>
                      <td className="text-end">{stats?.content?.shorts || 0}</td>
                    </tr>
                    <tr>
                      <td>Projects</td>
                      <td className="text-end">{stats?.content?.projects || 0}</td>
                    </tr>
                    <tr>
                      <td>Flagged</td>
                      <td className="text-end"><span className="badge bg-danger">{stats?.content?.flagged || 0}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Financial Statistics</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td>Today's Revenue</td>
                      <td className="text-end">${stats?.revenue?.today || 0}</td>
                    </tr>
                    <tr>
                      <td>This Month</td>
                      <td className="text-end">${stats?.revenue?.month || 0}</td>
                    </tr>
                    <tr>
                      <td>Pending Payouts</td>
                      <td className="text-end">${stats?.revenue?.pending || 0}</td>
                    </tr>
                    <tr>
                      <td>Refund Requests</td>
                      <td className="text-end"><span className="badge bg-warning">{stats?.revenue?.refunds || 0}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

