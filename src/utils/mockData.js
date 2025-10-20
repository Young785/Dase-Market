// Mock data service for development
// This will be replaced with real API calls once backend routes are implemented

class MockDataService {
    constructor() {
        this.tasks = [
            {
                id: 1,
                status: 'pending',
                completion_message: 'Project completed successfully. All requirements have been met.',
                created_at: '2024-01-15T10:30:00Z',
                invoice: {
                    invoice_id: 'INV-001',
                    invoice_number: 'INV-20240115-ABC1',
                    task_title: 'Website Redesign',
                    task_description: 'Complete redesign of company website with modern UI/UX',
                    total_amount: '2500.00'
                },
                engineer: {
                    account_id: 'ENG-001',
                    first_name: 'John',
                    last_name: 'Doe',
                    business_name: 'WebDev Solutions'
                },
                client: {
                    account_id: 'CLI-001',
                    first_name: 'Jane',
                    last_name: 'Smith',
                    business_name: 'Tech Startup Inc'
                },
                files: [
                    {
                        id: 1,
                        original_name: 'website_final.zip',
                        size: 15728640
                    }
                ]
            },
            {
                id: 2,
                status: 'confirmed',
                completion_message: 'Mobile app development completed with all requested features.',
                created_at: '2024-01-10T14:20:00Z',
                client_feedback: 'Excellent work! Very satisfied with the results.',
                rating: 5,
                invoice: {
                    invoice_id: 'INV-002',
                    invoice_number: 'INV-20240110-XYZ2',
                    task_title: 'Mobile App Development',
                    task_description: 'React Native mobile app for iOS and Android',
                    total_amount: '4500.00'
                },
                engineer: {
                    account_id: 'ENG-002',
                    first_name: 'Alice',
                    last_name: 'Johnson',
                    business_name: 'Mobile Solutions Pro'
                },
                client: {
                    account_id: 'CLI-002',
                    first_name: 'Bob',
                    last_name: 'Wilson',
                    business_name: 'Retail Chain Co'
                }
            }
        ];

        this.notifications = [
            {
                id: 1,
                type: 'task_completed',
                title: 'Task Completed',
                message: 'Website Redesign task has been completed and is ready for review.',
                read_at: null,
                created_at: '2024-01-15T10:30:00Z',
                data: {
                    task_id: 1,
                    invoice_id: 'INV-001'
                }
            },
            {
                id: 2,
                type: 'invoice_paid',
                title: 'Payment Received',
                message: 'Invoice INV-20240110-XYZ2 has been paid.',
                read_at: '2024-01-11T09:15:00Z',
                created_at: '2024-01-10T16:45:00Z',
                data: {
                    invoice_id: 'INV-002'
                }
            }
        ];
    }

    // Task methods
    async getTasks(type = 'active', filters = {}) {
        let filteredTasks = [...this.tasks];

        // Filter by type
        switch (type) {
            case 'active':
                filteredTasks = filteredTasks.filter(task => 
                    ['pending', 'in_progress'].includes(task.status)
                );
                break;
            case 'completed':
                filteredTasks = filteredTasks.filter(task => 
                    task.status === 'confirmed'
                );
                break;
            case 'pending-confirmation':
                filteredTasks = filteredTasks.filter(task => 
                    task.status === 'pending'
                );
                break;
        }

        // Apply filters
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filteredTasks = filteredTasks.filter(task =>
                task.invoice?.task_title?.toLowerCase().includes(searchLower) ||
                task.invoice?.invoice_number?.toLowerCase().includes(searchLower)
            );
        }

        if (filters.status && filters.status !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.status === filters.status);
        }

        return {
            status: true,
            data: {
                tasks: filteredTasks
            }
        };
    }

    async getTask(taskId) {
        const task = this.tasks.find(t => t.id === parseInt(taskId));
        if (task) {
            return {
                status: true,
                data: task
            };
        }
        return {
            status: false,
            message: 'Task not found'
        };
    }

    async completeTask(data) {
        // Simulate task completion
        const newTask = {
            id: this.tasks.length + 1,
            status: 'pending',
            completion_message: data.completion_message,
            created_at: new Date().toISOString(),
            invoice: {
                invoice_id: data.invoice_id,
                invoice_number: `INV-${Date.now()}`,
                task_title: 'New Task',
                total_amount: '1000.00'
            }
        };

        this.tasks.push(newTask);

        return {
            status: true,
            data: newTask,
            message: 'Task completion submitted successfully'
        };
    }

    async confirmTask(taskId, confirmed, feedback = null, rating = null) {
        const taskIndex = this.tasks.findIndex(t => t.id === parseInt(taskId));
        if (taskIndex !== -1) {
            this.tasks[taskIndex].status = confirmed ? 'confirmed' : 'rejected';
            if (confirmed && feedback) {
                this.tasks[taskIndex].client_feedback = feedback;
            }
            if (confirmed && rating) {
                this.tasks[taskIndex].rating = rating;
            }

            return {
                status: true,
                message: confirmed ? 'Task confirmed successfully' : 'Task completion rejected'
            };
        }

        return {
            status: false,
            message: 'Task not found'
        };
    }

    // Notification methods
    async getNotifications() {
        return {
            status: true,
            data: {
                items: this.notifications,
                meta: {
                    current_page: 1,
                    last_page: 1,
                    per_page: 10,
                    total: this.notifications.length
                },
                stats: {
                    total: this.notifications.length,
                    unread: this.notifications.filter(n => !n.read_at).length,
                    read: this.notifications.filter(n => n.read_at).length
                }
            }
        };
    }

    async getUnreadCount() {
        return {
            status: true,
            count: this.notifications.filter(n => !n.read_at).length
        };
    }

    async markNotificationAsRead(notificationId) {
        const notificationIndex = this.notifications.findIndex(n => n.id === parseInt(notificationId));
        if (notificationIndex !== -1) {
            this.notifications[notificationIndex].read_at = new Date().toISOString();
            return {
                status: true,
                message: 'Notification marked as read'
            };
        }

        return {
            status: false,
            message: 'Notification not found'
        };
    }

    async markAllNotificationsAsRead() {
        this.notifications.forEach(notification => {
            if (!notification.read_at) {
                notification.read_at = new Date().toISOString();
            }
        });

        return {
            status: true,
            message: 'All notifications marked as read'
        };
    }

    // Notification creation methods (for internal use)
    async createNotification(type, data) {
        const newNotification = {
            id: this.notifications.length + 1,
            type,
            title: this.getNotificationTitle(type),
            message: data.message,
            read_at: null,
            created_at: new Date().toISOString(),
            data: data
        };

        this.notifications.unshift(newNotification);
        return {
            status: true,
            data: newNotification
        };
    }

    getNotificationTitle(type) {
        const titles = {
            'invoice_created': 'New Invoice',
            'invoice_paid': 'Payment Received',
            'task_completed': 'Task Completed',
            'task_confirmed': 'Task Confirmed',
            'new_message': 'New Message'
        };
        return titles[type] || 'Notification';
    }
}

// Create singleton instance
const mockDataService = new MockDataService();

export default mockDataService;
