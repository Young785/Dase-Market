import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import BrandLogo from './BrandLogo';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex">

            {/* Hamburger Menu */}
            <button
              type="button"
              className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
              onClick={toggleSidebar}
            >
              <span className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* Search (Optional) */}
            <form className="app-search d-none d-md-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  autoComplete="off"
                />
                <span className="mdi mdi-magnify search-widget-icon"></span>
              </div>
            </form>
          </div>

          <div className="d-flex align-items-center">
            {/* Full Screen */}
            <div className="ms-1 header-item d-none d-sm-flex">
              <button
                type="button"
                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                onClick={() => {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    document.documentElement.requestFullscreen();
                  }
                }}
              >
                <i className="bx bx-fullscreen fs-22"></i>
              </button>
            </div>

            {/* Notifications */}
            <div className="dropdown topbar-head-dropdown ms-1 header-item">
              <button
                type="button"
                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <i className="bx bx-bell fs-22"></i>
                <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                  3
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
              {showNotifications && (
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show" style={{ position: 'absolute', right: 0 }}>
                  <div className="dropdown-head bg-primary bg-pattern rounded-top">
                    <div className="p-3">
                      <div className="row align-items-center">
                        <div className="col">
                          <h6 className="m-0 fs-16 fw-semibold text-white">Notifications</h6>
                        </div>
                        <div className="col-auto dropdown-tabs">
                          <span className="badge badge-soft-light fs-13">3 New</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-content position-relative" id="notificationItemsTabContent">
                    <div className="py-2 ps-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      <div className="text-reset notification-item d-block dropdown-item position-relative">
                        <div className="d-flex">
                          <div className="avatar-xs me-3">
                            <span className="avatar-title bg-soft-info text-info rounded-circle fs-16">
                              <i className="bx bx-badge-check"></i>
                            </span>
                          </div>
                          <div className="flex-1">
                            <h6 className="mt-0 mb-2 lh-base">New user registered</h6>
                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                              <span><i className="mdi mdi-clock-outline"></i> 5 min ago</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="text-reset notification-item d-block dropdown-item position-relative">
                        <div className="d-flex">
                          <div className="avatar-xs me-3">
                            <span className="avatar-title bg-soft-warning text-warning rounded-circle fs-16">
                              <i className="bx bx-message-square-dots"></i>
                            </span>
                          </div>
                          <div className="flex-1">
                            <h6 className="mt-0 mb-2 lh-base">New support ticket</h6>
                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                              <span><i className="mdi mdi-clock-outline"></i> 15 min ago</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-top d-grid">
                      <Link className="btn btn-sm btn-link font-size-14 text-center" to="/superadmin/security/activity-logs">
                        <i className="mdi mdi-arrow-right-circle me-1"></i> View All
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="dropdown ms-sm-3 header-item topbar-user">
              <button
                type="button"
                className="btn"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <span className="d-flex align-items-center">
                  <img
                    className="rounded-circle header-profile-user"
                    src="/src/assets/images/users/avatar-1.jpg"
                    alt="Header Avatar"
                  />
                  <span className="text-start ms-xl-2">
                    <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                      {user?.first_name} {user?.last_name}
                    </span>
                    <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                      {user?.role?.display_name || 'Superadmin'}
                    </span>
                  </span>
                </span>
              </button>
              {showProfileDropdown && (
                <div className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', right: 0 }}>
                  <h6 className="dropdown-header">Welcome {user?.first_name}!</h6>
                  <Link className="dropdown-item" to="/superadmin/profile">
                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Profile</span>
                  </Link>
                  <Link className="dropdown-item" to="/superadmin/settings/security">
                    <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Settings</span>
                  </Link>
                  <Link className="dropdown-item" to="/superadmin/security/activity-logs">
                    <i className="mdi mdi-shield-check-outline text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Activity Logs</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

