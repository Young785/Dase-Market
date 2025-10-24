import React, { useState, useEffect } from 'react';
import { 
  Flag, CheckCircle, XCircle, Eye, AlertTriangle, 
  FileText, Video, Briefcase, Music, Filter 
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ModerationQueue = () => {
  const [queue, setQueue] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'pending',
    priority: 'all'
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionReason, setActionReason] = useState('');

  useEffect(() => {
    fetchQueue();
  }, [filters]);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('superadmin_token');
      const params = new URLSearchParams(filters).toString();
      
      const response = await axios.get(
        `/api/v1/superadmin/manage/content/moderation-queue?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQueue(response.data.data.queue.data || []);
      setStats(response.data.data.stats);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch moderation queue:', error);
      toast.error('Failed to load moderation queue');
      setLoading(false);
    }
  };

  const handleApprove = async (report) => {
    try {
      const token = localStorage.getItem('superadmin_token');
      await axios.post(
        `/api/v1/superadmin/manage/content/${report.content_type}/${report.content_id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Content approved successfully');
      fetchQueue();
    } catch (error) {
      toast.error('Failed to approve content');
    }
  };

  const handleReject = async (report) => {
    if (!actionReason) {
      toast.error('Please provide a reason');
      return;
    }

    try {
      const token = localStorage.getItem('superadmin_token');
      await axios.post(
        `/api/v1/superadmin/manage/content/${report.content_type}/${report.content_id}/reject`,
        { 
          reason: actionReason,
          action: 'hide' // or 'delete'
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Content removed successfully');
      setShowModal(false);
      setActionReason('');
      setSelectedReport(null);
      fetchQueue();
    } catch (error) {
      toast.error('Failed to remove content');
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      critical: 'danger',
      high: 'warning',
      medium: 'info',
      low: 'secondary'
    };
    return (
      <span className={`badge bg-${colors[priority] || 'secondary'}`}>
        {priority}
      </span>
    );
  };

  const getContentIcon = (type) => {
    const icons = {
      post: FileText,
      short: Video,
      project: Briefcase,
      sample: Music
    };
    const Icon = icons[type] || FileText;
    return <Icon size={20} />;
  };

  const ReportCard = ({ report }) => {
    return (
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="d-flex align-items-center">
              <div className="me-3">
                {getContentIcon(report.content_type)}
              </div>
              <div>
                <h6 className="mb-1">
                  {report.content_type.charAt(0).toUpperCase() + report.content_type.slice(1)} Report
                </h6>
                <small className="text-muted">
                  Reported by: {report.reporter?.fullname || report.reporter?.first_name || 'Anonymous'}
                </small>
              </div>
            </div>
            {getPriorityBadge(report.priority)}
          </div>

          <div className="mb-3">
            <strong className="d-block mb-2">Reason:</strong>
            <div className="bg-light p-3 rounded">
              <p className="mb-0">{report.description || report.reason}</p>
            </div>
          </div>

          {report.evidence && (
            <div className="mb-3">
              <strong className="d-block mb-2">Evidence:</strong>
              <small className="text-muted">{report.evidence}</small>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Reported {new Date(report.created_at).toLocaleDateString()}
            </small>
            <div className="btn-group">
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={() => {
                  setSelectedReport(report);
                  // Open content preview modal (you can implement this)
                }}
              >
                <Eye size={14} className="me-1" />
                View Content
              </button>
              <button 
                className="btn btn-sm btn-success"
                onClick={() => handleApprove(report)}
              >
                <CheckCircle size={14} className="me-1" />
                Approve
              </button>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => {
                  setSelectedReport(report);
                  setShowModal(true);
                }}
              >
                <XCircle size={14} className="me-1" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="moderation-queue">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Moderation Queue</h2>
          <p className="text-muted">Review and moderate flagged content</p>
        </div>
        <button className="btn btn-primary" onClick={fetchQueue}>
          <i className="ri-refresh-line me-2"></i>
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-muted">Pending</small>
                  <h4>{stats.total_pending || 0}</h4>
                </div>
                <Flag className="text-warning" size={32} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-muted">Critical</small>
                  <h4>{stats.critical || 0}</h4>
                </div>
                <AlertTriangle className="text-danger" size={32} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-muted">Approved Today</small>
                  <h4>{stats.total_approved || 0}</h4>
                </div>
                <CheckCircle className="text-success" size={32} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-muted">Rejected Today</small>
                  <h4>{stats.total_rejected || 0}</h4>
                </div>
                <XCircle className="text-danger" size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small">Content Type</label>
              <select 
                className="form-select"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">All Types</option>
                <option value="post">Posts</option>
                <option value="short">Shorts</option>
                <option value="project">Projects</option>
                <option value="sample">Samples</option>
                <option value="comment">Comments</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small">Status</label>
              <select 
                className="form-select"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small">Priority</label>
              <select 
                className="form-select"
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Queue List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {queue.length > 0 ? (
            queue.map(report => (
              <ReportCard key={report.id} report={report} />
            ))
          ) : (
            <div className="text-center py-5">
              <CheckCircle className="text-success mb-3" size={48} />
              <h5>No reports in queue</h5>
              <p className="text-muted">All caught up! No pending moderation tasks.</p>
            </div>
          )}
        </>
      )}

      {/* Action Modal */}
      {showModal && selectedReport && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Remove Content</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setActionReason('');
                    setSelectedReport(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-warning">
                  <AlertTriangle size={20} className="me-2" />
                  This action will hide/remove the reported content.
                </div>
                <div className="mb-3">
                  <label className="form-label">Removal Reason *</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Provide a reason for removing this content..."
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                  ></textarea>
                  <small className="text-muted">Minimum 10 characters required</small>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setActionReason('');
                    setSelectedReport(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleReject(selectedReport)}
                >
                  Remove Content
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModerationQueue;

