import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./authContext"; 
import { AuthConstants } from "./authConstants";

const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth(); 

  const isActuallyAuthenticated = isAuthenticated || 
    localStorage.getItem(AuthConstants.AuthCheckStorageItemName) === "true";

  if (!isActuallyAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;