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
    description: "強度和濃郁感迄今最強。將優質菸葉的香氣和深度與「啤酒花」的風味融合在一起，濃鬱而強烈。追求最強烈菸草體驗的首選。",
    notes: ["濃郁菸草", "啤酒花香", "深沉強烈"],
    intensity: 5,
    cooling: 1,
    region: "日本",
  },
  {
    id: "regular",
    name: "醇原味",
    nameEn: "Regular",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100085_00S.jpg",
    gradient: "from-amber-400/10 to-amber-700/10",
    accentColor: "text-amber-700",
    bgAccent: "bg-amber-500",
    description: "具有濃郁醇厚的菸草味，帶有烘烤的底蘊和微妙的堅果香氣。為偏愛經典、濃郁菸草風味的使用者提供最道地的滿意體驗。每支可吸約14口或持續約6分鐘。",
    notes: ["烘烤菸草", "堅果底韻", "醇厚經典"],
    intensity: 4,
    cooling: 1,
    region: "日本",
  },
  {
    id: "smooth-regular",
    name: "淡原味",
    nameEn: "Smooth Regular",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100086_00S.jpg",
    gradient: "from-orange-200/10 to-orange-500/10",
    accentColor: "text-orange-600",
    bgAccent: "bg-orange-400",
    description: "柔和、平衡的經典菸草風味，強度介於濃郁原味與極淡口味之間。融合淡淡的香草與柑橘香氣，以及微妙的辛辣草本香調，層次豐富而順口。",
    notes: ["香草柑橘", "辛辣草本", "柔和平衡"],
    intensity: 2,
    cooling: 1,
    region: "日本",
  },
  {
    id: "balanced-regular",
    name: "堅果原味",
    nameEn: "Balanced Regular",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100087_00S.jpg",
    gradient: "from-yellow-300/10 to-yellow-600/10",
    accentColor: "text-yellow-700",
    bgAccent: "bg-yellow-400",
    description: "帶有輕微酸甜味，散發著堅果和木材的微弱清香，口感平衡溫和。提供穩定溫和且帶有木質香氣的舒適吸菸體驗，適合細細品味的使用者。",
    notes: ["堅果清香", "木質香氣", "溫和平衡"],
    intensity: 3,
    cooling: 1,
    region: "日本",
  },
  {
    id: "black-menthol",
    name: "黑薄荷",
    nameEn: "Black Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100093_00S.jpg",
    gradient: "from-slate-400/10 to-slate-800/10",
    accentColor: "text-slate-700",
    bgAccent: "bg-slate-600",
    description: "俗稱「黑萬」，被稱為加熱式菸草中最受歡迎的薄荷類型之一。清涼感和冷感異常強烈，帶有接近苦澀的微甜味，直擊喉嚨深處的冷爽感，神秘深色香料增添層次。",
    notes: ["強烈冷涼", "神秘深色香料", "苦甜層次"],
    intensity: 4,
    cooling: 5,
    region: "日本",
  },
  {
    id: "menthol",
    name: "濃薄荷",
    nameEn: "Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100088_00S.jpg",
    gradient: "from-emerald-300/10 to-emerald-600/10",
    accentColor: "text-emerald-700",
    bgAccent: "bg-emerald-500",
    description: "日本市場最受歡迎的口味之一。提供強烈、深邃的薄荷清涼感，薄荷感主導整體體驗，菸草感溫和退居其次。喜愛強薄荷清涼感的經典必選。",
    notes: ["強烈薄荷", "深邃清涼", "溫和菸草"],
    intensity: 3,
    cooling: 5,
    region: "日本",
  },
  {
    id: "mint",
    name: "淡薄荷",
    nameEn: "Mint",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100089_00S.jpg",
    gradient: "from-green-200/10 to-green-500/10",
    accentColor: "text-green-700",
    bgAccent: "bg-green-500",
    description: "提供溫和的薄荷清涼感與淡雅的菸草基底，清新、順滑。涼感強度介於濃薄荷與柔和薄荷之間，是薄荷與菸草比例最為平衡的選擇，適合日常享用。",
    notes: ["溫和薄荷", "淡雅菸草", "清新順滑"],
    intensity: 3,
    cooling: 2,
    region: "日本",
  },
  {
    id: "purple-menthol",
    name: "藍莓薄荷",
    nameEn: "Purple Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100090_00S.jpg",
    gradient: "from-violet-400/10 to-violet-700/10",
    accentColor: "text-violet-700",
    bgAccent: "bg-violet-500",
    description: "融合了清脆的薄荷清涼感，平衡了果香的甜膩，提供甜美且異國風情的味覺體驗。藍莓的水潤果香與薄荷涼感完美交融，口感溫和清新。",
    notes: ["藍莓果香", "清脆薄荷", "甜美異國"],
    intensity: 3,
    cooling: 4,
    region: "日本",
  },
  {
    id: "yellow-menthol",
    name: "青檸薄荷",
    nameEn: "Yellow Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100091_00S.jpg",
    gradient: "from-lime-300/10 to-lime-600/10",
    accentColor: "text-lime-700",
    bgAccent: "bg-lime-500",
    description: "融合了淡雅的青檸檬柑橘香氣，提供清新、涼爽的薄荷體驗。薄荷強度較為柔和，清新的青檸香氣帶來明亮酸甜氣息，輕盈宜人。",
    notes: ["青檸柑橘", "柔和薄荷", "清新輕盈"],
    intensity: 2,
    cooling: 3,
    region: "日本",
  },
  {
    id: "tropical-menthol",
    name: "熱帶水果",
    nameEn: "Tropical Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100092_00S.jpg",
    gradient: "from-orange-300/10 to-orange-600/10",
    accentColor: "text-orange-600",
    bgAccent: "bg-orange-500",
    description: "融合了多種熱帶水果的香氣，如芒果、鳳梨或百香果，提供甜美、芬芳的味覺感受。令人聯想到南國的陽光與海風，清新甜蜜令人心曠神怡。",
    notes: ["芒果鳳梨", "百香果香", "熱帶甜蜜"],
    intensity: 2,
    cooling: 3,
    region: "日本",
  },
  {
    id: "oasis-pearl",
    name: "綠洲爆珠",
    nameEn: "Oasis Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100098_00S.jpg",
    gradient: "from-teal-400/10 to-teal-700/10",
    accentColor: "text-teal-700",
    bgAccent: "bg-teal-500",
    description: "結合了傳統菸草的醇厚與水果爆珠的清爽，帶來冷暖交織的獨特風味。內含可捏破的爆珠，捏破瞬間清涼感倍增，帶來如沁入綠洲般的極致爽快體驗。",
    notes: ["水果爆珠", "菸草醇厚", "冷暖交織"],
    intensity: 3,
    cooling: 5,
    region: "日本",
  },
  {
    id: "sunshine-pearl",
    name: "太陽爆珠",
    nameEn: "Sunshine Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100121_00S.jpg",
    gradient: "from-yellow-200/10 to-yellow-500/10",
    accentColor: "text-yellow-700",
    bgAccent: "bg-yellow-400",
    description: "「西瓜爆珠」──具有西瓜般的青果口味和熱帶風情的愉悅清涼口味。令人聯想到西瓜的多汁口感，同時也能感受到與西瓜相似的哈密瓜風味，清甜多汁。",
    notes: ["西瓜多汁", "哈密瓜香", "清甜爆珠"],
    intensity: 2,
    cooling: 4,
    region: "日本",
  },
  {
    id: "black-purple-menthol",
    name: "黑藍莓薄荷",
    nameEn: "Black Purple Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100096_00S.jpg",
    gradient: "from-purple-400/10 to-purple-800/10",
    accentColor: "text-purple-700",
    bgAccent: "bg-purple-600",
    description: "屬於藍莓口味系列中最受歡迎的變體，中度口感。融合黑醋栗果香與強烈薄荷涼感，口感清爽順口，果香濃郁。適合喜歡果香與涼感雙重刺激的使用者。",
    notes: ["黑醋栗果香", "強烈薄荷", "清爽順口"],
    intensity: 4,
    cooling: 5,
    region: "日本",
  },
  {
    id: "black-tropical",
    name: "黑熱帶水果",
    nameEn: "Black Tropical",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/2030100127_00S.jpg",
    gradient: "from-fuchsia-400/10 to-fuchsia-700/10",
    accentColor: "text-fuchsia-700",
    bgAccent: "bg-fuchsia-500",
    description: "以芒果等南國果香為主調，融合強烈薄荷涼感，口感濃郁又清爽，帶微酸與甜味的超濃熱帶水果體驗。果香與涼感更勝一般熱帶水果，特別適合夏季享用。",
    notes: ["南國芒果香", "強烈薄荷", "微酸甜涼"],
    intensity: 3,
    cooling: 4,
    region: "日本",
  },
];

