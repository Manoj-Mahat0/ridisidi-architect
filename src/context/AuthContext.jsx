// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { isTokenExpired, clearAllTokens } from "../utils/tokenUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("adminUser");
    const accessToken = localStorage.getItem("accessToken");
    return savedUser && accessToken ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("adminUser", JSON.stringify(userData));
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);
    localStorage.setItem("tokenExpiry", userData.expiresIn);
  };

  const logout = () => {
    setUser(null);
    clearAllTokens();
  };

  const isAuthenticated = Boolean(user && user.accessToken);

  // Check token validity on app load
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("accessToken");
      const savedUser = localStorage.getItem("adminUser");
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      
      if (!token || !savedUser) {
        logout();
        return;
      }

      // Check if token is expired using utility function
      if (isTokenExpired(tokenExpiry)) {
        logout();
        return;
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
