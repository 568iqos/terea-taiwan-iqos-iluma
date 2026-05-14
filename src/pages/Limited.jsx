import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

const japanLimited = [
  {
    id: "jp-limited-oasis-pearl",
    name: "綠洲爆珠",
    nameEn: "Oasis Pearl",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100098_00S-300x300.jpg",
    gradient: "from-teal-400/10 to-teal-700/10",
    description: "結合傳統菸草的醇厚與水果爆珠的清爽，咬破爆珠瞬間清涼感倍增，帶來如沁入綠洲般的極致爽快體驗。",
    tag: "日本限定",
    region: "日本",
  },
  {
    id: "jp-limited-sunshine-pearl",
    name: "太陽爆珠",
    nameEn: "Sunshine Pearl",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100121_00S-300x300.jpg",
    gradient: "from-yellow-200/10 to-yellow-500/10",
    description: "西瓜爆珠口味，令人聯想到西瓜的多汁口感，同時也能感受到與西瓜相似的哈密瓜風味，清甜多汁。",
    tag: "日本限定",
    region: "日本",
  },
  {
    id: "jp-limited-black-purple",
    name: "黑藍莓薄荷",
    nameEn: "Black Purple Menthol",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100096_00S-300x300.jpg",
    gradient: "from-purple-400/10 to-purple-800/10",
    description: "融合黑醋栗果香與強烈薄荷涼感，口感清爽順口，果香濃郁，是果香與涼感雙重刺激的極致之選。",
    tag: "日本限定",
    region: "日本",
  },
  {
    id: "jp-limited-black-tropical",
    name: "黑熱帶水果",
    nameEn: "Black Tropical",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100127_00S-300x300.jpg",
    gradient: "from-fuchsia-400/10 to-fuchsia-700/10",
    description: "以芒果等南國果香為主調，融合強烈薄荷涼感，帶微酸與甜味的超濃熱帶水果體驗。",
    tag: "日本限定",
    region: "日本",
  },
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

      {/* Japan Section */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            <h2 className="font-heading text-xl font-bold tracking-tight">日本限定</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {japanLimited.map((item) => (
              <ProductCard key={item.id} item={item} onSelect={setSelected} addedId={addedId} onQuickAdd={handleQuickAdd} />
            ))}
          </div>
        </div>
      </section>

      {/* Korea Section */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
            <h2 className="font-heading text-xl font-bold tracking-tight">韓國限定</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {koreaLimited.map((item) => (
              <ProductCard key={item.id} item={item} onSelect={setSelected} addedId={addedId} onQuickAdd={handleQuickAdd} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <DetailModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}