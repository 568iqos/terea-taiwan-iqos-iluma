import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "350°C", label: "最高加熱溫度" },
  { value: "0", label: "燃燒、無灰燼" },
  { value: "14口", label: "每根約可使用" },
];

export default function TechTeaser() {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

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
            className="relative lg:order-1 order-2 flex items-center justify-center py-8 lg:py-0"
          >
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink="https://www.instagram.com/reel/DUqLt18jApW/?igsh=MTJiendwYXZ3Z3Flbg=="
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                borderRadius: "3px",
                boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                margin: "1px",
                maxWidth: "400px",
                minWidth: "326px",
                padding: 0,
                width: "100%",
              }}
            />
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