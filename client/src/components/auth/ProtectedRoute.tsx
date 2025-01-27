import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

interface ProtectedRouteProps {
  requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decodedData = jwtDecode<DecodedToken>(token);
      if (decodedData.role !== requiredRole) {
        navigate(-1); 
      }
    }
  }, [navigate, token, requiredRole]);

  if (!token) return <Navigate to="/" />;

  const decodedData = jwtDecode<DecodedToken>(token);

  if (decodedData.role === requiredRole) {
    return <Outlet />;
  }

  return null;
};

export default ProtectedRoute;
