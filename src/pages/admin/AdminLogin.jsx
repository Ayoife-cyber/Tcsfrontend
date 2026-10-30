import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import logoImg from "../../assets/logo.png";
import { HiOutlineArrowLeft, HiOutlineLockClosed } from "react-icons/hi";

const AdminLogin = () => {
  const { admin, loading, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && admin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-gold/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md border border-gold/20 bg-charcoal/60 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl relative z-10">
        {/* Brand Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <img src={logoImg} alt="Tumzy Couture and Styles" className="h-14 w-auto object-contain mb-3" />
          <h1 className="font-display text-2xl sm:text-3xl text-cream">
            Tumzy <span className="text-gold">Couture</span> & Styles
          </h1>
          <div className="inline-flex items-center gap-1.5 border border-rose-gold/30 bg-rose-gold/5 px-3 py-1 rounded-full mt-2">
            <HiOutlineLockClosed className="text-rose-gold text-xs" />
            <span className="text-rose-gold text-[10px] uppercase tracking-widest font-semibold">Atelier Admin Portal</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream/70 font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@tumzycouture.com"
              className="w-full bg-charcoal/80 border border-gold/20 rounded-lg text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all placeholder:text-cream/30"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream/70 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-charcoal/80 border border-gold/20 rounded-lg text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all placeholder:text-cream/30"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn-gold-glow w-full bg-gold text-black py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-gold-dark transition-all rounded-lg disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.25)] mt-2"
          >
            {submitting ? "Authenticating..." : "Sign In to Admin"}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gold/10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-cream/50 hover:text-rose-gold transition-colors font-light"
          >
            <HiOutlineArrowLeft />
            Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
