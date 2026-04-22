import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [botCode, setBotCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleActivateBot = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/bot/generate-code`,
        {},
        { withCredentials: true },
      );
      setBotCode(res.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Try again.");
    }
    setLoading(false);
  };

  const waLink = botCode
    ? `https://wa.me/14155238886?text=CLIPIN-${botCode.code}`
    : null;

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
        <button className="home-btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>📱 WhatsApp Bot</h2>
        <p>Save anything to ClipIn directly from WhatsApp!</p>

        <button
          className="home-btn"
          onClick={handleActivateBot}
          disabled={loading}
        >
          {loading ? "Generating..." : "Activate WhatsApp Bot"}
        </button>

        {botCode && (
          <div style={{ marginTop: "1rem" }}>
            <p>✅ Your activation code:</p>
            <h3
              style={{
                background: "#f0f0f0",
                padding: "10px",
                borderRadius: "8px",
                letterSpacing: "4px",
              }}
            >
              CLIPIN-{botCode.code}
            </h3>
            <p>⚠️ Code expires in 10 minutes!</p>
            <a href={waLink} target="_blank" rel="noreferrer">
              <button className="home-btn" style={{ background: "#25D366" }}>
                💬 Open WhatsApp & Activate
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
