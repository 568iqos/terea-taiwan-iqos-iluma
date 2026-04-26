import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Leaf, Thermometer, Wind } from "lucide-react";
import FlavorWizard from "../components/products/FlavorWizard";

const flavors = [
  {
    id: "regular",
    name: "醇原味",
    nameEn: "Regular",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwa18cb993/images/large/2405300199_1.jpg",
    gradient: "from-amber-400/10 to-amber-700/10",
    accentColor: "text-amber-600",
    bgAccent: "bg-amber-500/10",
    description: "忠於菸草本質的醇厚風味，焙烤香氣與堅果底韻完美融合，帶來最經典的滿足感。",
    notes: ["焙烤菸草", "堅果香氣", "木質尾韻"],
    intensity: 4,
    cooling: 1,
  },
  {
    id: "light",
    name: "淡原味",
    nameEn: "Smooth Regular",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw76a828c7/images/large/2405300200_1.jpg",
    gradient: "from-yellow-300/10 to-yellow-600/10",
    accentColor: "text-yellow-600",
    bgAccent: "bg-yellow-400/10",
    description: "輕柔順口的淡雅菸草，適合喜好清淡風味的您，每一口都帶來舒適愉悅。",
    notes: ["淡雅菸草", "輕柔煙霧", "溫潤尾韻"],
    intensity: 2,
    cooling: 1,
  },
  {
    id: "soft",
    name: "柔原味",
    nameEn: "Balanced Regular",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw038ac8b5/images/large/2405300201_1.jpg",
    gradient: "from-orange-200/10 to-orange-500/10",
    accentColor: "text-orange-500",
    bgAccent: "bg-orange-400/10",
    description: "恰到好處的平衡感，介於醇厚與清淡之間，是入門的最佳選擇。",
    notes: ["均衡菸草", "柔和煙霧", "細緻韻味"],
    intensity: 3,
    cooling: 1,
  },
  {
    id: "rich",
    name: "濃郁原味",
    nameEn: "Rich",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwb73efcd5/images/large/2405300232_1.jpg",
    gradient: "from-stone-400/10 to-stone-700/10",
    accentColor: "text-stone-600",
    bgAccent: "bg-stone-500/10",
    description: "飽滿濃郁的菸草風味，層次豐富，為追求強烈體驗的您而設計。",
    notes: ["濃郁菸草", "深沉香氣", "厚實口感"],
    intensity: 5,
    cooling: 1,
  },
  {
    id: "oasis",
    name: "綠洲珍珠",
    nameEn: "Oasis Pearl",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwd1febdd4/images/large/2405300231_1.jpg",
    gradient: "from-teal-400/10 to-teal-700/10",
    accentColor: "text-teal-600",
    bgAccent: "bg-teal-500/10",
    description: "清涼薄荷融合珍珠薄荷，帶來沁爽如綠洲般的清新體驗，每口都是涼意無限。",
    notes: ["冰涼薄荷", "珍珠清涼", "清新菸草"],
    intensity: 3,
    cooling: 5,
  },
  {
    id: "sunshine",
    name: "日光珍珠",
    nameEn: "Sunshine Pearl",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwf75b733a/images/large/2405300233_1_b.jpg",
    gradient: "from-sky-300/10 to-sky-600/10",
    accentColor: "text-sky-600",
    bgAccent: "bg-sky-400/10",
    description: "陽光柑橘香氣與清涼薄荷珍珠的完美結合，如沐日光般明亮愉悅。",
    notes: ["柑橘日光", "薄荷珍珠", "清新煙霧"],
    intensity: 2,
    cooling: 4,
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
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
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
                    className="bg-black/5 text-black/70 font-body text-xs tracking-wider px-3 py-1.5 rounded-full"
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
            <p className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-3">Product Line</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
              風味系列
            </h1>
            <p className="font-body text-muted-foreground text-sm max-w-md leading-relaxed">
              每一款 Terea 都經過精心調配，以加熱不燃燒技術呈現最純粹的風味體驗。
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