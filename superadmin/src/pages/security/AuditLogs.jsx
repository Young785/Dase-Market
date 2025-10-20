import { Link } from 'react-router-dom';

const AuditLogs = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Audit Logs</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Audit Logs</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body text-center py-5">
              <h5>Audit Logs</h5>
              <p className="text-muted">View detailed audit trail of all changes.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuditLogs;

