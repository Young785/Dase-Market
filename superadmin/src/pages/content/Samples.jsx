import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Samples = () => {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchSamples();
  }, [filters, pagination.current_page]);

  const fetchSamples = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };

      const response = await axiosInstance.get('/api/v1/superadmin/manage/content/samples', { params });
      
      if (response.data.success) {
        setSamples(response.data.data.items || []);
        setStats(response.data.data.stats || stats);
        setPagination(response.data.data.pagination || pagination);
      }
    } catch (error) {
      console.error('Failed to fetch samples:', error);
      toast.error('Failed to load samples');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handleAction = async (sampleId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this sample?`)) {
      return;
    }

    try {
      await axiosInstance.post(`/api/v1/superadmin/manage/content/samples/${sampleId}/${action}`);
      toast.success(`Sample ${action}d successfully`);
      fetchSamples();
    } catch (error) {
      console.error(`Failed to ${action} sample:`, error);
      toast.error(`Failed to ${action} sample`);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Production Samples</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/superadmin/content">Content</Link></li>
                <li className="breadcrumb-item active">Samples</li>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Samples</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? <span className="placeholder col-6"></span> : <span className="counter-value">{stats.total}</span>}
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary rounded fs-3">
                    <i className="ri-music-2-line text-primary"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Approved</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? <span className="placeholder col-6"></span> : <span className="counter-value">{stats.approved}</span>}
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-success rounded fs-3">
                    <i className="ri-check-line text-success"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Pending</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? <span className="placeholder col-6"></span> : <span className="counter-value">{stats.pending}</span>}
                  </h4>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Rejected</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? <span className="placeholder col-6"></span> : <span className="counter-value">{stats.rejected}</span>}
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-danger rounded fs-3">
                    <i className="ri-close-line text-danger"></i>
                  </span>
                </div>
              </div>
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
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search samples..."
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <select className="form-select" name="status" value={filters.status} onChange={handleFilterChange}>
                    <option value="">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select className="form-select" name="category" value={filters.category} onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    <option value="beats">Beats</option>
                    <option value="loops">Loops</option>
                    <option value="one_shots">One Shots</option>
                    <option value="vocals">Vocals</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Samples List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">All Production Samples</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : samples.length === 0 ? (
                <div className="text-center py-5">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                      <i className="ri-music-2-line"></i>
                    </div>
                  </div>
                  <h5>No samples found</h5>
                  <p className="text-muted">Production samples will appear here once engineers start uploading</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Sample</th>
                        <th>Engineer</th>
                        <th>Category</th>
                        <th>Downloads</th>
                        <th>Status</th>
                        <th>Uploaded</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {samples.map((sample) => (
                        <tr key={sample.id}>
                          <td>
                            <h6 className="mb-0">{sample.title}</h6>
                            <small className="text-muted">{sample.description?.substring(0, 40)}...</small>
                          </td>
                          <td>{sample.engineer_name}</td>
                          <td><span className="badge bg-soft-info">{sample.category}</span></td>
                          <td><i className="ri-download-line me-1"></i>{sample.downloads || 0}</td>
                          <td>
                            <span className={`badge bg-soft-${
                              sample.status === 'approved' ? 'success' :
                              sample.status === 'pending' ? 'warning' : 'danger'
                            }`}>
                              {sample.status}
                            </span>
                          </td>
                          <td>{new Date(sample.created_at).toLocaleDateString()}</td>
                          <td>
                            <div className="dropdown">
                              <button className="btn btn-sm btn-soft-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                Actions
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="ri-eye-line me-2"></i>View
                                  </a>
                                </li>
                                {sample.status === 'pending' && (
                                  <>
                                    <li>
                                      <button className="dropdown-item" onClick={() => handleAction(sample.id, 'approve')}>
                                        <i className="ri-check-line me-2"></i>Approve
                                      </button>
                                    </li>
                                    <li>
                                      <button className="dropdown-item text-danger" onClick={() => handleAction(sample.id, 'reject')}>
                                        <i className="ri-close-line me-2"></i>Reject
                                      </button>
                                    </li>
                                  </>
                                )}
                              </ul>
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
    </>
  );
};

export default Samples;