const koreaFlavors = [
  {
    id: "kr-sun-pearl",
    name: "太陽珍珠",
    nameEn: "Sun Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Sun-Pearl.png",
    gradient: "from-orange-300/10 to-red-400/10",
    accentColor: "text-orange-600",
    bgAccent: "bg-orange-500",
    description: "菸草與薄荷結合，甜美爆珠瞬間迸發清涼果香，口感豐富多層次，男女皆愛的均衡風味。",
    notes: ["菸草底韻", "爆珠清涼", "甜美果香"],
    intensity: 3,
    cooling: 4,
    region: "韓國",
  },
  {
    id: "kr-lemon",
    name: "檸檬",
    nameEn: "Lemon",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Lemon.png",
    gradient: "from-yellow-300/10 to-lime-400/10",
    accentColor: "text-yellow-600",
    bgAccent: "bg-yellow-400",
    description: "清新明亮的檸檬香氣搭配薄荷涼感，帶來酸甜活潑的清爽體驗，輕盈宜人。",
    notes: ["檸檬香氣", "清新涼感", "酸甜活潑"],
    intensity: 2,
    cooling: 3,
    region: "韓國",
  },
  {
    id: "kr-cherry-pearl",
    name: "櫻桃爆珠",
    nameEn: "Cherry Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Cherry-Pearl.png",
    gradient: "from-red-300/10 to-rose-500/10",
    accentColor: "text-red-600",
    bgAccent: "bg-red-500",
    description: "甜蜜櫻桃果香與爆珠涼感完美融合，咬破爆珠後清涼感瞬間提升，果香充盈口腔。",
    notes: ["甜蜜櫻桃", "爆珠涼感", "果香豐富"],
    intensity: 2,
    cooling: 4,
    region: "韓國",
  },
  {
    id: "kr-smooth-mint",
    name: "淡薄荷",
    nameEn: "Smooth Mint",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Smooth-Mint.png",
    gradient: "from-green-200/10 to-teal-400/10",
    accentColor: "text-green-600",
    bgAccent: "bg-green-400",
    description: "柔和清爽的薄荷涼感，菸草基底溫潤，適合喜歡輕涼感的使用者，日常享用首選。",
    notes: ["柔和薄荷", "溫潤菸草", "清新順口"],
    intensity: 3,
    cooling: 2,
    region: "韓國",
  },
  {
    id: "kr-menthol",
    name: "濃薄荷",
    nameEn: "Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Menthol.png",
    gradient: "from-emerald-300/10 to-cyan-400/10",
    accentColor: "text-emerald-600",
    bgAccent: "bg-emerald-500",
    description: "強烈深邃的薄荷清涼感主導整體體驗，菸草感溫和，是喜愛強薄荷清涼感的經典選擇。",
    notes: ["強烈薄荷", "深邃清涼", "溫和菸草"],
    intensity: 3,
    cooling: 5,
    region: "韓國",
  },
  {
    id: "kr-tropical-mango",
    name: "熱帶芒果",
    nameEn: "Tropical Mango",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Tropical-Mango.png",
    gradient: "from-orange-300/10 to-yellow-400/10",
    accentColor: "text-orange-500",
    bgAccent: "bg-orange-400",
    description: "濃郁芒果熱帶果香搭配薄荷涼感，甜美芬芳，帶來南國陽光般的清新愉悅體驗。",
    notes: ["濃郁芒果", "熱帶果香", "清涼甜蜜"],
    intensity: 2,
    cooling: 3,
    region: "韓國",
  },
  {
    id: "kr-amber",
    name: "琥珀",
    nameEn: "Amber",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Amber.png",
    gradient: "from-amber-400/10 to-orange-600/10",
    accentColor: "text-amber-700",
    bgAccent: "bg-amber-500",
    description: "濃郁菸草結合木質香氣與榛果香，口感飽滿深沉，是追求經典醇厚菸草體驗的理想選擇。",
    notes: ["濃郁菸草", "木質香氣", "榛果底韻"],
    intensity: 4,
    cooling: 1,
    region: "韓國",
  },
  {
    id: "kr-oasis-pearl",
    name: "綠洲珍珠",
    nameEn: "Oasis Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Oasis-Pearl.png",
    gradient: "from-teal-300/10 to-cyan-500/10",
    accentColor: "text-teal-600",
    bgAccent: "bg-teal-500",
    description: "奶油堅果底韻結合熱帶果漿與薄荷冰塊，咬破爆珠後清涼感極速倍增，沁涼舒爽。",
    notes: ["奶油堅果", "熱帶果漿", "薄荷冰塊"],
    intensity: 3,
    cooling: 5,
    region: "韓國",
  },
  {
    id: "kr-floral",
    name: "花香",
    nameEn: "Floral",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Floral.png",
    gradient: "from-pink-200/10 to-rose-400/10",
    accentColor: "text-pink-600",
    bgAccent: "bg-pink-400",
    description: "淡雅花香與菸草底韻交融，清新優雅，帶來獨特的花卉芬芳體驗，女性使用者尤為喜愛。",
    notes: ["淡雅花香", "清新優雅", "菸草底韻"],
    intensity: 2,
    cooling: 2,
    region: "韓國",
  },
  {
    id: "kr-grape",
    name: "葡萄",
    nameEn: "Grape",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Grape.png",
    gradient: "from-purple-300/10 to-violet-500/10",
    accentColor: "text-purple-600",
    bgAccent: "bg-purple-500",
    description: "成熟葡萄果香濃郁甜蜜，搭配柔和薄荷涼感，口感圓潤多汁，果香與涼感比例均衡宜人。",
    notes: ["成熟葡萄", "濃郁甜蜜", "柔和涼感"],
    intensity: 2,
    cooling: 3,
    region: "韓國",
  },
  {
    id: "kr-silver",
    name: "閃銀",
    nameEn: "Silver",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Silver.png",
    gradient: "from-slate-200/10 to-gray-400/10",
    accentColor: "text-slate-500",
    bgAccent: "bg-slate-400",
    description: "輕柔菸草結合辛香草本香氣，口感細膩溫和，帶來簡約純粹的菸草體驗，適合日常享用。",
    notes: ["輕柔菸草", "辛香草本", "簡約純粹"],
    intensity: 3,
    cooling: 1,
    region: "韓國",
  },
  {
    id: "kr-green-apple-pearl",
    name: "青蘋果爆珠",
    nameEn: "Green Apple Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Green-Apple-Pearl.png",
    gradient: "from-lime-200/10 to-green-500/10",
    accentColor: "text-lime-600",
    bgAccent: "bg-lime-500",
    description: "清脆青蘋果酸甜香氣搭配爆珠清涼感，咬破後果香四溢，清新活潑讓人精神一振。",
    notes: ["青蘋果酸甜", "爆珠清涼", "清新活潑"],
    intensity: 2,
    cooling: 4,
    region: "韓國",
  },
  {
    id: "kr-black-berry",
    name: "黑莓果",
    nameEn: "Black Berry",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Black-Berry.png",
    gradient: "from-indigo-400/10 to-purple-700/10",
    accentColor: "text-indigo-700",
    bgAccent: "bg-indigo-600",
    description: "濃郁黑莓果香結合強烈薄荷涼感，深邃果香與清涼感交織，帶來濃烈而複雜的味覺體驗。",
    notes: ["濃郁黑莓", "強烈薄荷", "深邃複雜"],
    intensity: 3,
    cooling: 4,
    region: "韓國",
  },
  {
    id: "kr-black-grape",
    name: "黑葡萄",
    nameEn: "Black Grape",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Black-Grape.png",
    gradient: "from-violet-500/10 to-purple-800/10",
    accentColor: "text-violet-700",
    bgAccent: "bg-violet-700",
    description: "深沉黑葡萄果香搭配菸草底韻，口感飽滿濃郁，果味豐富而深邃，回味悠長。",
    notes: ["深沉黑葡萄", "菸草底韻", "濃郁回甘"],
    intensity: 3,
    cooling: 3,
    region: "韓國",
  },
  {
    id: "kr-black-menthol",
    name: "黑薄荷",
    nameEn: "Black Menthol",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Black-Menthol.png",
    gradient: "from-slate-500/10 to-gray-800/10",
    accentColor: "text-slate-700",
    bgAccent: "bg-slate-700",
    description: "最強烈的薄荷冷涼感，神秘深色香料增添層次，直擊喉嚨深處，冰涼感遠超一般薄荷口味。",
    notes: ["極強冷涼", "神秘深色香料", "深邃強烈"],
    intensity: 4,
    cooling: 5,
    region: "韓國",
  },
];

const regions = ["全部", "日本", "韓國", "台灣"];

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
          <div className={`aspect-square bg-gradient-to-br ${flavor.gradient} flex items-center justify-center`}>
            <img
              src={flavor.image}
              alt={flavor.name}
              className="w-full h-full object-contain p-6"
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
  const [activeRegion, setActiveRegion] = useState("全部");

  const allFlavors = [...flavors, ...koreaFlavors];
  const filteredFlavors = activeRegion === "全部"
    ? allFlavors
    : allFlavors.filter((f) => f.region === activeRegion);

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

      {/* Region Filter */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-5 py-2 font-body text-[11px] tracking-widest uppercase transition-all duration-200 rounded-full border ${
                  activeRegion === region
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Flavor Grid */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          {filteredFlavors.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground font-body text-sm">
              此區域暫無產品
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFlavors.map((flavor, i) => (
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
          )}
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