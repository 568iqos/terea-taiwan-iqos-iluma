import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Check, Cpu, Smartphone, Zap, Leaf, RefreshCw, Wind } from "lucide-react";
import { useCart } from "@/context/CartContext";

const JAPAN_DEVICE_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/14c723944_IMG_8812.webp";
const JAPAN_DEVICE_VIDEO = "https://media.base44.com/videos/public/69edb64b2f0beef803a1b699/75a842c39_SaveClipApp_AQO-jwPNYhtICUUoQIFtg39RrrxZJ7i5CamXwAo4rIS2PZQL4hPldqf4liUIOORv4E1RigLrGOpSNAmXK39iKY8j6I9b9hOhUTEH0dI.mp4";

const KOREA_DEVICE_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/b8200a573_IMG_8769.jpg";
const KOREA_DEVICE_VIDEO = "https://media.base44.com/videos/public/69edb64b2f0beef803a1b699/550edefe7_VID_20260515062553057.mov";

const koreaDeviceSpecs = [
  { icon: Smartphone, label: "控制介面", value: "OLED 觸控螢幕，可 Pause、查看剩餘次數" },
  { icon: Zap, label: "智慧功能", value: "FlexPuff 自動延長、FlexBattery 模式切換" },
  { icon: Cpu, label: "加熱技術", value: "感應加熱無需清潔，Smartcore Induction System" },
  { icon: RefreshCw, label: "材質與美觀", value: "分離式設計、鋁+皮革/布料外觀、可換殼" },
  { icon: Leaf, label: "環保設計", value: "使用回收塑膠、再造鋁外框" },
  { icon: Wind, label: "使用體驗", value: "支援 2–3 次連吸、無菸灰清潔限制" },
];

const japanDeviceSpecs = [
  { icon: Smartphone, label: "控制介面", value: "OLED 觸控螢幕，可 Pause、查看剩餘次數" },
  { icon: Zap, label: "智慧功能", value: "FlexPuff 自動延長、FlexBattery 模式切換" },
  { icon: Cpu, label: "加熱技術", value: "感應加熱無需清潔，Smartcore Induction System" },
  { icon: RefreshCw, label: "材質與美觀", value: "分離式設計、鋁+皮革/布料外觀、可換殼" },
  { icon: Leaf, label: "環保設計", value: "使用回收塑膠、再造鋁外框" },
  { icon: Wind, label: "使用體驗", value: "支援 2–3 次連吸、無菸灰清潔限制" },
];

const koreaLimited = [
  {
    id: "kr-limited-sun-pearl",
    name: "日光爆珠",
    nameEn: "Sun Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Sun-Pearl.png",
    gradient: "from-orange-300/10 to-red-400/10",
    description: "菸草與薄荷結合，甜美爆珠瞬間迸發清涼果香，口感豐富多層次，男女皆愛。",
    tag: "韓國限定",
    region: "韓國",
  },
  {
    id: "kr-limited-starling-pearl",
    name: "櫻桃爆珠",
    nameEn: "Starling Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Starling-Pearl.png",
    gradient: "from-red-300/10 to-rose-500/10",
    description: "前調薄荷淨爽・後韻草莓香醇，咬破爆珠後清涼感瞬間提升，果香充盈口腔。",
    tag: "韓國限定",
    region: "韓國",
  },
  {
    id: "kr-limited-oasis-pearl",
    name: "綠洲爆珠",
    nameEn: "Oasis Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Oasis-Pearl.png",
    gradient: "from-teal-300/10 to-cyan-500/10",
    description: "奶油堅果 × 熱帶果漾 × 薄荷冰核，咬破爆珠後清涼感極速倍增，沁涼舒爽。",
    tag: "韓國限定",
    region: "韓國",
  },
  {
    id: "kr-limited-abora-pearl",
    name: "青蘋果爆珠",
    nameEn: "Abora Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Abora-Pearl.png",
    gradient: "from-lime-200/10 to-green-500/10",
    description: "烘焙菸草味 × 麥芽香 × 蘋果花園果香，咬破爆珠後果香四溢，清新活潑令人精神一振。",
    tag: "韓國限定",
    region: "韓國",
  },
  {
    id: "kr-limited-black-ruby",
    name: "黑紅莓果",
    nameEn: "Black Ruby",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Black-Ruby.png",
    gradient: "from-red-500/10 to-purple-700/10",
    description: "草莓冰瀑 × 薄荷晶核，雙極衝擊，深邃果香與強烈清涼感交織，帶來濃烈複雜的味覺體驗。",
    tag: "韓國限定",
    region: "韓國",
  },
  {
    id: "kr-limited-yugen",
    name: "花香",
    nameEn: "Yugen",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/terea-yugen.png",
    gradient: "from-pink-200/10 to-rose-400/10",
    description: "濃郁菸草味 × 花香 × 莓果香，淡雅花卉芬芳與菸草底韻交融，清新優雅。",
    tag: "韓國限定",
    region: "韓國",
  },
];

const tagColors = {
  "日本限定": "bg-red-500",
  "韓國限定": "bg-blue-500",
};

