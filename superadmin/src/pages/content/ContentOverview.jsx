import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const ContentOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/superadmin/manage/content/statistics');
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch content statistics:', error);
      toast.error('Failed to load content statistics');
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
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Content Overview</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Content</li>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Posts</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats?.posts?.total || 0}</span>
                  </h4>
                  <Link to="/superadmin/content/posts" className="text-decoration-underline">Manage Posts</Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary rounded fs-3">
                    <i className="ri-article-line text-primary"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Shorts</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats?.shorts?.total || 0}</span>
                  </h4>
                  <Link to="/superadmin/content/shorts" className="text-decoration-underline">Manage Shorts</Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-success rounded fs-3">
                    <i className="ri-vidicon-line text-success"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Projects</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats?.projects?.total || 0}</span>
                  </h4>
                  <Link to="/superadmin/content/projects" className="text-decoration-underline">Manage Projects</Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-info rounded fs-3">
                    <i className="ri-folder-music-line text-info"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Flagged Content</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value badge bg-danger">{stats?.flagged || 0}</span>
                  </h4>
                  <Link to="/superadmin/content/moderation-queue" className="text-decoration-underline">Review Now</Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-danger rounded fs-3">
                    <i className="ri-flag-line text-danger"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content by Category */}
      <div className="row">
        <div className="col-xl-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Content Distribution</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Content Type</th>
                      <th>Total</th>
                      <th>This Month</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-xs me-3">
                            <div className="avatar-title bg-soft-primary text-primary rounded">
                              <i className="ri-article-line"></i>
                            </div>
                          </div>
                          <span className="fw-medium">Posts</span>
                        </div>
                      </td>
                      <td>{stats?.posts?.total || 0}</td>
                      <td>{stats?.posts?.this_month || 0}</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <Link to="/superadmin/content/posts" className="btn btn-sm btn-soft-primary">
                          <i className="ri-eye-line align-middle me-1"></i> View
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-xs me-3">
                            <div className="avatar-title bg-soft-success text-success rounded">
                              <i className="ri-vidicon-line"></i>
                            </div>
                          </div>
                          <span className="fw-medium">Shorts</span>
                        </div>
                      </td>
                      <td>{stats?.shorts?.total || 0}</td>
                      <td>{stats?.shorts?.this_month || 0}</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <Link to="/superadmin/content/shorts" className="btn btn-sm btn-soft-primary">
                          <i className="ri-eye-line align-middle me-1"></i> View
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-xs me-3">
                            <div className="avatar-title bg-soft-info text-info rounded">
                              <i className="ri-folder-music-line"></i>
                            </div>
                          </div>
                          <span className="fw-medium">Projects</span>
                        </div>
                      </td>
                      <td>{stats?.projects?.total || 0}</td>
                      <td>{stats?.projects?.this_month || 0}</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <Link to="/superadmin/content/projects" className="btn btn-sm btn-soft-primary">
                          <i className="ri-eye-line align-middle me-1"></i> View
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-xs me-3">
                            <div className="avatar-title bg-soft-warning text-warning rounded">
                              <i className="ri-music-2-line"></i>
                            </div>
                          </div>
                          <span className="fw-medium">Samples</span>
                        </div>
                      </td>
                      <td>{stats?.samples?.total || 0}</td>
                      <td>{stats?.samples?.this_month || 0}</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <Link to="/superadmin/content/samples" className="btn btn-sm btn-soft-primary">
                          <i className="ri-eye-line align-middle me-1"></i> View
                        </Link>
                      </td>
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
              <h4 className="card-title mb-0">Moderation Queue</h4>
            </div>
            <div className="card-body">
              <div className="text-center py-4">
                <div className="avatar-md mx-auto mb-4">
                  <div className={`avatar-title bg-soft-${stats?.flagged > 0 ? 'danger' : 'success'} text-${stats?.flagged > 0 ? 'danger' : 'success'} rounded-circle fs-24`}>
                    <i className={`ri-${stats?.flagged > 0 ? 'alert' : 'checkbox-circle'}-line`}></i>
                  </div>
                </div>
                <h5>{stats?.flagged > 0 ? `${stats.flagged} Items Pending` : 'All Clear!'}</h5>
                <p className="text-muted mb-3">
                  {stats?.flagged > 0 ? 'Content waiting for review' : 'No content waiting for review'}
                </p>
                <Link to="/superadmin/content/moderation-queue" className="btn btn-sm btn-soft-primary">
                  View Queue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentOverview;

