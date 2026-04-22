import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [botCode, setBotCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  // Check karo bot activated hai ya nahi
  useEffect(() => {
    const checkBot = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          withCredentials: true,
        });
        if (res.data.user?.whatsappNumber) {
          setIsActivated(true);
        } else {
          setShowModal(true); // Pehli baar — modal auto open
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkBot();
  }, []);

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

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const waLink = botCode
    ? `https://wa.me/14155238886?text=CLIPIN-${botCode.code}`
    : null;

  return (
    <div className="dashboard">
      <h1>Welcome to ClipIn 📌</h1>

      {/* Chota button — already activated */}
      {isActivated && (
        <button
          onClick={() => setShowModal(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#25D366",
            color: "white",
            border: "none",
            borderRadius: "50px",
            padding: "10px 20px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          💬 WhatsApp Bot
        </button>
      )}

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
            }}
          >
            <h2>📱 Activate WhatsApp Bot</h2>
            <p>
              Save anything to ClipIn directly from WhatsApp — no app needed!
            </p>

            {!botCode ? (
              <button
                className="home-btn"
                onClick={handleActivateBot}
                disabled={loading}
                style={{ marginTop: "1rem" }}
              >
                {loading ? "Generating..." : "Generate Activation Code"}
              </button>
            ) : (
              <div>
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
                  <button
                    className="home-btn"
                    style={{ background: "#25D366", marginTop: "0.5rem" }}
                  >
                    💬 Open WhatsApp & Activate
                  </button>
                </a>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "1rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "gray",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        <button className="home-btn" onClick={handleLogout}>
          Logout
        </button>
        <button className="home-btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
