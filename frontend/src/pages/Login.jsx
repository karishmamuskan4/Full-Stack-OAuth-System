import Reac from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };
  return (
    <div>
      {message && (
        <div
          style={{
            background: "#ffe5e5",
            color: "#b00020",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
          }}
        >
          ⚠️ {message}
        </div>
      )}
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        home
      </button>
    </div>
  );
};

export default Login;
