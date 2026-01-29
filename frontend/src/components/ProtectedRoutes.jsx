import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { isAuth, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!isAuth) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
