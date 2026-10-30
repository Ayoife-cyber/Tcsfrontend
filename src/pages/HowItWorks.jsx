import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import { HiOutlineSparkles, HiOutlineHeart, HiOutlineScissors, HiOutlineCalendar, HiOutlineCheck } from "react-icons/hi";
import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";

const steps = [
  {
    num: "01",
    title: "Browse & Select",
    text: "Explore our signature evening gowns, corset silhouettes, and regal occasion wear in the collections gallery.",
    icon: <HiOutlineSparkles />
  },
  {
    num: "02",
    title: "Choose Your Preferences",
    text: "Select your preferred color palette, luxury fabric details, and standard or bespoke sizing.",
    icon: <HiOutlineHeart />
  },
  {
    num: "03",
    title: "Submit Custom Measurements",
    text: "Provide your bust, waist, hip, and length measurements through our bespoke request form.",
    icon: <HiOutlineScissors />
  },
  {
    num: "04",
    title: "Personal Stylist Callback",
    text: "Our dedicated atelier consultant contacts you via WhatsApp or phone to finalize every detail.",
    icon: <HiOutlineCalendar />
  },
];

const guarantees = [
  "Sculpted, figure-flattering bespoke fit",
  "Handcrafted with premium luxury fabrics",
  "Dedicated direct communication with our head designer",
  "Worldwide delivery and white-glove packaging"
];

const HowItWorks = () => (
  <div className="max-w-6xl mx-auto px-5 md:px-8 pt-28 pb-20">
    <SEO 
      title="How It Works" 
      description="From initial inspiration to your final fitting, our bespoke tailoring experience is seamless, personalized, and unforgettable."
      url="https://tumzy-couture.vercel.app/how-it-works"
    />
    <div className="text-center max-w-2xl mx-auto mb-20">
      <div className="inline-flex items-center gap-2 border border-rose-gold/30 bg-rose-gold/5 px-4 py-1.5 rounded-full mb-6">
        <span className="text-rose-gold text-xs">✦</span>
        <span className="text-rose-gold text-[11px] tracking-[0.25em] uppercase font-medium">Atelier Process</span>
        <span className="text-rose-gold text-xs">✦</span>
      </div>
      <h1 className="font-display text-4xl sm:text-5xl text-cream mb-6">How Your Bespoke Outfit Is Created</h1>
      <p className="text-cream/60 text-sm md:text-base font-light leading-relaxed">
        From initial inspiration to your final fitting, our bespoke tailoring experience is seamless, personalized, and unforgettable.
      </p>
    </div>

    {/* Steps Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      {steps.map((step) => (
        <div key={step.num} className="border border-gold/15 bg-charcoal/40 backdrop-blur-md p-8 rounded-xl text-center group hover:border-rose-gold/40 hover:-translate-y-2 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-gold/10 text-gold text-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
            {step.icon}
          </div>
          <p className="font-display text-4xl text-rose-gold/50 mb-2 font-light">{step.num}</p>
          <h3 className="font-display text-xl text-cream mb-3 font-medium">{step.title}</h3>
          <p className="text-cream/60 text-xs md:text-sm leading-relaxed font-light">{step.text}</p>
        </div>
      ))}
    </div>

    {/* Guarantee Callout */}
    <div className="border border-rose-gold/20 bg-charcoal/50 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-rose-gold text-xs uppercase tracking-[0.25em] font-semibold mb-2 block">Our Promise</span>
          <h2 className="font-display text-3xl text-cream mb-4">The Tumzy Couture Experience</h2>
          <p className="text-cream/70 text-sm font-light leading-relaxed mb-6">
            We understand the emotional importance of stepping out in a dress that makes you feel extraordinary. 
            Every order is overseen with personal attention to detail.
          </p>
          <Link
            to="/collections"
            className="btn-gold-glow bg-gold text-black px-8 py-3.5 text-xs tracking-widest uppercase hover:bg-gold-dark font-semibold transition-all inline-block shadow-[0_0_20px_rgba(212,175,55,0.25)]"
          >
            Start Browsing Silhouettes
          </Link>

          {/* Direct contact anchor links */}
          <div className="flex flex-wrap gap-3 mt-5">
            <a
              href="https://wa.me/2348167473144"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-gold/20 text-cream/70 hover:border-gold hover:text-gold px-4 py-2 text-xs tracking-wider uppercase transition-all duration-300 rounded-full"
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <a
              href="tel:+2348167473144"
              className="flex items-center gap-2 border border-gold/20 text-cream/70 hover:border-gold hover:text-gold px-4 py-2 text-xs tracking-wider uppercase transition-all duration-300 rounded-full"
            >
              📞 +234 816 747 3144
            </a>
            <a
              href="https://www.instagram.com/tumzycouture_styles"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-cream/70 hover:border-rose-gold hover:text-rose-gold transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@tumzycouture__styles"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-cream/70 hover:border-rose-gold hover:text-rose-gold transition-all duration-300"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          {guarantees.map((g, idx) => (
            <div key={idx} className="flex items-center gap-3.5 p-3 rounded-lg bg-white/5 border border-gold/10">
              <span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center text-sm shrink-0">
                <HiOutlineCheck />
              </span>
              <span className="text-cream/80 text-xs md:text-sm font-light">{g}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HowItWorks;
