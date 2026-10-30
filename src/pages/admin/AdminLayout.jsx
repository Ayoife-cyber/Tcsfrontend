import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineSparkles,
  HiOutlineCollection,
  HiOutlineClipboardList,
  HiOutlineLogout,
  HiMenu,
  HiX,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";
import logoImg from "../../assets/logo.png";
import { fetchDashboardStats } from "../../api/admin.js";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/admin", label: "Dashboard", icon: <HiOutlineViewGrid />, end: true },
  { to: "/admin/designs", label: "Designs", icon: <HiOutlineSparkles /> },
  { to: "/admin/categories", label: "Categories", icon: <HiOutlineCollection /> },
  { to: "/admin/requests", label: "Customer Requests", icon: <HiOutlineClipboardList /> },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [newRequestsCount, setNewRequestsCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!admin) return;

    const loadCount = () => {
      fetchDashboardStats()
        .then((data) => {
          if (data?.stats?.newRequests !== undefined) {
            setNewRequestsCount(data.stats.newRequests);
          }
        })
        .catch(console.error);
    };

    loadCount();
    const interval = setInterval(loadCount, 15000); // Polling every 15s instead of 3s to save resources
    return () => clearInterval(interval);
  }, [admin]);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 rounded-lg mx-3 my-1 ${
      isActive 
        ? "bg-gold text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-[1.02]" 
        : "text-cream/60 hover:bg-white/5 hover:text-gold hover:translate-x-1"
    }`;

  const sidebarContent = (
    <>
      <div className="p-6 border-b border-gold/10">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Tumzy Couture Logo" className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]" />
          <div className="flex flex-col">
            <span className="font-display text-base text-cream leading-tight font-bold">Tumzy Couture</span>
            <span className="text-[9px] uppercase tracking-widest text-gold font-light mt-0.5">Admin Panel</span>
          </div>
        </div>
        {admin && <p className="text-[10px] text-cream/40 mt-3 bg-white/5 px-2.5 py-1 rounded-full w-max border border-white/5">{admin.email}</p>}
      </div>

      <nav className="flex flex-col flex-1 overflow-y-auto py-4 scrollbar-thin">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
            <span className="text-lg">{link.icon}</span>
            <span className="whitespace-nowrap flex-1">{link.label}</span>
            {link.label === "Customer Requests" && newRequestsCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse">
                {newRequestsCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-4 px-5 py-4 text-sm font-medium text-cream/50 hover:text-red-400 hover:bg-red-500/5 border-t border-gold/10 mt-auto transition-colors duration-300"
      >
        <HiOutlineLogout className="text-lg" />
        <span>Logout Session</span>
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row text-cream">
      
      {/* ── Mobile Header ─────────────────────────── */}
      <div className="md:hidden flex items-center justify-between p-4 bg-charcoal/90 backdrop-blur-xl border-b border-gold/15 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Logo" className="h-8 w-auto object-contain" />
          <span className="font-display text-sm text-cream font-bold uppercase tracking-widest">Admin</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-gold/20 text-gold bg-gold/5 hover:bg-gold/10 transition-all"
        >
          <HiMenu className="text-xl" />
        </button>
      </div>

      {/* ── Desktop Sidebar ────────────────────────── */}
      <aside className="hidden md:flex w-64 bg-[#0a080b] border-r border-gold/15 flex-col shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-30">
        {sidebarContent}
      </aside>

      {/* ── Mobile Sidebar Drawer ──────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-[#0a080b] border-r border-gold/15 flex flex-col shadow-2xl z-50 md:hidden"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-cream hover:text-gold hover:border-gold transition-all"
              >
                <HiX className="text-lg" />
              </button>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ───────────────────────────── */}
      <main className="flex-1 overflow-x-hidden bg-radial from-charcoal/20 to-black relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="p-4 sm:p-6 md:p-10 relative z-10 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
