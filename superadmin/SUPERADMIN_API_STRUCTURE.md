# Superadmin API Structure & Database Schema

## 🎯 Overview

This document outlines the complete API structure and database requirements for the Superadmin Portal.

---

## 🔐 Authentication & Authorization

### Authentication Endpoints

```
POST   /api/v1/superadmin/auth/login
POST   /api/v1/superadmin/auth/logout
POST   /api/v1/superadmin/auth/refresh-token
POST   /api/v1/superadmin/auth/verify-2fa
POST   /api/v1/superadmin/auth/resend-2fa
GET    /api/v1/superadmin/auth/profile
PUT    /api/v1/superadmin/auth/profile
POST   /api/v1/superadmin/auth/change-password
```

### Middleware Stack
```php
Route::middleware(['auth:superadmin', 'superadmin.2fa', 'superadmin.audit'])
```

---

## 📊 API Endpoint Structure

### 1. Dashboard & Analytics

```
# Dashboard
GET    /api/v1/superadmin/dashboard
GET    /api/v1/superadmin/dashboard/stats
GET    /api/v1/superadmin/dashboard/activity-feed
GET    /api/v1/superadmin/dashboard/alerts

# Analytics
GET    /api/v1/superadmin/analytics/users
GET    /api/v1/superadmin/analytics/content
GET    /api/v1/superadmin/analytics/financial
GET    /api/v1/superadmin/analytics/platform
GET    /api/v1/superadmin/analytics/charts/revenue
GET    /api/v1/superadmin/analytics/charts/users
GET    /api/v1/superadmin/analytics/charts/engagement

# KPIs
GET    /api/v1/superadmin/kpis
GET    /api/v1/superadmin/kpis/export
```

---

### 2. User Management

```
# All Users
GET    /api/v1/superadmin/users
GET    /api/v1/superadmin/users/search
GET    /api/v1/superadmin/users/{id}
PUT    /api/v1/superadmin/users/{id}
DELETE /api/v1/superadmin/users/{id}
POST   /api/v1/superadmin/users/bulk-action
GET    /api/v1/superadmin/users/export

# User Actions
POST   /api/v1/superadmin/users/{id}/suspend
POST   /api/v1/superadmin/users/{id}/unsuspend
POST   /api/v1/superadmin/users/{id}/ban
POST   /api/v1/superadmin/users/{id}/unban
POST   /api/v1/superadmin/users/{id}/verify
POST   /api/v1/superadmin/users/{id}/reset-password
POST   /api/v1/superadmin/users/{id}/disable-2fa
POST   /api/v1/superadmin/users/{id}/impersonate
GET    /api/v1/superadmin/users/{id}/activity-log
GET    /api/v1/superadmin/users/{id}/audit-log
GET    /api/v1/superadmin/users/{id}/login-history
GET    /api/v1/superadmin/users/{id}/devices

# Streamers
GET    /api/v1/superadmin/users/streamers
GET    /api/v1/superadmin/users/streamers/{id}
GET    /api/v1/superadmin/users/streamers/{id}/channels
GET    /api/v1/superadmin/users/streamers/{id}/content
GET    /api/v1/superadmin/users/streamers/{id}/analytics
POST   /api/v1/superadmin/users/streamers/{id}/feature
POST   /api/v1/superadmin/users/streamers/{id}/verify-channel

# Engineers
GET    /api/v1/superadmin/users/engineers
GET    /api/v1/superadmin/users/engineers/{id}
GET    /api/v1/superadmin/users/engineers/{id}/projects
GET    /api/v1/superadmin/users/engineers/{id}/samples
GET    /api/v1/superadmin/users/engineers/{id}/ratings
GET    /api/v1/superadmin/users/engineers/{id}/earnings
POST   /api/v1/superadmin/users/engineers/{id}/verify-credentials
POST   /api/v1/superadmin/users/engineers/{id}/feature

# Clients
GET    /api/v1/superadmin/users/clients
GET    /api/v1/superadmin/users/clients/{id}
GET    /api/v1/superadmin/users/clients/{id}/projects
GET    /api/v1/superadmin/users/clients/{id}/transactions
GET    /api/v1/superadmin/users/clients/{id}/invoices

# Admins
GET    /api/v1/superadmin/users/admins
POST   /api/v1/superadmin/users/admins
GET    /api/v1/superadmin/users/admins/{id}
PUT    /api/v1/superadmin/users/admins/{id}
DELETE /api/v1/superadmin/users/admins/{id}
GET    /api/v1/superadmin/users/admins/{id}/actions
```

