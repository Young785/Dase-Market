import { Navigate, useLocation } from 'react-router-dom';

// Role-aware route guard
// Usage: <ProtectedRoute allowedRoles={["engineer"]}>...</ProtectedRoute>
const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();

  // Check if the user is authenticated by checking localStorage
  const authRaw = localStorage.getItem('auth_data');
  if (!authRaw) {
    return <Navigate to="/" replace />;
  }

  // If roles are specified, ensure the user matches by role OR account_type/user_type
  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    try {
      const { user } = JSON.parse(authRaw);
      // Normalize various possible shapes from backend
      const rawCandidates = [
        user?.role,
        user?.role?.name,
        user?.role_name,
        user?.account_type,
        user?.account_type?.name,
        user?.user_type,
        user?.user_type?.name,
      ].filter(Boolean);

      const candidates = rawCandidates.map((v) =>
        typeof v === 'string' ? v.toLowerCase() : String(v).toLowerCase()
      );
      const normalizedAllowed = allowedRoles.map(r => r.toString().toLowerCase());
      const isAllowed = candidates.some(c => normalizedAllowed.includes(c));
      if (!isAllowed) {
        // Unauthorized for this route; redirect to dashboard
        return <Navigate to="/dase/dashboard" state={{ from: location }} replace />;
      }
    } catch {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
