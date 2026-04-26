import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function TechTeaser({ techImage, deviceImage }) {
  return (
    <section className="bg-[#111] text-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
              <img
                src={techImage}
                alt="Smartcore induction heating technology"
                className="w-full h-full object-cover"
              />
            </div>
            {deviceImage && (
              <div className="absolute -bottom-6 -right-4 w-28 h-36 rounded-xl overflow-hidden border border-white/10 hidden lg:block shadow-2xl">
                <img src={deviceImage} alt="Device" className="w-full h-full object-cover" />
              </div>
            )}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <p className="font-body text-[11px] tracking-[0.25em] uppercase text-white/40 mb-4">
              Technology
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-6">
              Smartcore™<br />
              <span className="font-light text-white/70">感應加熱技術</span>
            </h2>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-4 max-w-md">
              以電磁感應從菸草內部加熱，加熱溫度不超過 350°C，不產生燃燒。
            </p>
            <p className="font-body text-xs text-white/30 leading-relaxed mb-10 max-w-md">
              本產品並非無風險，且含有尼古丁，尼古丁具有成癮性。
            </p>
            <Link
              to="/technology"
              className="inline-flex items-center justify-center border border-white text-white px-8 py-3 font-body text-[11px] tracking-widest uppercase rounded-full hover:bg-white hover:text-black transition-colors"
            >
              深入了解
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}