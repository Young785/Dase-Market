# Superadmin API Diagnostic Report

**Date:** February 28, 2026  
**Issue:** APIs not working in superadmin

---

## Problem Analysis

### 1. API Configuration Issues Found

#### Issue #1: Token Storage Mismatch
**Location:** `superadmin/src/utils/axiosInstance.js`

The axios instance is looking for token in:
```javascript
const token = localStorage.getItem('superadmin_token');
```

But the login flow (in `src/axiosInstance.js`) stores it as:
```javascript
localStorage.setItem('auth_data', JSON.stringify({
    access_token: response.data.access_token,
    ...
}));
```

**Impact:** All API calls fail with 401 Unauthorized because no token is being sent.

#### Issue #2: Two Different Axios Instances
- `src/utils/axiosInstance.js` - Used by all pages (correct)
- `src/axiosInstance.js` - Used by auth pages (different config)

These have different:
- Token retrieval methods
- Response interceptors
- Error handling

#### Issue #3: Backend API Structure Mismatch
Frontend expects:
```
POST /api/v1/superadmin/users/{id}/suspend
POST /api/v1/superadmin/users/{id}/ban
```

Backend has TWO different structures:
```
POST /api/v1/superadmin/users/{id}/suspend  (Phase 1)
POST /api/v1/superadmin/manage/users/{platform}/{id}/suspend  (Phase 2)
```

---

## Root Cause

The main issue is **TOKEN STORAGE MISMATCH**:

1. User logs in → token stored as `auth_data` object
2. User navigates to pages → pages look for `superadmin_token`
3. No token found → API calls fail with 401
4. User gets redirected to login (if interceptor catches it)

---

## Solution

### Fix 1: Standardize Token Storage (RECOMMENDED)

Update `superadmin/src/utils/axiosInstance.js` to match the auth flow:

```javascript
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Match the auth flow token storage
    const authData = JSON.parse(localStorage.getItem('auth_data') || '{}');
    const token = authData.access_token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_data');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

### Fix 2: Add Debug Logging

Add console logging to see what's happening:

```javascript
axiosInstance.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(localStorage.getItem('auth_data') || '{}');
    const token = authData.access_token;
    
    console.log('🔍 API Request:', {
      url: config.url,
      method: config.method,
      hasToken: !!token,
      token: token ? token.substring(0, 20) + '...' : 'NONE'
    });
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);
```

---

## Testing Steps

### 1. Check Browser Console
Open browser DevTools (F12) and check:
- Network tab for API calls
- Console tab for errors
- Application tab → Local Storage → Check for `auth_data` or `superadmin_token`

### 2. Verify Backend is Running
```bash
cd backend
php artisan serve
```

Should see: `Server running on http://localhost:8000`

### 3. Test Login Flow
1. Open superadmin at http://localhost:5173
2. Login with credentials
3. Check Local Storage for `auth_data`
4. Navigate to any page
5. Check Network tab for API calls

### 4. Check API Response
Look for:
- 401 Unauthorized → Token issue
- 404 Not Found → Endpoint doesn't exist
- 500 Server Error → Backend issue
- CORS Error → Backend CORS config issue

---

## Quick Fix Commands

### 1. Check if backend is running:
```bash
curl http://localhost:8000/api/v1/superadmin/dashboard
```

### 2. Test login endpoint:
```bash
curl -X POST http://localhost:8000/api/v1/superadmin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

### 3. Check frontend is running:
```bash
cd superadmin
npm run dev
```

---

## Expected Behavior After Fix

1. User logs in → `auth_data` stored in localStorage
2. User navigates to pages → axios reads `auth_data.access_token`
3. API calls include `Authorization: Bearer {token}` header
4. Backend validates token and returns data
5. Pages display data correctly

---

## Files That Need Fixing

1. **superadmin/src/utils/axiosInstance.js** - Update token retrieval
2. **superadmin/src/pages/auth/Login.jsx** - Verify token storage
3. All page components - Already correct, just need axios fix

---

## Backend Endpoints Verification

### Working Endpoints (Phase 1):
```
POST /api/v1/superadmin/auth/login
GET  /api/v1/superadmin/dashboard
GET  /api/v1/superadmin/users
GET  /api/v1/superadmin/users/streamers
GET  /api/v1/superadmin/users/engineers
GET  /api/v1/superadmin/users/clients
GET  /api/v1/superadmin/users/admins
POST /api/v1/superadmin/users/{id}/suspend
POST /api/v1/superadmin/users/{id}/ban
POST /api/v1/superadmin/users/{id}/verify
```

### Phase 2 Endpoints (Alternative):
```
GET  /api/v1/superadmin/manage/users
GET  /api/v1/superadmin/manage/content/posts
GET  /api/v1/superadmin/manage/content/projects
GET  /api/v1/superadmin/manage/content/samples
POST /api/v1/superadmin/manage/content/{type}/{id}/approve
POST /api/v1/superadmin/manage/content/{type}/{id}/reject
```

---

## Next Steps

1. Apply Fix 1 to standardize token storage
2. Test login flow
3. Verify API calls work
4. Check all pages load data
5. Test action buttons
6. Commit fixes

