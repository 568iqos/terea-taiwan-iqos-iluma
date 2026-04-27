import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Leaf, Thermometer, Wind } from "lucide-react";
import FlavorWizard from "../components/products/FlavorWizard";

const flavors = [
  {
    id: "rich-regular",
    name: "特濃原味",
    nameEn: "Rich Regular",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100099_00S.jpg",
    gradient: "from-stone-400/10 to-stone-700/10",
    accentColor: "text-stone-700",
    bgAccent: "bg-stone-500",
    description: "TEREA 系列中強度和濃郁感迄今最強的口味。將頂級菸草葉的香氣與「啤酒花」風味深度融合，是追求濃烈體驗的最佳選擇。",
    notes: ["濃郁菸草", "啤酒花香", "深沉厚實"],
    intensity: 5,
    cooling: 1,
  },
  {
    id: "regular",
    name: "醇原味",
    nameEn: "Regular",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100085_00S-300x300.jpg",
    gradient: "from-amber-400/10 to-amber-700/10",
    accentColor: "text-amber-700",
    bgAccent: "bg-amber-500",
    description: "壓制雜味後呈現紳士風格的經典醇厚菸草，帶有生菸葉的芬芳清香及堅果、木質底韻，是最具代表性的原味選擇。",
    notes: ["生菸葉清香", "堅果香氣", "木質尾韻"],
    intensity: 4,
    cooling: 1,
  },
  {
    id: "smooth-regular",
    name: "淡原味",
    nameEn: "Smooth Regular",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100086_00S.jpg",
    gradient: "from-orange-200/10 to-orange-500/10",
    accentColor: "text-orange-600",
    bgAccent: "bg-orange-400",
    description: "柔和平衡的經典菸草風味，強度介於濃郁原味與特淡之間。融合淡淡的香草與柑橘香氣，以及微妙的辛辣草本香調，層次豐富而順口。",
    notes: ["香草柑橘", "辛辣草本", "平衡順口"],
    intensity: 2,
    cooling: 1,
  },
  {
    id: "balanced-regular",
    name: "堅果原味",
    nameEn: "Balanced Regular",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100087_00S.jpg",
    gradient: "from-yellow-300/10 to-yellow-600/10",
    accentColor: "text-yellow-700",
    bgAccent: "bg-yellow-400",
    description: "帶有輕微酸甜味，散發著堅果和木材的微弱清香，口感平衡溫和，提供穩定且帶有木質香氣的愉悅吸菸體驗。",
    notes: ["堅果清香", "木質香氣", "溫和平衡"],
    intensity: 3,
    cooling: 1,
  },
  {
    id: "black-menthol",
    name: "黑薄荷",
    nameEn: "Black Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100093_00S.jpg",
    gradient: "from-slate-400/10 to-slate-800/10",
    accentColor: "text-slate-700",
    bgAccent: "bg-slate-600",
    description: "俗稱「黑萬」，結合傳統薄荷清新與神秘深色香料。清涼感和冷感異常強烈，帶接近苦澀的微甜味，直擊喉嚨深處的冷爽感，甜味少、雜味低。",
    notes: ["強烈清涼", "深色薄荷", "冷爽直擊"],
    intensity: 4,
    cooling: 5,
  },
  {
    id: "menthol",
    name: "濃薄荷",
    nameEn: "Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100088_00S-300x300.jpg",
    gradient: "from-emerald-300/10 to-emerald-600/10",
    accentColor: "text-emerald-700",
    bgAccent: "bg-emerald-500",
    description: "以胡椒薄荷為基底的強烈薄荷型，薄荷感主導整體體驗，菸草感相對溫和退居其次。喜愛強薄荷的經典必選。",
    notes: ["胡椒薄荷", "清涼主調", "溫和菸草"],
    intensity: 3,
    cooling: 5,
  },
  {
    id: "mint",
    name: "淡薄荷",
    nameEn: "Mint",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100089_00S.jpg",
    gradient: "from-green-200/10 to-green-500/10",
    accentColor: "text-green-700",
    bgAccent: "bg-green-500",
    description: "提供溫和薄荷清涼感與淡雅菸草基底，清新順滑，涼感強度介於濃薄荷與柔和薄荷之間，完美平衡薄荷與菸草的比例。",
    notes: ["溫和薄荷", "淡雅菸草", "清新順滑"],
    intensity: 3,
    cooling: 2,
  },
  {
    id: "purple-menthol",
    name: "藍莓薄荷",
    nameEn: "Purple Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100090_00S-300x300.jpg",
    gradient: "from-violet-400/10 to-violet-700/10",
    accentColor: "text-violet-700",
    bgAccent: "bg-violet-500",
    description: "最受歡迎的薄荷風味。藍莓的濕潤果香與薄荷的清涼感完美融合，口感溫和中帶有清新水果氣息，果香與涼感相輔相成。",
    notes: ["藍莓果香", "清涼薄荷", "水潤果感"],
    intensity: 3,
    cooling: 4,
  },
  {
    id: "yellow-menthol",
    name: "青檸薄荷",
    nameEn: "Yellow Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100091_00S-300x300.jpg",
    gradient: "from-lime-300/10 to-lime-600/10",
    accentColor: "text-lime-700",
    bgAccent: "bg-lime-500",
    description: "青檸檬的明亮酸甜香氣與薄荷的清涼感完美結合，帶有陽光般鮮活氣息，適合喜愛輕盈清涼風味的您。",
    notes: ["青檸清香", "輕盈薄荷", "明亮酸甜"],
    intensity: 2,
    cooling: 3,
  },
  {
    id: "tropical-menthol",
    name: "熱帶水果",
    nameEn: "Tropical Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100092_00S.jpg",
    gradient: "from-orange-300/10 to-orange-600/10",
    accentColor: "text-orange-600",
    bgAccent: "bg-orange-500",
    description: "融合多種熱帶水果香氣，如芒果、鳳梨或百香果，提供甜美、芬芳的味覺感受，帶來如熱帶島嶼般的愉悅清涼體驗。",
    notes: ["芒果鳳梨", "百香果香", "甜美清涼"],
    intensity: 2,
    cooling: 3,
  },
  {
    id: "oasis-pearl",
    name: "綠洲爆珠",
    nameEn: "Oasis Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100098_00S-300x300.jpg",
    gradient: "from-teal-400/10 to-teal-700/10",
    accentColor: "text-teal-700",
    bgAccent: "bg-teal-500",
    description: "內含可捏破的薄荷爆珠，捏破前後帶來截然不同的清涼層次。冰涼薄荷與爆珠的瞬間清涼感交織，帶來沁爽如綠洲般的極致體驗。",
    notes: ["薄荷爆珠", "雙層清涼", "沁爽清新"],
    intensity: 3,
    cooling: 5,
  },
  {
    id: "sunshine-pearl",
    name: "太陽爆珠",
    nameEn: "Sunshine Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100121_00S.jpg",
    gradient: "from-yellow-200/10 to-yellow-500/10",
    accentColor: "text-yellow-700",
    bgAccent: "bg-yellow-400",
    description: "具有西瓜般的青果口味和熱帶風情的愉悅清涼口味。令人聯想到西瓜的多汁口感，同時也能感受到與西瓜相似的哈密瓜風味，清新甜蜜。",
    notes: ["西瓜清涼", "哈密瓜甜", "熱帶果香"],
    intensity: 2,
    cooling: 4,
  },
  {
    id: "black-purple-menthol",
    name: "黑藍莓薄荷",
    nameEn: "Black Purple Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100096_00S-300x300.jpg",
    gradient: "from-purple-400/10 to-purple-800/10",
    accentColor: "text-purple-700",
    bgAccent: "bg-purple-600",
    description: "藍莓薄荷的加強進化版，濃郁黑藍莓果香與強勁薄荷的雙重衝擊，從鼻腔溢出的清涼感尤為鮮明強烈，適合喜愛強烈果香薄荷的進階玩家。",
    notes: ["黑藍莓果香", "強烈薄荷", "雙重清涼"],
    intensity: 4,
    cooling: 5,
  },
  {
    id: "purple-pearl",
    name: "黑熱帶水果",
    nameEn: "Black Tropical",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100127_00S-300x300.jpg",
    gradient: "from-fuchsia-400/10 to-fuchsia-700/10",
    accentColor: "text-fuchsia-700",
    bgAccent: "bg-fuchsia-500",
    description: "熱帶水果的加強版，在多種熱帶水果甜蜜香氣的基礎上疊加更強勁的清涼感，果香濃郁、涼意更加深沉，帶來更刺激的感官享受。",
    notes: ["濃郁熱帶果香", "強烈清涼", "深沉香氣"],
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