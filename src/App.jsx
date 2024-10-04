import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './auth/login';
import RegisterPage from './auth/register';
import ForgotPassword from './components/auth/forgotpassword';
import DashboardHome from './dashboard/page';
import Invoice from './dashboard/invoice/App';
import Chat from './dashboard/chat/App';
import CreateInvoice from './dashboard/invoice/create/App';
import ViewInvoice from './dashboard/invoice/view/App';
import EditInvoice from './dashboard/invoice/edit/App';
import VerifyOtp from './components/auth/verify-code';
import ConfirmAccount from './components/auth/confirm-account';
import Profile from './dashboard/profile/App';
import Setting from './dashboard/settings/App'
import ProtectedRoute from './components/auth/ProtectedRoute';
import Waveform from './dashboard/voice/App';
import Social from './dashboard/social/App'

// New component to wrap dashboard routes
const DashboardWrapper = () => {
  return (
    <Routes>
      <Route index path="dashboard" element={<DashboardHome />} />
      <Route path="invoice" element={<Invoice />} />
      <Route path="invoice/create" element={<CreateInvoice />} />
      <Route path="invoice/edit/:invoiceId" element={<EditInvoice />} />
      <Route path="invoice/view/:invoiceId" element={<ViewInvoice />} />
      <Route path="chat" element={<Chat />} />
      <Route path="profile" element={<Profile />} />
      <Route path="setting" element={<Setting />} />
      <Route path="voice" element={<Waveform />} />
      <Route path="social" element={<Social />} />
      {/* Redirect to dashboard home for any unmatched routes */}
      <Route path="*" element={<Navigate to="/dase/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dase/register" element={<RegisterPage />} />
      <Route path="/dase/verifyotp" element={<VerifyOtp/>} />
      <Route path="/dase/confirm-account" element={<ConfirmAccount/>} />
      <Route path="/dase/forget-password" element={<ForgotPassword/>} />

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
