import { Link } from 'react-router-dom';

const Broadcast = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Broadcast Messages</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item active">Broadcast</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8">
          {/* Compose Broadcast */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Compose Broadcast Message</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Target Audience <span className="text-danger">*</span></label>
                  <select className="form-select" required>
                    <option value="">Select audience...</option>
                    <option value="all">All Users</option>
                    <option value="streamers">Streamers Only</option>
                    <option value="engineers">Engineers Only</option>
                    <option value="clients">Clients Only</option>
                    <option value="verified">Verified Users Only</option>
                    <option value="active">Active Users (Last 30 days)</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Broadcast Type <span className="text-danger">*</span></label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="broadcastType" id="email" defaultChecked />
                      <label className="form-check-label" htmlFor="email">
                        <i className="ri-mail-line align-middle me-1"></i> Email
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="broadcastType" id="notification" />
                      <label className="form-check-label" htmlFor="notification">
                        <i className="ri-notification-line align-middle me-1"></i> In-App Notification
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="broadcastType" id="both" />
                      <label className="form-check-label" htmlFor="both">
                        <i className="ri-stack-line align-middle me-1"></i> Both
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Subject <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="Enter broadcast subject..." required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message <span className="text-danger">*</span></label>
                  <textarea className="form-control" rows="8" placeholder="Enter your message here..." required></textarea>
                  <small className="text-muted">You can use HTML formatting</small>
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="scheduleCheckbox" />
                    <label className="form-check-label" htmlFor="scheduleCheckbox">
                      Schedule for later
                    </label>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="ri-send-plane-fill align-middle me-1"></i> Send Broadcast
                  </button>
                  <button type="button" className="btn btn-soft-secondary">
                    <i className="ri-draft-line align-middle me-1"></i> Save as Draft
                  </button>
                  <button type="button" className="btn btn-soft-info">
                    <i className="ri-eye-line align-middle me-1"></i> Preview
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          {/* Stats */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Broadcast Statistics</h5>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="avatar-xs me-2">
                    <div className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="ri-send-plane-line"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-0">0</h5>
                    <small className="text-muted">Total Sent</small>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="avatar-xs me-2">
                    <div className="avatar-title bg-soft-success text-success rounded">
                      <i className="ri-checkbox-circle-line"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-0">0</h5>
                    <small className="text-muted">Delivered</small>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="avatar-xs me-2">
                    <div className="avatar-title bg-soft-info text-info rounded">
                      <i className="ri-eye-line"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-0">0</h5>
                    <small className="text-muted">Opened</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="avatar-xs me-2">
                    <div className="avatar-title bg-soft-danger text-danger rounded">
                      <i className="ri-error-warning-line"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-0">0</h5>
                    <small className="text-muted">Failed</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Templates */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Quick Templates</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <button className="list-group-item list-group-item-action">
                  <i className="ri-notification-badge-line align-middle me-2"></i>
                  Platform Update
                </button>
                <button className="list-group-item list-group-item-action">
                  <i className="ri-alert-line align-middle me-2"></i>
                  System Maintenance
                </button>
                <button className="list-group-item list-group-item-action">
                  <i className="ri-gift-line align-middle me-2"></i>
                  Promotional Offer
                </button>
                <button className="list-group-item list-group-item-action">
                  <i className="ri-information-line align-middle me-2"></i>
                  General Announcement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast History */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Broadcast History</h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-soft-primary btn-sm">
                    <i className="ri-filter-3-line align-bottom me-1"></i> Filter
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="text-center py-5">
                <div className="avatar-md mx-auto mb-4">
                  <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                    <i className="ri-mail-send-line"></i>
                  </div>
                </div>
                <h5>No broadcasts sent yet</h5>
                <p className="text-muted">Your broadcast history will appear here once you start sending messages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Broadcast;

