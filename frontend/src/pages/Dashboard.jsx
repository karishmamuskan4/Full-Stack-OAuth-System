import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Dashboard</h1>
      <p className="dashboard-text">
        You have successfully logged in using Google OAuth.
      </p>
      <div>
        <button className="home-btn" onClick={handleLogout}>
          Logout
        </button>
        <button
          className="home-btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
