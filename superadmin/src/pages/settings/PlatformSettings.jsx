import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const PlatformSettings = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    site_name: 'Dase Market',
    site_description: 'Music Production Marketplace',
    site_url: 'https://dasemarket.com',
    contact_email: 'support@dasemarket.com',
    maintenance_mode: false,
    registration_enabled: true,
    default_currency: 'USD',
    timezone: 'UTC',
    items_per_page: 20,
    max_upload_size: 100,
    allowed_file_types: 'mp3,wav,flac,zip',
    enable_notifications: true,
    enable_analytics: true,
    enable_social_login: false
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await axiosInstance.get('/api/v1/superadmin/settings/platform');
      // setSettings(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      toast.error('Failed to load settings');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // TODO: Replace with actual API call
      // await axiosInstance.put('/api/v1/superadmin/settings/platform', settings);
      toast.success('Platform settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Platform Settings</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Platform Settings</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2">
                <Link to="/superadmin/settings/email" className="btn btn-soft-primary btn-sm">
                  <i className="ri-mail-line me-1"></i> Email Settings
                </Link>
                <Link to="/superadmin/settings/payments" className="btn btn-soft-success btn-sm">
                  <i className="ri-bank-card-line me-1"></i> Payment Settings
                </Link>
                <Link to="/superadmin/settings/security" className="btn btn-soft-danger btn-sm">
                  <i className="ri-shield-line me-1"></i> Security Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="row">
          {/* General Settings */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="ri-settings-3-line me-2"></i>General Settings
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Site Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="site_name"
                    value={settings.site_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Site Description</label>
                  <textarea
                    className="form-control"
                    name="site_description"
                    rows="3"
                    value={settings.site_description}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Site URL</label>
                  <input
                    type="url"
                    className="form-control"
                    name="site_url"
                    value={settings.site_url}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="contact_email"
                    value={settings.contact_email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Default Currency</label>
                  <select
                    className="form-select"
                    name="default_currency"
                    value={settings.default_currency}
                    onChange={handleChange}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="NGN">NGN - Nigerian Naira</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Timezone</label>
                  <select
                    className="form-select"
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleChange}
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New York (EST)</option>
                    <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Features */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="ri-toggle-line me-2"></i>Platform Features
                </h5>
              </div>
              <div className="card-body">
                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="maintenance_mode"
                    checked={settings.maintenance_mode}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Maintenance Mode
                    <div className="text-muted small">Disable access to the platform for maintenance</div>
                  </label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="registration_enabled"
                    checked={settings.registration_enabled}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    User Registration
                    <div className="text-muted small">Allow new users to register</div>
                  </label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="enable_notifications"
                    checked={settings.enable_notifications}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Email Notifications
                    <div className="text-muted small">Send email notifications to users</div>
                  </label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="enable_analytics"
                    checked={settings.enable_analytics}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Analytics Tracking
                    <div className="text-muted small">Enable Google Analytics or similar</div>
                  </label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="enable_social_login"
                    checked={settings.enable_social_login}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Social Login
                    <div className="text-muted small">Allow login with Google, Facebook, etc.</div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Settings */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="ri-upload-cloud-line me-2"></i>Upload Settings
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Max Upload Size (MB)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="max_upload_size"
                    value={settings.max_upload_size}
                    onChange={handleChange}
                    min="1"
                    max="500"
                  />
                  <small className="text-muted">Maximum file size allowed for uploads</small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Allowed File Types</label>
                  <input
                    type="text"
                    className="form-control"
                    name="allowed_file_types"
                    value={settings.allowed_file_types}
                    onChange={handleChange}
                    placeholder="mp3,wav,flac,zip"
                  />
                  <small className="text-muted">Comma-separated file extensions</small>
                </div>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="ri-layout-line me-2"></i>Display Settings
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Items Per Page</label>
                  <select
                    className="form-select"
                    name="items_per_page"
                    value={settings.items_per_page}
                    onChange={handleChange}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <small className="text-muted">Default pagination size for listings</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">
                    <i className="ri-information-line me-1"></i>
                    Changes will be applied immediately after saving
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={fetchSettings}
                      disabled={saving}
                    >
                      <i className="ri-refresh-line me-1"></i>Reset
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="ri-save-line me-1"></i>Save Settings
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlatformSettings;
