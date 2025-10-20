import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import BrandLogo from './BrandLogo';

const Sidebar = ({ isOpen, isMobile, toggleSidebar }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'ri-dashboard-2-line',
      link: '/superadmin/dashboard'
    },
    {
      id: 'users',
      title: 'User Management',
      icon: 'ri-user-line',
      submenu: [
        { title: 'All Users', link: '/superadmin/users' },
        { title: 'Streamers', link: '/superadmin/users/streamers' },
        { title: 'Engineers', link: '/superadmin/users/engineers' },
        { title: 'Clients', link: '/superadmin/users/clients' },
        { title: 'Admins', link: '/superadmin/users/admins' }
      ]
    },
    {
      id: 'content',
      title: 'Content Management',
      icon: 'ri-file-list-line',
      submenu: [
        { title: 'Overview', link: '/superadmin/content' },
        { title: 'Posts', link: '/superadmin/content/posts' },
        { title: 'Shorts', link: '/superadmin/content/shorts' },
        { title: 'Channels', link: '/superadmin/content/channels' },
        { title: 'Projects', link: '/superadmin/content/projects' },
        { title: 'Samples', link: '/superadmin/content/samples' },
        { title: 'Moderation Queue', link: '/superadmin/content/moderation-queue', badge: '0' }
      ]
    },
    {
      id: 'finance',
      title: 'Financial Management',
      icon: 'ri-money-dollar-circle-line',
      submenu: [
        { title: 'Dashboard', link: '/superadmin/finance' },
        { title: 'Transactions', link: '/superadmin/finance/transactions' },
        { title: 'Invoices', link: '/superadmin/finance/invoices' },
        { title: 'Refunds', link: '/superadmin/finance/refunds' },
        { title: 'Advertising', link: '/superadmin/finance/advertising' }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'ri-settings-3-line',
      submenu: [
        { title: 'Platform Settings', link: '/superadmin/settings/platform' },
        { title: 'Email Settings', link: '/superadmin/settings/email' },
        { title: 'Payment Settings', link: '/superadmin/settings/payments' },
        { title: 'Security Settings', link: '/superadmin/settings/security' }
      ]
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      icon: 'ri-shield-check-line',
      submenu: [
        { title: 'Activity Logs', link: '/superadmin/security/activity-logs' },
        { title: 'Audit Logs', link: '/superadmin/security/audit-logs' },
        { title: 'Reports', link: '/superadmin/security/reports', badge: '0' },
        { title: 'Banned Users', link: '/superadmin/security/banned-users' }
      ]
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: 'ri-mail-send-line',
      submenu: [
        { title: 'Broadcast', link: '/superadmin/communication/broadcast' },
        { title: 'Support Tickets', link: '/superadmin/communication/support-tickets', badge: '0' },
        { title: 'Announcements', link: '/superadmin/communication/announcements' }
      ]
    }
  ];

  const renderMenuItem = (item) => {
    if (item.submenu) {
      const isMenuOpen = openMenus[item.id];
      const hasActiveChild = item.submenu.some(sub => isActive(sub.link));

      return (
        <li key={item.id} className="nav-item">
          <a
            className={`nav-link menu-link ${hasActiveChild ? 'active' : ''}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleMenu(item.id);
            }}
          >
            <i className={item.icon}></i>
            <span>{item.title}</span>
            {item.badge && (
              <span className="badge badge-pill bg-danger ms-auto">{item.badge}</span>
            )}
          </a>
          <div className={`collapse menu-dropdown ${isMenuOpen || hasActiveChild ? 'show' : ''}`}>
            <ul className="nav nav-sm flex-column">
              {item.submenu.map((subItem, idx) => (
                <li key={idx} className="nav-item">
                  <Link
                    to={subItem.link}
                    className={`nav-link ${isActive(subItem.link) ? 'active' : ''}`}
                    onClick={isMobile ? toggleSidebar : undefined}
                  >
                    {subItem.title}
                    {subItem.badge && (
                      <span className="badge badge-pill bg-danger ms-auto">{subItem.badge}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      );
    }

    return (
      <li key={item.id} className="nav-item">
        <Link
          to={item.link}
          className={`nav-link menu-link ${isActive(item.link) ? 'active' : ''}`}
          onClick={isMobile ? toggleSidebar : undefined}
        >
          <i className={item.icon}></i>
          <span>{item.title}</span>
          {item.badge && (
            <span className="badge badge-pill bg-danger ms-auto">{item.badge}</span>
          )}
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="vertical-overlay"
          onClick={toggleSidebar}
          style={{
            display: 'block',
            opacity: 1
          }}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`app-menu navbar-menu ${isOpen ? '' : 'collapsed'}`}>
        <div className="navbar-brand-box">
          <Link to="/superadmin/dashboard" className="logo logo-dark">
            <span className="logo-sm">
              <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                <i className="ri-shield-star-line fs-18"></i>
              </div>
            </span>
            <span className="logo-lg">
              <BrandLogo size="default" />
            </span>
          </Link>
          <Link to="/superadmin/dashboard" className="logo logo-light">
            <span className="logo-sm">
              <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                <i className="ri-shield-star-line fs-18"></i>
              </div>
            </span>
            <span className="logo-lg">
              <BrandLogo size="default" />
            </span>
          </Link>
          <button
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            onClick={toggleSidebar}
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>

        <div id="scrollbar">
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title"><span>Menu</span></li>
              {menuItems.map(renderMenuItem)}
            </ul>
          </div>
        </div>

        <div className="sidebar-background"></div>
      </div>
    </>
  );
};

export default Sidebar;