---

### 3. Content Management

```
# Content Overview
GET    /api/v1/superadmin/content/overview
GET    /api/v1/superadmin/content/stats

# Streaming Content - Posts
GET    /api/v1/superadmin/content/posts
GET    /api/v1/superadmin/content/posts/search
GET    /api/v1/superadmin/content/posts/{id}
PUT    /api/v1/superadmin/content/posts/{id}
DELETE /api/v1/superadmin/content/posts/{id}
POST   /api/v1/superadmin/content/posts/{id}/feature
POST   /api/v1/superadmin/content/posts/{id}/hide
GET    /api/v1/superadmin/content/posts/{id}/comments
DELETE /api/v1/superadmin/content/posts/{id}/comments/{commentId}

# Streaming Content - Shorts
GET    /api/v1/superadmin/content/shorts
GET    /api/v1/superadmin/content/shorts/{id}
PUT    /api/v1/superadmin/content/shorts/{id}
DELETE /api/v1/superadmin/content/shorts/{id}
POST   /api/v1/superadmin/content/shorts/{id}/feature
POST   /api/v1/superadmin/content/shorts/{id}/hide

# Streaming Content - Channels
GET    /api/v1/superadmin/content/channels
GET    /api/v1/superadmin/content/channels/{id}
PUT    /api/v1/superadmin/content/channels/{id}
DELETE /api/v1/superadmin/content/channels/{id}
POST   /api/v1/superadmin/content/channels/{id}/suspend
POST   /api/v1/superadmin/content/channels/{id}/verify

# DASE Content - Projects
GET    /api/v1/superadmin/content/projects
GET    /api/v1/superadmin/content/projects/{id}
PUT    /api/v1/superadmin/content/projects/{id}
DELETE /api/v1/superadmin/content/projects/{id}
GET    /api/v1/superadmin/content/projects/{id}/files
GET    /api/v1/superadmin/content/projects/{id}/reviews

# DASE Content - Samples
GET    /api/v1/superadmin/content/samples
GET    /api/v1/superadmin/content/samples/{id}
PUT    /api/v1/superadmin/content/samples/{id}
DELETE /api/v1/superadmin/content/samples/{id}
POST   /api/v1/superadmin/content/samples/{id}/feature
GET    /api/v1/superadmin/content/samples/{id}/analytics

# Moderation Queue
GET    /api/v1/superadmin/moderation/queue
GET    /api/v1/superadmin/moderation/queue/pending
POST   /api/v1/superadmin/moderation/{id}/approve
POST   /api/v1/superadmin/moderation/{id}/reject
POST   /api/v1/superadmin/moderation/{id}/flag
POST   /api/v1/superadmin/moderation/bulk-action

# Categories & Languages
GET    /api/v1/superadmin/content/categories
POST   /api/v1/superadmin/content/categories
PUT    /api/v1/superadmin/content/categories/{id}
DELETE /api/v1/superadmin/content/categories/{id}
GET    /api/v1/superadmin/content/languages
POST   /api/v1/superadmin/content/languages
PUT    /api/v1/superadmin/content/languages/{id}
DELETE /api/v1/superadmin/content/languages/{id}
```

---

### 4. Financial Management

