import { Link } from 'react-router-dom';

const ModerationQueue = () => {
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
                    <span className="counter-value badge bg-danger">0</span>
                  </h4>
                  <span className="text-danger">Needs attention</span>
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
                    <span className="counter-value">0</span>
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
                    <span className="counter-value">0</span>
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
                    <span className="counter-value">0</span>
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
                    <input type="text" className="form-control search" placeholder="Search flagged content..." />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </div>
                <div className="col-lg-2">
                  <select className="form-select" defaultValue="">
                    <option value="">All Content Types</option>
                    <option value="post">Posts</option>
                    <option value="short">Shorts</option>
                    <option value="comment">Comments</option>
                    <option value="profile">Profiles</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <select className="form-select" defaultValue="">
                    <option value="">All Reasons</option>
                    <option value="spam">Spam</option>
                    <option value="inappropriate">Inappropriate</option>
                    <option value="copyright">Copyright</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <select className="form-select" defaultValue="">
                    <option value="">All Priority</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary w-100">
                      <i className="ri-filter-3-line align-bottom me-1"></i> Filter
                    </button>
                    <button className="btn btn-soft-danger">
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
                <h5 className="card-title mb-0 flex-grow-1">Flagged Content</h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-soft-success btn-sm me-2">
                    <i className="ri-check-double-line align-bottom me-1"></i> Bulk Approve
                  </button>
                  <button className="btn btn-soft-danger btn-sm">
                    <i className="ri-close-line align-bottom me-1"></i> Bulk Reject
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="text-center py-5">
                <div className="avatar-md mx-auto mb-4">
                  <div className="avatar-title bg-soft-success text-success rounded-circle fs-24">
                    <i className="ri-shield-check-line"></i>
                  </div>
                </div>
                <h5>All Clear!</h5>
                <p className="text-muted">No flagged content in moderation queue</p>
                <small className="text-muted">Flagged content will appear here for review</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModerationQueue;

