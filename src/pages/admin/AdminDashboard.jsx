import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDashboardStats, updateRequestStatus } from "../../api/admin.js";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  HiOutlineSparkles, 
  HiOutlineDatabase, 
  HiOutlineClipboardList, 
  HiOutlineBell, 
  HiOutlineRefresh, 
  HiOutlineCheckCircle,
  HiOutlineArrowRight
} from "react-icons/hi";

const iconMap = {
  "Total Designs": <HiOutlineSparkles />,
  "Available Designs": <HiOutlineDatabase />,
  "Total Requests": <HiOutlineClipboardList />,
  "New Requests": <HiOutlineBell />,
  "In Progress": <HiOutlineRefresh />,
  "Completed": <HiOutlineCheckCircle />,
};

const StatCard = ({ label, value, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    whileHover={{ 
      y: -5, 
      borderColor: "rgba(212, 175, 55, 0.4)",
      boxShadow: "0 10px 30px -10px rgba(212, 175, 55, 0.15)",
    }}
    className="relative overflow-hidden border border-gold/15 p-4 sm:p-5 bg-charcoal/40 backdrop-blur-md rounded-xl flex flex-col sm:flex-row gap-3 sm:gap-0 items-start sm:items-center justify-between transition-all duration-300 group cursor-default shadow-lg"
  >
    <div className="absolute inset-0 bg-linear-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <p className="text-cream/50 text-[10px] sm:text-xs uppercase tracking-widest mb-1 sm:mb-2 font-medium">{label}</p>
      <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-cream group-hover:text-gold transition-colors duration-300">{value}</p>
    </div>
    <div className="relative z-10 bg-gold/5 p-2.5 sm:p-3 rounded-lg sm:rounded-full text-gold text-xl sm:text-2xl border border-gold/10 group-hover:bg-gold group-hover:text-black group-hover:scale-110 transition-all duration-500 self-end sm:self-auto">
      {iconMap[label] || <HiOutlineDatabase />}
    </div>
  </motion.div>
);

const statusPillStyles = {
  New: "bg-gold/10 text-gold border border-gold/20",
  Contacted: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
  Confirmed: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
  "In Progress": "bg-amber-500/10 text-amber-300 border border-amber-500/20",
  Completed: "bg-green-500/10 text-green-400 border border-green-500/20",
  Cancelled: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const loadStats = () => {
    setLoading(true);
    fetchDashboardStats()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await updateRequestStatus(id, newStatus);
      toast.success("Order status updated");
      loadStats();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-10 animate-pulse">
        {/* Header skeleton */}
        <div>
          <div className="h-9 w-64 bg-white/5 rounded-lg mb-2" />
          <div className="h-3 w-48 bg-white/5 rounded" />
        </div>
        {/* Stat cards skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 sm:h-28 bg-white/5 rounded-xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6">
              <div className="space-y-2">
                <div className="h-2 w-16 bg-white/10 rounded" />
                <div className="h-6 sm:h-8 w-10 bg-white/10 rounded" />
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-full bg-white/5 self-end sm:self-auto" />
            </div>
          ))}
        </div>
        {/* Table skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-40 bg-white/5 rounded" />
          <div className="border border-white/5 rounded-xl overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 p-4 border-b border-white/5">
                <div className="h-3 w-16 bg-white/5 rounded" />
                <div className="h-3 w-28 bg-white/5 rounded" />
                <div className="h-3 w-24 bg-white/5 rounded" />
                <div className="h-3 w-20 bg-white/5 rounded ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.stats) {
    return (
      <div className="p-8 text-center text-cream">
        <HiOutlineRefresh className="mx-auto text-4xl text-red-400 mb-4" />
        <h2 className="text-xl font-bold mb-2">Failed to load dashboard data</h2>
        <p className="text-cream/50 mb-6">Your session might have expired, or the server blocked the request due to cross-site cookie settings on your mobile device.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gold/10 text-gold border border-gold/20 rounded hover:bg-gold hover:text-black transition-colors">
          Refresh Page
        </button>
      </div>
    );
  }

  const { stats, recentRequests } = data;

  const statItems = [
    { label: "Total Designs", value: stats.totalDesigns },
    { label: "Available Designs", value: stats.availableDesigns },
    { label: "Total Requests", value: stats.totalRequests },
    { label: "New Requests", value: stats.newRequests },
    { label: "In Progress", value: stats.inProgress },
    { label: "Completed", value: stats.completed },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 sm:space-y-10"
    >
      <div>
        <h1 className="font-display text-3xl sm:text-4xl text-cream leading-tight">Dashboard Overview</h1>
        <p className="text-[10px] sm:text-xs text-cream/40 mt-1 uppercase tracking-widest">Real-time statistics & customer activities</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {statItems.map((item, index) => (
          <StatCard 
            key={item.label} 
            label={item.label} 
            value={item.value} 
            index={index} 
          />
        ))}
      </div>

      {/* Recent Requests Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-gold text-sm uppercase tracking-[0.2em] font-semibold">Recent Stylist Requests</h2>
          <Link 
            to="/admin/requests" 
            className="text-xs text-cream/60 hover:text-gold flex items-center gap-1.5 transition-colors group"
          >
            View All Requests 
            <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Requests Table */}
        <div className="overflow-hidden border border-gold/15 bg-charcoal/30 backdrop-blur-md rounded-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-gold/10 text-cream/50 text-[10px] uppercase tracking-widest font-semibold">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Design Item</th>
                  <th className="text-left p-4">Quoted Price</th>
                  <th className="text-left p-4">Date Submitted</th>
                  <th className="text-left p-4">Current Status</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentRequests.map((r) => (
                  <tr key={r._id} className="text-cream/80 hover:bg-white/5 transition-all duration-300">
                    <td className="p-4 whitespace-nowrap font-mono text-xs text-gold/80 font-bold">{r.requestNumber}</td>
                    <td className="p-4 font-medium">{r.customerName}</td>
                    <td className="p-4 text-cream/75">{r.designName}</td>
                    <td className="p-4 font-semibold">₦{Number(r.designPrice).toLocaleString()}</td>
                    <td className="p-4 text-cream/45 text-xs">{new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="p-4">
                      <select
                        value={r.status}
                        onChange={(e) => handleStatusChange(r._id, e.target.value)}
                        disabled={updatingId === r._id}
                        className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold focus:outline-none transition-colors ${statusPillStyles[r.status] || "bg-white/5 text-cream/70"}`}
                      >
                        {["New", "Contacted", "Confirmed", "In Progress", "Completed", "Cancelled"].map(s => (
                          <option key={s} value={s} className="bg-charcoal text-cream">{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <Link 
                        to={`/admin/requests/${r._id}`} 
                        className="inline-flex items-center gap-1 bg-gold/5 border border-gold/30 hover:bg-gold hover:text-black text-gold text-xs px-3 py-1.5 rounded-md transition-all duration-300 font-medium"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
                {recentRequests.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-cream/40">
                      <p className="text-sm">No incoming customer requests found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
