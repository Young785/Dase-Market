import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import RegisterPage from './auth/register';
import LoginPage from './auth/login';
import VerifyOtp from './components/auth/verify-code';
import ConfirmAccount from './components/auth/confirm-account';
import ForgotPassword from './components/auth/forgotpassword';
import VerifyPasswordOtp from './components/auth/verifypasswordotp';
import NewPassword from './components/auth/newpassword';
import VerificationPage from './components/auth/verificationPage';



import DashboardHome from './dashboard/page';
import Invoice from './dashboard/invoice/App';
import Chat from './dashboard/chat/App';
import CreateInvoice from './dashboard/invoice/create/App';
import ViewInvoice from './dashboard/invoice/view/App';
import EditInvoice from './dashboard/invoice/edit/App';
import Profile from './dashboard/profile/App';
import ProfileEdit from './dashboard/profile/edit';
// import Setting from './dashboard/settings/App'
import ProtectedRoute from './components/auth/ProtectedRoute';
import Waveform from './dashboard/voice/App';
import Social from './dashboard/social/App'
import Project from './dashboard/project/App'
import Engineer from './dashboard/engineer/App'
import Notification from './dashboard/notification/App'
import EngineerDetails from './dashboard/engineer/view/App'
import ProductionSamples from './dashboard/production-samples/App'
import FileSharing from './dashboard/file-sharing/App'
import GettingStarted from './dashboard/getting-started/App'
import TaskApp from './dashboard/task/App'
import ActiveTasksApp from './dashboard/task/active/App'
import CompletedTasksApp from './dashboard/task/completed/App'
import PendingConfirmationTasksApp from './dashboard/task/pending-confirmation/App'
import { loadExternalScripts } from './utils/external-scripts';

// New component to wrap dashboard routes
const DashboardWrapper = () => {
  return (
    <Routes>
      <Route index path="dashboard" element={<DashboardHome />} />
      {/* Invoices accessible to both roles (account-scoped server-side) */}
      <Route path="invoice" element={<Invoice />} />
      <Route path="invoice/create" element={<CreateInvoice />} />
      <Route path="invoice/edit/:invoiceId" element={<EditInvoice />} />
      <Route path="invoice/view/:invoiceId" element={<ViewInvoice />} />
      <Route path="chat" element={<Chat />} />
      <Route path="profile" element={<Profile />} />
      <Route path="profile/edit" element={<ProfileEdit />} />
      {/* <Route path="setting" element={<Setting />} /> */}
      <Route path="voice" element={<Waveform />} />
      <Route path="social" element={<Social />} />
      {/* Engineer-only pages */}
      <Route path="project" element={<ProtectedRoute allowedRoles={["engineer"]}><Project /></ProtectedRoute>} />
      <Route path="engineer" element={<Engineer />} />
      <Route path="notification" element={<Notification />} />
      <Route path="engineer/view/:account_id" element={<EngineerDetails />} />
      {/* Engineer-only features */}
      <Route path="production-samples" element={<ProtectedRoute allowedRoles={["engineer"]}><ProductionSamples /></ProtectedRoute>} />
      <Route path="file-sharing" element={<ProtectedRoute allowedRoles={["engineer"]}><FileSharing /></ProtectedRoute>} />
      <Route path="getting-started" element={<GettingStarted />} />
      <Route path="tasks/active" element={<ActiveTasksApp />} />
      <Route path="tasks/completed" element={<CompletedTasksApp />} />
      <Route path="tasks/pending-confirmation" element={<PendingConfirmationTasksApp />} />
      <Route path="task/confirm/:taskId" element={<TaskApp />} />
      {/* Redirect to dashboard home for any unmatched routes */}
      <Route path="*" element={<Navigate to="/dase/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  useEffect(() => {
    loadExternalScripts();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dase/register" element={<RegisterPage />} />
      <Route path="/dase/verifyotp" element={<VerifyOtp/>} />
      <Route path="/dase/confirm-account" element={<ConfirmAccount/>} />
      <Route path="/dase/forget-password" element={<ForgotPassword/>} />
      <Route path="/dase/verifypasswordotp" element={<VerifyPasswordOtp/>} />
      <Route path="dase/newpassword" element={<NewPassword/>} />
      <Route path="dase/verify-account" element={<VerificationPage/>} />

      {/* Protected routes */}
      <Route 
        path="/dase/*" 
        element={
          <ProtectedRoute>
            <DashboardWrapper />
          </ProtectedRoute>
        } 
      />

      {/* Redirect to login for any unmatched routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
