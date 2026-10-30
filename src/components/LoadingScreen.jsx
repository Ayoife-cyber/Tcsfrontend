import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "../assets/logo.png";

const LoadingScreen = ({ minDuration = 1400, onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080608] text-cream overflow-hidden"
        >
          {/* Radial Ambient Glow */}
          <div className="absolute w-[500px] h-[500px] bg-radial from-rose-gold/15 via-gold/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

          {/* Floating Sparkles */}
          <span className="absolute top-1/3 left-1/4 text-rose-gold/40 text-xl animate-sparkle pointer-events-none">✦</span>
          <span className="absolute bottom-1/3 right-1/4 text-gold/40 text-lg animate-sparkle-delayed pointer-events-none">✧</span>

          {/* Centered Brand Showcase */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Logo with Orbit Ring & Breathing Glow */}
            <div className="relative mb-8 flex items-center justify-center">
              {/* Rotating Gold Accent Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-dashed border-gold/30"
              />

              {/* Pulsing Outer Glow Ring */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.75, 0.3] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gold/15 blur-md"
              />

              {/* Brand Logo with Gentle Float */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                transition={{
                  scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.6 }
                }}
                className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-2"
              >
                <img
                  src={logoImg}
                  alt="Tumzy Couture & Styles Logo"
                  className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.45)]"
                />
              </motion.div>
            </div>

            {/* Brand Title with Gold Shimmer */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-2xl sm:text-3xl tracking-wide text-cream mb-2"
            >
              Tumzy <span className="text-gold font-normal">Couture</span> & Styles
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="font-display italic text-sm sm:text-base text-rose-gold/90 mb-8 tracking-wider"
            >
              Fashion Unlimited
            </motion.p>

            {/* Ultra-luxury Progress Track */}
            <div className="w-44 sm:w-56 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-gold to-transparent shadow-[0_0_8px_rgba(212,175,55,0.8)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