```
# Financial Dashboard
GET    /api/v1/superadmin/finance/dashboard
GET    /api/v1/superadmin/finance/stats
GET    /api/v1/superadmin/finance/charts/revenue
GET    /api/v1/superadmin/finance/charts/transactions

# Transactions
GET    /api/v1/superadmin/finance/transactions
GET    /api/v1/superadmin/finance/transactions/search
GET    /api/v1/superadmin/finance/transactions/{id}
POST   /api/v1/superadmin/finance/transactions/{id}/refund
POST   /api/v1/superadmin/finance/transactions/{id}/cancel
POST   /api/v1/superadmin/finance/transactions/{id}/retry
GET    /api/v1/superadmin/finance/transactions/export

# Invoices
GET    /api/v1/superadmin/finance/invoices
GET    /api/v1/superadmin/finance/invoices/{id}
PUT    /api/v1/superadmin/finance/invoices/{id}
POST   /api/v1/superadmin/finance/invoices/{id}/mark-paid
POST   /api/v1/superadmin/finance/invoices/{id}/cancel
POST   /api/v1/superadmin/finance/invoices/{id}/send-reminder
GET    /api/v1/superadmin/finance/invoices/{id}/download

# Payments & Payouts
GET    /api/v1/superadmin/finance/payments
GET    /api/v1/superadmin/finance/payouts
POST   /api/v1/superadmin/finance/payouts/process
POST   /api/v1/superadmin/finance/payouts/batch
GET    /api/v1/superadmin/finance/payment-methods

# Revenue Management
GET    /api/v1/superadmin/finance/revenue
GET    /api/v1/superadmin/finance/revenue/breakdown
PUT    /api/v1/superadmin/finance/settings/fees
GET    /api/v1/superadmin/finance/settings/fees

# Refunds & Disputes
GET    /api/v1/superadmin/finance/refunds
GET    /api/v1/superadmin/finance/refunds/{id}
POST   /api/v1/superadmin/finance/refunds/{id}/approve
POST   /api/v1/superadmin/finance/refunds/{id}/reject
GET    /api/v1/superadmin/finance/disputes
GET    /api/v1/superadmin/finance/disputes/{id}
POST   /api/v1/superadmin/finance/disputes/{id}/resolve
POST   /api/v1/superadmin/finance/disputes/{id}/escalate

# Advertising
GET    /api/v1/superadmin/finance/advertising
GET    /api/v1/superadmin/finance/advertising/{id}
POST   /api/v1/superadmin/finance/advertising/{id}/approve
POST   /api/v1/superadmin/finance/advertising/{id}/reject
POST   /api/v1/superadmin/finance/advertising/{id}/pause
GET    /api/v1/superadmin/finance/advertising/{id}/analytics
```

---

### 5. System Configuration

```
# Platform Settings
GET    /api/v1/superadmin/settings/platform
PUT    /api/v1/superadmin/settings/platform
GET    /api/v1/superadmin/settings/features
PUT    /api/v1/superadmin/settings/features/{feature}

# Email Configuration
GET    /api/v1/superadmin/settings/email
PUT    /api/v1/superadmin/settings/email
GET    /api/v1/superadmin/settings/email/templates
PUT    /api/v1/superadmin/settings/email/templates/{id}
POST   /api/v1/superadmin/settings/email/test

# Payment Gateway
GET    /api/v1/superadmin/settings/payment-gateways
PUT    /api/v1/superadmin/settings/payment-gateways/{gateway}
POST   /api/v1/superadmin/settings/payment-gateways/{gateway}/test

# Storage & Media
GET    /api/v1/superadmin/settings/storage
PUT    /api/v1/superadmin/settings/storage
GET    /api/v1/superadmin/settings/storage/usage

# Notifications
GET    /api/v1/superadmin/settings/notifications
PUT    /api/v1/superadmin/settings/notifications
GET    /api/v1/superadmin/settings/notifications/templates
PUT    /api/v1/superadmin/settings/notifications/templates/{id}

# API & Integration
GET    /api/v1/superadmin/settings/api
POST   /api/v1/superadmin/settings/api/keys
DELETE /api/v1/superadmin/settings/api/keys/{id}
GET    /api/v1/superadmin/settings/webhooks
POST   /api/v1/superadmin/settings/webhooks
PUT    /api/v1/superadmin/settings/webhooks/{id}
DELETE /api/v1/superadmin/settings/webhooks/{id}

# Security Settings
GET    /api/v1/superadmin/settings/security
PUT    /api/v1/superadmin/settings/security
PUT    /api/v1/superadmin/settings/security/password-policy
PUT    /api/v1/superadmin/settings/security/session
GET    /api/v1/superadmin/settings/security/ip-whitelist
POST   /api/v1/superadmin/settings/security/ip-whitelist
DELETE /api/v1/superadmin/settings/security/ip-whitelist/{id}
```

---

### 6. Security & Compliance

```
# Activity Logs
GET    /api/v1/superadmin/security/activity-logs
GET    /api/v1/superadmin/security/activity-logs/search
GET    /api/v1/superadmin/security/activity-logs/export
GET    /api/v1/superadmin/security/activity-logs/stats

# Audit Logs
GET    /api/v1/superadmin/security/audit-logs
GET    /api/v1/superadmin/security/audit-logs/search
GET    /api/v1/superadmin/security/audit-logs/export
GET    /api/v1/superadmin/security/audit-logs/{id}

# Reports Management
GET    /api/v1/superadmin/security/reports
GET    /api/v1/superadmin/security/reports/pending
GET    /api/v1/superadmin/security/reports/{id}
POST   /api/v1/superadmin/security/reports/{id}/investigate
POST   /api/v1/superadmin/security/reports/{id}/resolve
POST   /api/v1/superadmin/security/reports/{id}/dismiss
POST   /api/v1/superadmin/security/reports/{id}/escalate

# Banned & Suspended Users
GET    /api/v1/superadmin/security/banned-users
GET    /api/v1/superadmin/security/suspended-users
GET    /api/v1/superadmin/security/bans/{id}/appeals
POST   /api/v1/superadmin/security/bans/{id}/appeal/approve
POST   /api/v1/superadmin/security/bans/{id}/appeal/reject

# Security Incidents
GET    /api/v1/superadmin/security/incidents
POST   /api/v1/superadmin/security/incidents
GET    /api/v1/superadmin/security/incidents/{id}
PUT    /api/v1/superadmin/security/incidents/{id}
POST   /api/v1/superadmin/security/incidents/{id}/resolve
```