function ProductCard({ item, onSelect, addedId, onQuickAdd }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer"
      onClick={() => onSelect(item)}
    >
      <div className={`aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient} border border-border/50 relative`}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-4"
        />
        <span className={`absolute top-3 left-3 text-white text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full ${tagColors[item.tag]}`}>
          {item.tag}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-background">
          <p className="font-heading text-xs tracking-widest uppercase mb-1 text-background/60">{item.nameEn}</p>
          <div className="flex items-end justify-between">
            <h3 className="font-heading text-lg font-bold tracking-tight">{item.name}</h3>
            <button
              onClick={(e) => { e.stopPropagation(); onQuickAdd(e, item); }}
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                addedId === item.id ? "bg-green-500 text-white" : "bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm"
              }`}
            >
              {addedId === item.id ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DetailModal({ item, onClose }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

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
        className="max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className={`aspect-square bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}>
            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-8" />
            <span className={`absolute top-4 left-4 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full ${tagColors[item.tag]}`}>
              {item.tag}
            </span>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <button onClick={onClose} className="self-end mb-4 p-2 hover:bg-muted rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <p className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">{item.nameEn}</p>
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-4">{item.name}</h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8 text-sm">{item.description}</p>
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 font-body text-sm tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
                added ? "bg-green-500 text-white" : "bg-black text-white hover:bg-black/80"
              }`}
            >
              {added ? <><Check className="w-4 h-4" /> 已加入購物車</> : <><ShoppingBag className="w-4 h-4" /> 加入購物車</>}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Limited() {
  const [selected, setSelected] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const { addItem } = useCart();

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    addItem(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="h-px w-16 bg-primary mb-8" />
            <p className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-3">Limited Edition</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">最新限定</h1>
            <p className="font-body text-muted-foreground text-sm max-w-md leading-relaxed">
              精選日本與韓國限定版本，獨家風味，數量有限。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Japan Section - IQOS ILUMA I PRIME */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            <h2 className="font-heading text-xl font-bold tracking-tight">日本限定</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Device Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden bg-gradient-to-br from-purple-950 to-indigo-950 text-white"
          >
            {/* Top: image + intro */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <img
                  src={JAPAN_DEVICE_IMAGE}
                  alt="IQOS ILUMA I PRIME"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">
                  日本限定
                </span>
              </div>

              {/* Intro text */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3">Japan Limited Edition</p>
                <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-2 leading-snug">
                  IQOS ILUMA I PRIME
                </h3>
                <p className="font-body text-xs tracking-widest text-white/50 mb-6">
                  適用各版本：ILUMA I PRIME / ILUMA ONE i / ILUMA I
                </p>
                <p className="font-body text-sm text-white/70 leading-relaxed mb-6">
                  第八代 IQOS ILUMA i PRIME 不僅是一款加熱菸裝置，更是科技與時尚融合的智能產品。它的觸控螢幕、智慧延長功能、可換外殼和環保材質，讓使用者在便利與品質之間獲得完美平衡。
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-white/10 border border-white/20 text-white/80 text-[10px] tracking-widest px-3 py-1.5 rounded-full">系列 ILUMA I PRIME</span>
                  <span className="bg-purple-500/30 border border-purple-400/30 text-purple-200 text-[10px] tracking-widest px-3 py-1.5 rounded-full">顏色 電光紫</span>
                  <span className="bg-white/10 border border-white/20 text-white/80 text-[10px] tracking-widest px-3 py-1.5 rounded-full">專為 TEREA 煙彈設計</span>
                </div>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="border-t border-white/10 grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-white/10">
              {japanDeviceSpecs.map((spec, i) => (
                <div key={i} className="p-5 flex gap-3 items-start">
                  <spec.icon className="w-4 h-4 text-purple-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">{spec.label}</p>
                    <p className="text-xs text-white/80 leading-relaxed">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Video */}
            <div className="border-t border-white/10 p-6">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">產品影片</p>
              <video
                src={JAPAN_DEVICE_VIDEO}
                className="w-full rounded-2xl max-h-[480px] object-cover bg-black"
                controls
                playsInline
                muted
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Korea Section - IQOS ILUMA I PRIME REMIX LIMITED */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
            <h2 className="font-heading text-xl font-bold tracking-tight">韓國限定</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-gray-800 text-white"
          >
            {/* Top: image + intro */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <img
                  src={KOREA_DEVICE_IMAGE}
                  alt="IQOS ILUMA I PRIME REMIX LIMITED"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-blue-500 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">
                  韓國限定
                </span>
              </div>

              {/* Intro text */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3">Korea Limited Edition 2026</p>
                <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-2 leading-snug">
                  IQOS ILUMA I PRIME<br />
                  <span className="text-lg font-medium text-white/70">REMIX LIMITED</span>
                </h3>
                <p className="font-body text-xs tracking-widest text-white/50 mb-6">
                  適用各版本：ILUMA I PRIME / ILUMA ONE i / ILUMA I
                </p>
                <p className="font-body text-sm text-white/70 leading-relaxed mb-6">
                  第八代 IQOS ILUMA i PRIME REMIX LIMITED 是一款在韓國市場發布的 2026 年最新限量版機型，科技與美學的極致融合。
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-white/10 border border-white/20 text-white/80 text-[10px] tracking-widest px-3 py-1.5 rounded-full">系列 ILUMA I PRIME</span>
                  <span className="bg-yellow-500/20 border border-yellow-400/30 text-yellow-200 text-[10px] tracking-widest px-3 py-1.5 rounded-full">顏色 彩虹電鍍金</span>
                  <span className="bg-white/10 border border-white/20 text-white/80 text-[10px] tracking-widest px-3 py-1.5 rounded-full">專為 TEREA 煙彈設計</span>
                </div>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="border-t border-white/10 grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-white/10">
              {koreaDeviceSpecs.map((spec, i) => (
                <div key={i} className="p-5 flex gap-3 items-start">
                  <spec.icon className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">{spec.label}</p>
                    <p className="text-xs text-white/80 leading-relaxed">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Video */}
            <div className="border-t border-white/10 p-6">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">產品影片</p>
              <video
                src={KOREA_DEVICE_VIDEO}
                className="w-full rounded-2xl max-h-[480px] object-cover bg-black"
                controls
                playsInline
                muted
              />
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <DetailModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}