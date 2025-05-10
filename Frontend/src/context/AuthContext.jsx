// AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [access, setAccess] = useState(localStorage.getItem("access"));
  const [refresh, setRefresh] = useState(localStorage.getItem("refresh"));
  const [user, setUser] = useState(access ? jwtDecode(access) : null);

  useEffect(() => {
    if (access && refresh) {
      scheduleRefresh();
    }
  }, []);

  const scheduleRefresh = () => {
    const decoded = jwtDecode(access);
    const expiry = decoded.exp * 1000;
    const timeout = expiry - Date.now() - 60000; // refresh 1 min early

    if (timeout > 0) {
      setTimeout(() => refreshAccess(), timeout);
    }
  };

  const refreshAccess = async () => {
    try {
      const res = await fetch("/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      const data = await res.json();
      if (data.access) {
        setAccess(data.access);
        setUser(jwtDecode(data.access));
        localStorage.setItem("access", data.access);
        scheduleRefresh(); // schedule next
      } else {
        logout();
      }
    } catch (err) {
      console.error("Refresh failed", err);
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
        await scheduleRefresh(); // if async
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
  };

  return (
    <AuthContext.Provider value={{ user, access, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
