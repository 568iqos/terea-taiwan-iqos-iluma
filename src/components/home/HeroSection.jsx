import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Terea heat-not-burn tobacco stick on Taiwanese marble"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="h-px w-16 bg-primary mb-8" />
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-6">
              <span className="block">Terea</span>
              <span className="block text-primary mt-2">Taiwan</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-base text-muted-foreground leading-relaxed mb-6 max-w-md"
          >
            加熱不燃燒菸草產品。本產品含有尼古丁，尼古丁具有成癮性。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-6"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-heading text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300"
            >
              查看產品
            </Link>
            <Link
              to="/stores"
              className="inline-flex items-center gap-2 font-heading text-sm tracking-wider uppercase text-foreground hover:text-primary transition-colors"
            >
              門市據點
              <span className="h-px w-8 bg-current" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-heading text-xs tracking-widest uppercase text-muted-foreground">
          向下探索
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-4 h-4 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}