---

### 7. Communication & Support

```
# Mass Communication
POST   /api/v1/superadmin/communication/broadcast/email
POST   /api/v1/superadmin/communication/broadcast/push
POST   /api/v1/superadmin/communication/broadcast/announcement
GET    /api/v1/superadmin/communication/campaigns
GET    /api/v1/superadmin/communication/campaigns/{id}
POST   /api/v1/superadmin/communication/campaigns
PUT    /api/v1/superadmin/communication/campaigns/{id}
DELETE /api/v1/superadmin/communication/campaigns/{id}
GET    /api/v1/superadmin/communication/campaigns/{id}/analytics

# Support Tickets
GET    /api/v1/superadmin/support/tickets
GET    /api/v1/superadmin/support/tickets/{id}
POST   /api/v1/superadmin/support/tickets/{id}/reply
POST   /api/v1/superadmin/support/tickets/{id}/assign
POST   /api/v1/superadmin/support/tickets/{id}/escalate
POST   /api/v1/superadmin/support/tickets/{id}/close
PUT    /api/v1/superadmin/support/tickets/{id}/priority

# Announcements
GET    /api/v1/superadmin/communication/announcements
POST   /api/v1/superadmin/communication/announcements
GET    /api/v1/superadmin/communication/announcements/{id}
PUT    /api/v1/superadmin/communication/announcements/{id}
DELETE /api/v1/superadmin/communication/announcements/{id}
```

---

### 8. Reporting & Exports

```
# Report Generator
GET    /api/v1/superadmin/reports/templates
POST   /api/v1/superadmin/reports/generate
GET    /api/v1/superadmin/reports/{id}
GET    /api/v1/superadmin/reports/{id}/download
POST   /api/v1/superadmin/reports/schedule
GET    /api/v1/superadmin/reports/scheduled

# Data Exports
POST   /api/v1/superadmin/exports/users
POST   /api/v1/superadmin/exports/transactions
POST   /api/v1/superadmin/exports/content
POST   /api/v1/superadmin/exports/compliance
GET    /api/v1/superadmin/exports/{id}/status
GET    /api/v1/superadmin/exports/{id}/download
```

---

### 9. Access Control

```
# Roles
GET    /api/v1/superadmin/access/roles
POST   /api/v1/superadmin/access/roles
GET    /api/v1/superadmin/access/roles/{id}
PUT    /api/v1/superadmin/access/roles/{id}
DELETE /api/v1/superadmin/access/roles/{id}

# Permissions
GET    /api/v1/superadmin/access/permissions
POST   /api/v1/superadmin/access/permissions
GET    /api/v1/superadmin/access/permissions/{id}
PUT    /api/v1/superadmin/access/permissions/{id}
DELETE /api/v1/superadmin/access/permissions/{id}

# Role Assignments
POST   /api/v1/superadmin/access/users/{id}/assign-role
POST   /api/v1/superadmin/access/users/{id}/revoke-role
GET    /api/v1/superadmin/access/users/{id}/permissions
```

---

### 10. System Management

