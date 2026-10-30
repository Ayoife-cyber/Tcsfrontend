import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchAdminRequests, updateRequestStatus, deleteRequest } from "../../api/admin.js";
import toast from "react-hot-toast";

const STATUSES = ["New", "Contacted", "Confirmed", "In Progress", "Completed", "Cancelled"];

const statusBadgeStyles = {
  New: "bg-gold/15 text-gold border border-gold/30",
  Contacted: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  Confirmed: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  "In Progress": "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  Completed: "bg-green-500/15 text-green-300 border border-green-500/30",
  Cancelled: "bg-red-500/15 text-red-300 border border-red-500/30",
};

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const loadRequests = useCallback(() => {
    setLoading(true);
    const params = {};
    if (status) params.status = status;
    if (search.trim()) params.search = search.trim();

    fetchAdminRequests(params)
      .then((data) => setRequests(data.requests))
      .finally(() => setLoading(false));
  }, [status, search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadRequests();
    }, 300);
    return () => clearTimeout(timeout);
  }, [loadRequests]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await updateRequestStatus(id, newStatus);
      toast.success("Order status updated");
      loadRequests(); // refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request? This cannot be undone.")) return;
    
    try {
      await deleteRequest(id);
      toast.success("Request deleted");
      loadRequests();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete request");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl text-cream mb-2">Customer Styling Requests</h1>
        <p className="text-cream/50 text-xs sm:text-sm font-light">
          Manage bespoke tailor orders, measurements, and customer status updates.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer name, email, phone, #ID..."
          className="flex-1 bg-charcoal/60 border border-gold/20 text-xs sm:text-sm px-4 py-3 rounded-lg focus:outline-none transition-all placeholder:text-cream/30"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-charcoal/80 border border-gold/20 text-cream text-xs sm:text-sm px-4 py-3 rounded-lg focus:outline-none"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      {loading ? (
        <p className="text-cream/50 py-8 text-center text-sm">Loading requests...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gold/15 bg-[#0a080b]/50 backdrop-blur-xl shadow-2xl scrollbar-thin">
          <table className="w-full text-xs sm:text-sm">
            <thead className="sticky top-0 z-10 bg-[#0a080b]/90 backdrop-blur-md">
              <tr className="text-cream/50 text-[10px] sm:text-[11px] uppercase tracking-widest border-b border-gold/10">
                <th className="text-left p-4 sm:px-6">Request #</th>
                <th className="text-left p-4 sm:px-6">Customer</th>
                <th className="text-left p-4 sm:px-6">Contact</th>
                <th className="text-left p-4 sm:px-6">Design</th>
                <th className="text-left p-4 sm:px-6">Price</th>
                <th className="text-left p-4 sm:px-6">Date</th>
                <th className="text-left p-4 sm:px-6">Status</th>
                <th className="text-right p-4 sm:px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-cream/80">
              {requests.map((r) => (
                <tr key={r._id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4 sm:px-6 font-mono font-medium text-gold whitespace-nowrap">{r.requestNumber}</td>
                  <td className="p-4 sm:px-6 font-medium text-cream whitespace-nowrap">{r.customerName}</td>
                  <td className="p-4 sm:px-6 whitespace-nowrap">
                    <p className="text-cream/80 text-xs">{r.email}</p>
                    <p className="text-cream/40 text-[10px] mt-0.5">{r.phone}</p>
                  </td>
                  <td className="p-4 sm:px-6 whitespace-nowrap">{r.designName}</td>
                  <td className="p-4 sm:px-6 whitespace-nowrap font-medium text-cream">₦{Number(r.designPrice).toLocaleString()}</td>
                  <td className="p-4 sm:px-6 whitespace-nowrap text-cream/50 text-xs">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 sm:px-6 whitespace-nowrap">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r._id, e.target.value)}
                      disabled={updatingId === r._id}
                      className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-semibold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all shadow-sm ${statusBadgeStyles[r.status] || "bg-white/10 text-cream"}`}
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s} className="bg-charcoal text-cream">{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 sm:px-6 text-right whitespace-nowrap space-x-2">
                    <Link 
                      to={`/admin/requests/${r._id}`} 
                      className="inline-block border border-gold/40 text-gold px-4 py-2 rounded-lg text-xs hover:bg-gold hover:text-black transition-all font-medium shadow-sm"
                    >
                      Manage
                    </Link>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="inline-block border border-red-500/40 text-red-400 px-4 py-2 rounded-lg text-xs hover:bg-red-500 hover:text-white transition-all font-medium shadow-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 sm:p-12 text-center text-cream/40 font-light text-sm">
                    No styling requests match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
