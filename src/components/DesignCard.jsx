import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DesignCard = ({ design }) => {
  const { slug, name, category, price, available, mainImage } = design;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group glass-card overflow-hidden relative flex flex-col justify-between h-full rounded-xl border border-gold/15 hover:border-rose-gold/40 hover:-translate-y-1 transition-all duration-500"
    >
      <div>
        <Link to={`/design/${slug}`} className="block relative overflow-hidden aspect-[3/4]">
          <img
            src={mainImage?.url}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {!available && (
            <span className="absolute top-3 right-3 bg-black/85 text-rose-gold text-[10px] px-3 py-1 tracking-widest uppercase border border-rose-gold/30 rounded-full backdrop-blur-md">
              Reserved
            </span>
          )}
        </Link>

        <div className="p-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-rose-gold font-semibold mb-2">
            {category?.name}
          </p>
          <h3 className="font-display text-2xl text-cream mb-2 group-hover:text-gold transition-colors duration-300">
            {name}
          </h3>
          <p className="text-gold text-lg font-light tracking-wide">
            ₦{Number(price).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex gap-3">
        <Link
          to={`/design/${slug}`}
          className="flex-1 text-center border border-cream/20 text-cream/80 text-[10px] py-2.5 tracking-widest uppercase hover:border-rose-gold hover:text-rose-gold transition-all duration-300 rounded-md font-medium"
        >
          View Details
        </Link>
        <Link
          to={available ? `/request/${slug}` : "#"}
          aria-disabled={!available}
          className={`flex-1 text-center text-[10px] py-2.5 tracking-widest uppercase transition-all duration-300 rounded-md ${
            available
              ? "btn-gold-glow bg-gold text-black hover:bg-gold-dark font-semibold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              : "bg-cream/5 text-cream/20 pointer-events-none"
          }`}
        >
          Request Outfit
        </Link>
      </div>
    </motion.div>
  );
};

export default DesignCard;
