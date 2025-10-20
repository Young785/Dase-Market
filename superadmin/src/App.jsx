import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth Components
import LoginPage from './pages/auth/Login';
import VerifyOtp from './pages/auth/VerifyOtp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Dashboard Components
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';

// User Management
import AllUsers from './pages/users/AllUsers';
import UserDetails from './pages/users/UserDetails';
import Streamers from './pages/users/Streamers';
import Engineers from './pages/users/Engineers';
import Clients from './pages/users/Clients';
import Admins from './pages/users/Admins';

// Content Management
import ContentOverview from './pages/content/ContentOverview';
import Posts from './pages/content/Posts';
import Shorts from './pages/content/Shorts';
import Channels from './pages/content/Channels';
import Projects from './pages/content/Projects';
import Samples from './pages/content/Samples';
import ModerationQueue from './pages/content/ModerationQueue';

// Financial Management
import FinanceDashboard from './pages/finance/FinanceDashboard';
import Transactions from './pages/finance/Transactions';
import Invoices from './pages/finance/Invoices';
import Refunds from './pages/finance/Refunds';
import Advertising from './pages/finance/Advertising';

// System Configuration
import PlatformSettings from './pages/settings/PlatformSettings';
import EmailSettings from './pages/settings/EmailSettings';
import PaymentSettings from './pages/settings/PaymentSettings';
import SecuritySettings from './pages/settings/SecuritySettings';

// Security & Compliance
import ActivityLogs from './pages/security/ActivityLogs';
import AuditLogs from './pages/security/AuditLogs';
import Reports from './pages/security/Reports';
import BannedUsers from './pages/security/BannedUsers';

// Communication & Support
import Broadcast from './pages/communication/Broadcast';
import SupportTickets from './pages/communication/SupportTickets';
import Announcements from './pages/communication/Announcements';

// Context & Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import { loadExternalScripts } from './utils/external-scripts';

function App() {
  useEffect(() => {
    loadExternalScripts();
  }, []);

  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Superadmin Routes */}
      <Route path="/superadmin" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/superadmin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
          
          {/* User Management Routes */}
          <Route path="users">
            <Route index element={<AllUsers />} />
            <Route path=":id" element={<UserDetails />} />
            <Route path="streamers" element={<Streamers />} />
            <Route path="engineers" element={<Engineers />} />
            <Route path="clients" element={<Clients />} />
            <Route path="admins" element={<Admins />} />
          </Route>

          {/* Content Management Routes */}
          <Route path="content">
            <Route index element={<ContentOverview />} />
            <Route path="posts" element={<Posts />} />
            <Route path="shorts" element={<Shorts />} />
            <Route path="channels" element={<Channels />} />
            <Route path="projects" element={<Projects />} />
            <Route path="samples" element={<Samples />} />
            <Route path="moderation-queue" element={<ModerationQueue />} />
          </Route>

          {/* Financial Management Routes */}
          <Route path="finance">
            <Route index element={<FinanceDashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="refunds" element={<Refunds />} />
            <Route path="advertising" element={<Advertising />} />
          </Route>

          {/* Settings Routes */}
          <Route path="settings">
            <Route path="platform" element={<PlatformSettings />} />
            <Route path="email" element={<EmailSettings />} />
            <Route path="payments" element={<PaymentSettings />} />
            <Route path="security" element={<SecuritySettings />} />
          </Route>

          {/* Security & Compliance Routes */}
          <Route path="security">
            <Route path="activity-logs" element={<ActivityLogs />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="reports" element={<Reports />} />
            <Route path="banned-users" element={<BannedUsers />} />
          </Route>

          {/* Communication Routes */}
          <Route path="communication">
            <Route path="broadcast" element={<Broadcast />} />
            <Route path="support-tickets" element={<SupportTickets />} />
            <Route path="announcements" element={<Announcements />} />
          </Route>
        </Route>

      {/* Redirect unmatched routes to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
