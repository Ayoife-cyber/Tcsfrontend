import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchCategories } from "../../api/designs.js";
import { createCategory, updateCategory, deleteCategory } from "../../api/admin.js";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineCheck, HiOutlineX } from "react-icons/hi";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const load = () => {
    setLoading(true);
    fetchCategories()
      .then((data) => setCategories(data.categories))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    setSubmitting(true);
    try {
      await createCategory({ name: name.trim() });
      setName("");
      toast.success("Category created");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add category");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (cat) => {
    setEditingId(cat._id);
    setEditingName(cat.name);
  };

  const saveEdit = async (id) => {
    try {
      await updateCategory(id, { name: editingName });
      setEditingId(null);
      toast.success("Category updated");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update category");
    }
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Delete category "${cat.name}"?`)) return;
    try {
      await deleteCategory(cat._id);
      toast.success("Category deleted");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl text-cream">Couture Categories</h1>
        <p className="text-cream/50 text-xs sm:text-sm font-light mt-1">
          Organize your fashion capsules (e.g. Corsetry, Gala Gowns, Aso-Ebi, Two-Piece Sets).
        </p>
      </div>

      {/* Add Category Form */}
      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 bg-charcoal/40 border border-gold/15 p-4 rounded-xl backdrop-blur-md">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New capsule category name (e.g. Bridal & Reception)"
          className="flex-1 bg-charcoal/80 border border-gold/20 text-cream text-xs sm:text-sm px-4 py-3 rounded-lg focus:outline-none transition-all"
        />
        <button 
          type="submit"
          disabled={submitting}
          className="btn-gold-glow inline-flex items-center justify-center gap-2 bg-gold text-black px-6 py-3 rounded-lg text-xs tracking-widest uppercase hover:bg-gold-dark font-semibold transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiOutlinePlus className="text-base" />
          {submitting ? "Adding..." : "Add Category"}
        </button>
      </form>

      {/* Categories List */}
      {loading ? (
        <p className="text-cream/50 py-8 text-center text-sm">Loading categories...</p>
      ) : (
        <div className="rounded-xl border border-gold/15 bg-[#0a080b]/50 backdrop-blur-xl shadow-2xl divide-y overflow-hidden">
          {categories.map((cat) => (
            <div key={cat._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-3 hover:bg-white/5 transition-colors group">
              {editingId === cat._id ? (
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 bg-charcoal/90 border border-gold/40 text-cream text-xs sm:text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold/50 shadow-inner"
                />
              ) : (
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/5 flex items-center justify-center border border-gold/10 group-hover:bg-gold/10 transition-colors">
                    <span className="text-rose-gold text-xs">✦</span>
                  </div>
                  <span className="text-cream font-medium text-sm sm:text-base tracking-wide">{cat.name}</span>
                </div>
              )}

              <div className="flex items-center gap-2 self-end sm:self-auto">
                {editingId === cat._id ? (
                  <>
                    <button 
                      onClick={() => saveEdit(cat._id)} 
                      className="inline-flex items-center gap-1 bg-gold text-black px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gold-dark transition-all shadow-md"
                    >
                      <HiOutlineCheck className="text-sm" />
                      <span className="hidden sm:inline">Save</span>
                    </button>
                    <button 
                      onClick={() => setEditingId(null)} 
                      className="inline-flex items-center gap-1 border border-white/15 text-cream/60 px-4 py-2 rounded-lg text-xs hover:bg-white/10 hover:text-cream transition-all"
                    >
                      <HiOutlineX className="text-sm" />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => startEdit(cat)} 
                      className="inline-flex items-center gap-1 border border-gold/30 text-gold px-4 py-2 rounded-lg text-xs hover:bg-gold hover:text-black transition-all font-medium"
                    >
                      <HiOutlinePencil className="text-sm" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(cat)} 
                      className="inline-flex items-center gap-1 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-xs hover:bg-red-500 hover:text-white transition-all font-medium"
                    >
                      <HiOutlineTrash className="text-sm" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="p-8 text-center text-cream/40 font-light">
              No categories created yet. Use the form above to add your first category.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
