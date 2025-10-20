import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import mockDataService from '../../../utils/mockData';

class NotificationService {
    // Send notification for invoice creation
    static async notifyInvoiceCreated(invoiceData, receiverId) {
        try {
            const response = await axiosInstance.post('/user/notifications/invoice-created', {
                invoice_id: invoiceData.invoice_id,
                receiver_id: receiverId,
                invoice_number: invoiceData.invoice_number,
                amount: invoiceData.total_amount,
                task_title: invoiceData.task_title,
                message: `New invoice ${invoiceData.invoice_number} has been created${invoiceData.task_title ? ` for "${invoiceData.task_title}"` : ''}`
            });
            
            return response.data;
        } catch (error) {
            console.log('Notification API not available, using mock service');
            // Fall back to mock service
            return await mockDataService.createNotification('invoice_created', {
                invoice_id: invoiceData.invoice_id,
                receiver_id: receiverId,
                message: `New invoice ${invoiceData.invoice_number} has been created${invoiceData.task_title ? ` for "${invoiceData.task_title}"` : ''}`
            });
        }
    }

    // Send notification for invoice payment
    static async notifyInvoicePayment(invoiceData, engineerId) {
        try {
            const response = await axiosInstance.post('/user/notifications/invoice-paid', {
                invoice_id: invoiceData.invoice_id,
                receiver_id: engineerId,
                invoice_number: invoiceData.invoice_number,
                amount: invoiceData.total_amount,
                task_title: invoiceData.task_title,
                message: `Invoice ${invoiceData.invoice_number} has been paid${invoiceData.task_title ? ` for "${invoiceData.task_title}"` : ''}. You can now start working on the project.`
            });
            
            return response.data;
        } catch (error) {
            console.error('Error sending payment notification:', error);
            return false;
        }
    }

    // Send notification for task completion
    static async notifyTaskCompletion(taskData, clientId) {
        try {
            const response = await axiosInstance.post('/user/notifications/task-completed', {
                task_id: taskData.id,
                receiver_id: clientId,
                invoice_id: taskData.invoice_id,
                task_title: taskData.invoice?.task_title,
                message: `Task "${taskData.invoice?.task_title || 'Project'}" has been completed and is ready for your review.`
            });
            
            return response.data;
        } catch (error) {
            console.error('Error sending task completion notification:', error);
            return false;
        }
    }

    // Send notification for task confirmation
    static async notifyTaskConfirmation(taskData, engineerId, confirmed, feedback = null) {
        try {
            const message = confirmed 
                ? `Task "${taskData.invoice?.task_title || 'Project'}" has been confirmed as complete!`
                : `Task "${taskData.invoice?.task_title || 'Project'}" needs revision. Please check the feedback.`;

            const response = await axiosInstance.post('/user/notifications/task-confirmed', {
                task_id: taskData.id,
                receiver_id: engineerId,
                confirmed,
                feedback,
                task_title: taskData.invoice?.task_title,
                message
            });
            
            return response.data;
        } catch (error) {
            console.error('Error sending task confirmation notification:', error);
            return false;
        }
    }

    // Send notification for new chat message
    static async notifyNewMessage(messageData, receiverId) {
        try {
            const response = await axiosInstance.post('/user/notifications/new-message', {
                message_id: messageData.id,
                receiver_id: receiverId,
                sender_name: messageData.sender?.business_name || `${messageData.sender?.first_name} ${messageData.sender?.last_name}`,
                message_preview: messageData.message?.substring(0, 100) || 'New message',
                message: `New message from ${messageData.sender?.business_name || messageData.sender?.first_name}`
            });
            
            return response.data;
        } catch (error) {
            console.error('Error sending message notification:', error);
            return false;
        }
    }

    // Get notification preferences for user
    static async getNotificationPreferences() {
        try {
            const response = await axiosInstance.get('/user/notifications/preferences');
            return response.data.data || {};
        } catch (error) {
            console.error('Error fetching notification preferences:', error);
            return {};
        }
    }

    // Update notification preferences
    static async updateNotificationPreferences(preferences) {
        try {
            const response = await axiosInstance.post('/user/notifications/preferences', preferences);
            return response.data;
        } catch (error) {
            console.error('Error updating notification preferences:', error);
            return false;
        }
    }

    // Mark notification as read
    static async markAsRead(notificationId) {
        try {
            const response = await axiosInstance.post(`/user/notifications/${notificationId}/read`);
            return response.data;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            return false;
        }
    }

    // Get unread notification count
    static async getUnreadCount() {
        try {
            const response = await axiosInstance.get('/user/notifications/unread-count');
            return response.data.count || 0;
        } catch (error) {
            console.error('Error fetching unread count:', error);
            return 0;
        }
    }

    // Real-time notification handler (for WebSocket or polling)
    static handleRealTimeNotification(notification) {
        // Show toast notification
        const toastOptions = {
            duration: 5000,
            position: 'top-right',
        };

        switch (notification.type) {
            case 'invoice_created':
                toast.success(notification.message, toastOptions);
                break;
            case 'invoice_paid':
                toast.success(notification.message, toastOptions);
                break;
            case 'task_completed':
                toast.info(notification.message, toastOptions);
                break;
            case 'task_confirmed':
                if (notification.data?.confirmed) {
                    toast.success(notification.message, toastOptions);
                } else {
                    toast.error(notification.message, toastOptions);
                }
                break;
            case 'new_message':
                toast(notification.message, {
                    ...toastOptions,
                    icon: '💬',
                });
                break;
            default:
                toast(notification.message, toastOptions);
        }

        // Update notification count in UI
        this.updateNotificationCount();
    }

    // Update notification count in header
    static updateNotificationCount() {
        this.getUnreadCount().then(count => {
            // Update notification badge in header
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.textContent = count;
                badge.style.display = count > 0 ? 'inline' : 'none';
            }
        });
    }

    // Initialize notification polling (fallback for real-time)
    static startNotificationPolling(interval = 30000) {
        return setInterval(() => {
            this.updateNotificationCount();
        }, interval);
    }

    // Stop notification polling
    static stopNotificationPolling(intervalId) {
        if (intervalId) {
            clearInterval(intervalId);
        }
    }
}

export default NotificationService;
