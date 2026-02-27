import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    date: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    pending: 0,
    flagged: 0
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchPosts();
  }, [filters, pagination.current_page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };

      const response = await axiosInstance.get('/api/v1/superadmin/manage/content/posts', { params });
      
      if (response.data.success) {
        setPosts(response.data.data.items || []);
        setStats(response.data.data.stats || stats);
        setPagination(response.data.data.pagination || pagination);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handleAction = async (postId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this post?`)) {
      return;
    }

    try {
      if (action === 'approve' || action === 'reject') {
        await axiosInstance.post(`/api/v1/superadmin/manage/content/posts/${postId}/${action}`);
      } else if (action === 'delete') {
        await axiosInstance.delete(`/api/v1/superadmin/manage/content/posts/${postId}`);
      }
      toast.success(`Post ${action}d successfully`);
      fetchPosts();
    } catch (error) {
      console.error(`Failed to ${action} post:`, error);
      toast.error(`Failed to ${action} post`);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      published: 'success',
      draft: 'secondary',
      pending: 'warning',
      flagged: 'danger'
    };
    return <span className={`badge bg-${badges[status] || 'secondary'}`}>{status}</span>;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Posts Management</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/superadmin/content">Content</Link></li>
                <li className="breadcrumb-item active">Posts</li>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Posts</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.total}</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary rounded fs-3">
                    <i className="ri-article-line text-primary"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Published</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.published}</span>
                  </h4>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Pending Review</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">{stats.pending}</span>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Flagged</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value badge bg-danger">{stats.flagged}</span>
                  </h4>
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
      </div>

      {/* Filter Bar */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-lg-4">
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control search"
                      placeholder="Search posts..."
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </div>
                <div className="col-lg-2">
                  <select
                    className="form-select"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="flagged">Flagged</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <select
                    className="form-select"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Categories</option>
                    <option value="music">Music</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-lg-2">
                  <button className="btn btn-primary w-100" onClick={fetchPosts}>
                    <i className="ri-filter-3-line align-bottom me-1"></i> Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Posts</h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-soft-primary btn-sm">
                    <i className="ri-file-download-line align-bottom me-1"></i> Export
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
              ) : posts.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Views</th>
                        <th>Likes</th>
                        <th>Created</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              {post.thumbnail && (
                                <img
                                  src={post.thumbnail}
                                  alt=""
                                  className="avatar-sm rounded me-3"
                                />
                              )}
                              <div>
                                <h6 className="mb-0">{post.title}</h6>
                                <small className="text-muted">{post.description?.substring(0, 50)}...</small>
                              </div>
                            </div>
                          </td>
                          <td>{post.author_name}</td>
                          <td><span className="badge bg-soft-primary text-primary">{post.category}</span></td>
                          <td><i className="ri-eye-line me-1"></i>{post.views || 0}</td>
                          <td><i className="ri-heart-line me-1"></i>{post.likes || 0}</td>
                          <td>{new Date(post.created_at).toLocaleDateString()}</td>
                          <td>{getStatusBadge(post.status)}</td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-soft-secondary btn-sm dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ri-more-fill"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="ri-eye-fill me-2"></i>View
                                  </a>
                                </li>
                                {post.status === 'pending' && (
                                  <>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleAction(post.id, 'approve')}
                                      >
                                        <i className="ri-check-fill me-2"></i>Approve
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item text-danger"
                                        onClick={() => handleAction(post.id, 'reject')}
                                      >
                                        <i className="ri-close-fill me-2"></i>Reject
                                      </button>
                                    </li>
                                  </>
                                )}
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => handleAction(post.id, 'delete')}
                                  >
                                    <i className="ri-delete-bin-fill me-2"></i>Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
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
                      <i className="ri-article-line"></i>
                    </div>
                  </div>
                  <h5>No posts yet</h5>
                  <p className="text-muted">
                    {filters.search || filters.status || filters.category
                      ? 'No posts match your search criteria'
                      : 'Posts from streamers will appear here once they start creating content'}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {posts.length > 0 && (
              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to{' '}
                    {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of{' '}
                    {pagination.total} entries
                  </div>
                  <nav>
                    <ul className="pagination mb-0">
                      <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setPagination(prev => ({ ...prev, current_page: prev.current_page - 1 }))}
                          disabled={pagination.current_page === 1}
                        >
                          Previous
                        </button>
                      </li>
                      <li className="page-item active">
                        <span className="page-link">{pagination.current_page}</span>
                      </li>
                      <li className={`page-item ${pagination.current_page >= Math.ceil(pagination.total / pagination.per_page) ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setPagination(prev => ({ ...prev, current_page: prev.current_page + 1 }))}
                          disabled={pagination.current_page >= Math.ceil(pagination.total / pagination.per_page)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
