import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO.jsx";
import { fetchDesigns } from "../api/designs.js";
import DesignCard from "../components/DesignCard.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import { HiOutlineSparkles, HiOutlineHeart, HiOutlineScissors, HiOutlineCalendar } from "react-icons/hi";
import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";
import corsetryImg from "../assets/Corsetry.jpg.jpg";
import chicImg from "../assets/Chic.jpg.jpg";
import blazerImg from "../assets/Blazer.jpg.jpg";

const steps = [
  { 
    num: "01", 
    title: "Explore The Capsule", 
    text: "Discover our latest evening gowns, corset silhouettes, and regal occasion wear.",
    icon: <HiOutlineSparkles />
  },
  { 
    num: "02", 
    title: "Select Your Silhouette", 
    text: "Choose the design that speaks to your personal elegance and style preferences.",
    icon: <HiOutlineHeart />
  },
  { 
    num: "03", 
    title: "Provide Measurements", 
    text: "Submit your custom bust, waist, hip, and length details for a precision couture fit.",
    icon: <HiOutlineScissors />
  },
  { 
    num: "04", 
    title: "Private Atelier Consultation", 
    text: "Our stylist reaches out directly to finalize fabrics, embellishments, and delivery.",
    icon: <HiOutlineCalendar />
  },
];