```
# Task Scheduler
GET    /api/v1/superadmin/system/scheduler/tasks
POST   /api/v1/superadmin/system/scheduler/tasks
GET    /api/v1/superadmin/system/scheduler/tasks/{id}
PUT    /api/v1/superadmin/system/scheduler/tasks/{id}
DELETE /api/v1/superadmin/system/scheduler/tasks/{id}
POST   /api/v1/superadmin/system/scheduler/tasks/{id}/run
GET    /api/v1/superadmin/system/scheduler/history

# Cache Management
GET    /api/v1/superadmin/system/cache/stats
POST   /api/v1/superadmin/system/cache/clear
POST   /api/v1/superadmin/system/cache/clear-routes
POST   /api/v1/superadmin/system/cache/clear-config
POST   /api/v1/superadmin/system/cache/clear-views

# Queue Management
GET    /api/v1/superadmin/system/queues
GET    /api/v1/superadmin/system/queues/failed
POST   /api/v1/superadmin/system/queues/{id}/retry
DELETE /api/v1/superadmin/system/queues/{id}
POST   /api/v1/superadmin/system/queues/retry-all
DELETE /api/v1/superadmin/system/queues/flush

# Database Management
POST   /api/v1/superadmin/system/database/backup
GET    /api/v1/superadmin/system/database/backups
POST   /api/v1/superadmin/system/database/restore
POST   /api/v1/superadmin/system/database/optimize
GET    /api/v1/superadmin/system/database/stats
```

---

### 11. Performance Monitoring

```
# System Health
GET    /api/v1/superadmin/monitoring/health
GET    /api/v1/superadmin/monitoring/health/server
GET    /api/v1/superadmin/monitoring/health/database
GET    /api/v1/superadmin/monitoring/health/redis
GET    /api/v1/superadmin/monitoring/health/storage

# Error Tracking
GET    /api/v1/superadmin/monitoring/errors
GET    /api/v1/superadmin/monitoring/errors/{id}
POST   /api/v1/superadmin/monitoring/errors/{id}/resolve
GET    /api/v1/superadmin/monitoring/errors/stats

# Performance Analytics
GET    /api/v1/superadmin/monitoring/performance
GET    /api/v1/superadmin/monitoring/performance/endpoints
GET    /api/v1/superadmin/monitoring/performance/queries
GET    /api/v1/superadmin/monitoring/performance/slow-queries
```

---

## 🗄️ Database Schema

### New Tables Required

#### 1. superadmin_users
```sql
CREATE TABLE superadmin_users (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    account_id VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role_id BIGINT UNSIGNED,
    status ENUM('active', 'suspended', 'banned') DEFAULT 'active',
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    google2fa_secret VARCHAR(255),
    last_login TIMESTAMP NULL,
    last_login_ip VARCHAR(45),
    email_verified_at TIMESTAMP NULL,
    remember_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (role_id) REFERENCES superadmin_roles(id),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_role (role_id)
);
```

#### 2. superadmin_roles
```sql
CREATE TABLE superadmin_roles (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description TEXT,
    level INT DEFAULT 0, -- hierarchy level
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_name (name),
    INDEX idx_level (level)
);
```

#### 3. superadmin_permissions
```sql
CREATE TABLE superadmin_permissions (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description TEXT,
    module VARCHAR(100), -- dashboard, users, content, finance, etc.
    action VARCHAR(100), -- view, create, update, delete, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_module (module),
    INDEX idx_name (name)
);
```

#### 4. superadmin_role_permissions
```sql
CREATE TABLE superadmin_role_permissions (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    role_id BIGINT UNSIGNED NOT NULL,
    permission_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (role_id) REFERENCES superadmin_roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES superadmin_permissions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_role_permission (role_id, permission_id),
    INDEX idx_role (role_id),
    INDEX idx_permission (permission_id)
);
```

#### 5. superadmin_activity_logs
```sql
CREATE TABLE superadmin_activity_logs (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    superadmin_id BIGINT UNSIGNED NOT NULL,
    action VARCHAR(255) NOT NULL,
    module VARCHAR(100),
    description TEXT,
    target_type VARCHAR(255), -- User, Post, Transaction, etc.
    target_id VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    request_data JSON,
    response_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (superadmin_id) REFERENCES superadmin_users(id),
    INDEX idx_superadmin (superadmin_id),
    INDEX idx_created (created_at),
    INDEX idx_module (module),
    INDEX idx_target (target_type, target_id)
);
```

#### 6. platform_configurations
```sql
CREATE TABLE platform_configurations (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    type ENUM('string', 'number', 'boolean', 'json', 'array') DEFAULT 'string',
    category VARCHAR(100), -- general, email, payment, storage, etc.
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- can be accessed by frontend
    is_sensitive BOOLEAN DEFAULT FALSE, -- contains sensitive data
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_key (key),
    INDEX idx_category (category)
);
```

#### 7. scheduled_tasks
```sql
CREATE TABLE scheduled_tasks (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    command VARCHAR(500) NOT NULL,
    frequency VARCHAR(100) NOT NULL, -- cron expression
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_run TIMESTAMP NULL,
    last_status ENUM('success', 'failed', 'running') NULL,
    last_output TEXT NULL,
    next_run TIMESTAMP NULL,
    created_by BIGINT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES superadmin_users(id),
    INDEX idx_name (name),
    INDEX idx_active (is_active),
    INDEX idx_next_run (next_run)
);
```

