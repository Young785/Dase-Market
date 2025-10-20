import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Broadcast = () => {
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [broadcasts, setBroadcasts] = useState([]);
  const [stats, setStats] = useState({
    total_sent: 0,
    delivered: 0,
    opened: 0,
    failed: 0
  });
  const [formData, setFormData] = useState({
    audience: '',
    type: 'email',
    subject: '',
    message: '',
    schedule_later: false,
    scheduled_at: ''
  });

  const templates = [
    { id: 1, name: 'Platform Update', icon: 'ri-notification-badge-line', message: 'We are excited to announce...' },
    { id: 2, name: 'System Maintenance', icon: 'ri-alert-line', message: 'Scheduled maintenance will occur...' },
    { id: 3, name: 'Promotional Offer', icon: 'ri-gift-line', message: 'Limited time offer...' },
    { id: 4, name: 'General Announcement', icon: 'ri-information-line', message: 'Dear users...' }
  ];

  useEffect(() => {
    fetchBroadcasts();
    fetchStats();
  }, []);

  const fetchBroadcasts = async () => {
    try {
      // TODO: API call
      setBroadcasts([]);
    } catch (error) {
      console.error('Failed to fetch broadcasts:', error);
    }
  };

  const fetchStats = async () => {
    try {
      // TODO: API call
      setStats({
        total_sent: 0,
        delivered: 0,
        opened: 0,
        failed: 0
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTemplate = (template) => {
    setFormData(prev => ({
      ...prev,
      subject: template.name,
      message: template.message
    }));
    toast.success(`Template "${template.name}" loaded`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.audience || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSending(true);
    try {
      // TODO: API call
      // await axiosInstance.post('/api/v1/superadmin/communication/broadcast', formData);
      toast.success('Broadcast sent successfully!');
      setFormData({
        audience: '',
        type: 'email',
        subject: '',
        message: '',
        schedule_later: false,
        scheduled_at: ''
      });
      fetchBroadcasts();
      fetchStats();
    } catch (error) {
      toast.error('Failed to send broadcast');
    } finally {
      setSending(false);
    }
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully');
  };

  const handlePreview = () => {
    // Open preview modal
    toast.info('Preview feature coming soon');
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Broadcast Messages</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
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
              <h5 className="card-title mb-0">
                <i className="ri-mail-send-line me-2"></i>Compose Broadcast Message
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Target Audience <span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    name="audience"
                    value={formData.audience}
                    onChange={handleChange}
                    required
                  >
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
                      <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        id="email"
                        value="email"
                        checked={formData.type === 'email'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="email">
                        <i className="ri-mail-line align-middle me-1"></i> Email
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        id="notification"
                        value="notification"
                        checked={formData.type === 'notification'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="notification">
                        <i className="ri-notification-line align-middle me-1"></i> In-App Notification
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        id="both"
                        value="both"
                        checked={formData.type === 'both'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="both">
                        <i className="ri-stack-line align-middle me-1"></i> Both
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Subject <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    placeholder="Enter broadcast subject..."
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message <span className="text-danger">*</span></label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="8"
                    placeholder="Enter your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <small className="text-muted">You can use HTML formatting</small>
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="schedule_later"
                      id="scheduleCheckbox"
                      checked={formData.schedule_later}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="scheduleCheckbox">
                      Schedule for later
                    </label>
                  </div>
                </div>

                {formData.schedule_later && (
                  <div className="mb-3">
                    <label className="form-label">Schedule Date & Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="scheduled_at"
                      value={formData.scheduled_at}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary" disabled={sending}>
                    {sending ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-fill align-middle me-1"></i> Send Broadcast
                      </>
                    )}
                  </button>
                  <button type="button" className="btn btn-soft-secondary" onClick={handleSaveDraft}>
                    <i className="ri-draft-line align-middle me-1"></i> Save as Draft
                  </button>
                  <button type="button" className="btn btn-soft-info" onClick={handlePreview}>
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
                    <h5 className="mb-0">{stats.total_sent}</h5>
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
                    <h5 className="mb-0">{stats.delivered}</h5>
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
                    <h5 className="mb-0">{stats.opened}</h5>
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
                    <h5 className="mb-0">{stats.failed}</h5>
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
                {templates.map((template) => (
                  <button
                    key={template.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleTemplate(template)}
                  >
                    <i className={`${template.icon} align-middle me-2`}></i>
                    {template.name}
                  </button>
                ))}
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
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : broadcasts.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th>Subject</th>
                        <th>Audience</th>
                        <th>Type</th>
                        <th>Sent</th>
                        <th>Delivered</th>
                        <th>Opened</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {broadcasts.map((broadcast) => (
                        <tr key={broadcast.id}>
                          <td>{new Date(broadcast.created_at).toLocaleDateString()}</td>
                          <td>{broadcast.subject}</td>
                          <td><span className="badge bg-soft-primary text-primary">{broadcast.audience}</span></td>
                          <td><span className="badge bg-soft-info text-info">{broadcast.type}</span></td>
                          <td>{broadcast.sent_count}</td>
                          <td>{broadcast.delivered_count}</td>
                          <td>{broadcast.opened_count}</td>
                          <td>
                            <span className={`badge bg-${broadcast.status === 'completed' ? 'success' : 'warning'}`}>
                              {broadcast.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                      <i className="ri-mail-send-line"></i>
                    </div>
                  </div>
                  <h5>No broadcasts sent yet</h5>
                  <p className="text-muted">Your broadcast history will appear here once you start sending messages</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Broadcast;
