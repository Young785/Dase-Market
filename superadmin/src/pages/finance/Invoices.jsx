import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    date_from: '',
    date_to: ''
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0
  });

  useEffect(() => {
    fetchInvoices();
  }, [filters, pagination.current_page]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
      };

      // TODO: Replace with actual API endpoint when available
      // const response = await axiosInstance.get('/api/v1/superadmin/invoices', { params });
      // setInvoices(response.data.data.items || []);
      // setPagination(response.data.data.pagination);
      
      // Mock data for now
      setTimeout(() => {
        setInvoices([]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
      toast.error('Failed to load invoices');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const getStatusBadge = (status) => {
    const badges = {
      paid: 'success',
      pending: 'warning',
      overdue: 'danger',
      cancelled: 'secondary'
    };
    return <span className={`badge bg-${badges[status] || 'secondary'}`}>{status}</span>;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Invoices</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/superadmin/finance">Finance</Link></li>
                <li className="breadcrumb-item active">Invoices</li>
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
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search invoices..."
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <input
                    type="date"
                    className="form-control"
                    name="date_from"
                    value={filters.date_from}
                    onChange={handleFilterChange}
                    placeholder="From Date"
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="date"
                    className="form-control"
                    name="date_to"
                    value={filters.date_to}
                    onChange={handleFilterChange}
                    placeholder="To Date"
                  />
                </div>
                <div className="col-md-3">
                  <button
                    className="btn btn-primary w-100"
                    onClick={fetchInvoices}
                  >
                    <i className="ri-search-line me-1"></i>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Invoices</h5>
                <div>
                  <button className="btn btn-soft-primary btn-sm">
                    <i className="ri-download-line me-1"></i>
                    Export
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
              ) : invoices.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Invoice #</th>
                        <th>Client</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td>
                            <Link to={`/superadmin/finance/invoices/${invoice.id}`} className="fw-medium">
                              {invoice.invoice_number}
                            </Link>
                          </td>
                          <td>{invoice.client_name}</td>
                          <td>${invoice.amount}</td>
                          <td>{new Date(invoice.created_at).toLocaleDateString()}</td>
                          <td>{new Date(invoice.due_date).toLocaleDateString()}</td>
                          <td>{getStatusBadge(invoice.status)}</td>
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
                                  <Link className="dropdown-item" to={`/superadmin/finance/invoices/${invoice.id}`}>
                                    <i className="ri-eye-fill me-2"></i>View Details
                                  </Link>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="ri-download-fill me-2"></i>Download PDF
                                  </a>
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
                      <i className="ri-file-list-3-line"></i>
                    </div>
                  </div>
                  <h5>No Invoices Found</h5>
                  <p className="text-muted">
                    {filters.search || filters.status
                      ? 'Try adjusting your search or filter criteria'
                      : 'No invoices have been generated yet'}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {invoices.length > 0 && (
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

export default Invoices;
