import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const CITY_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/15080c9ca_generated_image.png";

const cities = ["台北", "台中", "高雄", "桃園", "新竹"];

export default function StoresCTA() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] items-center gap-12 py-20 md:py-28">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5">
              Find a Store
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              授權販售<br />門市據點
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
              全台各大城市均設有授權販售門市，提供專業產品介紹與購買服務。
            </p>

            {/* City tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {cities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1.5 border border-border px-4 py-1.5 font-body text-xs text-muted-foreground rounded-full"
                >
                  <MapPin className="w-3 h-3" />
                  {city}
                </span>
              ))}
            </div>

            <Link
              to="/stores"
              className="inline-flex items-center gap-2 font-body text-[11px] tracking-widest uppercase text-foreground hover:opacity-60 transition-opacity group"
            >
              查看全部門市
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={CITY_IMAGE}
                alt="Taiwan stores"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-black text-white px-6 py-4 rounded-xl shadow-xl">
              <p className="font-heading text-2xl font-bold">20+</p>
              <p className="font-body text-[10px] tracking-wider uppercase text-white/60">授權門市</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}