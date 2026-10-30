import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO.jsx";
import bossImg from "../assets/boss.jpg.jpg";

const values = [
  {
    title: "Made to Fit You",
    text: "Every outfit is made to your exact measurements. No guessing — just a perfect fit every time.",
    accent: "01"
  },
  {
    title: "Quality Fabrics",
    text: "We use good quality materials including lace, silk, and African fabrics to make sure you look and feel great.",
    accent: "02"
  },
  {
    title: "Your Style, Your Way",
    text: "We work with you to bring your ideas to life. Whether you have a clear vision or just a vibe, we've got you.",
    accent: "03"
  },
  {
    title: "Outfits for Every Occasion",
    text: "From weddings and parties to corporate events and everyday wear, we make outfits that suit whatever you need.",
    accent: "04"
  },
];

const About = () => (
  <div className="overflow-hidden pt-28 pb-16">
    <SEO 
      title="About Us" 
      description="Tumzy Couture and Styles was created out of a love for fashion and a desire to help women look and feel their best."
      url="https://tumzy-couture.vercel.app/about"
    />
    <div className="max-w-6xl mx-auto px-5 md:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 border border-rose-gold/30 bg-rose-gold/5 px-4 py-1.5 rounded-full mb-6">
          <span className="text-rose-gold text-xs">✦</span>
          <span className="text-rose-gold text-[11px] tracking-[0.25em] uppercase font-medium">Our Story</span>
          <span className="text-rose-gold text-xs">✦</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-cream mb-6 leading-tight">
          Fashion That Fits Your Life
        </h1>
        <p className="text-cream/70 text-base md:text-lg leading-relaxed font-light">
          <strong className="text-gold font-medium">Tumzy Couture and Styles</strong> was created out of a love for
          fashion and a desire to help women look and feel their best — in outfits made just for them.
        </p>
      </div>

      {/* Visual Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-24">
        <div className="md:col-span-6 relative">
          <div className="aspect-3/4 rounded-2xl overflow-hidden border border-gold/20 relative shadow-2xl">
            <img
              src={bossImg}
              alt="Tumzy Couture muse in bespoke couture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-charcoal/80 backdrop-blur-md rounded-xl border border-rose-gold/20">
              <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-1">Our Philosophy</p>
              <p className="text-cream/80 text-xs font-light">"We believe every woman deserves to wear something made just for her."</p>
            </div>
            
          </div>

        </div>

        <div className="md:col-span-6 space-y-6 md:pl-6">
          <span className="text-rose-gold text-xs uppercase tracking-[0.25em] font-semibold">What We Do</span>
          <h2 className="font-display text-3xl md:text-4xl text-cream leading-tight">
            Outfits Made for Real Moments
          </h2>
          <p className="text-cream/70 text-sm md:text-base leading-relaxed font-light">
            We design and sew custom outfits for women — from everyday corporate looks to
            special occasion pieces that turn heads wherever you go.
          </p>
          <p className="text-cream/70 text-sm md:text-base leading-relaxed font-light">
            Getting dressed up for a wedding? An event? Or just want something that fits you perfectly?
            We work closely with you to create exactly what you have in mind.
          </p>
          <div className="pt-4">
            <Link
              to="/collections"
              className="btn-gold-glow bg-gold text-black px-8 py-3.5 text-xs tracking-widest uppercase hover:bg-gold-dark font-semibold transition-all inline-block shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              Explore Our Creations
            </Link>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="mb-20">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2 font-semibold">Why Choose Us</p>
          <h2 className="font-display text-4xl text-cream">What Sets Us Apart</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="border border-gold/15 bg-charcoal/40 backdrop-blur-md p-6 rounded-xl hover:border-rose-gold/40 hover:-translate-y-1 transition-all duration-300">
              <span className="font-display text-3xl text-rose-gold/40 mb-3 block font-light">{v.accent}</span>
              <h3 className="font-display text-xl text-cream mb-2 font-medium">{v.title}</h3>
              <p className="text-cream/60 text-xs leading-relaxed font-light">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default About;
