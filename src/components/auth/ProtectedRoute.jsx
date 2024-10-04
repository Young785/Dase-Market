import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated by checking localStorage
  const authData = localStorage.getItem('auth_data');

  if (!authData) {
    return <Navigate to="/" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
