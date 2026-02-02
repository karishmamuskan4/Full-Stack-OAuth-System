import { useNavigate } from "react-router-dom";
import "../../styles/nav.css";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <nav className="navbar">
      <h1 className="navbar__title">OAuth Project</h1>
      <button className="navbar__google-btn" onClick={handleGoogleLogin}>
        Continue with Google
      </button>
    </nav>
  );
};

export default PublicNavbar;
