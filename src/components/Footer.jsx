import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import logoImg from "../assets/logo.png";

const socials = [
  {
    icon: <FaInstagram />,
    label: "Instagram",
    href: "https://www.instagram.com/tumzycouture_styles?stkn=MWlmMGdtZThkN3JjeA%3D%3D&utm_source=qr",
    color: "hover:text-pink-400 hover:border-pink-400/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]",
  },
  {
    icon: <FaTiktok />,
    label: "TikTok",
    href: "https://www.tiktok.com/@tumzycouture__styles",
    color: "hover:text-white hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    href: "https://wa.me/2348167473144",
    color: "hover:text-[#25D366] hover:border-[#25D366]/50 hover:shadow-[0_0_15px_rgba(37,211,102,0.3)]",
  },
];

const exploreLinks = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About Us" },
  { to: "/how-it-works", label: "How We Work" },
  { to: "/contact", label: "Get In Touch" },
];

const Footer = () => (
  <footer className="footer-gradient-border bg-[#0a080b] mt-24 relative overflow-hidden">
    {/* Ambient glow blobs */}
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/4 blur-[140px] rounded-full pointer-events-none" />
    <div className="absolute top-0 left-0 w-72 h-72 bg-rose-gold/4 blur-[120px] rounded-full pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-16 pb-8">

      {/* ── Main Grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/5">

        {/* Brand Column */}
        <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-5">
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <img
              src={logoImg}
              alt="Tumzy Couture & Styles"
              className="h-10 w-auto object-contain transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold">
                <span className="text-gold">Tumzy</span>
                <span className="text-cream"> Couture</span>
              </span>
              <span className="text-[9px] tracking-[0.3em] text-cream/40 uppercase mt-0.5">& Styles</span>
            </div>
          </Link>

          <p className="text-cream/45 text-sm leading-relaxed max-w-xs">
            We design and sew custom outfits for women — from everyday corporate looks
            to stunning occasion pieces made to fit you perfectly.
          </p>

          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className={`w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-cream/50 text-sm transition-all duration-300 hover:-translate-y-1 ${s.color}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 lg:col-start-6">
          <h4 className="text-gold text-[10px] tracking-[0.25em] uppercase mb-5 font-bold">
            Explore
          </h4>
          <ul className="space-y-2.5 text-sm">
            {exploreLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-cream/50 hover:text-gold transition-colors duration-300 nav-link-premium inline-block py-0.5"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-3">
          <h4 className="text-gold text-[10px] tracking-[0.25em] uppercase mb-5 font-bold">
            Reach Us
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a
                href="tel:+2348167473144"
                className="flex items-start gap-3 text-cream/50 hover:text-gold transition-colors duration-300 group"
              >
                <FaPhone className="mt-0.5 text-gold/40 group-hover:text-gold shrink-0 transition-colors" />
                <div>
                  <p className="text-cream/30 text-xs mb-0.5">Call Us</p>
                  +234 816 747 3144
                </div>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/2348167473144"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-cream/50 hover:text-[#25D366] transition-colors duration-300 group"
              >
                <FaWhatsapp className="mt-0.5 text-gold/40 group-hover:text-[#25D366] shrink-0 transition-colors" />
                <div>
                  <p className="text-cream/30 text-xs mb-0.5">WhatsApp</p>
                  +234 816 747 3144
                </div>
              </a>
            </li>
            <li>
              <a
                href="mailto:tumzystyles@gmail.com"
                className="flex items-start gap-3 text-cream/50 hover:text-gold transition-colors duration-300 group"
              >
                <FaEnvelope className="mt-0.5 text-gold/40 group-hover:text-gold shrink-0 transition-colors" />
                <div>
                  <p className="text-cream/30 text-xs mb-0.5">Email</p>
                  tumzystyles@gmail.com
                </div>
              </a>
            </li>
            <li className="flex items-start gap-3 text-cream/40">
              <HiOutlineLocationMarker className="mt-0.5 text-gold/30 shrink-0 text-base" />
              <div>
                <p className="text-cream/30 text-xs mb-0.5">Location</p>
                Lagos, Nigeria
              </div>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="sm:col-span-2 lg:col-span-3">
          <h4 className="text-gold text-[10px] tracking-[0.25em] uppercase mb-5 font-bold">
            Stay Updated
          </h4>
          <p className="text-cream/45 text-xs leading-relaxed mb-4">
            Subscribe for new collections, styling tips, and exclusive offers.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex rounded-sm overflow-hidden border focus-within:border-gold/50 transition-all duration-300 focus-within:shadow-[0_0_12px_rgba(212,175,55,0.1)]"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent text-xs px-3 py-3 focus:outline-none flex-1 placeholder:text-cream/25 min-w-0"
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-dark text-black px-4 py-2 text-[10px] tracking-widest uppercase font-bold transition-colors duration-300 shrink-0"
            >
              Join
            </button>
          </form>

          {/* Quick WhatsApp CTA */}
          <a
            href="https://wa.me/2348167473144"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 mt-4 w-full border border-[#25D366]/25 text-[#25D366]/70 hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/5 py-2.5 text-[10px] tracking-widest uppercase font-semibold rounded-sm transition-all duration-300"
          >
            <FaWhatsapp className="text-sm" />
            Order via WhatsApp
          </a>
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-3">
        <p className="text-[10px] tracking-widest text-cream/25 uppercase">
          © {new Date().getFullYear()} Tumzy Couture and Styles. All Rights Reserved.
        </p>
        <div className="flex items-center gap-1 text-[10px] text-cream/20 uppercase tracking-widest">
          <span className="w-1 h-1 rounded-full bg-gold/40" />
          <span>Crafted with Luxury & Precision</span>
          <span className="w-1 h-1 rounded-full bg-rose-gold/40" />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
