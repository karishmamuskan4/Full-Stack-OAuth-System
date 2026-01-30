import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home Page</h1>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
      <p>already logged in then go to dashboard</p>
      <button
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Dashboard
      </button>
    </div>
  );
};

export default Home;
