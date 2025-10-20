import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { 
    Bell, BellOff, Filter, Search, X, Calendar, FileText, 
    MessageSquare, CreditCard, FolderOpen, User, CheckCircle,
    AlertCircle, Info, Zap, Settings, ChevronDown
} from 'lucide-react';
import axiosInstance from '../../../axiosInstance';
import mockDataService from '../../../utils/mockData';
import toast, { Toaster } from 'react-hot-toast';
import { useProfile } from '../../../context/ProfileContext';
import '../style.css';

const notificationTypeIcons = {
    'new_message': { icon: MessageSquare, className: 'text-primary bg-primary' },
    'invoice_received': { icon: CreditCard, className: 'text-success bg-success' },
    'payment_successful': { icon: CheckCircle, className: 'text-success bg-success' },
    'payment_received': { icon: CheckCircle, className: 'text-success bg-success' },
    'file_shared': { icon: FileText, className: 'text-info bg-info' },
    'project_update': { icon: FolderOpen, className: 'text-warning bg-warning' },
    'login_successful': { icon: User, className: 'text-primary bg-primary' },
    'message_edited': { icon: Info, className: 'text-secondary bg-secondary' },
    'message_deleted': { icon: AlertCircle, className: 'text-danger bg-danger' },
    'default': { icon: Bell, className: 'text-secondary bg-secondary' }
};

