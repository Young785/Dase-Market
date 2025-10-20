import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { Bell } from 'lucide-react';

const NotificationModal = ({ isOpen, onClose, notifications }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-backdrop" style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.3)', zIndex: 1055, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="modal-content" style={{
                background: '#fff', borderRadius: 8, maxWidth: 600, width: '90%', maxHeight: '80vh', overflow: 'hidden', padding: 0, position: 'relative'
            }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 className="mb-0">All Notifications</h4>
                    <button
                        style={{ border: 'none', background: 'none', fontSize: 24, cursor: 'pointer', padding: 0, lineHeight: 1 }}
                        onClick={onClose}
                        aria-label="Close"
                    >&times;</button>
                </div>
                <SimpleBar style={{ maxHeight: 'calc(80vh - 110px)' }}> 
                    <div className="list-group list-group-flush" style={{ padding: '8px 24px 24px 24px'}}>
                        {notifications && notifications.length > 0 ? (
                            notifications.map(notification => (
                                <div className="list-group-item list-group-item-action" key={notification.id} style={{borderBottom: '1px solid #eee', padding: '12px 0'}}>
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <Bell className="fs-16 text-primary" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1 text-ellipsis-1">{notification.title}</h6>
                                            <p className="text-muted mb-1 text-ellipsis-2" style={{fontSize: '0.85rem'}}>{notification.message}</p>
                                            <small className="text-muted">
                                                {new Date(notification.created_at).toLocaleString()}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="list-group-item text-center">
                                <p className="text-muted mb-0">No notifications.</p>
                            </div>
                        )}
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
};

export default NotificationModal;
