import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const flavors = [
  { name: "沁涼薄荷", nameEn: "Arctic Mint", color: "from-teal-400/20 to-teal-600/20", borderColor: "border-teal-400/30" },
  { name: "醇厚原味", nameEn: "Rich Regular", color: "from-amber-400/20 to-amber-700/20", borderColor: "border-amber-500/30" },
  { name: "莓果馥郁", nameEn: "Berry Fusion", color: "from-purple-400/20 to-purple-700/20", borderColor: "border-purple-400/30" },
  { name: "柑橘清新", nameEn: "Citrus Wave", color: "from-orange-300/20 to-orange-600/20", borderColor: "border-orange-400/30" },
  { name: "茶韻悠然", nameEn: "Green Harmony", color: "from-green-400/20 to-green-700/20", borderColor: "border-green-500/30" },
];

export default function FlavorPreview({ flavorImages }) {
  return (
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="h-px w-16 bg-primary mb-8" />
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4">
            產品系列
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-lg">
            Terea 提供多種口味選擇，適用於 IQOS ILUMA 裝置。
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-12">
          {flavors.map((flavor, i) => (
            <motion.div
              key={flavor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`aspect-square rounded-2xl overflow-hidden border ${flavor.borderColor} bg-gradient-to-br ${flavor.color} mb-4 relative`}>
                {flavorImages[i] && (
                  <img
                    src={flavorImages[i]}
                    alt={flavor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
              </div>
              <h3 className="font-heading text-sm font-semibold tracking-wider">
                {flavor.name}
              </h3>
              <p className="font-heading text-xs text-muted-foreground tracking-wider uppercase">
                {flavor.nameEn}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-3 font-heading text-sm tracking-widest uppercase text-foreground hover:text-primary transition-colors group"
          >
            查看完整系列
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}