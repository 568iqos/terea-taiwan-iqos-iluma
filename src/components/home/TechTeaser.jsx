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
              <span className="text-primary">感應加熱系統</span>
            </h2>
            <p className="font-body text-background/60 text-lg leading-relaxed mb-8 max-w-md">
              由內而外的精準加熱，不燃燒，不產生灰燼。以350°C恆溫技術，完整釋放菸草的真實風味，同時大幅降低有害物質的產生。
            </p>

            <div className="grid grid-cols-3 gap-8 mb-10">
              {[
                { value: "350°C", label: "精準恆溫" },
                { value: "0", label: "灰燼產生" },
                { value: "95%", label: "減少有害物質" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="font-heading text-xs tracking-wider text-background/40 uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

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