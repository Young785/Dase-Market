import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const EmailSettings = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);
  const [activeTab, setActiveTab] = useState('smtp');
  
  const [settings, setSettings] = useState({
    // SMTP Settings
    smtp_host: 'smtp.gmail.com',
    smtp_port: '587',
    smtp_username: '',
    smtp_password: '',
    smtp_encryption: 'tls',
    from_email: 'noreply@dasemarket.com',
    from_name: 'Dase Market',
    
    // Email Templates
    enable_welcome_email: true,
    enable_verification_email: true,
    enable_password_reset: true,
    enable_notification_emails: true,
    
    // Test Email
    test_email: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      // TODO: API call
      // const response = await axiosInstance.get('/api/v1/superadmin/settings/email');
      // setSettings(response.data.data);
    } catch (error) {
      console.error('Failed to fetch email settings:', error);
      toast.error('Failed to load email settings');
    } finally {
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
      // TODO: API call
      // await axiosInstance.put('/api/v1/superadmin/settings/email', settings);
      toast.success('Email settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('Failed to save email settings');
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    if (!settings.test_email) {
      toast.error('Please enter a test email address');
      return;
    }

    setTestingEmail(true);
    try {
      // TODO: API call
      // await axiosInstance.post('/api/v1/superadmin/settings/email/test', {
      //   email: settings.test_email
      // });
      toast.success(`Test email sent to ${settings.test_email}`);
    } catch (error) {
      toast.error('Failed to send test email');
    } finally {
      setTestingEmail(false);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Email Settings</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/superadmin/settings/platform">Settings</Link></li>
                <li className="breadcrumb-item active">Email Settings</li>
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
                <Link to="/superadmin/settings/platform" className="btn btn-soft-primary btn-sm">
                  <i className="ri-settings-3-line me-1"></i> Platform Settings
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
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-tabs-custom card-header-tabs border-bottom-0" role="tablist">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === 'smtp' ? 'active' : ''}`}
                      onClick={() => setActiveTab('smtp')}
                      href="#smtp"
                      role="tab"
                    >
                      <i className="ri-mail-settings-line me-1"></i>
                      SMTP Configuration
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === 'templates' ? 'active' : ''}`}
                      onClick={() => setActiveTab('templates')}
                      href="#templates"
                      role="tab"
                    >
                      <i className="ri-file-text-line me-1"></i>
                      Email Templates
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === 'test' ? 'active' : ''}`}
                      onClick={() => setActiveTab('test')}
                      href="#test"
                      role="tab"
                    >
                      <i className="ri-send-plane-line me-1"></i>
                      Test Email
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                {/* SMTP Configuration Tab */}
                {activeTab === 'smtp' && (
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">SMTP Host <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="smtp_host"
                          value={settings.smtp_host}
                          onChange={handleChange}
                          placeholder="smtp.gmail.com"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">SMTP Port <span className="text-danger">*</span></label>
                        <input
                          type="number"
                          className="form-control"
                          name="smtp_port"
                          value={settings.smtp_port}
                          onChange={handleChange}
                          placeholder="587"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Encryption</label>
                        <select
                          className="form-select"
                          name="smtp_encryption"
                          value={settings.smtp_encryption}
                          onChange={handleChange}
                        >
                          <option value="tls">TLS</option>
                          <option value="ssl">SSL</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">SMTP Username <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="smtp_username"
                          value={settings.smtp_username}
                          onChange={handleChange}
                          placeholder="your-email@gmail.com"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">SMTP Password <span className="text-danger">*</span></label>
                        <input
                          type="password"
                          className="form-control"
                          name="smtp_password"
                          value={settings.smtp_password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          required
                        />
                        <small className="text-muted">Use app-specific password for Gmail</small>
                      </div>
                    </div>

                    <div className="col-12">
                      <hr className="my-4" />
                      <h6 className="mb-3">Sender Information</h6>
                    </div>

                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">From Email <span className="text-danger">*</span></label>
                        <input
                          type="email"
                          className="form-control"
                          name="from_email"
                          value={settings.from_email}
                          onChange={handleChange}
                          placeholder="noreply@dasemarket.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">From Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="from_name"
                          value={settings.from_name}
                          onChange={handleChange}
                          placeholder="Dase Market"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Templates Tab */}
                {activeTab === 'templates' && (
                  <div className="row">
                    <div className="col-12">
                      <h6 className="mb-3">Automated Email Notifications</h6>
                      <p className="text-muted">Enable or disable automated email templates</p>
                    </div>

                    <div className="col-lg-6">
                      <div className="card border mb-3">
                        <div className="card-body">
                          <div className="form-check form-switch mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="enable_welcome_email"
                              checked={settings.enable_welcome_email}
                              onChange={handleChange}
                            />
                            <label className="form-check-label">
                              <strong>Welcome Email</strong>
                            </label>
                          </div>
                          <p className="text-muted small mb-0">Send welcome email to new users after registration</p>
                        </div>
                      </div>

                      <div className="card border mb-3">
                        <div className="card-body">
                          <div className="form-check form-switch mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="enable_verification_email"
                              checked={settings.enable_verification_email}
                              onChange={handleChange}
                            />
                            <label className="form-check-label">
                              <strong>Email Verification</strong>
                            </label>
                          </div>
                          <p className="text-muted small mb-0">Send verification link to verify email addresses</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="card border mb-3">
                        <div className="card-body">
                          <div className="form-check form-switch mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="enable_password_reset"
                              checked={settings.enable_password_reset}
                              onChange={handleChange}
                            />
                            <label className="form-check-label">
                              <strong>Password Reset</strong>
                            </label>
                          </div>
                          <p className="text-muted small mb-0">Send password reset link when requested</p>
                        </div>
                      </div>

                      <div className="card border mb-3">
                        <div className="card-body">
                          <div className="form-check form-switch mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="enable_notification_emails"
                              checked={settings.enable_notification_emails}
                              onChange={handleChange}
                            />
                            <label className="form-check-label">
                              <strong>Notification Emails</strong>
                            </label>
                          </div>
                          <p className="text-muted small mb-0">Send email notifications for important events</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Test Email Tab */}
                {activeTab === 'test' && (
                  <div className="row">
                    <div className="col-lg-8 mx-auto">
                      <div className="text-center mb-4">
                        <div className="avatar-md mx-auto mb-4">
                          <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                            <i className="ri-mail-send-line"></i>
                          </div>
                        </div>
                        <h5>Test Email Configuration</h5>
                        <p className="text-muted">Send a test email to verify your SMTP settings</p>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Test Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          name="test_email"
                          value={settings.test_email}
                          onChange={handleChange}
                          placeholder="test@example.com"
                        />
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={handleTestEmail}
                        disabled={testingEmail || !settings.test_email}
                      >
                        {testingEmail ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Sending Test Email...
                          </>
                        ) : (
                          <>
                            <i className="ri-send-plane-fill me-1"></i>
                            Send Test Email
                          </>
                        )}
                      </button>

                      <div className="alert alert-info mt-4" role="alert">
                        <i className="ri-information-line me-2"></i>
                        <strong>Note:</strong> Make sure to save your SMTP settings before sending a test email.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="card-footer">
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

export default EmailSettings;
