import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [params] = useSearchParams();
  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);
  return <h1>dashboard</h1>;
};

export default Dashboard;
