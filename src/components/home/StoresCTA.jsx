import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

export default function StoresCTA({ cityImage }) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {cityImage && (
          <img
            src={cityImage}
            alt="Taipei cityscape"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-8">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-heading text-xs tracking-widest uppercase text-primary">
              台灣各地
            </span>
          </div>

          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-2xl mx-auto">
            尋找您附近的
            <span className="text-primary"> 授權門市</span>
          </h2>

          <p className="font-body text-muted-foreground text-lg max-w-lg mx-auto mb-10">
            台北、台中、高雄——全台授權販售據點，親身體驗 Terea 的精緻風味。
          </p>

          <Link
            to="/stores"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-heading text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 group"
          >
            查看門市
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}