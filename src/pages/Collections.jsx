import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO.jsx";
import { fetchDesigns, fetchCategories } from "../api/designs.js";
import DesignCard from "../components/DesignCard.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import EmptyState from "../components/EmptyState.jsx";

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const Collections = () => {
  const [designs, setDesigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data.categories))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory !== "all") params.category = activeCategory;
    if (search.trim()) params.search = search.trim();

    const timeout = setTimeout(() => {
      fetchDesigns(params)
        .then((data) => setDesigns(data.designs))
        .catch(() => setDesigns([]))
        .finally(() => setLoading(false));
    }, 300); // light debounce for search typing

    return () => clearTimeout(timeout);
  }, [activeCategory, search]);

  const tabs = useMemo(
    () => [{ slug: "all", name: "All" }, ...categories],
    [categories]
  );

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-20 min-h-[80vh]">
      <SEO 
        title="Collections" 
        description="Explore handcrafted bespoke womenswear, sculpted corset gowns, and regal African couture."
        url="https://tumzy-couture.vercel.app/collections"
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 border border-rose-gold/30 bg-rose-gold/5 px-4 py-1.5 rounded-full mb-4">
          <span className="text-rose-gold text-xs">✦</span>
          <span className="text-rose-gold text-[11px] tracking-[0.25em] uppercase font-medium">Atelier Catalog</span>
          <span className="text-rose-gold text-xs">✦</span>
        </div>
        <h1 className="font-display text-5xl sm:text-6xl text-cream mb-4">Signature Collections</h1>
        <p className="text-cream/65 max-w-xl mx-auto text-sm leading-relaxed font-light">
          Explore handcrafted bespoke womenswear, sculpted corset gowns, and regal African couture created for your standout moments.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12 pb-6 border-b border-gold/10">
        <div className="flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.slug}
              onClick={() => setActiveCategory(tab.slug)}
              className={`relative px-5 py-2.5 text-[11px] tracking-widest uppercase transition-all duration-300 rounded-full ${
                activeCategory === tab.slug
                  ? "text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  : "text-cream/70 hover:text-rose-gold bg-white/5 border border-white/5"
              }`}
            >
              <span className="relative z-10">{tab.name}</span>
              {activeCategory === tab.slug && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-gold rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="w-full lg:w-80 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search silhouettes & fabrics..."
            className="w-full bg-charcoal/40 border focus:border-rose-gold/60 text-xs px-4 py-3 rounded-full focus:outline-none transition-all duration-300 placeholder:text-cream/35 focus:shadow-[0_0_15px_rgba(226,180,183,0.15)]"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </motion.div>
        ) : designs.length > 0 ? (
          <motion.div
            key="list"
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {designs.map((design) => (
              <DesignCard key={design._id} design={design} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <EmptyState
              title="No designs found"
              subtitle="We couldn't find any outfits matching your current selection. Try resetting filters."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collections;