#### 8. support_tickets
```sql
CREATE TABLE support_tickets (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    user_type ENUM('streamer', 'engineer', 'client') NOT NULL,
    subject VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100), -- technical, billing, account, content, etc.
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('open', 'in_progress', 'waiting_response', 'resolved', 'closed') DEFAULT 'open',
    assigned_to BIGINT UNSIGNED NULL,
    resolved_at TIMESTAMP NULL,
    resolved_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (assigned_to) REFERENCES superadmin_users(id),
    FOREIGN KEY (resolved_by) REFERENCES superadmin_users(id),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_assigned (assigned_to),
    INDEX idx_created (created_at)
);
```

#### 9. support_ticket_replies
```sql
CREATE TABLE support_ticket_replies (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ticket_id BIGINT UNSIGNED NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    user_type ENUM('user', 'superadmin') NOT NULL,
    message TEXT NOT NULL,
    attachments JSON,
    is_internal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
    INDEX idx_ticket (ticket_id),
    INDEX idx_created (created_at)
);
```

#### 10. disputes
```sql
CREATE TABLE disputes (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    dispute_number VARCHAR(50) UNIQUE NOT NULL,
    type ENUM('payment', 'project', 'content', 'service') NOT NULL,
    related_type VARCHAR(100), -- Transaction, Project, Invoice, etc.
    related_id VARCHAR(255),
    complainant_id VARCHAR(255) NOT NULL,
    respondent_id VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('open', 'investigating', 'mediation', 'resolved', 'closed') DEFAULT 'open',
    resolution TEXT NULL,
    resolved_by BIGINT UNSIGNED NULL,
    resolved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (resolved_by) REFERENCES superadmin_users(id),
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_complainant (complainant_id),
    INDEX idx_respondent (respondent_id),
    INDEX idx_created (created_at)
);
```

#### 11. dispute_evidence
```sql
CREATE TABLE dispute_evidence (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    dispute_id BIGINT UNSIGNED NOT NULL,
    submitted_by VARCHAR(255) NOT NULL,
    user_type ENUM('complainant', 'respondent', 'superadmin') NOT NULL,
    description TEXT,
    file_path VARCHAR(500),
    file_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (dispute_id) REFERENCES disputes(id) ON DELETE CASCADE,
    INDEX idx_dispute (dispute_id),
    INDEX idx_submitted_by (submitted_by)
);
```

#### 12. announcements
```sql
CREATE TABLE announcements (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    type ENUM('info', 'warning', 'success', 'danger') DEFAULT 'info',
    target_audience ENUM('all', 'streamers', 'engineers', 'clients', 'specific') DEFAULT 'all',
    target_users JSON NULL, -- array of user IDs if specific
    display_location ENUM('dashboard', 'popup', 'banner') DEFAULT 'dashboard',
    is_active BOOLEAN DEFAULT TRUE,
    start_date TIMESTAMP NULL,
    end_date TIMESTAMP NULL,
    priority INT DEFAULT 0,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES superadmin_users(id),
    INDEX idx_active (is_active),
    INDEX idx_target (target_audience),
    INDEX idx_dates (start_date, end_date)
);
```

#### 13. moderation_queue
```sql
CREATE TABLE moderation_queue (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    content_type ENUM('post', 'short', 'project', 'sample', 'comment', 'profile') NOT NULL,
    content_id BIGINT UNSIGNED NOT NULL,
    reported_by VARCHAR(255) NOT NULL,
    reason ENUM('spam', 'harassment', 'inappropriate', 'copyright', 'fraud', 'other') NOT NULL,
    description TEXT,
    evidence JSON, -- screenshots, links, etc.
    status ENUM('pending', 'reviewing', 'approved', 'rejected', 'flagged') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    assigned_to BIGINT UNSIGNED NULL,
    reviewed_by BIGINT UNSIGNED NULL,
    reviewed_at TIMESTAMP NULL,
    notes TEXT NULL,
    action_taken VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (assigned_to) REFERENCES superadmin_users(id),
    FOREIGN KEY (reviewed_by) REFERENCES superadmin_users(id),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_content (content_type, content_id),
    INDEX idx_assigned (assigned_to),
    INDEX idx_created (created_at)
);
```

