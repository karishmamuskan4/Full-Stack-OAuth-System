import { useNavigate } from "react-router-dom";
import "../../styles/nav.css";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <nav className="navbar">
      <h1 className="navbar__title">OAuth Project</h1>
      <button className="navbar__google-btn" onClick={handleGoogleLogin}>
        <a
          href="https://www.flaticon.com/free-icons/google"
          title="google icons"
        >
          Continue with Google
        </a>
      </button>
    </nav>
  );
};

export default PublicNavbar;
