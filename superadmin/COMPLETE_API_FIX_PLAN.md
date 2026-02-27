# Complete Superadmin API Fix Plan

**Date:** February 28, 2026  
**Status:** CRITICAL - Systematic Fix Required

---

## ROOT CAUSE IDENTIFIED

### Primary Issue: Token Storage Mismatch
- **Login stores:** `localStorage.setItem('auth_data', JSON.stringify({access_token: ...}))`
- **Pages expect:** `localStorage.getItem('superadmin_token')`
- **Result:** NO TOKEN SENT → ALL API CALLS FAIL WITH 401

### Secondary Issues:
1. Many pages use `setTimeout` mock data instead of real API calls
2. Missing backend endpoints for several features
3. Incorrect endpoint paths in some pages

---

## IMMEDIATE FIXES REQUIRED

### Fix 1: Axios Instance (ALREADY FIXED)
✅ Updated `superadmin/src/utils/axiosInstance.js` to read `auth_data.access_token`

### Fix 2: Pages Using Mock Data (NEED TO FIX)

#### Pages with setTimeout/TODO:
1. **ModerationQueue.jsx** - Uses setTimeout, needs `/api/v1/superadmin/manage/content/moderation-queue`
2. **Reports.jsx** - Uses setTimeout, needs `/api/v1/superadmin/security/reports`
3. **BannedUsers.jsx** - Uses setTimeout, needs `/api/v1/superadmin/security/banned-users`
4. **SupportTickets.jsx** - Uses setTimeout, needs `/api/v1/superadmin/support/tickets`
5. **ActivityLogs.jsx** - Uses setTimeout, needs `/api/v1/superadmin/security/activity-logs`
6. **AuditLogs.jsx** - Uses setTimeout, needs `/api/v1/superadmin/security/audit-logs`
7. **Broadcast.jsx** - Uses setTimeout, needs `/api/v1/superadmin/communication/broadcast`
8. **EmailSettings.jsx** - Uses setTimeout, needs `/api/v1/superadmin/settings/email`
9. **PaymentSettings.jsx** - Uses setTimeout, needs `/api/v1/superadmin/settings/payment`
10. **PlatformSettings.jsx** - Uses setTimeout, needs `/api/v1/superadmin/settings/platform`
11. **SecuritySettings.jsx** - Uses setTimeout, needs `/api/v1/superadmin/settings/security`

#### Pages with Hardcoded Zeros:
1. **Dashboard.jsx** - Stats all show 0
2. **ContentOverview.jsx** - Stats all show 0
3. **FinanceDashboard.jsx** - Stats all show 0

---

## BACKEND ENDPOINTS STATUS

### ✅ WORKING (Verified in api.php):
```
POST /api/v1/superadmin/auth/login
POST /api/v1/superadmin/auth/verify-2fa
GET  /api/v1/superadmin/auth/profile
POST /api/v1/superadmin/auth/logout

GET  /api/v1/superadmin/dashboard
GET  /api/v1/superadmin/dashboard/stats
GET  /api/v1/superadmin/dashboard/activity-feed
GET  /api/v1/superadmin/dashboard/alerts

GET  /api/v1/superadmin/users
GET  /api/v1/superadmin/users/streamers
GET  /api/v1/superadmin/users/engineers
GET  /api/v1/superadmin/users/clients
GET  /api/v1/superadmin/users/admins
GET  /api/v1/superadmin/users/{id}
POST /api/v1/superadmin/users/{id}/suspend
POST /api/v1/superadmin/users/{id}/unsuspend
POST /api/v1/superadmin/users/{id}/ban
POST /api/v1/superadmin/users/{id}/unban
POST /api/v1/superadmin/users/{id}/verify

GET  /api/v1/superadmin/manage/content/moderation-queue
GET  /api/v1/superadmin/manage/content/statistics
GET  /api/v1/superadmin/manage/content/posts
GET  /api/v1/superadmin/manage/content/shorts
GET  /api/v1/superadmin/manage/content/projects
GET  /api/v1/superadmin/manage/content/samples
POST /api/v1/superadmin/manage/content/{type}/{id}/approve
POST /api/v1/superadmin/manage/content/{type}/{id}/reject
POST /api/v1/superadmin/manage/content/{type}/{id}/feature
POST /api/v1/superadmin/manage/content/{type}/{id}/unfeature
```

### ❌ MISSING (Need Backend Implementation):
```
GET  /api/v1/superadmin/security/reports
POST /api/v1/superadmin/security/reports/{id}/review
POST /api/v1/superadmin/security/reports/{id}/resolve
POST /api/v1/superadmin/security/reports/{id}/dismiss

GET  /api/v1/superadmin/security/banned-users
GET  /api/v1/superadmin/security/activity-logs
GET  /api/v1/superadmin/security/audit-logs

GET  /api/v1/superadmin/finance/invoices
GET  /api/v1/superadmin/finance/refunds
POST /api/v1/superadmin/finance/refunds/{id}/approve
POST /api/v1/superadmin/finance/refunds/{id}/reject
GET  /api/v1/superadmin/finance/transactions
GET  /api/v1/superadmin/finance/advertising
POST /api/v1/superadmin/finance/advertising/{id}/pause
POST /api/v1/superadmin/finance/advertising/{id}/resume

GET  /api/v1/superadmin/announcements
POST /api/v1/superadmin/announcements
PUT  /api/v1/superadmin/announcements/{id}
DELETE /api/v1/superadmin/announcements/{id}

GET  /api/v1/superadmin/support/tickets
POST /api/v1/superadmin/support/tickets/{id}/status
POST /api/v1/superadmin/support/tickets/{id}/assign

GET  /api/v1/superadmin/communication/broadcast
POST /api/v1/superadmin/communication/broadcast

GET  /api/v1/superadmin/settings/email
PUT  /api/v1/superadmin/settings/email
GET  /api/v1/superadmin/settings/payment
PUT  /api/v1/superadmin/settings/payment
GET  /api/v1/superadmin/settings/platform
PUT  /api/v1/superadmin/settings/platform
GET  /api/v1/superadmin/settings/security
PUT  /api/v1/superadmin/settings/security
```

