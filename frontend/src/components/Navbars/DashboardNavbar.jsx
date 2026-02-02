import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/nav.css";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left */}
      <h1 className="navbar__title">OAuth Project </h1>

      {/* Right */}
      <div>
        <button onClick={() => navigate("/")} className="navbar__logout-btn">
          Home
        </button>

        <button onClick={handleLogout} className="navbar__logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
