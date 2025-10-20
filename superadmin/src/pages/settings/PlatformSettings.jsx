import { Link } from 'react-router-dom';

const PlatformSettings = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Platform Settings</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item active">Settings</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8">
          {/* General Settings */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">General Settings</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Platform Name</label>
                  <input type="text" className="form-control" defaultValue="Dase Market" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Platform Description</label>
                  <textarea className="form-control" rows="3" defaultValue="A comprehensive marketplace for streamers, engineers, and clients"></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Email</label>
                  <input type="email" className="form-control" defaultValue="support@dasemarket.com" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Support Phone</label>
                  <input type="tel" className="form-control" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Time Zone</label>
                  <select className="form-select">
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Default Language</label>
                  <select className="form-select">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="maintenanceMode" />
                    <label className="form-check-label" htmlFor="maintenanceMode">
                      Maintenance Mode
                    </label>
                  </div>
                  <small className="text-muted">Enable this to put the platform in maintenance mode</small>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="newRegistrations" defaultChecked />
                    <label className="form-check-label" htmlFor="newRegistrations">
                      Allow New Registrations
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="emailVerification" defaultChecked />
                    <label className="form-check-label" htmlFor="emailVerification">
                      Require Email Verification
                    </label>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="ri-save-line align-middle me-1"></i> Save Changes
                  </button>
                  <button type="button" className="btn btn-soft-secondary">
                    <i className="ri-refresh-line align-middle me-1"></i> Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Upload Settings */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Upload Settings</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Max File Size (MB)</label>
                  <input type="number" className="form-control" defaultValue="50" />
                  <small className="text-muted">Maximum file size for uploads</small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Allowed File Types</label>
                  <input type="text" className="form-control" defaultValue="jpg, png, gif, mp4, mp3, wav" />
                  <small className="text-muted">Comma-separated list of allowed extensions</small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Max Video Length (minutes)</label>
                  <input type="number" className="form-control" defaultValue="30" />
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="ri-save-line align-middle me-1"></i> Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to="/superadmin/settings/email" className="btn btn-soft-primary">
                  <i className="ri-mail-settings-line align-middle me-1"></i> Email Settings
                </Link>
                <Link to="/superadmin/settings/payments" className="btn btn-soft-success">
                  <i className="ri-wallet-line align-middle me-1"></i> Payment Settings
                </Link>
                <Link to="/superadmin/settings/security" className="btn btn-soft-warning">
                  <i className="ri-shield-check-line align-middle me-1"></i> Security Settings
                </Link>
                <button className="btn btn-soft-danger">
                  <i className="ri-database-2-line align-middle me-1"></i> Clear Cache
                </button>
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">System Information</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td className="text-muted">Platform Version:</td>
                      <td className="fw-medium">1.0.0</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Laravel Version:</td>
                      <td className="fw-medium">10.x</td>
                    </tr>
                    <tr>
                      <td className="text-muted">PHP Version:</td>
                      <td className="fw-medium">8.2</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Database:</td>
                      <td className="fw-medium">MySQL 8.0</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Server:</td>
                      <td className="fw-medium">Apache/Nginx</td>
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

export default PlatformSettings;

