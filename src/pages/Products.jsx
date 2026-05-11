import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Thermometer, Wind, ShoppingBag, Check } from "lucide-react";
import FlavorWizard from "../components/products/FlavorWizard";
import { useCart } from "@/context/CartContext";

const flavors = [
  {
    id: "rich-regular",
    name: "特濃原味",
    nameEn: "Rich Regular",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100099_00S-300x300.jpg",
    gradient: "from-stone-400/10 to-stone-700/10",
    accentColor: "text-stone-700",
    bgAccent: "bg-stone-500",
    description: "強度與濃郁感迄今最強的口味。芬芳的混合菸葉與令人滿意的麥芽香味相得益彰，可以感受到厚實飽滿的口感，不會感受到加熱不燃燒菸草的「薄弱感」。追求最強烈菸草體驗的首選，讓你盡情享受菸草最硬核的風味。",
    notes: ["濃郁麥芽香", "厚實口感", "頂級菸草強度"],
    intensity: 5,
    cooling: 1,
    region: "日本",
  },
  {
    id: "regular",
    name: "醇原味",
    nameEn: "Regular",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100085_00S-300x300.jpg",
    gradient: "from-amber-400/10 to-amber-700/10",
    accentColor: "text-amber-700",
    bgAccent: "bg-amber-500",
    description: "可以享受強度、濃郁度和香味完美平衡的經典口味。菸葉的濃郁底韻與堅果和木材的微弱清香相互協調，是許多人口中「從這裡開始入門」的首選。若你想在 IQOS ILUMA 開始旅程，這款「堅果原味」絕對是你應該嘗試的第一支。",
    notes: ["烘烤菸草", "堅果木香", "經典入門首選"],
    intensity: 4,
    cooling: 1,
    region: "日本",
  },
  {
    id: "smooth-regular",
    name: "淡原味",
    nameEn: "Smooth Regular",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100086_00S-300x300.jpg",
    gradient: "from-orange-200/10 to-orange-500/10",
    accentColor: "text-orange-600",
    bgAccent: "bg-orange-400",
    description: "最容易吸的原味系口味。雖然擁有一定強度與濃郁感，但獨特的木材清香與淡淡茶香融為一體，消除了「吸食困難感」。許多覺得醇原味太強的使用者，發現淡原味恰到好處，IQOS 特有的香氣也因此更加柔和，是一個讓人驚喜的加分點。",
    notes: ["木材清香", "淡茶香調", "溫和順口"],
    intensity: 2,
    cooling: 1,
    region: "日本",
  },
  {
    id: "balanced-regular",
    name: "堅果原味",
    nameEn: "Balanced Regular",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100087_00S-300x300.jpg",
    gradient: "from-yellow-300/10 to-yellow-600/10",
    accentColor: "text-yellow-700",
    bgAccent: "bg-yellow-400",
    description: "原味系中強度最低、最清淡的口味。帶有一絲草本與柑橘的香氣，能享受醇厚而不失層次的風味。雖然強度與濃郁感較弱，但香味濃度頗佳，對於覺得「醇原味」或「淡原味」仍太強的使用者，堅果原味是絕佳的折衷選擇。",
    notes: ["草本柑橘香", "輕柔菸草", "細膩層次"],
    intensity: 3,
    cooling: 1,
    region: "日本",
  },
  {
    id: "black-menthol",
    name: "黑薄荷",
    nameEn: "Black Menthol",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100093_00S-300x300.jpg",
    gradient: "from-slate-400/10 to-slate-800/10",
    accentColor: "text-slate-700",
    bgAccent: "bg-slate-600",
    description: "帶給你 IQOS ILUMA 最強烈刺激的口味，「強冷！強薄荷！」正是黑薄荷的完美代名詞。從你吸食的那一刻起，濃郁的薄荷醇清涼感便毫不留情地充滿口腔與喉嚨。雖然有人覺得「太強」，但對於追求極致清涼體驗的使用者來說，黑薄荷就是你的終極答案。",
    notes: ["極致強冷", "強烈薄荷醇", "直擊喉嚨深處"],
    intensity: 4,
    cooling: 5,
    region: "日本",
  },
  {
    id: "menthol",
    name: "濃薄荷",
    nameEn: "Menthol",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100088_00S-300x300.jpg",
    gradient: "from-emerald-300/10 to-emerald-600/10",
    accentColor: "text-emerald-700",
    bgAccent: "bg-emerald-500",
    description: "薄荷醇口味中的代表性存在，也是 IQOS 最受歡迎的口味之一。帶有薄荷與奶油香氣，能享受深沉、醇厚又清爽的感受。雖然有「黑薄荷」的存在讓它稍顯溫和，但濃薄荷依然是薄荷系中絕對可靠的經典之選，評價極高。",
    notes: ["薄荷奶油香", "深沉醇厚", "清爽經典"],
    intensity: 3,
    cooling: 5,
    region: "日本",
  },
  {
    id: "mint",
    name: "淡薄荷",
    nameEn: "Mint",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100089_00S-300x300.jpg",
    gradient: "from-green-200/10 to-green-500/10",
    accentColor: "text-green-700",
    bgAccent: "bg-green-500",
    description: "薄荷與香草的香氣融合，給人「舒適清爽」的完美印象，是 IQOS 初學者最推薦的入門薄荷口味。清爽適中、味道溫和，沒有黑薄荷或濃薄荷的過強衝擊，讓人每次都能輕鬆享用，是日常百搭的最佳選擇。",
    notes: ["薄荷香草香", "溫和清爽", "初學者首選"],
    intensity: 3,
    cooling: 2,
    region: "日本",
  },
  {
    id: "purple-menthol",
    name: "藍莓薄荷",
    nameEn: "Purple Menthol",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100090_00S-300x300.jpg",
    gradient: "from-violet-400/10 to-violet-700/10",
    accentColor: "text-violet-700",
    bgAccent: "bg-violet-500",
    description: "IQOS 口味中香氣評價最高的存在之一。醇厚的藍莓果香與酸甜滋味，一吸氣便在口中充分蔓延。口味設計不僅僅是甜美，還融入了提神醒腦的薄荷清涼感與菸草的勁道，滿意度極高，特別受到喜愛果香系口味的使用者喜愛。",
    notes: ["濃郁藍莓香", "薄荷提神", "酸甜高滿意度"],
    intensity: 3,
    cooling: 4,
    region: "日本",
  },
  {
    id: "yellow-menthol",
    name: "青檸薄荷",
    nameEn: "Yellow Menthol",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100091_00S-300x300.jpg",
    gradient: "from-lime-300/10 to-lime-600/10",
    accentColor: "text-lime-700",
    bgAccent: "bg-lime-500",
    description: "柑橘類水果特有的清爽風味，個人評價為薄荷系中口味最均衡的一款。柑橘與香草的香氣完美融合，搭配濃郁的薄荷涼感，每次吸食都帶來令人滿足的清新感受，強烈推薦日常使用，是「令人耳目一新」的完美詮釋。",
    notes: ["柑橘香草融合", "均衡薄荷", "日常清新首選"],
    intensity: 2,
    cooling: 3,
    region: "日本",
  },
  {
    id: "tropical-menthol",
    name: "熱帶水果",
    nameEn: "Tropical Menthol",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100092_00S-300x300.jpg",
    gradient: "from-orange-300/10 to-orange-600/10",
    accentColor: "text-orange-600",
    bgAccent: "bg-orange-500",
    description: "IQOS ILUMA 最具異國風情的口味。雖然是水果混合系，卻完全沒有「過甜」的負擔感——果香豐富，甜味卻被精妙地壓制，呈現出大人味的成熟風格。喜歡熱帶水果卻不想太甜膩的使用者，這款會讓你大感驚喜。",
    notes: ["熱帶果香", "成熟不甜膩", "異國風情"],
    intensity: 2,
    cooling: 3,
    region: "日本",
  },
  {
    id: "oasis-pearl",
    name: "綠洲爆珠",
    nameEn: "Oasis Pearl",
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100098_00S-300x300.jpg",
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
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100121_00S-300x300.jpg",
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
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100096_00S-300x300.jpg",
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
    image: "https://terea-device.com/wp-content/uploads/2025/12/2030100127_00S-300x300.jpg",
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
    name: "日光爆珠",
    nameEn: "Sun Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Sun-Pearl.png",
    gradient: "from-orange-300/10 to-red-400/10",
    accentColor: "text-orange-600",
    bgAccent: "bg-orange-500",
    description: "【日光爆珠】韓國版 TEREA 系列。菸草與薄荷結合 × 男女皆愛，甜美爆珠瞬間迸發清涼果香，口感豐富多層次。",
    notes: ["菸草底韻", "爆珠清涼", "甜美果香"],
    intensity: 3,
    cooling: 4,
    region: "韓國",
  },
  {
    id: "kr-green-zing",
    name: "青檸/抹茶",
    nameEn: "Green Zing",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/green_zing.png",
    gradient: "from-lime-300/10 to-green-500/10",
    accentColor: "text-lime-700",
    bgAccent: "bg-lime-500",
    description: "【青檸/抹茶】韓國版 TEREA 系列。芳香菸草味 × 綠蘋果香 × 辛香草本，清新活潑的青綠風味，層次豐富令人耳目一新。",
    notes: ["綠蘋果香", "辛香草本", "芳香菸草"],
    intensity: 2,
    cooling: 2,
    region: "韓國",
  },
  {
    id: "kr-starling-pearl",
    name: "櫻桃爆珠",
    nameEn: "Starling Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Starling-Pearl.png",
    gradient: "from-red-300/10 to-rose-500/10",
    accentColor: "text-red-600",
    bgAccent: "bg-red-500",
    description: "【櫻桃爆珠】韓國版 TEREA 系列。前調薄荷淨爽・後韻草莓香醇，咬破爆珠後清涼感瞬間提升，果香充盈口腔。",
    notes: ["薄荷前調", "草莓後韻", "爆珠清涼"],
    intensity: 2,
    cooling: 4,
    region: "韓國",
  },
  {
    id: "kr-yugen",
    name: "花香",
    nameEn: "Yugen",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/terea-yugen.png",
    gradient: "from-pink-200/10 to-rose-400/10",
    accentColor: "text-pink-600",
    bgAccent: "bg-pink-400",
    description: "【花香】韓國版 TEREA 系列。濃郁菸草味 × 花香 × 莓果香，淡雅花卉芬芳與菸草底韻交融，清新優雅，女性使用者尤為喜愛。",
    notes: ["濃郁菸草", "花香", "莓果香"],
    intensity: 2,
    cooling: 2,
    region: "韓國",
  },
  {
    id: "kr-blue",
    name: "濃薄荷",
    nameEn: "Blue",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/blue.png",
    gradient: "from-blue-300/10 to-cyan-500/10",
    accentColor: "text-blue-600",
    bgAccent: "bg-blue-500",
    description: "【濃薄荷】韓國版 TEREA 系列。雙薄荷冰沁 × 奶油尾韻，強烈深邃的薄荷清涼感主導整體體驗，奶油尾韻帶來圓潤口感。",
    notes: ["雙薄荷冰沁", "奶油尾韻", "深邃清涼"],
    intensity: 3,
    cooling: 5,
    region: "韓國",
  },
  {
    id: "kr-summer-wave",
    name: "熱帶水果",
    nameEn: "Summer Wave",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/summer_wave.png",
    gradient: "from-orange-300/10 to-yellow-400/10",
    accentColor: "text-orange-500",
    bgAccent: "bg-orange-400",
    description: "【熱帶水果】韓國版 TEREA 系列。濃郁菸草味 × 蜜桃香 × 較強冰涼感，甜美芬芳帶來南國陽光般的清新愉悅體驗。",
    notes: ["濃郁菸草", "蜜桃香", "較強冰涼"],
    intensity: 3,
    cooling: 4,
    region: "韓國",
  },
  {
    id: "kr-amber",
    name: "琥珀",
    nameEn: "Amber",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/amber.png",
    gradient: "from-amber-400/10 to-orange-600/10",
    accentColor: "text-amber-700",
    bgAccent: "bg-amber-500",
    description: "【琥珀】韓國版 TEREA 系列。濃郁菸草味 × 木質香 × 榛果香，口感飽滿深沉，是追求經典醇厚菸草體驗的理想選擇。",
    notes: ["濃郁菸草", "木質香", "榛果香"],
    intensity: 4,
    cooling: 1,
    region: "韓國",
  },
  {
    id: "kr-oasis-pearl",
    name: "綠洲爆珠",
    nameEn: "Oasis Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Oasis-Pearl.png",
    gradient: "from-teal-300/10 to-cyan-500/10",
    accentColor: "text-teal-600",
    bgAccent: "bg-teal-500",
    description: "【綠洲爆珠】韓國版 TEREA 系列。奶油堅果 × 熱帶果漾 × 薄荷冰核，咬破爆珠後清涼感極速倍增，沁涼舒爽。",
    notes: ["奶油堅果", "熱帶果漾", "薄荷冰核"],
    intensity: 3,
    cooling: 5,
    region: "韓國",
  },
  {
    id: "kr-purple-wave",
    name: "葡萄",
    nameEn: "Purple Wave",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/purple_wave.png",
    gradient: "from-purple-300/10 to-violet-500/10",
    accentColor: "text-purple-600",
    bgAccent: "bg-purple-500",
    description: "【葡萄】韓國版 TEREA 系列。濃郁菸草味 × 森林莓果香，成熟葡萄果香圓潤多汁，口感均衡宜人。",
    notes: ["濃郁菸草", "森林莓果", "圓潤均衡"],
    intensity: 3,
    cooling: 2,
    region: "韓國",
  },
  {
    id: "kr-green",
    name: "薄荷",
    nameEn: "Green",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/green.png",
    gradient: "from-green-200/10 to-teal-400/10",
    accentColor: "text-green-600",
    bgAccent: "bg-green-400",
    description: "【薄荷】韓國版 TEREA 系列。溫和菸草風味 × 薄荷清涼感，柔和清爽，適合喜歡輕涼感的使用者，日常享用首選。",
    notes: ["溫和菸草", "薄荷清涼", "清新順口"],
    intensity: 3,
    cooling: 3,
    region: "韓國",
  },
  {
    id: "kr-silver",
    name: "閃銀",
    nameEn: "Silver",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/silver.png",
    gradient: "from-slate-200/10 to-gray-400/10",
    accentColor: "text-slate-500",
    bgAccent: "bg-slate-400",
    description: "【閃銀】韓國版 TEREA 系列。輕柔菸草味 × 辛香草本香，口感細膩溫和，帶來簡約純粹的菸草體驗，適合日常享用。",
    notes: ["輕柔菸草", "辛香草本", "簡約純粹"],
    intensity: 3,
    cooling: 1,
    region: "韓國",
  },
  {
    id: "kr-abora-pearl",
    name: "青蘋果爆珠",
    nameEn: "Abora Pearl",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Abora-Pearl.png",
    gradient: "from-lime-200/10 to-green-500/10",
    accentColor: "text-lime-600",
    bgAccent: "bg-lime-500",
    description: "【青蘋果爆珠】韓國版 TEREA 系列。烘焙菸草味 × 麥芽香 × 蘋果花園果香，咬破爆珠後果香四溢，清新活潑令人精神一振。",
    notes: ["烘焙菸草", "麥芽香", "蘋果花園果香"],
    intensity: 2,
    cooling: 4,
    region: "韓國",
  },
  {
    id: "kr-black-ruby",
    name: "黑紅莓果",
    nameEn: "Black Ruby",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/Black-Ruby.png",
    gradient: "from-red-500/10 to-purple-700/10",
    accentColor: "text-red-700",
    bgAccent: "bg-red-600",
    description: "【黑紅莓果】韓國版 TEREA 系列。草莓冰瀑 × 薄荷晶核，雙極衝擊，深邃果香與強烈清涼感交織，帶來濃烈而複雜的味覺體驗。",
    notes: ["草莓冰瀑", "薄荷晶核", "雙極衝擊"],
    intensity: 3,
    cooling: 5,
    region: "韓國",
  },
  {
    id: "kr-black-purple",
    name: "黑葡萄",
    nameEn: "Black Purple",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/black_purple.png",
    gradient: "from-violet-500/10 to-purple-800/10",
    accentColor: "text-violet-700",
    bgAccent: "bg-violet-700",
    description: "【黑葡萄】韓國版 TEREA 系列。濃郁菸草味 × 葡萄香，深沉葡萄果香搭配菸草底韻，口感飽滿濃郁，回味悠長。",
    notes: ["濃郁菸草", "葡萄香", "深沉濃郁"],
    intensity: 3,
    cooling: 3,
    region: "韓國",
  },
  {
    id: "kr-black-green",
    name: "黑冰薄荷",
    nameEn: "Black Green",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/black_green.png",
    gradient: "from-slate-500/10 to-gray-800/10",
    accentColor: "text-slate-700",
    bgAccent: "bg-slate-700",
    description: "【黑冰薄荷】韓國版 TEREA 系列。薄荷醒神 × 青果香調 × 經典菸草，強烈冷涼直擊喉嚨深處，冰涼感遠超一般薄荷口味。",
    notes: ["薄荷醒神", "青果香調", "經典菸草"],
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
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(flavor);
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
            <div className="grid grid-cols-2 gap-6 mb-8">
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

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 font-body text-sm tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-black text-white hover:bg-black/80"
              }`}
            >
              {added ? (
                <><Check className="w-4 h-4" /> 已加入購物車</>
              ) : (
                <><ShoppingBag className="w-4 h-4" /> 加入購物車</>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Products() {
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [activeRegion, setActiveRegion] = useState("全部");
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleQuickAdd = (e, flavor) => {
    e.stopPropagation();
    addItem(flavor);
    setAddedId(flavor.id);
    setTimeout(() => setAddedId(null), 1200);
  };

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
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                    <p className="font-heading text-xs tracking-widest uppercase mb-1 text-background/60">
                      {flavor.nameEn}
                    </p>
                    <div className="flex items-end justify-between">
                      <h3 className="font-heading text-xl font-bold tracking-tight">
                        {flavor.name}
                      </h3>
                      <button
                        onClick={(e) => handleQuickAdd(e, flavor)}
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          addedId === flavor.id
                            ? "bg-green-500 text-white"
                            : "bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm"
                        }`}
                        aria-label="加入購物車"
                      >
                        {addedId === flavor.id ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                      </button>
                    </div>
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