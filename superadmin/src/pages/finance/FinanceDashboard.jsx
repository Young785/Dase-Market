import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const FinanceDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingPayouts: 0,
    totalInvoices: 0,
    refundRequests: 0
  });
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/v1/superadmin/dashboard/stats');
      const data = response.data.data;
      
      setStats({
        totalRevenue: data.revenue?.total || 0,
        pendingPayouts: data.revenue?.pending || 0,
        totalInvoices: 0, // TODO: Add invoice count from API
        refundRequests: data.revenue?.refunds || 0
      });

      // Fetch recent transactions
      // TODO: Add transactions endpoint
      setRecentTransactions([]);
    } catch (error) {
      console.error('Failed to fetch financial data:', error);
      toast.error('Failed to load financial data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Financial Dashboard</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Finance</li>
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
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Revenue</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? (
                      <span className="placeholder col-6"></span>
                    ) : (
                      <span className="counter-value">{formatCurrency(stats.totalRevenue)}</span>
                    )}
                  </h4>
                  <Link to="/superadmin/finance/transactions" className="text-decoration-underline">View Transactions</Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-success rounded fs-3">
                    <i className="bx bx-dollar-circle text-success"></i>
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
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Pending Payouts</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? (
                      <span className="placeholder col-6"></span>
                    ) : (
                      <span className="counter-value">{formatCurrency(stats.pendingPayouts)}</span>
                    )}
                  </h4>
                  <Link to="/superadmin/finance/transactions" className="text-decoration-underline">Process Now</Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-warning rounded fs-3">
                    <i className="bx bx-wallet text-warning"></i>
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
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Invoices</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? (
                      <span className="placeholder col-6"></span>
                    ) : (
                      <span className="counter-value">{stats.totalInvoices}</span>
                    )}
                  </h4>
                  <Link to="/superadmin/finance/invoices" className="text-decoration-underline">View Invoices</Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-info rounded fs-3">
                    <i className="bx bx-file text-info"></i>
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
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Refund Requests</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    {loading ? (
                      <span className="placeholder col-6"></span>
                    ) : (
                      <span className="counter-value">{stats.refundRequests}</span>
                    )}
                  </h4>
                  <Link to="/superadmin/finance/refunds" className="text-decoration-underline">Review Requests</Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-danger rounded fs-3">
                    <i className="bx bx-error-circle text-danger"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart and Recent Transactions */}
      <div className="row">
        <div className="col-xl-8">
          <div className="card">
            <div className="card-header align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">Revenue Trends</h4>
              <div className="flex-shrink-0">
                <div className="dropdown card-header-dropdown">
                  <button className="btn btn-soft-primary btn-sm" type="button">
                    <span className="text-uppercase">Last 30 Days</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <div className="text-center">
                  <i className="ri-line-chart-line fs-1 text-muted mb-3"></i>
                  <p className="text-muted">Revenue chart will be displayed here</p>
                  <small className="text-muted">Chart integration coming soon</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card card-height-100">
            <div className="card-header align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">Recent Transactions</h4>
              <Link to="/superadmin/finance/transactions" className="btn btn-soft-primary btn-sm">
                View All
              </Link>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : recentTransactions.length > 0 ? (
                <div className="list-group list-group-flush">
                  {recentTransactions.map((transaction, idx) => (
                    <div key={idx} className="list-group-item px-0">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{transaction.description}</h6>
                          <p className="text-muted mb-0 fs-12">{transaction.date}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className={`badge bg-${transaction.status === 'completed' ? 'success' : 'warning'}`}>
                            {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                      <i className="ri-exchange-dollar-line"></i>
                    </div>
                  </div>
                  <h5>No transactions yet</h5>
                  <p className="text-muted">Transactions will appear here once they start flowing</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinanceDashboard;

