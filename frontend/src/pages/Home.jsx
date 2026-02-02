import "../styles/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to Test Our OAuth System</h1>

      <p>
        This project demonstrates a secure OAuth 2.0 authentication flow using
        Google Sign-In. Users can log in safely and access protected routes
        after authentication.
      </p>

      <div className="home__actions">
        <button onClick={() => navigate("/login")}>Continue with Google</button>

        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </div>
    </div>
  );
};

export default Home;
