import { createContext, useEffect, useState } from "react";

// Crea il contesto
export const AuthContext = createContext();

// Provider per gestire lo stato di autenticazione
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token, username, email) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("email", email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

