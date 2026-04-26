import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const flavors = [
  { name: "沁涼薄荷", nameEn: "Arctic Mint" },
  { name: "醇厚原味", nameEn: "Rich Regular" },
  { name: "莓果馥郁", nameEn: "Berry Fusion" },
  { name: "柑橘清新", nameEn: "Citrus Wave" },
  { name: "茶韻悠然", nameEn: "Green Harmony" },
];

export default function FlavorPreview({ flavorImages }) {
  return (
    <section className="py-24 px-6 md:px-10 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
              Product Line
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              風味系列
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center border border-black text-black px-7 py-2.5 font-body text-[11px] tracking-widest uppercase rounded-full hover:bg-black hover:text-white transition-colors self-start md:self-auto"
          >
            全部產品
          </Link>
        </div>

        {/* Flavor grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
          {flavors.map((flavor, i) => (
            <motion.div
              key={flavor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to="/products" className="group block">
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#f5f5f5] mb-3">
                  {flavorImages[i] && (
                    <img
                      src={flavorImages[i]}
                      alt={flavor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                <p className="font-body text-[11px] text-muted-foreground tracking-wider uppercase mb-0.5">
                  {flavor.nameEn}
                </p>
                <h3 className="font-heading text-sm font-semibold">
                  {flavor.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}