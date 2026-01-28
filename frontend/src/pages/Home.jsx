import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div>
      <h1>home</h1>
      <button onClick={handleClick}>Login page </button>
    </div>
  );
};

export default Home;