#### 14. security_incidents
```sql
CREATE TABLE security_incidents (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    incident_number VARCHAR(50) UNIQUE NOT NULL,
    type ENUM('breach', 'attack', 'unauthorized_access', 'data_leak', 'other') NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    affected_users INT DEFAULT 0,
    affected_data TEXT,
    status ENUM('detected', 'investigating', 'contained', 'resolved', 'closed') DEFAULT 'detected',
    detected_at TIMESTAMP NOT NULL,
    detected_by BIGINT UNSIGNED,
    resolved_at TIMESTAMP NULL,
    resolution TEXT NULL,
    post_incident_report TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (detected_by) REFERENCES superadmin_users(id),
    INDEX idx_type (type),
    INDEX idx_severity (severity),
    INDEX idx_status (status),
    INDEX idx_detected (detected_at)
);
```

#### 15. email_campaigns
```sql
CREATE TABLE email_campaigns (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    target_audience ENUM('all', 'streamers', 'engineers', 'clients', 'custom') NOT NULL,
    target_filter JSON, -- custom filters
    status ENUM('draft', 'scheduled', 'sending', 'sent', 'failed') DEFAULT 'draft',
    scheduled_at TIMESTAMP NULL,
    sent_at TIMESTAMP NULL,
    total_recipients INT DEFAULT 0,
    total_sent INT DEFAULT 0,
    total_opened INT DEFAULT 0,
    total_clicked INT DEFAULT 0,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES superadmin_users(id),
    INDEX idx_status (status),
    INDEX idx_scheduled (scheduled_at),
    INDEX idx_created_by (created_by)
);
```

#### 16. ip_whitelist
```sql
CREATE TABLE ip_whitelist (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ip_address VARCHAR(45) NOT NULL,
    description VARCHAR(500),
    superadmin_id BIGINT UNSIGNED,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (superadmin_id) REFERENCES superadmin_users(id),
    INDEX idx_ip (ip_address),
    INDEX idx_active (is_active)
);
```

#### 17. data_exports
```sql
CREATE TABLE data_exports (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    export_type VARCHAR(100) NOT NULL,
    filters JSON,
    format ENUM('csv', 'excel', 'pdf', 'json') NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    file_path VARCHAR(500) NULL,
    file_size BIGINT NULL,
    total_records INT DEFAULT 0,
    error_message TEXT NULL,
    requested_by BIGINT UNSIGNED NOT NULL,
    completed_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (requested_by) REFERENCES superadmin_users(id),
    INDEX idx_status (status),
    INDEX idx_requested_by (requested_by),
    INDEX idx_created (created_at)
);
```

### Existing Tables to Modify

#### users table
```sql
ALTER TABLE users 
ADD COLUMN suspended_by BIGINT UNSIGNED NULL,
ADD COLUMN suspended_at TIMESTAMP NULL,
ADD COLUMN suspension_reason TEXT NULL,
ADD COLUMN banned_by BIGINT UNSIGNED NULL,
ADD COLUMN banned_at TIMESTAMP NULL,
ADD COLUMN ban_reason TEXT NULL,
ADD COLUMN featured BOOLEAN DEFAULT FALSE,
ADD COLUMN featured_at TIMESTAMP NULL,
ADD INDEX idx_suspended (suspended_at),
ADD INDEX idx_banned (banned_at),
ADD INDEX idx_featured (featured);
```

#### dase_users table
```sql
ALTER TABLE dase_users 
ADD COLUMN suspended_by BIGINT UNSIGNED NULL,
ADD COLUMN suspended_at TIMESTAMP NULL,
ADD COLUMN suspension_reason TEXT NULL,
ADD COLUMN banned_by BIGINT UNSIGNED NULL,
ADD COLUMN banned_at TIMESTAMP NULL,
ADD COLUMN ban_reason TEXT NULL,
ADD COLUMN verified_by BIGINT UNSIGNED NULL,
ADD COLUMN verified_at TIMESTAMP NULL,
ADD COLUMN featured BOOLEAN DEFAULT FALSE,
ADD COLUMN featured_at TIMESTAMP NULL,
ADD INDEX idx_suspended (suspended_at),
ADD INDEX idx_banned (banned_at),
ADD INDEX idx_verified (verified_at),
ADD INDEX idx_featured (featured);
```

