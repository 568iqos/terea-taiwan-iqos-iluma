import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Leaf, Thermometer, Wind } from "lucide-react";
import FlavorWizard from "../components/products/FlavorWizard";

const flavors = [
  {
    id: "mint",
    name: "沁涼薄荷",
    nameEn: "Arctic Mint",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/02dace3d5_generated_d47b826e.png",
    gradient: "from-teal-500/10 to-teal-700/10",
    accentColor: "text-teal-600",
    bgAccent: "bg-teal-500/10",
    description: "清涼薄荷的沁爽感受，伴隨著微妙的菸草底韻，為您帶來清新而深邃的體驗。",
    notes: ["冰涼薄荷", "清新尤加利", "淡雅菸草"],
    intensity: 3,
    cooling: 5,
  },
  {
    id: "regular",
    name: "醇厚原味",
    nameEn: "Rich Regular",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/8dda69a42_generated_ace8fd89.png",
    gradient: "from-amber-400/10 to-amber-700/10",
    accentColor: "text-amber-600",
    bgAccent: "bg-amber-500/10",
    description: "忠於菸草本質的醇厚風味，焙烤香氣與堅果底韻完美融合，帶來最經典的滿足感。",
    notes: ["焙烤菸草", "堅果香氣", "木質尾韻"],
    intensity: 4,
    cooling: 1,
  },
  {
    id: "berry",
    name: "莓果馥郁",
    nameEn: "Berry Fusion",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/4258615b9_generated_81912564.png",
    gradient: "from-purple-400/10 to-purple-700/10",
    accentColor: "text-purple-600",
    bgAccent: "bg-purple-500/10",
    description: "野莓的甜美與花香交織，在溫潤的菸草基底上綻放多層次的果香體驗。",
    notes: ["野莓甜香", "花果馥郁", "絲滑菸草"],
    intensity: 3,
    cooling: 2,
  },
  {
    id: "citrus",
    name: "柑橘清新",
    nameEn: "Citrus Wave",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/4232866f5_generated_79373a25.png",
    gradient: "from-orange-300/10 to-orange-600/10",
    accentColor: "text-orange-600",
    bgAccent: "bg-orange-500/10",
    description: "陽光柑橘的明亮活力，搭配輕柔菸草的溫暖底蘊，如同午後微風般令人愉悅。",
    notes: ["鮮橙活力", "佛手柑", "陽光菸草"],
    intensity: 2,
    cooling: 3,
  },
  {
    id: "green",
    name: "茶韻悠然",
    nameEn: "Green Harmony",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/a44bfbcdb_generated_749f3ab3.png",
    gradient: "from-green-400/10 to-green-700/10",
    accentColor: "text-green-600",
    bgAccent: "bg-green-500/10",
    description: "台灣高山茶的悠遠韻味融入精選菸草，帶來禪意般的寧靜與層次。",
    notes: ["高山烏龍", "草本清香", "禪韻菸草"],
    intensity: 2,
    cooling: 2,
  },
];

function IntensityDots({ level, max = 5, colorClass }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < level ? colorClass : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function FlavorDetail({ flavor, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className={`aspect-square bg-gradient-to-br ${flavor.gradient}`}>
            <img
              src={flavor.image}
              alt={flavor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <button
              onClick={onClose}
              className="self-end mb-6 p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">
              {flavor.nameEn}
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight mb-4">
              {flavor.name}
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              {flavor.description}
            </p>

            {/* Tasting Notes */}
            <div className="mb-8">
              <p className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-3">
                風味筆記
              </p>
              <div className="flex flex-wrap gap-2">
                {flavor.notes.map((note) => (
                  <span
                    key={note}
                    className={`${flavor.bgAccent} ${flavor.accentColor} font-heading text-xs tracking-wider px-3 py-1.5 rounded-full`}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Intensity & Cooling */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="font-heading text-xs tracking-wider uppercase text-muted-foreground">
                    濃郁度
                  </p>
                </div>
                <IntensityDots level={flavor.intensity} colorClass={flavor.bgAccent.replace('/10', '')} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="font-heading text-xs tracking-wider uppercase text-muted-foreground">
                    清涼感
                  </p>
                </div>
                <IntensityDots level={flavor.cooling} colorClass={flavor.bgAccent.replace('/10', '')} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Products() {
  const [selectedFlavor, setSelectedFlavor] = useState(null);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px w-16 bg-primary mb-8" />
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4">
              風味系列
            </h1>
            <p className="font-body text-muted-foreground text-lg max-w-xl">
              每一款 Terea 都經過精心調配，以加熱不燃燒技術呈現最純粹的風味體驗。選擇你的感官旅程。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flavor Wizard */}
      <section className="px-6 lg:px-12 pb-16">
        <div className="max-w-7xl mx-auto">
          <FlavorWizard />
        </div>
      </section>

      {/* Flavor Grid */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flavors.map((flavor, i) => (
              <motion.div
                key={flavor.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedFlavor(flavor)}
              >
                <div className={`aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br ${flavor.gradient} border border-border/50 relative`}>
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                    <p className="font-heading text-xs tracking-widest uppercase mb-1 text-background/60">
                      {flavor.nameEn}
                    </p>
                    <h3 className="font-heading text-xl font-bold tracking-tight">
                      {flavor.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedFlavor && (
          <FlavorDetail
            flavor={selectedFlavor}
            onClose={() => setSelectedFlavor(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}