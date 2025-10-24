# Superadmin Portal - Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will get your Superadmin Portal up and running quickly.

---

## 📋 Prerequisites

- PHP 8.1+
- Composer
- MySQL 8.0+
- Node.js 16+
- NPM or Yarn

---

## ⚡ Quick Setup

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already done)
composer install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
php artisan migrate

# Seed superadmin data
php artisan db:seed --class=SuperadminSeeder

# Start Laravel server
php artisan serve
```

**✅ Backend is now running at**: `http://localhost:8000`

---

### Step 2: Frontend Setup

```bash
# Navigate to your React app directory
cd /path/to/your-react-app

# Install lucide-react if not already installed
npm install lucide-react react-hot-toast axios

# Copy superadmin components
# Components are in: src/superadmin/
# - Dashboard.jsx
# - UserManagement.jsx
# - ModerationQueue.jsx

# Start React app
npm start
```

**✅ Frontend is now running at**: `http://localhost:3000`

---

## 🔑 Default Login Credentials

### Master Admin (Full Access)
- **Email**: `admin@dasemarket.com`
- **Password**: `Admin@123456`

⚠️ **IMPORTANT**: Change these passwords immediately in production!

---

## 📍 Available Routes

### Backend API Endpoints
```
Authentication:
POST   /api/v1/superadmin/auth/login
GET    /api/v1/superadmin/auth/profile
POST   /api/v1/superadmin/auth/logout

Dashboard:
GET    /api/v1/superadmin/dashboard/stats
GET    /api/v1/superadmin/dashboard/activity-feed

User Management:
GET    /api/v1/superadmin/manage/users
POST   /api/v1/superadmin/manage/users/{platform}/{id}/suspend
POST   /api/v1/superadmin/manage/users/{platform}/{id}/ban
POST   /api/v1/superadmin/manage/users/{platform}/{id}/verify

Content Moderation:
GET    /api/v1/superadmin/manage/content/moderation-queue
GET    /api/v1/superadmin/manage/content/posts
POST   /api/v1/superadmin/manage/content/{type}/{id}/approve
POST   /api/v1/superadmin/manage/content/{type}/{id}/reject
```

### Frontend Routes (Add to your App.jsx)
```javascript
import SuperadminDashboard from './superadmin/Dashboard';
import UserManagement from './superadmin/UserManagement';
import ModerationQueue from './superadmin/ModerationQueue';

// In your routes:
<Route path="/superadmin/dashboard" element={<SuperadminDashboard />} />
<Route path="/superadmin/users" element={<UserManagement />} />
<Route path="/superadmin/moderation" element={<ModerationQueue />} />
```

---

## 🧪 Test Your Setup

### 1. Test Backend API

```bash
# Login
curl -X POST http://localhost:8000/api/v1/superadmin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dasemarket.com","password":"Admin@123456"}'

# Copy the token from response, then:
curl -X GET http://localhost:8000/api/v1/superadmin/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 2. Test Frontend

1. Open `http://localhost:3000/superadmin/dashboard`
2. Should show dashboard with statistics
3. Navigate to Users: `http://localhost:3000/superadmin/users`
4. Navigate to Moderation: `http://localhost:3000/superadmin/moderation`

---

## 🎯 Quick Actions Guide

### Suspend a User
```bash
POST /api/v1/superadmin/manage/users/streaming/USER_ID/suspend
Body: {
  "reason": "Violating community guidelines",
  "duration": 7
}
```

### Ban a User
```bash
POST /api/v1/superadmin/manage/users/dase/USER_ID/ban
Body: {
  "reason": "Repeated violations",
  "permanent": true
}
```

### Approve Content
```bash
POST /api/v1/superadmin/manage/content/post/POST_ID/approve
```

### Reject Content
```bash
POST /api/v1/superadmin/manage/content/short/SHORT_ID/reject
Body: {
  "reason": "Inappropriate content",
  "action": "hide"
}
```

---

## 📦 What's Included

### ✅ Phase 1 (Basic Setup)
- Authentication system
- Role-based access control
- Activity logging
- Basic dashboard

### ✅ Phase 2 (User & Content Management)
- **Backend Controllers**:
  - UserManagementController
  - ContentModerationController
  
- **Frontend Components**:
  - Dashboard
  - User Management
  - Moderation Queue

