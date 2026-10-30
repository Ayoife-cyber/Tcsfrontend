import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black flex-col gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
        <p className="text-cream/40 text-xs uppercase tracking-widest">Verifying session...</p>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
