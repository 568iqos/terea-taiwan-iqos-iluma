import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const TECH_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/1565ebbb3_generated_image.png";

const stats = [
  { value: "350°C", label: "最高加熱溫度" },
  { value: "0", label: "燃燒、無灰燼" },
  { value: "14口", label: "每根約可使用" },
];

export default function TechTeaser() {
  return (
    <section className="bg-[#111] text-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative lg:order-1 order-2"
          >
            <div className="h-72 lg:h-full lg:absolute lg:inset-0">
              <img
                src={TECH_IMAGE}
                alt="Smartcore induction heating"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent lg:hidden" />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex flex-col justify-center py-20 lg:pl-16 order-1 lg:order-2"
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/40 mb-5">
              Technology
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
              Smartcore™
              <br />
              <span className="font-light text-white/60">感應加熱技術</span>
            </h2>
            <p className="font-body text-sm text-white/50 leading-relaxed mb-10 max-w-sm">
              革命性電磁感應加熱技術，從菸草核心均勻加熱，無燃燒、無灰燼，帶來更潔淨、更純粹的風味體驗。
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <p className="font-heading text-2xl font-bold text-white mb-1">{s.value}</p>
                  <p className="font-body text-[10px] text-white/40 tracking-wider uppercase">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <Link
              to="/technology"
              className="inline-flex items-center gap-2 font-body text-[11px] tracking-widest uppercase text-white/60 hover:text-white transition-colors group self-start"
            >
              深入了解
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}