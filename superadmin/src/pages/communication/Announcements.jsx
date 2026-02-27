import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    target_audience: 'all',
    is_active: true
  });
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: ''
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchAnnouncements();
  }, [filters, pagination.current_page]);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };

      const response = await axiosInstance.get('/api/v1/superadmin/announcements', { params });
      
      if (response.data.success) {
        setAnnouncements(response.data.data.items || []);
        setPagination(response.data.data.pagination || pagination);
      }
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
      toast.error('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingAnnouncement) {
        await axiosInstance.put(`/api/v1/superadmin/announcements/${editingAnnouncement.id}`, formData);
        toast.success('Announcement updated successfully');
      } else {
        await axiosInstance.post('/api/v1/superadmin/announcements', formData);
        toast.success('Announcement created successfully');
      }
      
      setShowModal(false);
      setEditingAnnouncement(null);
      setFormData({
        title: '',
        message: '',
        type: 'info',
        target_audience: 'all',
        is_active: true
      });
      fetchAnnouncements();
    } catch (error) {
      console.error('Failed to save announcement:', error);
      toast.error('Failed to save announcement');
    }
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      message: announcement.message,
      type: announcement.type,
      target_audience: announcement.target_audience,
      is_active: announcement.is_active
    });
    setShowModal(true);
  };

  const handleDelete = async (announcementId) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) {
      return;
    }

    try {
      await axiosInstance.delete(`/api/v1/superadmin/announcements/${announcementId}`);
      toast.success('Announcement deleted successfully');
      fetchAnnouncements();
    } catch (error) {
      console.error('Failed to delete announcement:', error);
      toast.error('Failed to delete announcement');
    }
  };

  const handleToggleStatus = async (announcementId, currentStatus) => {
    try {
      await axiosInstance.put(`/api/v1/superadmin/announcements/${announcementId}`, {
        is_active: !currentStatus
      });
      toast.success(`Announcement ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchAnnouncements();
    } catch (error) {
      console.error('Failed to toggle status:', error);
      toast.error('Failed to update status');
    }
  };

  const getTypeBadge = (type) => {
    const badges = {
      info: 'info',
      warning: 'warning',
      success: 'success',
      danger: 'danger',
      maintenance: 'secondary'
    };
    return <span className={`badge bg-${badges[type] || 'info'}`}>{type}</span>;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Announcements</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Announcements</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search announcements..."
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <select className="form-select" name="type" value={filters.type} onChange={handleFilterChange}>
                    <option value="">All Types</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="success">Success</option>
                    <option value="danger">Danger</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select className="form-select" name="status" value={filters.status} onChange={handleFilterChange}>
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary w-100" onClick={() => setShowModal(true)}>
                    <i className="ri-add-line me-1"></i> New
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Platform Announcements</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : announcements.length === 0 ? (
                <div className="text-center py-5">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                      <i className="ri-megaphone-line"></i>
                    </div>
                  </div>
                  <h5>No announcements yet</h5>
                  <p className="text-muted">Create your first announcement to communicate with users</p>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
                    <i className="ri-add-line me-1"></i> Create Announcement
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Target Audience</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {announcements.map((announcement) => (
                        <tr key={announcement.id}>
                          <td>
                            <h6 className="mb-0">{announcement.title}</h6>
                            <small className="text-muted">{announcement.message?.substring(0, 60)}...</small>
                          </td>
                          <td>{getTypeBadge(announcement.type)}</td>
                          <td>
                            <span className="badge bg-soft-secondary">
                              {announcement.target_audience}
                            </span>
                          </td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={announcement.is_active}
                                onChange={() => handleToggleStatus(announcement.id, announcement.is_active)}
                              />
                            </div>
                          </td>
                          <td>{new Date(announcement.created_at).toLocaleDateString()}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-soft-primary"
                                onClick={() => handleEdit(announcement)}
                              >
                                <i className="ri-edit-line"></i>
                              </button>
                              <button
                                className="btn btn-soft-danger"
                                onClick={() => handleDelete(announcement.id)}
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingAnnouncement ? 'Edit Announcement' : 'Create Announcement'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setEditingAnnouncement(null);
                    setFormData({
                      title: '',
                      message: '',
                      type: 'info',
                      target_audience: 'all',
                      is_active: true
                    });
                  }}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <select
                      className="form-select"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="success">Success</option>
                      <option value="danger">Danger</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Target Audience</label>
                    <select
                      className="form-select"
                      name="target_audience"
                      value={formData.target_audience}
                      onChange={handleInputChange}
                    >
                      <option value="all">All Users</option>
                      <option value="streamers">Streamers</option>
                      <option value="engineers">Engineers</option>
                      <option value="clients">Clients</option>
                    </select>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setEditingAnnouncement(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingAnnouncement ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Announcements;

