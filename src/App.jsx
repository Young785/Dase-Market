import { Routes, Route } from 'react-router-dom';
import LoginPage from './login';
import RegisterPage from './register';
import ForgotPassword from './components/forgotpassword';
import DashboardHome from './dashboard/page';
import Invoice from './dashboard/invoice/App';
import Chat from './dashboard/chat/App';
import CreateInvoice from './dashboard/invoice/create/App';
import ViewInvoice from './dashboard/invoice/view/App';
import VerifyOtp from './components/verify-code';
import ConfirmAccount from './components/confirm-account';
import Profile from './dashboard/profile/App';
import Setting from './dashboard/settings/App'
import ProtectedRoute from './components/ProtectedRoute';
import Waveform from './dashboard/voice/App';
import Social from './dashboard/social/App'


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
        path="/dase/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dase/invoice" 
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dase/invoice/create" 
        element={
          <ProtectedRoute>
            <CreateInvoice />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dase/invoice/view" 
        element={
          <ProtectedRoute>
            <ViewInvoice />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dase/chat" 
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dase/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dase/setting" 
        element={
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dase/voice" 
        element={
          <ProtectedRoute>
            <Waveform />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dase/social" 
        element={
          <ProtectedRoute>
            <Social />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<LoginPage />} />


    </Routes>
  );
}

export default App;
