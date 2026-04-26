import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Leaf, Thermometer, Wind } from "lucide-react";
import FlavorWizard from "../components/products/FlavorWizard";

const flavors = [
  {
    id: "rich-regular",
    name: "濃郁原味",
    nameEn: "Rich Regular",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwb73efcd5/images/large/2405300232_1.jpg",
    gradient: "from-stone-400/10 to-stone-700/10",
    accentColor: "text-stone-700",
    bgAccent: "bg-stone-500",
    description: "IQOS ILUMA 中最強勁的風味。頂級菸草葉的香氣與麥芽深度完美融合，帶來飽滿、層次豐富的濃郁體驗。",
    notes: ["濃郁菸草", "麥芽香氣", "深沉厚實"],
    intensity: 5,
    cooling: 1,
  },
  {
    id: "regular",
    name: "醇原味",
    nameEn: "Regular",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwa18cb993/images/large/2405300199_1.jpg",
    gradient: "from-amber-400/10 to-amber-700/10",
    accentColor: "text-amber-700",
    bgAccent: "bg-amber-500",
    description: "忠於菸草本質的醇厚風味，壓制雜味後呈現清爽且紳士的口感，帶有生菸葉清香及堅果、木質底韻。",
    notes: ["焙烤菸草", "堅果香氣", "木質尾韻"],
    intensity: 4,
    cooling: 1,
  },
  {
    id: "smooth-regular",
    name: "淡原味",
    nameEn: "Smooth Regular",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw76a828c7/images/large/2405300200_1.jpg",
    gradient: "from-yellow-300/10 to-yellow-600/10",
    accentColor: "text-yellow-700",
    bgAccent: "bg-yellow-400",
    description: "以木質香氣和淡淡茶香壓制習慣性的溫和原味，蒸氣帶出甘油的微甜酸味，口感細膩清爽。",
    notes: ["木質香氣", "淡雅茶香", "微甜尾韻"],
    intensity: 3,
    cooling: 1,
  },
  {
    id: "balanced-regular",
    name: "柔原味",
    nameEn: "Balanced Regular",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw038ac8b5/images/large/2405300201_1.jpg",
    gradient: "from-orange-200/10 to-orange-500/10",
    accentColor: "text-orange-600",
    bgAccent: "bg-orange-400",
    description: "入口有清爽酸感，隨後化為柔和微甜的醇厚口感，秘密添加香草與柑橘，消除雜味後更顯圓潤美味。",
    notes: ["香草柑橘", "柔和醇厚", "清爽酸感"],
    intensity: 2,
    cooling: 1,
  },
  {
    id: "black-menthol",
    name: "黑薄荷",
    nameEn: "Black Menthol",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw7ef8f0c4/images/large/2405300202_1.jpg",
    gradient: "from-slate-400/10 to-slate-800/10",
    accentColor: "text-slate-700",
    bgAccent: "bg-slate-600",
    description: "俗稱「黑薄荷」，清涼感強烈且帶苦感，甜味少、雜味低，尼古丁感強。喜愛強勁薄荷的最佳選擇。",
    notes: ["強烈薄荷", "清涼刺激", "濃郁尼古丁"],
    intensity: 4,
    cooling: 5,
  },
  {
    id: "menthol",
    name: "薄荷",
    nameEn: "Menthol",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw4e4b1e9a/images/large/2405300203_1.jpg",
    gradient: "from-emerald-300/10 to-emerald-600/10",
    accentColor: "text-emerald-700",
    bgAccent: "bg-emerald-500",
    description: "以胡椒薄荷為基底，薄荷感主導，菸草感較為溫和。喜愛強薄荷者的經典必選，清涼感凌駕一切。",
    notes: ["胡椒薄荷", "清涼主調", "溫和菸草"],
    intensity: 3,
    cooling: 5,
  },
  {
    id: "mint",
    name: "薄荷清涼",
    nameEn: "Mint",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw6a4c1b23/images/large/2405300204_1.jpg",
    gradient: "from-green-200/10 to-green-500/10",
    accentColor: "text-green-700",
    bgAccent: "bg-green-500",
    description: "薄荷與菸草風味完美平衡，既有菸草的醇厚又不失薄荷的清新，是昔日傳統薄荷菸草的美好傳承。",
    notes: ["平衡薄荷", "菸草醇厚", "清新和諧"],
    intensity: 3,
    cooling: 2,
  },
  {
    id: "black-purple-menthol",
    name: "黑紫薄荷",
    nameEn: "Black Purple Menthol",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw1f2fa6d5/images/large/2405300229_1.jpg",
    gradient: "from-purple-400/10 to-purple-800/10",
    accentColor: "text-purple-700",
    bgAccent: "bg-purple-600",
    description: "紫薄荷的加強版，黑加侖成熟莓果香與強勁薄荷的雙重衝擊，從鼻腔溢出的清涼感尤為鮮明。",
    notes: ["黑加侖莓果", "強烈薄荷", "雙重清涼"],
    intensity: 4,
    cooling: 5,
  },
  {
    id: "purple-menthol",
    name: "紫薄荷",
    nameEn: "Purple Menthol",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw2e3b5f12/images/large/2405300228_1.jpg",
    gradient: "from-violet-400/10 to-violet-700/10",
    accentColor: "text-violet-700",
    bgAccent: "bg-violet-500",
    description: "最受歡迎的薄荷風味。莓果的濕潤果香與薄荷的清涼感完美融合，口感溫和中帶有清新水果氣息。",
    notes: ["莓果香氣", "清涼薄荷", "溫和果香"],
    intensity: 3,
    cooling: 4,
  },
  {
    id: "tropical-menthol",
    name: "熱帶薄荷",
    nameEn: "Tropical Menthol",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw8c9d2e34/images/large/2405300230_1.jpg",
    gradient: "from-lime-300/10 to-lime-600/10",
    accentColor: "text-lime-700",
    bgAccent: "bg-lime-500",
    description: "熱帶水果的甜蜜香氣融合薄荷的清涼感，帶來如熱帶島嶼般的愉悅體驗，清新甜美。",
    notes: ["熱帶水果", "清涼薄荷", "甜蜜清新"],
    intensity: 2,
    cooling: 3,
  },
  {
    id: "yellow-menthol",
    name: "黃薄荷",
    nameEn: "Yellow Menthol",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw5f6a7b89/images/large/2405300227_1.jpg",
    gradient: "from-yellow-200/10 to-yellow-500/10",
    accentColor: "text-yellow-700",
    bgAccent: "bg-yellow-400",
    description: "柑橘香氣與清淡薄荷的清新組合，帶有陽光般的明亮酸甜氣息，適合喜愛輕盈清涼風味者。",
    notes: ["柑橘清香", "輕盈薄荷", "明亮酸甜"],
    intensity: 2,
    cooling: 3,
  },
  {
    id: "oasis-pearl",
    name: "綠洲珍珠",
    nameEn: "Oasis Pearl",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwd1febdd4/images/large/2405300231_1.jpg",
    gradient: "from-teal-400/10 to-teal-700/10",
    accentColor: "text-teal-700",
    bgAccent: "bg-teal-500",
    description: "冰涼薄荷融合珍珠薄荷，帶來沁爽如綠洲般的極致清新體驗，每口都是令人神清氣爽的涼意。",
    notes: ["冰涼薄荷", "珍珠清涼", "清新菸草"],
    intensity: 3,
    cooling: 5,
  },
  {
    id: "sunshine-pearl",
    name: "日光珍珠",
    nameEn: "Sunshine Pearl",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwf75b733a/images/large/2405300233_1_b.jpg",
    gradient: "from-sky-300/10 to-sky-600/10",
    accentColor: "text-sky-700",
    bgAccent: "bg-sky-400",
    description: "陽光柑橘香氣與清涼薄荷珍珠的完美結合，如沐日光般明亮愉悅，清新甜美中帶涼感。",
    notes: ["柑橘日光", "薄荷珍珠", "清新愉悅"],
    intensity: 2,
    cooling: 4,
  },
  {
    id: "purple-pearl",
    name: "紫珍珠",
    nameEn: "Purple Pearl",
    image: "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw3d4e5f67/images/large/2405300234_1.jpg",
    gradient: "from-fuchsia-400/10 to-fuchsia-700/10",
    accentColor: "text-fuchsia-700",
    bgAccent: "bg-fuchsia-500",
    description: "成熟莓果香氣與珍珠薄荷涼感的奢華融合，果香馥郁而清涼感層次豐富，帶來精緻的感官享受。",
    notes: ["成熟莓果", "珍珠薄荷", "馥郁清涼"],
    intensity: 3,
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