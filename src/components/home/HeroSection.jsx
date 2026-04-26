import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Terea heat-not-burn tobacco sticks"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content overlay — bottom-left, IQOS style */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg"
        >
          <p className="font-body text-[11px] tracking-[0.25em] uppercase text-white/60 mb-4">
            Heat-Not-Burn Tobacco
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-white leading-none mb-6">
            TEREA<br />
            <span className="font-light">Taiwan</span>
          </h1>
          <p className="font-body text-sm text-white/70 leading-relaxed mb-8 max-w-sm">
            加熱不燃燒菸草產品。本產品含有尼古丁，尼古丁具有成癮性。
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-white text-black px-8 py-3 font-body text-[11px] tracking-widest uppercase rounded-full hover:bg-white/90 transition-colors"
            >
              查看產品
            </Link>
            <Link
              to="/stores"
              className="inline-flex items-center justify-center border border-white text-white px-8 py-3 font-body text-[11px] tracking-widest uppercase rounded-full hover:bg-white/10 transition-colors"
            >
              門市據點
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}