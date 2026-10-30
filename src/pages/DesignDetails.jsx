import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import { fetchDesignByIdOrSlug } from "../api/designs.js";
import EmptyState from "../components/EmptyState.jsx";
import { HiOutlineArrowLeft, HiOutlineSparkles, HiOutlinePlay } from "react-icons/hi";

const DesignDetails = () => {
  const { slug } = useParams();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetchDesignByIdOrSlug(slug)
      .then((data) => {
        setDesign(data.design);
        setActiveIdx(0);
      })
      .catch(() => setDesign(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-28 text-center text-cream/50">
        <div className="inline-flex items-center gap-2 animate-pulse text-gold">
          <HiOutlineSparkles className="animate-spin" />
          <span>Curating design details...</span>
        </div>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-24">
        <EmptyState title="Silhouette Not Found" subtitle="This couture piece may have been updated or renamed." />
      </div>
    );
  }

  // Build unified media list: images first, then videos
  const images = [design.mainImage, ...(design.additionalImages || [])].filter(Boolean);
  const videos = (design.videos || []).filter(Boolean);

  // Combined gallery items: { type: "image"|"video", url, publicId }
  const gallery = [
    ...images.map((img) => ({ type: "image", url: img.url, publicId: img.publicId })),
    ...videos.map((vid) => ({ type: "video", url: vid.url, publicId: vid.publicId })),
  ];

  const activeItem = gallery[activeIdx];

  const handleThumbnailClick = (idx) => {
    setActiveIdx(idx);
    // Pause video if switching away from it
    if (videoRef.current) videoRef.current.pause();
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-16">
      <SEO 
        title={design.name} 
        description={design.description}
        image={design.mainImage?.url}
        url={`https://tumzy-couture.vercel.app/design/${design.slug}`}
      />
      {/* Back Link */}
      <Link
        to="/collections"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cream/60 hover:text-rose-gold transition-colors group mb-8 relative z-10 w-fit cursor-pointer"
      >
        <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Collections
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery Column */}
        <div>
          {/* Main viewer */}
          <div className="aspect-3/4 overflow-hidden rounded-2xl border border-gold/20 shadow-2xl relative mb-4 bg-charcoal/50">
            {activeItem?.type === "video" ? (
              <video
                ref={videoRef}
                key={activeItem.url}
                src={activeItem.url}
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <img
                src={activeItem?.url}
                alt={design.name}
                className="w-full h-full object-cover transition-all duration-700"
              />
            )}

            {!design.available && (
              <span className="absolute top-4 right-4 bg-black/80 text-rose-gold text-xs px-4 py-1.5 rounded-full border border-rose-gold/30 tracking-widest uppercase backdrop-blur-md">
                Reserved Piece
              </span>
            )}

            {/* Image counter badge */}
            {gallery.length > 1 && (
              <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-cream/70 text-[10px] px-3 py-1 rounded-full border border-white/10">
                {activeIdx + 1} / {gallery.length}
              </span>
            )}
          </div>

          {/* Thumbnail strip */}
          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {gallery.map((item, i) => (
                <button
                  key={item.publicId || i}
                  onClick={() => handleThumbnailClick(i)}
                  className={`relative w-20 h-24 shrink-0 rounded-lg overflow-hidden border transition-all duration-300 ${
                    activeIdx === i
                      ? "border-gold scale-105 shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  {item.type === "video" ? (
                    <>
                      {/* Video thumbnail — show poster or black with play icon */}
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <HiOutlinePlay className="text-white text-xl drop-shadow" />
                      </div>
                      <span className="absolute bottom-1 left-1 bg-gold text-black text-[8px] font-bold px-1 rounded uppercase">
                        Video
                      </span>
                    </>
                  ) : (
                    <img
                      src={item.url}
                      alt={`${design.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="border border-gold/15 bg-charcoal/40 backdrop-blur-md p-8 md:p-10 rounded-2xl">
          <div className="inline-flex items-center gap-2 border border-rose-gold/30 bg-rose-gold/5 px-3.5 py-1 rounded-full mb-3">
            <span className="text-rose-gold text-xs">✦</span>
            <span className="text-rose-gold text-[10px] tracking-[0.25em] uppercase font-semibold">
              {design.category?.name || "Bespoke Couture"}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl text-cream mb-3 leading-tight">{design.name}</h1>
          <p className="text-gold text-3xl font-light tracking-wide mb-6">₦{Number(design.price).toLocaleString()}</p>

          <p className="text-cream/70 leading-relaxed font-light text-sm md:text-base mb-8">{design.description}</p>

          {/* Media summary badges */}
          {(images.length > 0 || videos.length > 0) && (
            <div className="flex gap-2 mb-6 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-[10px] text-cream/50 border border-white/10 px-2.5 py-1 rounded-full">
                🖼 {images.length} photo{images.length !== 1 ? "s" : ""}
              </span>
              {videos.length > 0 && (
                <span className="inline-flex items-center gap-1.5 text-[10px] text-gold/60 border border-gold/20 px-2.5 py-1 rounded-full">
                  🎬 {videos.length} video{videos.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          )}

          {/* Specifications Box */}
          <div className="space-y-4 mb-8 text-sm border-y border-gold/10 py-6">
            {design.colors?.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-cream/50 uppercase tracking-widest text-xs">Palette Options</span>
                <span className="text-cream font-medium">{design.colors.join(", ")}</span>
              </div>
            )}
            {design.sizes?.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-cream/50 uppercase tracking-widest text-xs">Available Sizing</span>
                <span className="text-cream font-medium">{design.sizes.join(", ")}</span>
              </div>
            )}
            {design.fabric && (
              <div className="flex justify-between items-center">
                <span className="text-cream/50 uppercase tracking-widest text-xs">Luxe Fabric</span>
                <span className="text-cream font-medium">{design.fabric}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-cream/50 uppercase tracking-widest text-xs">Atelier Status</span>
              <span className={`text-xs uppercase tracking-wider font-semibold ${design.available ? "text-emerald-400" : "text-rose-gold"}`}>
                {design.available ? "● Ready For Bespoke Order" : "● Currently Reserved"}
              </span>
            </div>
          </div>

          {/* Action CTA */}
          {design.available ? (
            <Link
              to={`/request/${design.slug}`}
              className="btn-gold-glow block w-full text-center bg-gold text-black py-4 text-xs tracking-widest uppercase hover:bg-gold-dark font-semibold transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] rounded-lg"
            >
              Request This Bespoke Outfit
            </Link>
          ) : (
            <span className="block w-full text-center bg-cream/5 text-cream/30 py-4 text-xs tracking-widest uppercase cursor-not-allowed rounded-lg border border-white/5">
              Piece Currently Reserved
            </span>
          )}

          <p className="text-[11px] text-cream/40 text-center mt-4 font-light">
            Custom fit guaranteed. Provide your measurements on the next screen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DesignDetails;
