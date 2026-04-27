import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const flavors = [
  { name: "特濃原味", nameEn: "Rich Regular", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100099_00S.jpg", bg: "#ede8e3" },
  { name: "醇原味", nameEn: "Regular", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100085_00S-300x300.jpg", bg: "#f5ede0" },
  { name: "淡原味", nameEn: "Smooth Regular", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100086_00S.jpg", bg: "#faf4e8" },
  { name: "堅果原味", nameEn: "Balanced Regular", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100087_00S.jpg", bg: "#f7f0e6" },
  { name: "黑薄荷", nameEn: "Black Menthol", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100093_00S.jpg", bg: "#e8e8ec" },
  { name: "濃薄荷", nameEn: "Menthol", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100088_00S-300x300.jpg", bg: "#e0f0ea" },
  { name: "淡薄荷", nameEn: "Mint", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100089_00S.jpg", bg: "#e4f2e6" },
  { name: "藍莓薄荷", nameEn: "Purple Menthol", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100090_00S-300x300.jpg", bg: "#ece0f0" },
  { name: "青檸薄荷", nameEn: "Yellow Menthol", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100091_00S-300x300.jpg", bg: "#eaf5e0" },
  { name: "熱帶水果", nameEn: "Tropical Menthol", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100092_00S.jpg", bg: "#e8f4e0" },
  { name: "綠洲爆珠", nameEn: "Oasis Pearl", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100098_00S-300x300.jpg", bg: "#e0f2ee" },
  { name: "太陽爆珠", nameEn: "Sunshine Pearl", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100121_00S.jpg", bg: "#faf5e0" },
  { name: "黑藍莓薄荷", nameEn: "Black Purple Menthol", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100096_00S-300x300.jpg", bg: "#ede0f5" },
  { name: "黑熱帶水果", nameEn: "Black Tropical", image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100127_00S-300x300.jpg", bg: "#f0e4f5" },
];

export default function FlavorPreview() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-[#fafafa]">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Product Line
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              風味系列
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-body text-[11px] tracking-widest uppercase text-foreground hover:opacity-60 transition-opacity group"
            >
              全部產品
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Flavor grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 md:gap-4">
          {flavors.map((flavor, i) => (
            <motion.div
              key={flavor.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link to="/products" className="group block">
                <div
                  className="aspect-square rounded-xl overflow-hidden mb-3 relative"
                  style={{ backgroundColor: flavor.bg }}
                >
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="font-body text-[10px] text-muted-foreground tracking-wider uppercase mb-1">
                  {flavor.nameEn}
                </p>
                <h3 className="font-heading text-sm font-semibold tracking-tight">
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