- **Features**:
  - Cross-platform user management
  - Content moderation
  - Bulk operations
  - Activity tracking
  - Statistics dashboard

---

## 🔧 Configuration

### Backend Configuration

**Database** (`backend/.env`):
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dase_market
DB_USERNAME=root
DB_PASSWORD=your_password
```

**JWT** (`backend/.env`):
```env
JWT_SECRET=your_jwt_secret_key
JWT_TTL=1440
```

### Frontend Configuration

**API Base URL** (in your axios instance):
```javascript
// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('superadmin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Authentication Failed"
**Solution**: Make sure you:
1. Ran the seeders: `php artisan db:seed --class=SuperadminSeeder`
2. Using correct credentials
3. JWT secret is set in `.env`

### Issue 2: "CORS Error"
**Solution**: Add to `backend/app/Http/Kernel.php`:
```php
protected $middleware = [
    \Fruitcake\Cors\HandleCors::class,
    // ... other middleware
];
```

### Issue 3: "Route Not Found"
**Solution**: Clear route cache:
```bash
php artisan route:clear
php artisan route:cache
```

### Issue 4: "Components Not Showing"
**Solution**: Ensure:
1. Components are in correct directory
2. Routes are added to App.jsx
3. Bootstrap CSS is loaded
4. Icons package is installed: `npm install lucide-react`

---

## 📚 Additional Resources

### Documentation
- [Phase 2 Summary](./SUPERADMIN_PHASE2_SUMMARY.md) - Detailed implementation docs
- [Backend Setup](./backend/SUPERADMIN_SETUP.md) - Backend configuration

### File Locations
```
Backend:
├── app/Http/Controllers/Superadmin/
│   ├── AuthController.php
│   ├── DashboardController.php
│   ├── UserManagementController.php
│   └── ContentModerationController.php
├── app/Models/
│   ├── SuperadminUser.php
│   └── SuperadminActivityLog.php
└── routes/api.php

Frontend:
└── src/superadmin/
    ├── Dashboard.jsx
    ├── UserManagement.jsx
    └── ModerationQueue.jsx
```

---

## 🎯 Next Steps

After setup is complete:

1. **✅ Test all features**
   - Login/logout
   - View users
   - Suspend/ban users
   - View moderation queue
   - Approve/reject content

2. **🔐 Secure your installation**
   - Change default passwords
   - Enable 2FA
   - Configure IP whitelist
   - Set up HTTPS

3. **📊 Monitor system**
   - Check activity logs
   - Review statistics
   - Test notifications

4. **🚀 Phase 3 Planning**
   - Financial management
   - Advanced analytics
   - Communication tools
   - System configuration

---

## ✅ Success Checklist

- [ ] Backend API running at localhost:8000
- [ ] Frontend app running at localhost:3000
- [ ] Can login with default credentials
- [ ] Dashboard shows statistics
- [ ] User management page loads
- [ ] Can view users
- [ ] Moderation queue loads
- [ ] Can perform user actions
- [ ] Toast notifications working

---

## 💡 Pro Tips

1. **Use Chrome DevTools** to inspect API responses
2. **Check Laravel logs** at `backend/storage/logs/laravel.log`
3. **Use Postman** to test API endpoints directly
4. **Enable React DevTools** for frontend debugging
5. **Keep terminal open** to see real-time errors

---

## 🆘 Need Help?

### Check These First
1. Laravel logs: `backend/storage/logs/laravel.log`
2. Browser console (F12)
3. Network tab in DevTools
4. Terminal output

### Common Commands
```bash
# Clear all Laravel caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Reset database (WARNING: Deletes all data)
php artisan migrate:fresh --seed

# Check routes
php artisan route:list | grep superadmin

# Frontend
npm install --force  # If package conflicts
rm -rf node_modules package-lock.json && npm install  # Nuclear option
```

---

## 🎉 You're Ready!

Your Superadmin Portal is now set up and ready to use. Access it at:

🌐 **Dashboard**: `http://localhost:3000/superadmin/dashboard`  
👥 **Users**: `http://localhost:3000/superadmin/users`  
🔍 **Moderation**: `http://localhost:3000/superadmin/moderation`

---

**Quick Start Complete!** ✅  
*For detailed documentation, see [SUPERADMIN_PHASE2_SUMMARY.md](./SUPERADMIN_PHASE2_SUMMARY.md)*
