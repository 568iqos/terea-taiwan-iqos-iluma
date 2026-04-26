import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function StoresCTA({ cityImage }) {
  return (
    <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        {cityImage && (
          <img
            src={cityImage}
            alt="Taiwan city"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[11px] tracking-[0.25em] uppercase text-white/50 mb-5">
            Find a Store
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            授權販售據點
          </h2>
          <p className="font-body text-sm text-white/60 max-w-sm mx-auto mb-10 leading-relaxed">
            台北、台中、高雄等地均設有授權販售門市。
          </p>
          <Link
            to="/stores"
            className="inline-flex items-center justify-center bg-white text-black px-10 py-3.5 font-body text-[11px] tracking-widest uppercase rounded-full hover:bg-white/90 transition-colors"
          >
            查看門市
          </Link>
        </motion.div>
      </div>
    </section>
  );
}