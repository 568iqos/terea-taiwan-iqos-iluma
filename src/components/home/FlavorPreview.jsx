import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const flavors = [
  {
    name: "醇原味",
    nameEn: "Regular",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwa18cb993/images/large/2405300199_1.jpg",
    bg: "#f5ede0",
  },
  {
    name: "淡原味",
    nameEn: "Smooth Regular",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw76a828c7/images/large/2405300200_1.jpg",
    bg: "#faf4e8",
  },
  {
    name: "柔原味",
    nameEn: "Balanced Regular",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw038ac8b5/images/large/2405300201_1.jpg",
    bg: "#f7f0e6",
  },
  {
    name: "綠洲珍珠",
    nameEn: "Oasis Pearl",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwd1febdd4/images/large/2405300231_1.jpg",
    bg: "#e0f2ee",
  },
  {
    name: "日光珍珠",
    nameEn: "Sunshine Pearl",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwf75b733a/images/large/2405300233_1_b.jpg",
    bg: "#e6f4f9",
  },
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
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