#### posts table
```sql
ALTER TABLE posts 
ADD COLUMN moderated_by BIGINT UNSIGNED NULL,
ADD COLUMN moderated_at TIMESTAMP NULL,
ADD COLUMN moderation_status ENUM('pending', 'approved', 'rejected', 'flagged') DEFAULT 'approved',
ADD COLUMN featured BOOLEAN DEFAULT FALSE,
ADD COLUMN featured_at TIMESTAMP NULL,
ADD INDEX idx_moderation (moderation_status),
ADD INDEX idx_featured (featured);
```

#### shorts table
```sql
ALTER TABLE shorts 
ADD COLUMN moderated_by BIGINT UNSIGNED NULL,
ADD COLUMN moderated_at TIMESTAMP NULL,
ADD COLUMN moderation_status ENUM('pending', 'approved', 'rejected', 'flagged') DEFAULT 'approved',
ADD COLUMN featured BOOLEAN DEFAULT FALSE,
ADD COLUMN featured_at TIMESTAMP NULL,
ADD INDEX idx_moderation (moderation_status),
ADD INDEX idx_featured (featured);
```

#### samples table
```sql
ALTER TABLE samples 
ADD COLUMN moderated_by BIGINT UNSIGNED NULL,
ADD COLUMN moderated_at TIMESTAMP NULL,
ADD COLUMN moderation_status ENUM('pending', 'approved', 'rejected') DEFAULT 'approved',
ADD COLUMN featured BOOLEAN DEFAULT FALSE,
ADD COLUMN featured_at TIMESTAMP NULL,
ADD INDEX idx_moderation (moderation_status),
ADD INDEX idx_featured (featured);
```

---

## 🔐 Middleware Implementation

### SuperadminMiddleware.php
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SuperadminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->guard('superadmin')->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
```

### SuperadminPermissionMiddleware.php
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SuperadminPermissionMiddleware
{
    public function handle(Request $request, Closure $next, $permission)
    {
        $superadmin = auth()->guard('superadmin')->user();
        
        if (!$superadmin->hasPermission($permission)) {
            return response()->json(['error' => 'Insufficient permissions'], 403);
        }

        return $next($request);
    }
}
```

### SuperadminAuditMiddleware.php
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\SuperadminActivityLog;

class SuperadminAuditMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        
        // Log after request is processed
        $this->logActivity($request, $response);
        
        return $response;
    }
    
    private function logActivity($request, $response)
    {
        SuperadminActivityLog::create([
            'superadmin_id' => auth()->guard('superadmin')->id(),
            'action' => $request->method() . ' ' . $request->path(),
            'module' => $this->getModule($request),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'request_data' => $request->except(['password', 'password_confirmation']),
            'response_data' => ['status' => $response->status()],
        ]);
    }
    
    private function getModule($request)
    {
        // Extract module from path
        $path = explode('/', $request->path());
        return $path[3] ?? 'unknown'; // e.g., /api/v1/superadmin/users => 'users'
    }
}
```

---

## 🔑 Authentication Configuration

### config/auth.php
```php
'guards' => [
    // ... existing guards
    'superadmin' => [
        'driver' => 'jwt',
        'provider' => 'superadmin_users',
    ],
],

'providers' => [
    // ... existing providers
    'superadmin_users' => [
        'driver' => 'eloquent',
        'model' => App\Models\SuperadminUser::class,
    ],
],
```

---

## 📝 Response Format Standards

### Success Response
```json
{
    "success": true,
    "message": "Operation completed successfully",
    "data": {
        // response data
    },
    "meta": {
        "timestamp": "2024-01-15T10:30:00Z",
        "version": "1.0"
    }
}
```

### Error Response
```json
{
    "success": false,
    "error": {
        "code": "ERROR_CODE",
        "message": "Human readable error message",
        "details": {
            // additional error details
        }
    },
    "meta": {
        "timestamp": "2024-01-15T10:30:00Z",
        "version": "1.0"
    }
}
```

### Paginated Response
```json
{
    "success": true,
    "data": {
        "items": [],
        "pagination": {
            "current_page": 1,
            "per_page": 20,
            "total": 100,
            "total_pages": 5,
            "has_more": true
        }
    }
}
```

---

## 🚀 Implementation Priority

### Phase 1: Core Foundation
1. Authentication system
2. User management basic CRUD
3. Activity logging
4. Dashboard with basic metrics

### Phase 2: Content & Moderation
1. Content management endpoints
2. Moderation queue
3. Reports system

### Phase 3: Financial
1. Transaction management
2. Invoice management
3. Refund system

### Phase 4: Advanced Features
1. Communication tools
2. Advanced analytics
3. System configuration
4. Performance monitoring

---

*Document Version: 1.0*
*Last Updated: [Date]*

