import React from "react";
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTiktok } from "react-icons/fa";
import SEO from "../components/SEO.jsx";

const contactMethods = [
  { 
    icon: <FaWhatsapp />, 
    label: "WhatsApp VIP Concierge", 
    value: "+234 816 747 3144", 
    sub: "Instant styling advice & order updates",
    href: "https://wa.me/2348167473144"
  },
  { 
    icon: <FaPhone />, 
    label: "Telephone Assistance", 
    value: "+234 816 747 3144", 
    sub: "Mon - Sat: 9:00 AM - 6:00 PM WAT",
    href: "tel:+2348167473144"
  },
  { 
    icon: <FaEnvelope />, 
    label: "Atelier Inquiries", 
    value: "tumzystyles@gmail.com", 
    sub: "Custom orders & press collaborations",
    href: "mailto:tumzystyles@gmail.com"
  },
  { 
    icon: <FaMapMarkerAlt />, 
    label: "Atelier Studio", 
    value: "Lagos, Nigeria", 
    sub: "Private measurement & fitting by appointment",
    href: "#"
  },
];

const Contact = () => (
  <div className="max-w-5xl mx-auto px-5 md:px-8 pt-28 pb-20">
    <SEO 
      title="Contact Us" 
      description="Connect with our stylists. Whether you have questions about our capsule silhouettes, fabric selections, or custom measurement booking."
      url="https://tumzy-couture.vercel.app/contact"
    />
    <div className="text-center max-w-2xl mx-auto mb-16">
      <div className="inline-flex items-center gap-2 border border-rose-gold/30 bg-rose-gold/5 px-4 py-1.5 rounded-full mb-6">
        <span className="text-rose-gold text-xs">✦</span>
        <span className="text-rose-gold text-[11px] tracking-[0.25em] uppercase font-medium">VIP Atelier Concierge</span>
        <span className="text-rose-gold text-xs">✦</span>
      </div>
      <h1 className="font-display text-4xl sm:text-5xl text-cream mb-6">Connect With Our Stylists</h1>
      <p className="text-cream/60 text-sm md:text-base font-light leading-relaxed">
        Whether you have questions about our capsule silhouettes, fabric selections, or custom measurement booking, our atelier team is here to assist you.
      </p>
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
      {contactMethods.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="flex items-start gap-5 border border-gold/15 bg-charcoal/40 backdrop-blur-md p-6 rounded-xl group hover:border-rose-gold/40 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-gold/10 text-gold text-xl flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
            {item.icon}
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-rose-gold/70 font-semibold mb-1">{item.label}</p>
            <p className="text-cream font-medium text-base mb-1">{item.value}</p>
            <p className="text-cream/50 text-xs font-light">{item.sub}</p>
          </div>
        </a>
      ))}
    </div>

    {/* Social Media Links */}
    <div className="text-center mb-16">
      <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-semibold">Follow Our Couture Journey</p>
      <div className="flex justify-center gap-5 text-lg">
        {[
          { icon: <FaInstagram />, label: "Instagram", href: "https://www.instagram.com/tumzycouture_styles?stkn=MWlmMGdtZThkN3JjeA%3D%3D&utm_source=qr" },
          { icon: <FaTiktok />, label: "TikTok", href: "https://www.tiktok.com/@tumzycouture__styles" },
        ].map((s, idx) => (
          <a
            key={idx}
            href={s.href}
            aria-label={s.label}
            className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-cream/80 hover:border-rose-gold hover:text-rose-gold hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(226,180,183,0.3)] transition-all duration-300"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>

    {/* Direct WhatsApp Call to Action */}
    <div className="border border-gold/20 bg-charcoal/60 backdrop-blur-md rounded-2xl p-8 text-center max-w-2xl mx-auto">
      <h3 className="font-display text-2xl text-cream mb-2">Prefer An Instant Conversation?</h3>
      <p className="text-cream/60 text-xs md:text-sm font-light mb-6">
        Chat directly with our creative team on WhatsApp for prompt responses regarding bespoke orders.
      </p>
      <a
        href="https://wa.me/2348167473144"
        target="_blank"
        rel="noreferrer"
        className="btn-gold-glow bg-gold text-black px-10 py-3.5 text-xs tracking-widest uppercase hover:bg-gold-dark font-semibold transition-all inline-flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
      >
        <FaWhatsapp className="text-base" />
        Chat on WhatsApp
      </a>
    </div>
  </div>
);

export default Contact;