export default function NotificationPage() {
    const { profile, loading: profileLoading } = useProfile();
    const [notifications, setNotifications] = useState([]);
    const [meta, setMeta] = useState({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
    const [stats, setStats] = useState({ total: 0, unread: 0, read: 0, by_type: {} });
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('notifications');
    const [showFilters, setShowFilters] = useState(false);
    
    // Filter states
    const [filters, setFilters] = useState({
        type: 'all',
        status: 'all',
        search: '',
        date_from: '',
        date_to: ''
    });

    // Settings states
    const [prefLoading, setPrefLoading] = useState(false);
    const [prefs, setPrefs] = useState({
        notify_login: true,
        notify_logout: true,
        notify_account_delete: true,
        notify_password_change: true,
        notify_profile_update: true,
        notify_new_message: true,
        notify_invoice: true,
        notify_project: true,
        notify_chat: true,
        notify_engineer: true,
    });

    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);

    // Fetch notifications
    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('per_page', perPage);
            if (filters.type && filters.type !== 'all') params.append('type', filters.type);
            if (filters.status && filters.status !== 'all') params.append('status', filters.status);
            if (filters.search) params.append('search', filters.search);
            if (filters.date_from) params.append('date_from', filters.date_from);
            if (filters.date_to) params.append('date_to', filters.date_to);

            try {
                const response = await axiosInstance.get(`/dashboard/notifications?${params.toString()}`);
                if (response?.data?.status && response?.data?.data) {
                    const { items, meta, stats } = response.data.data;
                    setNotifications(items || []);
                    if (meta) setMeta(meta);
                    if (stats) setStats(stats);
                    return;
                }
            } catch (apiErr) {
                // Fallback to mock data
                const mock = await mockDataService.getNotifications();
                if (mock?.status) {
                    setNotifications(mock.data.items || []);
                    setMeta(mock.data.meta || { current_page: 1, last_page: 1, per_page: 10, total: mock.data.items.length });
                    setStats(mock.data.stats || { total: mock.data.items.length, unread: mock.data.items.filter(n => !n.read_at).length, read: mock.data.items.filter(n => n.read_at).length });
                    return;
                }
                throw apiErr;
            }
        } catch (error) {
            notifyError('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    // Fetch settings
    const fetchSettings = async () => {
        try {
            const response = await axiosInstance.get('/user/settings');
            const settings = response?.data?.data;
            if (settings?.notifications) {
                setPrefs((prev) => ({ ...prev, ...settings.notifications }));
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    useEffect(() => {
        if (!profileLoading && profile) {
            fetchNotifications();
            if (activeTab === 'settings') {
                fetchSettings();
            }
        }
    }, [profileLoading, profile, page, perPage, filters, activeTab]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const clearFilters = () => {
        setFilters({
            type: 'all',
            status: 'all',
            search: '',
            date_from: '',
            date_to: ''
        });
        setPage(1);
    };

    const handleMarkAsRead = async (notificationId) => {
        try {
            await axiosInstance.post(`/dashboard/notifications/${notificationId}/read`);
            setNotifications(prev => 
                prev.map(notif => 
                    notif.id === notificationId 
                        ? { ...notif, read_at: new Date().toISOString() } 
                        : notif
                )
            );
            notifySuccess('Marked as read');
        } catch (error) {
            notifyError('Failed to mark as read');
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await axiosInstance.post('/dashboard/notifications/read-all');
            setNotifications(prev => 
                prev.map(notif => ({ ...notif, read_at: notif.read_at || new Date().toISOString() }))
            );
            notifySuccess('All notifications marked as read');
            fetchNotifications();
        } catch (error) {
            notifyError('Failed to mark all as read');
        }
    };

    const handleToggle = async (key) => {
        const next = !prefs[key];
        setPrefs((p) => ({ ...p, [key]: next }));
        try {
            setPrefLoading(true);
            await axiosInstance.put('/user/settings', { [key]: next });
            notifySuccess('Preference saved');
        } catch (e) {
            setPrefs((p) => ({ ...p, [key]: !next }));
            notifyError('Failed to save preference');
        } finally {
            setPrefLoading(false);
        }
    };

    const getNotificationIcon = (type) => {
        const config = notificationTypeIcons[type] || notificationTypeIcons.default;
        const IconComponent = config.icon;
        const [textClass, bgClass] = config.className.split(' ');
        return (
            <div className={`${bgClass} bg-opacity-10 rounded d-flex align-items-center justify-content-center flex-shrink-0`}
                style={{ width: '48px', height: '48px' }}>
                <IconComponent size={24} className={textClass} />
            </div>
        );
    };

    const getFilteredNotificationTypes = () => {
        return Object.keys(stats.by_type || {}).map(type => ({
            value: type,
            label: type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            count: stats.by_type[type]
        }));
    };

    if (profileLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Toaster position="top-right" />
            <div className="layout-wrapper">
                    <div className="main-content">
                        <div className="page-content">
                            <div className="container-fluid">
                            {/* Header */}
                            <div className="row mb-4">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4 className="mb-1">Notifications</h4>
                                            <p className="text-muted mb-0">Stay updated with your latest activities</p>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => setActiveTab('notifications')}
                                            >
                                                <Bell size={18} className="me-2" />
                                                Notifications
                                            </button>
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => setActiveTab('settings')}
                                            >
                                                <Settings size={18} className="me-2" />
                                                Settings
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notifications Tab */}
                            {activeTab === 'notifications' && (
                                <>
                                    {/* Stats Cards */}
                                    <div className="row mb-4">
                                        <div className="col-md-3">
                                            <div className="card border-0 shadow-sm">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <p className="text-muted mb-1 small">Total</p>
                                                            <h3 className="mb-0 text-dark">{stats.total}</h3>
                                                        </div>
                                                        <div className="rounded-circle bg-primary bg-opacity-10 p-3">
                                                            <Bell size={24} className="text-primary" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card border-0 shadow-sm">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <p className="text-muted mb-1 small">Unread</p>
                                                            <h3 className="mb-0 text-danger">{stats.unread}</h3>
                                                        </div>
                                                        <div className="rounded-circle bg-danger bg-opacity-10 p-3">
                                                            <Zap size={24} className="text-danger" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card border-0 shadow-sm">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <p className="text-muted mb-1 small">Read</p>
                                                            <h3 className="mb-0 text-success">{stats.read}</h3>
                                                        </div>
                                                        <div className="rounded-circle bg-success bg-opacity-10 p-3">
                                                            <CheckCircle size={24} className="text-success" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card border-0 shadow-sm">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <p className="text-muted mb-1 small">Types</p>
                                                            <h3 className="mb-0 text-info">{Object.keys(stats.by_type || {}).length}</h3>
                                                        </div>
                                                        <div className="rounded-circle bg-info bg-opacity-10 p-3">
                                                            <Filter size={24} className="text-info" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Filters */}
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h6 className="mb-0">
                                                    <Filter size={18} className="me-2" />
                                                    Filters
                                                </h6>
                                                <button
                                                    className="btn btn-sm btn-link"
                                                    onClick={() => setShowFilters(!showFilters)}
                                                >
                                                    {showFilters ? 'Hide' : 'Show'}
                                                    <ChevronDown size={16} className={`ms-1 ${showFilters ? 'rotate-180' : ''}`} />
                                                </button>
                                </div>

                                            {showFilters && (
                                                <div className="row g-3">
                                                    <div className="col-md-3">
                                                        <label className="form-label">Search</label>
                                                        <div className="input-group">
                                                            <span className="input-group-text">
                                                                <Search size={16} />
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Search notifications..."
                                                                value={filters.search}
                                                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label className="form-label">Type</label>
                                                        <select
                                                            className="form-select"
                                                            value={filters.type}
                                                            onChange={(e) => handleFilterChange('type', e.target.value)}
                                                        >
                                                            <option value="all">All Types</option>
                                                            {getFilteredNotificationTypes().map(type => (
                                                                <option key={type.value} value={type.value}>
                                                                    {type.label} ({type.count})
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label className="form-label">Status</label>
                                                        <select
                                                            className="form-select"
                                                            value={filters.status}
                                                            onChange={(e) => handleFilterChange('status', e.target.value)}
                                                        >
                                                            <option value="all">All</option>
                                                            <option value="unread">Unread</option>
                                                            <option value="read">Read</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label className="form-label">From Date</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            value={filters.date_from}
                                                            onChange={(e) => handleFilterChange('date_from', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label className="form-label">To Date</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            value={filters.date_to}
                                                            onChange={(e) => handleFilterChange('date_to', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-md-1 d-flex align-items-end">
                                                        <button
                                                            className="btn btn-outline-secondary w-100"
                                                            onClick={clearFilters}
                                                            title="Clear Filters"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Notifications List */}
                                    <div className="card">
                                        <div className="card-header bg-white">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h6 className="mb-0">All Notifications</h6>
                                                {stats.unread > 0 && (
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={handleMarkAllAsRead}
                                                    >
                                                        <CheckCircle size={16} className="me-1" />
                                                        Mark All as Read
                                                    </button>
                                                )}
                                            </div>
                                                                    </div>
                                        <div className="card-body p-0">
                                            <SimpleBar style={{ maxHeight: '600px' }}>
                                                                                {loading ? (
                                                    <div className="text-center p-5">
                                                                                        <div className="spinner-border text-primary" role="status">
                                                                                            <span className="visually-hidden">Loading...</span>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : notifications && notifications.length > 0 ? (
                                                    <div className="list-group list-group-flush">
                                                        {notifications.map(notification => (
                                                            <div
                                                                key={notification.id}
                                                                className={`list-group-item ${!notification.read_at ? 'bg-light' : ''}`}
                                                                style={{
                                                                    borderLeft: notification.read_at ? 'none' : '3px solid var(--bs-primary)',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.2s'
                                                                }}
                                                                onClick={() => !notification.read_at && handleMarkAsRead(notification.id)}
                                                            >
                                                                <div className="d-flex gap-3 align-items-start p-2">
                                                                    {getNotificationIcon(notification.type)}
                                                                    <div className="flex-grow-1">
                                                                        <div className="d-flex justify-content-between align-items-start mb-1">
                                                                            <h6 className="mb-0 fw-semibold">{notification.title}</h6>
                                                                            {!notification.read_at && (
                                                                                <span className="badge bg-primary">New</span>
                                                                            )}
                                                                        </div>
                                                                        <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                                                                            {notification.message}
                                                                        </p>
                                                                        <div className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: '0.85rem' }}>
                                                                            <span>
                                                                                <Calendar size={14} className="me-1" />
                                                                                {new Date(notification.created_at).toLocaleDateString()}
                                                                            </span>
                                                                            <span>
                                                                                {new Date(notification.created_at).toLocaleTimeString()}
                                                                            </span>
                                                                            <span className="badge bg-light text-dark">
                                                                                {notification.type.replace(/_/g, ' ')}
                                                                            </span>
                                                                                                </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center p-5">
                                                        <BellOff size={64} className="text-muted mb-3" />
                                                        <h5 className="text-muted">No notifications found</h5>
                                                        <p className="text-muted">
                                                            {filters.search || filters.type !== 'all' || filters.status !== 'all'
                                                                ? 'Try adjusting your filters'
                                                                : 'You\'re all caught up!'}
                                                        </p>
                                                                                    </div>
                                                                                )}
                                            </SimpleBar>
                                        </div>
                                                                                {/* Pagination */}
                                        {notifications.length > 0 && (
                                            <div className="card-footer bg-white">
                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                        <label className="mb-0">Per page:</label>
                                                        <select
                                                            className="form-select form-select-sm"
                                                            style={{ width: '80px' }}
                                                            value={perPage}
                                                            onChange={(e) => {
                                                                setPerPage(parseInt(e.target.value) || 10);
                                                                setPage(1);
                                                            }}
                                                        >
                                                                                            <option value={5}>5</option>
                                                                                            <option value={10}>10</option>
                                                                                            <option value={20}>20</option>
                                                                                            <option value={50}>50</option>
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className="btn-group">
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            disabled={page <= 1 || loading}
                                                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                                                        >
                                                            Previous
                                                        </button>
                                                        <span className="btn btn-sm btn-outline-secondary disabled">
                                                            {meta.current_page} / {meta.last_page}
                                                        </span>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            disabled={page >= meta.last_page || loading}
                                                            onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))}
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                      
                            {/* Settings Tab */}
                            {activeTab === 'settings' && (
                                                    <div className="card">
                                                        <div className="card-body">
                                        <h5 className="mb-3">Notification Settings</h5>
                                        <p className="text-muted mb-4">
                                            Select the notifications you're interested in and we'll stay in touch
                                        </p>
                                                              
                                                            <div className="subscription-settings">
                                            {[
                                                { key: 'notify_login', title: 'Login Notifications', desc: 'Get notified when someone logs into your account' },
                                                { key: 'notify_logout', title: 'Log Out Notifications', desc: 'Get notified when you log out of your account' },
                                                { key: 'notify_account_delete', title: 'Account Deletion Notifications', desc: 'Get notified when your account is deleted' },
                                                { key: 'notify_password_change', title: 'Password Change Notifications', desc: 'Get notified when your password is changed' },
                                                { key: 'notify_profile_update', title: 'Profile Update Notifications', desc: 'Get notified when your profile information is updated' },
                                                { key: 'notify_new_message', title: 'New Message Notifications', desc: 'Get notified when you receive a new message' },
                                                { key: 'notify_invoice', title: 'Invoice Notifications', desc: 'Get notified when a new invoice is generated' },
                                                { key: 'notify_project', title: 'Project Notifications', desc: 'Get notified about updates on your projects' },
                                                { key: 'notify_chat', title: 'Chat Notifications', desc: 'Get notified when you receive a new chat message' },
                                                { key: 'notify_engineer', title: 'Engineer Notifications', desc: 'Get notified about updates from your engineering team' },
                                            ].map(({ key, title, desc }) => (
                                                <div key={key} className="subscription-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                                                    <div>
                                                        <h6 className="mb-1">{title}</h6>
                                                        <p className="text-muted mb-0 small">{desc}</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            checked={!!prefs[key]}
                                                            onChange={() => handleToggle(key)}
                                                            disabled={prefLoading}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
