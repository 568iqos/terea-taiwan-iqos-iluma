import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: "regular",
    name: "醇原味",
    nameEn: "Regular",
    desc: "飽滿焙烤菸草，堅果底韻，最經典的選擇",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwa18cb993/images/large/2405300199_1.jpg",
    tag: "醇厚",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    id: "rich",
    name: "濃郁原味",
    nameEn: "Rich",
    desc: "層次豐富、飽滿深沉，為追求強烈體驗而設計",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwb73efcd5/images/large/2405300232_1.jpg",
    tag: "強烈",
    tagColor: "bg-stone-200 text-stone-700",
  },
  {
    id: "oasis",
    name: "綠洲珍珠",
    nameEn: "Oasis Pearl",
    desc: "冰涼薄荷珍珠，沁爽如綠洲，清新無限",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwd1febdd4/images/large/2405300231_1.jpg",
    tag: "清涼",
    tagColor: "bg-teal-100 text-teal-700",
  },
  {
    id: "sunshine",
    name: "日光珍珠",
    nameEn: "Sunshine Pearl",
    desc: "柑橘日光搭配涼感珍珠，明亮愉悅",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwf75b733a/images/large/2405300233_1_b.jpg",
    tag: "果香",
    tagColor: "bg-sky-100 text-sky-700",
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
              Find Your Flavor
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              找到最適合您的風味
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Link
              to="/products"
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
              <Link to="/products" className="group block h-full">
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