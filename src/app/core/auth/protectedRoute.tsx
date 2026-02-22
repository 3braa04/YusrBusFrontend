import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext"; 

const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth(); 

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;