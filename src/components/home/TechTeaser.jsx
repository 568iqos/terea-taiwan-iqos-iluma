import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function TechTeaser({ techImage, deviceImage }) {
  return (
    <section className="py-32 bg-foreground text-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px w-16 bg-primary mb-8" />
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Smartcore™
              <br />
              <span className="text-primary">感應加熱技術</span>
            </h2>
            <p className="font-body text-background/60 text-base leading-relaxed mb-8 max-w-md">
              以電磁感應從菸草內部加熱，加熱溫度不超過 350°C，不產生燃燒。
            </p>
            <p className="font-body text-background/40 text-xs leading-relaxed mb-8 max-w-md">
              本產品並非無風險，且含有尼古丁，尼古丁具有成癮性。
            </p>

            <Link
              to="/technology"
              className="inline-flex items-center gap-3 font-heading text-sm tracking-widest uppercase text-background hover:text-primary transition-colors group"
            >
              深入了解
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={techImage}
                alt="Smartcore induction heating technology cutaway"
                className="w-full h-full object-cover"
              />
            </div>
            {deviceImage && (
              <div className="absolute -bottom-8 -left-8 w-40 h-52 rounded-xl overflow-hidden shadow-2xl border border-background/10 hidden lg:block">
                <img
                  src={deviceImage}
                  alt="Device in hand"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}