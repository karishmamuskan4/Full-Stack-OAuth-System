import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // On app load: restore token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuth(true);
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
