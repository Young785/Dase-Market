# Dase Market - Frontend

A React-based marketplace application built with Vite for fast development and optimized production builds.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend setup)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔧 Environment Configuration

### Development Mode (Default)

Uses `.env.development` configuration:
```bash
VITE_API_URL=http://127.0.0.1:8000/api
```

To run in development mode:
```bash
npm run dev
```

### Production Mode

Uses `.env.production` configuration:
```bash
VITE_API_URL=https://your-production-api.com/api
```

To run in production mode:
```bash
npm run dev:prod
```

To build for production:
```bash
npm run build
```

## 📝 Available Scripts

- `npm run dev` - Start development server with development environment
- `npm run dev:prod` - Start development server with production environment
- `npm run build` - Build for production
- `npm run build:dev` - Build with development environment
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔗 Backend Configuration

The frontend connects to a Laravel backend API. Make sure:

1. Backend is running at `http://127.0.0.1:8000`
2. CORS is configured in backend to allow frontend origin
3. API routes are accessible at `/api/*`

### Checking Backend Connection

When running in development mode, the console will show:
```
🔗 API Base URL: http://127.0.0.1:8000/api
📤 POST /login { ... }  // Request logs
📥 POST /login { ... }  // Response logs
```

## 🛠️ Tech Stack

- React 18.3
- Vite 5.4
- React Router DOM
- Axios
- React Hot Toast
- Bootstrap
- SweetAlert2

## 📦 Project Structure

```
src/
├── auth/              # Authentication pages
├── components/        # Reusable components
├── context/          # React Context providers
├── dashboard/        # Dashboard pages
├── assets/           # Static assets (images, fonts, css)
├── axiosInstance.js  # Configured Axios instance
├── App.jsx           # Main App component
└── main.jsx          # Entry point
```

## 🔐 Authentication

The app uses token-based authentication:
- Login credentials are sent to `/api/login`
- Access token is stored in localStorage
- Token is automatically attached to all API requests
- Unauthorized requests redirect to login

## 🐛 Troubleshooting

### API Connection Issues

1. **Check backend is running:**
   ```bash
   cd backend
   php artisan serve
   ```

2. **Verify .env file exists and has correct API URL:**
   ```bash
   cat .env
   ```

3. **Check browser console for API logs:**
   - Look for "🔗 API Base URL" log
   - Check request/response logs (📤/📥)
   - Look for error messages (❌)

### Port Conflicts

If port 3000 is already in use, you can change it in `vite.config.js`:
```js
server: {
  port: 3001,  // Change to your preferred port
  // ...
}
```

## 📄 License

This project is proprietary and confidential.