const capsuleHighlights = [
  {
    title: "Smart Corporate Wear",
    tag: "Professional & Chic",
    image: corsetryImg,
    desc: "Elegant, polished corporate styles crafted for the modern professional — sharp silhouettes that command confidence in every room."
  },
  {
    title: "Off-Shoulder & Occasion Glam",
    tag: "Chic & Versatile",
    image: chicImg,
    desc: "Flirty off-shoulder tops paired with ruffled textured mini skirts — the perfect statement look for every special occasion."
  },
  {
    title: "Power Suit & Blazer Sets",
    tag: "Contemporary Luxe",
    image: blazerImg,
    desc: "Tailored wide-leg blazer co-ords crafted for the modern woman who commands every room she walks into."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDesigns({ featured: "true" })
      .then((data) => setFeatured(data.designs.slice(0, 6)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-hidden">
      <SEO 
        title="Home" 
        url="https://tumzy-couture.vercel.app/" 
      />
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center text-center overflow-hidden pt-32 pb-24">
        {/* Feminine Couture Hero Background Image */}
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.38 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1800&auto=format&fit=crop"
          alt="Tumzy Couture and Styles - Feminine Luxury African Couture"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        {/* Ambient Gradient Overlay with Warm Rose-Noir Hue */}
        <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/50 to-black pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-87.5 bg-rose-gold/10 blur-[150px] rounded-full pointer-events-none" />

        {/* Floating Sparkles Decor */}
        <span className="absolute top-20 left-[15%] text-rose-gold/40 text-2xl animate-sparkle pointer-events-none hidden md:block">✦</span>
        <span className="absolute bottom-28 right-[18%] text-gold/50 text-xl animate-sparkle-delayed pointer-events-none hidden md:block">✧</span>
        <span className="absolute top-1/3 right-[12%] text-rose-gold/30 text-lg animate-sparkle pointer-events-none hidden lg:block">✦</span>
        
        <div className="relative z-10 max-w-4xl px-5">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 border border-rose-gold/30 bg-rose-gold/5 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
          >
            <span className="text-rose-gold text-xs">✦</span>
            <span className="text-rose-gold text-[11px] tracking-[0.25em] uppercase font-medium">Bespoke Feminine Haute Couture</span>
            <span className="text-rose-gold text-xs">✦</span>
          </motion.div>
          

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            whileHover={{ y: -6 }}
            className="gold-shimmer-text font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-4 leading-[1.1] pb-3 pt-1 inline-block cursor-default select-none font-medium tracking-tight sm:tracking-normal"
          >
            Tumzy Couture & Styles
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-display italic text-2xl md:text-3xl text-rose-gold/90 mb-6"
          >
            Fashion Unlimited
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-cream/70 max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed font-light"
          >
            Sculpted for the modern muse. Celebrating feminine grace, regal silhouettes, 
            and breathtaking bespoke craftsmanship tailored exclusively to your measurements.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link
              to="/collections"
              className="btn-gold-glow bg-gold text-black px-10 py-4 text-xs tracking-widest uppercase hover:bg-gold-dark font-semibold transition-all duration-300 w-full sm:w-auto shadow-[0_0_25px_rgba(212,175,55,0.25)]"
            >
              Explore Our Collections
            </Link>
            <Link
              to="/contact"
              className="border border-rose-gold/40 text-cream px-10 py-4 text-xs tracking-widest uppercase hover:border-gold hover:text-gold hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
            >
              Book Custom Styling
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feminine Capsule Showcase */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24 border-b border-gold/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-rose-gold text-xs tracking-[0.3em] uppercase mb-3 font-semibold">The Silhouette Gallery</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream">Signature Capsule Styles</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capsuleHighlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group relative overflow-hidden rounded-xl border border-gold/15 bg-charcoal/40 backdrop-blur-sm flex flex-col justify-between"
            >
              <div className="relative aspect-4/5 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-black/80 border border-rose-gold/30 text-rose-gold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-md">
                  {item.tag}
                </span>
              </div>
              <div className="p-6 relative z-10 bg-charcoal/80 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl text-cream group-hover:text-gold transition-colors duration-300 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-cream/60 text-xs leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
                <Link
                  to="/collections"
                  className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-rose-gold transition-colors font-medium"
                >
                  View Silhouettes →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Styles Grid from backend */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-semibold">Handcrafted For You</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream">Featured Creations</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((design) => <DesignCard key={design._id} design={design} />)}
        </div>

        {!loading && featured.length === 0 && (
          <p className="text-center text-cream/45 mt-12 text-sm italic">
            New featured designs are on the way — check back soon.
          </p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/collections"
            className="border border-gold text-gold px-10 py-4 text-xs tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-300 inline-block font-semibold"
          >
            Explore All Collections
          </Link>
        </motion.div>
      </section>

      {/* The Feminine Atelier Story */}
      <section className="bg-charcoal/40 border-y border-gold/10 py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-rose-gold text-xs tracking-[0.3em] uppercase mb-3 font-semibold block">Crafted For The Modern Muse</span>
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-8 leading-tight">
              Honoring Feminine Elegance Through Artistry
            </h2>
            <p className="text-cream/70 leading-relaxed text-sm md:text-base font-light max-w-2xl mx-auto mb-10">
              At <strong className="text-gold font-medium">Tumzy Couture & Styles</strong>, we believe every woman deserves 
              a wardrobe that empowers her confidence, accentuates her silhouette, and tells her unique story. 
              Our atelier combines rich African heritage fabrics with high-fashion corsetry and precision bespoke tailoring.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-2xl mx-auto pt-6 border-t border-gold/15">
              <div className="p-4">
                <p className="font-display text-3xl text-gold mb-1 font-semibold">100%</p>
                <p className="text-xs uppercase tracking-wider text-cream/50">Custom Fit</p>
              </div>
              <div className="p-4 border-y sm:border-y-0 sm:border-x border-gold/10">
                <p className="font-display text-3xl text-rose-gold mb-1 font-semibold">Haute</p>
                <p className="text-xs uppercase tracking-wider text-cream/50">African Couture</p>
              </div>
              <div className="p-4">
                <p className="font-display text-3xl text-gold mb-1 font-semibold">VIP</p>
                <p className="text-xs uppercase tracking-wider text-cream/50">Styling Concierge</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-28">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-rose-gold text-xs tracking-[0.3em] uppercase mb-3 font-semibold">The Bespoke Journey</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream">How Your Outfit Is Created</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              variants={itemVariants}
              key={step.num}
              className="border border-gold/15 bg-charcoal/30 backdrop-blur-sm p-8 rounded-xl text-center group hover:border-gold/40 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 text-gold text-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                {step.icon}
              </div>
              <p className="font-display text-3xl text-rose-gold/60 mb-2 font-light">
                {step.num}
              </p>
              <h3 className="font-display text-xl text-cream mb-3 font-medium">{step.title}</h3>
              <p className="text-cream/60 text-xs md:text-sm leading-relaxed font-light">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Call to Action */}
      <section className="bg-charcoal/30 border-t border-gold/10 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,180,183,0.04),transparent)] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-5 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-3 block">Ready For Your Signature Look?</span>
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-4">
              Bring Your Dream Outfit To Life
            </h2>
            <p className="text-cream/60 mb-10 text-sm max-w-md mx-auto font-light">
              Submit your bespoke measurements and styling preferences today for a custom atelier piece.
            </p>
            <Link
              to="/collections"
              className="btn-gold-glow bg-gold text-black px-12 py-4.5 text-xs tracking-widest uppercase hover:bg-gold-dark font-semibold transition-all duration-300 inline-block shadow-[0_0_25px_rgba(212,175,55,0.3)]"
            >
              Start Browsing Collections
            </Link>

            {/* Direct contact links */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <a
                href="https://wa.me/2348167473144"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-gold/20 text-cream/70 hover:border-gold hover:text-gold px-5 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 rounded-full hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              >
                <FaWhatsapp className="text-sm" /> WhatsApp Us
              </a>
              <a
                href="https://www.instagram.com/tumzycouture_styles"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-cream/70 hover:border-rose-gold hover:text-rose-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.tiktok.com/@tumzycouture__styles"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-cream/70 hover:border-rose-gold hover:text-rose-gold transition-all duration-300"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
