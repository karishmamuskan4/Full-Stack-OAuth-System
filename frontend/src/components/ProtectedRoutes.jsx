import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: "Dashboard access is only for our logged in users",
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;
