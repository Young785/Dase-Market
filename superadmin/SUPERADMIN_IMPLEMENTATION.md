# Superadmin Portal Implementation Guide

## 🎯 Overview

This is the comprehensive Superadmin Portal for the Dase Market platform, providing complete oversight and control over:
- User Management (Streamers, Engineers, Clients, Admins)
- Content Moderation
- Financial Management
- System Configuration
- Security & Compliance
- Communication & Support

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend API running

### Installation

1. **Install Dependencies**
   ```bash
   cd superadmin
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your backend API URL:
   ```
   VITE_API_URL=http://your-backend-url
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
superadmin/
├── src/
│   ├── assets/              # Static assets (CSS, images, fonts)
│   ├── components/          # Reusable components
│   │   ├── auth/           # Authentication components
│   │   └── layout/         # Layout components (Header, Sidebar, Footer)
│   ├── context/            # React Context providers
│   │   └── AuthContext.jsx # Authentication context
│   ├── layouts/            # Page layouts
│   │   └── DashboardLayout.jsx
│   ├── pages/              # Page components
│   │   ├── auth/           # Auth pages (Login, 2FA, etc.)
│   │   ├── dashboard/      # Dashboard page
│   │   ├── users/          # User management pages
│   │   ├── content/        # Content management pages
│   │   ├── finance/        # Financial management pages
│   │   ├── settings/       # Settings pages
│   │   ├── security/       # Security & compliance pages
│   │   └── communication/  # Communication pages
│   ├── utils/              # Utility functions
│   │   ├── axiosInstance.js # Axios configuration
│   │   └── external-scripts.js
│   ├── App.jsx             # Main app component with routes
│   └── main.jsx            # Entry point
├── public/                 # Public assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── .env.example            # Environment variables template
```

## 🔐 Authentication Flow

1. **Login** (`/login`)
   - Email and password authentication
   - Returns JWT token

2. **2FA Verification** (`/verify-otp`)
   - Required if 2FA is enabled
   - 6-digit code verification

3. **Protected Routes**
   - All dashboard routes require authentication
   - Token stored in localStorage as `superadmin_token`
   - Automatic redirect to login if unauthorized

4. **Logout**
   - Clears token and redirects to login

## 🛣️ Routes

### Public Routes
- `/login` - Login page
- `/verify-otp` - 2FA verification
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset

### Protected Routes
- `/` - Dashboard home
- `/users/*` - User management
  - `/users` - All users
  - `/users/:userId` - User details
  - `/users/streamers` - Streamers
  - `/users/engineers` - Engineers
  - `/users/clients` - Clients
  - `/users/admins` - Admins
- `/content/*` - Content management
  - `/content` - Overview
  - `/content/posts` - Posts
  - `/content/shorts` - Shorts
  - `/content/channels` - Channels
  - `/content/projects` - Projects
  - `/content/samples` - Samples
  - `/content/moderation` - Moderation queue
- `/finance/*` - Financial management
  - `/finance` - Dashboard
  - `/finance/transactions` - Transactions
  - `/finance/invoices` - Invoices
  - `/finance/refunds` - Refunds
  - `/finance/advertising` - Advertising
- `/settings/*` - Settings
  - `/settings/platform` - Platform settings
  - `/settings/email` - Email settings
  - `/settings/payment` - Payment settings
  - `/settings/security` - Security settings
- `/security/*` - Security & compliance
  - `/security/activity-logs` - Activity logs
  - `/security/audit-logs` - Audit logs
  - `/security/reports` - User reports
  - `/security/banned-users` - Banned users
- `/communication/*` - Communication
  - `/communication/broadcast` - Broadcast messages
  - `/communication/tickets` - Support tickets
  - `/communication/announcements` - Announcements

## 📡 API Integration

The app uses Axios for API calls. Configuration is in `src/utils/axiosInstance.js`.

### Base URL
Set via environment variable: `VITE_API_URL`

### Authentication
- JWT token is automatically attached to all requests
- Token stored in localStorage as `superadmin_token`
- Automatic logout on 401 responses

### API Structure
All endpoints follow the pattern:
```
/api/v1/superadmin/{module}/{action}
```

Example endpoints:
- `GET /api/v1/superadmin/dashboard/stats`
- `GET /api/v1/superadmin/users`
- `POST /api/v1/superadmin/users/{id}/suspend`

See `SUPERADMIN_API_STRUCTURE.md` for complete API documentation.

## 🎨 UI Components

### Layout Components
- **Header**: Top navigation with user menu, notifications
- **Sidebar**: Main navigation menu
- **Footer**: Copyright and info

### Reusable Components
- **ProtectedRoute**: Wrapper for authenticated routes
- **Loading States**: Spinners and skeletons
- **Toast Notifications**: Success/error messages

### Design System
- Bootstrap 5 for base styles
- Custom theme in `src/assets/css/`
- Remix Icons for icons
- Responsive design (mobile, tablet, desktop)

## 🔒 Security Features

### Authentication
- JWT-based authentication
- Mandatory 2FA support
- Session management
- Auto-logout on inactivity

### Authorization
- Role-based access control
- Permission checks on routes
- Action-level permissions

### Security Measures
- CSRF protection
- XSS prevention
- Secure token storage
- API rate limiting (backend)
- Audit logging (all actions)

## 📊 Features Implementation Status

### ✅ Completed (Phase 1)
- [x] Authentication system (Login, 2FA, Forgot Password)
- [x] Dashboard layout (Header, Sidebar, Footer)
- [x] Main dashboard with metrics
- [x] User management structure
- [x] Content management structure
- [x] Finance management structure
- [x] Settings structure
- [x] Security & compliance structure
- [x] Communication structure
- [x] Routing system
- [x] Protected routes
- [x] Context providers

### 🚧 In Progress (Phase 2)
- [ ] Complete user management (full CRUD)
- [ ] Content moderation queue implementation
- [ ] Transaction management
- [ ] Advanced analytics charts
- [ ] Report generation
- [ ] File upload handling

### 📋 Planned (Phase 3)
- [ ] Real-time notifications
- [ ] WebSocket integration
- [ ] Advanced search & filters
- [ ] Bulk operations
- [ ] Export functionality (CSV, Excel, PDF)
- [ ] Advanced charts (ApexCharts integration)
- [ ] Email campaign builder
- [ ] System monitoring dashboard

## 🧪 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable names
- Comment complex logic
- Keep components small and focused

### File Naming
- Components: PascalCase (e.g., `UserDetails.jsx`)
- Utilities: camelCase (e.g., `axiosInstance.js`)
- Styles: kebab-case (e.g., `custom-styles.css`)

### State Management
- Use Context API for global state
- Local state for component-specific data
- Consider Redux for complex state needs

### API Calls
- Always use try-catch blocks
- Show loading states
- Display error messages
- Handle edge cases

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000` |
| `VITE_APP_NAME` | Application name | `Dase Market Superadmin Portal` |
| `VITE_ENABLE_2FA` | Enable 2FA requirement | `true` |
| `VITE_DEBUG_MODE` | Enable debug logging | `false` |

## 🐛 Troubleshooting

### Common Issues

1. **Login fails with 401**
   - Check API URL in `.env`
   - Verify backend is running
   - Check credentials

2. **Routes not working**
   - Ensure React Router is configured
   - Check for typos in route paths
   - Verify protected route wrapper

3. **Styles not loading**
   - Check CSS imports in `main.jsx`
   - Clear browser cache
   - Rebuild the app

4. **API calls failing**
   - Check CORS configuration on backend
   - Verify API endpoint URLs
   - Check network tab in browser devtools

## 🚀 Deployment

### Build
```bash
npm run build
```

### Environment
- Set `VITE_APP_ENV=production`
- Update `VITE_API_URL` to production API
- Enable security features

### Hosting Options
- Vercel
- Netlify
- AWS S3 + CloudFront
- Nginx (self-hosted)

## 📚 Documentation

- API Documentation: `SUPERADMIN_API_STRUCTURE.md`
- Features Specification: `SUPERADMIN_FEATURES_SPECIFICATION.md`
- Complete Guide: `SUPERADMIN_COMPLETE_GUIDE.md`

## 🤝 Support

For issues or questions:
1. Check the documentation
2. Review API structure
3. Check console for errors
4. Contact development team

## 📄 License

© 2024 Dase Market. All rights reserved.

