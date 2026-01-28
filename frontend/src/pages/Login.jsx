import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };
  return (
    <div>
      <h1>WELCOME TO LOGIN PAGE</h1>
      <p>PLZ PRESS ON LOGIN BUTTON TO SIGNUP WITH GOOGLE</p>
      <button onClick={handleLogin}>LOGIN</button>
    </div>
  );
};

export default Login;
