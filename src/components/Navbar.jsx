import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "../assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `relative text-[11px] lg:text-xs xl:text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-300 py-2 ${
      isActive ? "text-gold" : "text-cream/65 hover:text-cream nav-link-premium"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "navbar-glow bg-black/90 backdrop-blur-xl border-b border-gold/10 py-3"
            : "bg-linear-to-b from-black/80 to-transparent py-4 sm:py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-2">

          {/* ── Brand ─────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
            <div className="relative">
              <img
                src={logoImg}
                alt="Tumzy Couture & Styles"
                className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]"
              />
            </div>
            <div className="flex flex-col leading-none justify-center">
              <span className="font-display text-lg sm:text-xl md:text-2xl font-semibold tracking-wide flex items-center gap-1">
                <span className="text-gold">Tumzy</span>
                <span className="text-cream"> Couture</span>
              </span>
              <span className="text-[7.5px] sm:text-[9px] tracking-[0.3em] text-cream/50 uppercase mt-0.5">
                & Styles
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-rose-gold via-gold to-rose-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop CTA ────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/2348167473144"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-cream/60 hover:text-[#25D366] transition-colors duration-300"
            >
              <FaWhatsapp className="text-base" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
            <Link
              to="/collections"
              className="btn-gold-glow relative bg-linear-to-r from-gold to-gold-dark text-black px-5 xl:px-6 py-2.5 text-[11px] tracking-[0.15em] uppercase font-bold transition-all duration-300 rounded-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:-translate-y-0.5"
            >
              Request a Design
            </Link>
          </div>

          {/* ── Mobile Hamburger ───────────────────────── */}
          <button
            className="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-gold/20 text-cream hover:border-gold hover:text-gold transition-all duration-300 shrink-0"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <HiMenu className="text-lg sm:text-xl" />
          </button>
        </div>
      </header>

      {/* ── Mobile Full-Screen Menu ──────────────────────────────── */}
      {/* Placed OUTSIDE the header to avoid CSS stacking context bounds from backdrop-blur */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-100 bg-[#0a080b]/95 backdrop-blur-2xl flex flex-col lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gold/10 bg-black/50">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 shrink-0">
                <img src={logoImg} alt="Tumzy Couture" className="h-8 w-auto object-contain" />
                <div className="flex flex-col leading-none">
                  <span className="font-display text-lg font-semibold tracking-wide flex items-center gap-1">
                    <span className="text-gold">Tumzy</span>
                    <span className="text-cream"> Couture</span>
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-cream hover:text-gold hover:border-gold transition-all"
                aria-label="Close menu"
              >
                <HiX className="text-xl" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-6 overflow-y-auto py-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-center text-2xl font-display tracking-wider transition-all duration-200 ${
                        isActive ? "text-gold" : "text-cream/80 hover:text-gold"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="px-6 pb-10 space-y-4"
            >
              <Link
                to="/collections"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full bg-linear-to-r from-gold to-gold-dark text-black py-4 text-xs tracking-[0.15em] uppercase font-bold rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              >
                Request a Design
              </Link>
              <a
                href="https://wa.me/2348167473144"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-[#25D366]/30 text-[#25D366] py-3.5 text-xs tracking-widest uppercase rounded-sm bg-[#25D366]/5"
              >
                <FaWhatsapp className="text-lg" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
