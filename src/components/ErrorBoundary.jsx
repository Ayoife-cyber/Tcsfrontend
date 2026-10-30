import React from "react";
import { motion } from "framer-motion";
import { HiRefresh, HiHome } from "react-icons/hi";
import logoImg from "../assets/logo.png";

/**
 * Global error boundary — catches render-time errors anywhere in the tree
 * and shows a branded fallback screen instead of a white crash.
 *
 * Wrap <Routes /> (or any subtree) with <ErrorBoundary> to use it.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Visible in dev tools; production logging can be wired here (e.g. Sentry).
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 text-center overflow-hidden relative">
        {/* Ambient glow */}
        <div className="absolute w-[500px] h-[500px] bg-radial from-rose-gold/10 via-gold/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

        {/* Floating sparkles */}
        <span className="absolute top-1/3 left-1/4 text-rose-gold/40 text-xl animate-sparkle pointer-events-none">✦</span>
        <span className="absolute bottom-1/3 right-1/4 text-gold/40 text-lg animate-sparkle-delayed pointer-events-none">✧</span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center max-w-md"
        >
          {/* Logo */}
          <div className="relative mb-8 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-28 h-28 rounded-full bg-gold/15 blur-md"
            />
            <div className="relative z-10 w-20 h-20 flex items-center justify-center p-2 opacity-70">
              <img
                src={logoImg}
                alt="Tumzy Couture & Styles"
                className="w-full h-full object-contain drop-shadow-[0_0_16px_rgba(212,175,55,0.35)]"
              />
            </div>
          </div>

          <p className="text-gold text-[11px] uppercase tracking-[0.3em] mb-4">
            ✦ Something went wrong ✦
          </p>

          <h1 className="font-display text-4xl sm:text-5xl text-cream mb-4">
            A <span className="gold-shimmer-text">Thread</span> Came Loose
          </h1>

          <div className="gold-rule w-32 mb-5" />

          <p className="text-cream/65 text-sm leading-relaxed font-light mb-8">
            An unexpected error occurred while rendering this page. Your data is safe —
            simply refresh to restitch the experience.
          </p>

          {import.meta.env.DEV && this.state.error && (
            <pre className="text-left text-[11px] text-rose-gold/70 bg-charcoal/60 border border-gold/15 rounded-lg px-4 py-3 mb-6 max-h-32 overflow-auto w-full">
              {this.state.error.message}
            </pre>
          )}

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 bg-gold text-black px-6 py-3 text-xs tracking-widest uppercase hover:bg-gold-dark transition-colors btn-gold-glow"
            >
              <HiRefresh className="text-base" />
              Reload Page
            </button>
            <button
              onClick={this.handleHome}
              className="inline-flex items-center gap-2 bg-transparent border border-cream/20 text-cream/80 px-6 py-3 text-xs tracking-widest uppercase hover:border-gold/50 hover:text-gold transition-colors"
            >
              <HiHome className="text-base" />
              Back Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default ErrorBoundary;
