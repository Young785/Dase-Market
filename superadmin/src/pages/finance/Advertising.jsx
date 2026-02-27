import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Advertising = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    paused: 0,
    revenue: 0
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchCampaigns();
  }, [filters, pagination.current_page]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };

      const response = await axiosInstance.get('/api/v1/superadmin/finance/advertising', { params });
      
      if (response.data.success) {
        setCampaigns(response.data.data.items || []);
        setStats(response.data.data.stats || stats);
        setPagination(response.data.data.pagination || pagination);
      }
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      toast.error('Failed to load advertising campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handleAction = async (campaignId, action) => {
    try {
      await axiosInstance.post(`/api/v1/superadmin/finance/advertising/${campaignId}/${action}`);
      toast.success(`Campaign ${action}d successfully`);
      fetchCampaigns();
    } catch (error) {
      console.error(`Failed to ${action} campaign:`, error);
      toast.error(`Failed to ${action} campaign`);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Advertising Management</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/superadmin/finance">Finance</Link></li>
                <li className="breadcrumb-item active">Advertising</li>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Campaigns</p>
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
                    <i className="ri-advertisement-line text-primary"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Active Campaigns</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? <span className="placeholder col-6"></span> : <span className="counter-value">{stats.active}</span>}
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-success rounded fs-3">
                    <i className="ri-play-circle-line text-success"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Paused</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? <span className="placeholder col-6"></span> : <span className="counter-value">{stats.paused}</span>}
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-warning rounded fs-3">
                    <i className="ri-pause-circle-line text-warning"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Revenue</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? <span className="placeholder col-6"></span> : formatCurrency(stats.revenue)}
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-info rounded fs-3">
                    <i className="ri-money-dollar-circle-line text-info"></i>
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
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search campaigns..."
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <select className="form-select" name="status" value={filters.status} onChange={handleFilterChange}>
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select className="form-select" name="type" value={filters.type} onChange={handleFilterChange}>
                    <option value="">All Types</option>
                    <option value="banner">Banner</option>
                    <option value="video">Video</option>
                    <option value="sponsored">Sponsored</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Advertising Campaigns</h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-primary btn-sm">
                    <i className="ri-add-line align-bottom me-1"></i> New Campaign
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
              ) : campaigns.length === 0 ? (
                <div className="text-center py-5">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                      <i className="ri-advertisement-line"></i>
                    </div>
                  </div>
                  <h5>No campaigns found</h5>
                  <p className="text-muted">Create your first advertising campaign to start generating revenue</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Campaign</th>
                        <th>Type</th>
                        <th>Advertiser</th>
                        <th>Budget</th>
                        <th>Spent</th>
                        <th>Impressions</th>
                        <th>Clicks</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => (
                        <tr key={campaign.id}>
                          <td>
                            <h6 className="mb-0">{campaign.name}</h6>
                            <small className="text-muted">{campaign.description?.substring(0, 40)}...</small>
                          </td>
                          <td><span className="badge bg-soft-info">{campaign.type}</span></td>
                          <td>{campaign.advertiser_name}</td>
                          <td>{formatCurrency(campaign.budget)}</td>
                          <td>{formatCurrency(campaign.spent)}</td>
                          <td>{campaign.impressions?.toLocaleString() || 0}</td>
                          <td>{campaign.clicks?.toLocaleString() || 0}</td>
                          <td>
                            <span className={`badge bg-soft-${
                              campaign.status === 'active' ? 'success' :
                              campaign.status === 'paused' ? 'warning' :
                              campaign.status === 'completed' ? 'info' : 'secondary'
                            }`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button className="btn btn-sm btn-soft-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                Actions
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <Link to={`/superadmin/finance/advertising/${campaign.id}`} className="dropdown-item">
                                    <i className="ri-eye-line me-2"></i>View Details
                                  </Link>
                                </li>
                                {campaign.status === 'active' && (
                                  <li>
                                    <button className="dropdown-item" onClick={() => handleAction(campaign.id, 'pause')}>
                                      <i className="ri-pause-line me-2"></i>Pause
                                    </button>
                                  </li>
                                )}
                                {campaign.status === 'paused' && (
                                  <li>
                                    <button className="dropdown-item" onClick={() => handleAction(campaign.id, 'resume')}>
                                      <i className="ri-play-line me-2"></i>Resume
                                    </button>
                                  </li>
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

export default Advertising;

