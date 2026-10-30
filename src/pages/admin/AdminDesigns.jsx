import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchDesigns } from "../../api/designs.js";
import { deleteDesign, updateDesign } from "../../api/admin.js";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

const AdminDesigns = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchDesigns()
      .then((data) => setDesigns(data.designs))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleToggleAvailability = async (design) => {
    const formData = new FormData();
    formData.append("available", (!design.available).toString());
    try {
      await updateDesign(design._id, formData);
      toast.success(`Marked as ${!design.available ? "available" : "unavailable"}`);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update design");
    }
  };

  const handleToggleFeatured = async (design) => {
    const formData = new FormData();
    formData.append("featured", (!design.featured).toString());
    try {
      await updateDesign(design._id, formData);
      toast.success(design.featured ? "Removed from featured" : "Added to featured");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update design");
    }
  };

  const handleDelete = async (design) => {
    if (!window.confirm(`Delete "${design.name}"? This cannot be undone.`)) return;
    try {
      await deleteDesign(design._id);
      toast.success("Design deleted");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete design");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-cream">Couture Silhouettes</h1>
          <p className="text-cream/50 text-xs sm:text-sm font-light mt-1">
            Manage your design catalog, stock availability, and featured showcases.
          </p>
        </div>
        <Link
          to="/admin/designs/new"
          className="btn-gold-glow inline-flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-lg text-xs tracking-widest uppercase hover:bg-gold-dark font-semibold transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)] self-start sm:self-auto"
        >
          <HiOutlinePlus className="text-base" />
          Add New Design
        </Link>
      </div>

      {loading ? (
        <p className="text-cream/50 py-8 text-center text-sm">Loading design catalog...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gold/15 bg-[#0a080b]/50 backdrop-blur-xl shadow-2xl scrollbar-thin">
          <table className="w-full text-xs sm:text-sm">
            <thead className="sticky top-0 z-10 bg-[#0a080b]/90 backdrop-blur-md">
              <tr className="text-cream/50 text-[10px] sm:text-[11px] uppercase tracking-widest border-b border-gold/10">
                <th className="text-left p-4 sm:px-6">Image</th>
                <th className="text-left p-4 sm:px-6">Silhouette Name</th>
                <th className="text-left p-4 sm:px-6">Category</th>
                <th className="text-left p-4 sm:px-6">Price</th>
                <th className="text-left p-4 sm:px-6">Availability</th>
                <th className="text-left p-4 sm:px-6">Featured</th>
                <th className="text-right p-4 sm:px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-cream/80">
              {designs.map((d) => (
                <tr key={d._id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4 sm:px-6">
                    <div className="w-12 h-16 rounded-lg overflow-hidden border border-gold/20 bg-charcoal relative">
                      <img src={d.mainImage?.url} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </td>
                  <td className="p-4 sm:px-6 font-medium text-cream whitespace-nowrap">{d.name}</td>
                  <td className="p-4 sm:px-6 text-cream/70 whitespace-nowrap">{d.category?.name || "—"}</td>
                  <td className="p-4 sm:px-6 font-medium text-gold whitespace-nowrap">₦{Number(d.price).toLocaleString()}</td>
                  <td className="p-4 sm:px-6 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleAvailability(d)}
                      className={`text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-semibold border transition-all ${
                        d.available 
                          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25" 
                          : "bg-white/5 border-white/10 text-cream/40 hover:bg-white/10"
                      }`}
                    >
                      {d.available ? "● Available" : "○ Reserved"}
                    </button>
                  </td>
                  <td className="p-4 sm:px-6 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleFeatured(d)}
                      className={`text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-semibold border transition-all ${
                        d.featured 
                          ? "bg-gold/15 border-gold/30 text-gold hover:bg-gold/25 shadow-[0_0_10px_rgba(212,175,55,0.2)]" 
                          : "bg-white/5 border-white/10 text-cream/40 hover:bg-white/10"
                      }`}
                    >
                      {d.featured ? "★ Featured" : "☆ Regular"}
                    </button>
                  </td>
                  <td className="p-4 sm:px-6 text-right whitespace-nowrap space-x-2">
                    <Link 
                      to={`/admin/designs/${d._id}/edit`} 
                      className="inline-flex items-center gap-1 border border-gold/30 text-gold px-3 sm:px-4 py-2 rounded-lg text-xs hover:bg-gold hover:text-black transition-all font-medium"
                    >
                      <HiOutlinePencil className="text-sm" />
                      <span className="hidden sm:inline">Edit</span>
                    </Link>
                    <button 
                      onClick={() => handleDelete(d)} 
                      className="inline-flex items-center gap-1 border border-red-500/30 text-red-400 px-3 sm:px-4 py-2 rounded-lg text-xs hover:bg-red-500 hover:text-white transition-all font-medium"
                    >
                      <HiOutlineTrash className="text-sm" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {designs.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-cream/40 font-light">
                    No designs published yet. Click "+ Add New Design" to upload your first silhouette.
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

export default AdminDesigns;
