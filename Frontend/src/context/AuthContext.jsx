// AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [access, setAccess] = useState(() => localStorage.getItem("access"));
  const [refresh, setRefresh] = useState(() => localStorage.getItem("refresh"));
  const [user, setUser] = useState(() => {
    try {
      const storedAccess = localStorage.getItem("access");
      return storedAccess ? jwtDecode(storedAccess) : null;
    } catch (err) {
      console.error("Error decoding token at init:", err);
      return null;
    }
  });

  useEffect(() => {
    if (access && refresh) {
      scheduleRefresh(access);
    }
  }, [ [access, refresh]]);

  const scheduleRefresh = (token) => {
    try {
      const decoded = jwtDecode(token);
      const expiry = decoded.exp * 1000;
      const timeout = expiry - Date.now() - 60000; // 1 min before expiry
      console.log("Token will refresh in:", timeout / 1000, "seconds");
      console.log(user)
      if (timeout > 0) {
        setTimeout(() => refreshAccess(refresh), timeout);
      } else {
        refreshAccess(refresh);
      }
    } catch (err) {
      console.error("scheduleRefresh decode error:", err);
      logout();
    }
  };

  const refreshAccess = async (refreshToken) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!res.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await res.json();
      if (data.access) {
        localStorage.setItem("access", data.access);
        setAccess(data.access);
        setUser(jwtDecode(data.access));
          if (data.refresh) {
    localStorage.setItem("refresh", data.refresh);
    setRefresh(data.refresh);
  }
        scheduleRefresh(data.access);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Token refresh error:", err);
      logout();
    }
  };

  const login = async (username, password) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      if (data.access && data.refresh) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setAccess(data.access);
        setRefresh(data.refresh);
        setUser(jwtDecode(data.access));
        scheduleRefresh(data.access);
        return true;
      }

      return false;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const logout = () => {
    setAccess(null);
    setRefresh(null);
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, access, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
