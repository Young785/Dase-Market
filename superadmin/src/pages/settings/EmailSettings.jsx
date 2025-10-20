import { Link } from 'react-router-dom';

const EmailSettings = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Email Settings</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/superadmin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Email Settings</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body text-center py-5">
              <h5>Email Configuration</h5>
              <p className="text-muted">Configure email settings and templates.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailSettings;

