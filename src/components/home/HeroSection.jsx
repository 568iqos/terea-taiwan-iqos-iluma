import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
const DEFAULT_SLIDES = [
  {
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/4bf459377_IMG_8758.webp",
    label: "TEREA Taiwan Official",
    title: "IQOS ILUMA\n韓國限定",
    sub: "每一次點燃，多了一份儀式感\n\n探索日本限定 IQOS ILUMA  與\n各國 TEREA 口味系列",
    ctaLabel: "探索產品",
    ctaTo: "/products",
    ctaSecondaryLabel: "了解技術",
    ctaSecondaryTo: "/technology",
    align: "left",
    overlay: "bg-gradient-to-r from-black/70 via-black/30 to-transparent",
  },
  {
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/1cc1cf9ab_IMG_8122.png",
    label: "TEREA Lifestyle",
    title: "創作靈感\n自由表達",
    sub: "以風味為畫筆，描繪屬於你的生活品味",
    ctaLabel: "探索產品",
    ctaTo: "/products",
    ctaSecondaryLabel: "",
    ctaSecondaryTo: "",
    align: "left",
    overlay: "bg-gradient-to-r from-black/60 via-black/20 to-transparent",
  },
  {
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/4d0dfe6db_IMG_8744.jpg",
    label: "ILUMA",
    title: "你的 Q故事\n個性登場",
    sub: "多款配色設計，展現獨一無二的風格品味",
    ctaLabel: "探索產品",
    ctaTo: "/products",
    ctaSecondaryLabel: "了解技術",
    ctaSecondaryTo: "/technology",
    align: "right",
    overlay: "bg-gradient-to-l from-black/60 via-black/20 to-transparent",
  },
  {
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/1588b4bb6_IMG_8744.jpg",
    label: "TEREA Collection",
    title: "你的 Q故事\n個性登場",
    sub: "多彩配色，展現你的獨特品味與個性風格",
    ctaLabel: "探索產品",
    ctaTo: "/products",
    ctaSecondaryLabel: "了解技術",
    ctaSecondaryTo: "/technology",
    align: "left",
    overlay: "bg-gradient-to-r from-black/70 via-black/30 to-transparent",
  },
];

function getOverlay(slide) {
  if (slide.overlay) return slide.overlay;
  return slide.align === "right"
    ? "bg-gradient-to-l from-black/60 via-black/20 to-transparent"
    : "bg-gradient-to-r from-black/70 via-black/30 to-transparent";
}

export default function HeroSection({ siteSettings }) {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState(DEFAULT_SLIDES);

  useEffect(() => {
    if (!siteSettings) return;
    const rec = siteSettings.find((r) => r.key === "hero_slides");
    if (rec?.value) {
      try {
        const parsed = JSON.parse(rec.value);
        if (Array.isArray(parsed) && parsed.length > 0) setSlides(parsed);
      } catch {}
    }
  }, [siteSettings]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current] || slides[0];

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" loading={current === 0 ? "eager" : "lazy"} fetchpriority={current === 0 ? "high" : "auto"} />
          <div className={`absolute inset-0 ${getOverlay(slide)}`} />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className={`absolute inset-0 flex flex-col justify-end pb-20 md:pb-28 px-8 md:px-16 lg:px-24 ${slide.align === "right" ? "items-end text-right" : "items-start text-left"}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/50 mb-5">
              {slide.label}
            </p>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-6 whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="font-body text-sm md:text-base text-white/60 leading-relaxed mb-10 max-w-sm">
              {slide.sub}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                to={slide.ctaTo || "/products"}
                className="inline-flex items-center justify-center bg-white text-black px-8 py-3.5 font-body text-[11px] tracking-widest uppercase hover:bg-white/90 transition-colors"
              >
                {slide.ctaLabel || "探索產品"}
              </Link>
              {slide.ctaSecondaryLabel && (
                <Link
                  to={slide.ctaSecondaryTo || "/technology"}
                  className="inline-flex items-center justify-center border border-white/60 text-white px-8 py-3.5 font-body text-[11px] tracking-widest uppercase hover:border-white transition-colors"
                >
                  {slide.ctaSecondaryLabel}
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${i === current ? "w-8 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"}`}
          />
        ))}
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 right-8 md:right-16 text-white/30"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}