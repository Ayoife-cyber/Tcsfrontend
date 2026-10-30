import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAdminProfile, loginAdmin as apiLogin, logoutAdmin as apiLogout } from "../api/admin.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminProfile()
      .then((data) => setAdmin(data.admin))
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  // Listen for global "unauthorized" events dispatched by the axios
  // response interceptor on 401 responses. This keeps the admin state in
  // sync when an API call rejects an expired/invalid session, so the
  // ProtectedRoute can immediately bounce the user back to /admin/login
  // instead of leaving stale UI in place.
  useEffect(() => {
    const handleUnauthorized = () => setAdmin(null);
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    setAdmin(data.admin);
    return data;
  };

  const logout = async () => {
    await apiLogout();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
