import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [params] = useSearchParams();
  const { login, isAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  useEffect(() => {
    const token = params.get("token");

    if (token && !isAuth) {
      login(token); // save token to context + localStorage
      navigate("/dashboard"); // remove token from URL
    }
  }, [params, login, navigate, isAuth]);

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