---

## SYSTEMATIC FIX APPROACH

### Phase 1: Fix Token Issue (DONE)
✅ Updated axios instance to read correct token

### Phase 2: Fix Pages with Existing Backend Endpoints
These pages call endpoints that EXIST but fail due to token issue:

1. **Dashboard.jsx** → `/api/v1/superadmin/dashboard`
2. **Streamers.jsx** → `/api/v1/superadmin/users/streamers`
3. **Engineers.jsx** → `/api/v1/superadmin/users/engineers`
4. **Clients.jsx** → `/api/v1/superadmin/users/clients`
5. **Admins.jsx** → `/api/v1/superadmin/users/admins`
6. **UserDetails.jsx** → `/api/v1/superadmin/users/{id}`
7. **Posts.jsx** → `/api/v1/superadmin/manage/content/posts`
8. **Projects.jsx** → `/api/v1/superadmin/manage/content/projects`
9. **Samples.jsx** → `/api/v1/superadmin/manage/content/samples`
10. **Channels.jsx** → `/api/v1/superadmin/users/streamers` (for channels)
11. **ContentOverview.jsx** → `/api/v1/superadmin/manage/content/statistics`
12. **ModerationQueue.jsx** → `/api/v1/superadmin/manage/content/moderation-queue`

### Phase 3: Update Pages to Use Correct Endpoints
Fix pages calling wrong endpoints:

1. **ModerationQueue.jsx** - Remove setTimeout, use real API
2. **ContentOverview.jsx** - Call `/manage/content/statistics` instead of hardcoded zeros

### Phase 4: Document Missing Endpoints
For pages that need backend implementation, add clear comments:

```javascript
// TODO: Backend endpoint not implemented yet
// Expected: GET /api/v1/superadmin/security/reports
// For now, showing empty state
```

---

## TESTING CHECKLIST

### Step 1: Verify Backend Running
```bash
cd backend
php artisan serve
# Should see: Server running on http://localhost:8000
```

### Step 2: Verify Frontend Running
```bash
cd superadmin
npm run dev
# Should see: Local: http://localhost:5173
```

### Step 3: Test Login
1. Open http://localhost:5173/login
2. Login with credentials
3. Check browser console for:
   - ✅ "🔍 API Request: POST /api/v1/superadmin/auth/login"
   - ✅ "✅ API Response: {success: true, access_token: ...}"
4. Check Local Storage:
   - ✅ `auth_data` exists with `access_token`

### Step 4: Test Dashboard
1. Navigate to dashboard
2. Check browser console for:
   - ✅ "🔍 API Request: GET /api/v1/superadmin/dashboard hasToken: true"
   - ✅ "✅ API Response: {success: true, data: ...}"
3. Verify stats display real numbers (not zeros)

### Step 5: Test User Pages
1. Navigate to Streamers page
2. Check console for API call with token
3. Verify users list displays
4. Test Suspend/Ban buttons
5. Repeat for Engineers, Clients, Admins

### Step 6: Test Content Pages
1. Navigate to Posts page
2. Verify posts load
3. Test Approve/Reject buttons
4. Repeat for Projects, Samples

---

## QUICK FIX COMMANDS

### Check if token is being sent:
Open browser console → Network tab → Click any API call → Headers → Look for:
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### If no token:
1. Clear localStorage: `localStorage.clear()`
2. Login again
3. Check `localStorage.getItem('auth_data')`

### If 401 errors persist:
Backend might not be running or token expired:
```bash
cd backend
php artisan serve
```

---

## FILES TO FIX NOW

### Priority 1 (Existing Endpoints):
1. ✅ `superadmin/src/utils/axiosInstance.js` - FIXED
2. `superadmin/src/pages/dashboard/Dashboard.jsx` - Update to use real API
3. `superadmin/src/pages/content/ContentOverview.jsx` - Update to use real API
4. `superadmin/src/pages/content/ModerationQueue.jsx` - Remove setTimeout

### Priority 2 (Document Missing):
1. `superadmin/src/pages/security/Reports.jsx` - Add TODO comment
2. `superadmin/src/pages/security/BannedUsers.jsx` - Add TODO comment
3. `superadmin/src/pages/communication/SupportTickets.jsx` - Add TODO comment
4. All settings pages - Add TODO comments

---

## EXPECTED OUTCOME

After fixes:
1. ✅ Login works and stores token correctly
2. ✅ All pages with existing endpoints load real data
3. ✅ Action buttons work (suspend, ban, approve, reject)
4. ✅ Pages without backend show clear "Coming Soon" message
5. ✅ No more 401 errors in console
6. ✅ Debug logs show token being sent with every request

