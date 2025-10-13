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

  // If roles are specified, ensure the user has one of them
  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    try {
      const { user } = JSON.parse(authRaw);
      const userRole = (user?.role || '').toString().toLowerCase();
      const normalizedAllowed = allowedRoles.map(r => r.toString().toLowerCase());
      if (!normalizedAllowed.includes(userRole)) {
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
