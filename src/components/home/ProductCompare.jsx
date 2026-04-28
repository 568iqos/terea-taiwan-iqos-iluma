import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: "iluma-i-prime",
    name: "ILUMA i PRIME",
    nameEn: "Flagship Device",
    desc: "旗艦款設備，搭載 OLED 觸控螢幕、智慧延長功能與可換式外殼設計",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/%E3%80%90%E4%B8%BB%E5%9C%96%E3%80%91-TEREA-%E4%B8%BB%E6%A9%9F-%E5%9C%96%E7%89%87.png",
    tag: "旗艦",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    id: "iluma-i",
    name: "ILUMA i",
    nameEn: "Standard Device",
    desc: "標準版設備，搭載觸控螢幕，FlexPuff 多抽功能，輕巧日常首選",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/%E3%80%905%E8%89%B2%E4%B8%BB%E6%A9%9F%E3%80%91IQO-S-TEREA%E5%9C%96%E7%89%87.png",
    tag: "標準",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "iluma-one-i",
    name: "ILUMA ONE i",
    nameEn: "All-in-One Device",
    desc: "一體成型設計，內建大容量電池，一次充電可使用 20 支，隨行自在",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/Web-Asset-ILUMAi-One_Compare_Desktop.webp",
    tag: "一體式",
    tagColor: "bg-teal-100 text-teal-700",
  },
  {
    id: "limited",
    name: "最新限量版",
    nameEn: "Limited Edition",
    desc: "ILUMA i 電光紫新色登場，限量發售，搶先入手",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/088a39156_IMG_8190.jpg",
    tag: "限量",
    tagColor: "bg-violet-100 text-violet-700",
  },
];

export default function ProductCompare() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Heating Devices
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              探索加熱設備系列
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Link
              to="/devices"
              className="inline-flex items-center gap-2 font-body text-[11px] tracking-widest uppercase text-foreground hover:opacity-60 transition-opacity group"
            >
              查看全部
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to="/devices" className="group block h-full">
                <div className="rounded-2xl overflow-hidden bg-[#f5f5f5] mb-4">
                  <div className="aspect-square">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="px-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-body text-[10px] px-2.5 py-1 rounded-full tracking-wider ${p.tagColor}`}>
                      {p.tag}
                    </span>
                  </div>
                  <p className="font-body text-[10px] text-muted-foreground tracking-wider uppercase mb-1">{p.nameEn}</p>
                  <h3 className="font-heading text-base font-bold mb-1.5">{p.name}</h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}