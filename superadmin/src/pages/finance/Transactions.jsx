import { Link } from 'react-router-dom';

const Transactions = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Transactions</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/superadmin/finance">Finance</Link></li>
                <li className="breadcrumb-item active">Transactions</li>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Transactions</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">0</span>
                  </h4>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary rounded fs-3">
                    <i className="ri-exchange-dollar-line text-primary"></i>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Completed</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    $<span className="counter-value">0</span>
                  </h4>
                  <span className="text-success">Successful</span>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Pending</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    $<span className="counter-value">0</span>
                  </h4>
                  <span className="text-warning">Processing</span>
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
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Failed</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value">0</span>
                  </h4>
                  <span className="text-danger">Failed</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-danger rounded fs-3">
                    <i className="ri-error-warning-line text-danger"></i>
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
                <div className="col-lg-3">
                  <div className="search-box">
                    <input type="text" className="form-control search" placeholder="Search by ID, user, amount..." />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </div>
                <div className="col-lg-2">
                  <select className="form-select" defaultValue="">
                    <option value="">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <select className="form-select" defaultValue="">
                    <option value="">All Types</option>
                    <option value="payment">Payment</option>
                    <option value="payout">Payout</option>
                    <option value="refund">Refund</option>
                    <option value="subscription">Subscription</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <input type="date" className="form-control" placeholder="Start date" />
                </div>
                <div className="col-lg-3">
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary w-100">
                      <i className="ri-filter-3-line align-bottom me-1"></i> Filter
                    </button>
                    <button className="btn btn-soft-danger">
                      <i className="ri-refresh-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Transactions</h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-soft-primary btn-sm">
                    <i className="ri-file-download-line align-bottom me-1"></i> Export CSV
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="text-center py-5">
                <div className="avatar-md mx-auto mb-4">
                  <div className="avatar-title bg-soft-primary text-primary rounded-circle fs-24">
                    <i className="ri-exchange-dollar-line"></i>
                  </div>
                </div>
                <h5>No transactions yet</h5>
                <p className="text-muted">Transactions will appear here once users start making payments</p>
                <small className="text-muted">All financial transactions are tracked and logged</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;

