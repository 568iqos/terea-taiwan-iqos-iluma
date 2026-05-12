import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Battery, Thermometer, Wifi, Star } from "lucide-react";

const devices = [
  {
    id: "iluma-prime",
    name: "ILUMA PRIME",
    nameEn: "ILUMA PRIME Standard",
    tagline: "旗艦典藏，極致奢華體驗",
    description:
      "IQOS ILUMA PRIME 為台灣版旗艦機型，採用鋁合金外殼搭配皮革質感開蓋設計，外型比 ILUMA 更加精緻大器。配備煙槍與充電盒，吸食 2 支後放入充電盒充電，充電盒滿電可吸食 20 支，搭載 SMARTCORE INDUCTION SYSTEM™ 感應加熱技術，無燃燒、無需清潔、無灰燼。",
    image: "https://media.iqos.com/is/image/DCXWAM/IQOS_ILUMA_News_ArticleContent_Default_Page5_Iluma_Prime_Global_Desktop_Standard?qlt=85&dpr=off",
    colors: ["#1A1A2E", "#B8860B", "#5B3FA0", "#4A6FA5"],
    colorNames: ["黑曜石", "金色", "紫羅蘭", "寶石藍"],
    specs: [
      { icon: Thermometer, label: "加熱技術", value: "SMARTCORE™ 感應加熱" },
      { icon: Star, label: "外殼材質", value: "鋁合金 + 皮革質感" },
      { icon: Battery, label: "連續使用", value: "充電盒可用 20 支" },
      { icon: Wifi, label: "連線功能", value: "藍牙 APP 連線支援" },
    ],
    features: ["鋁合金精緻外殼", "皮革質感充電盒", "連吸 2 支", "無需清潔刀片", "APP 智慧控制", "充電盒 20 支電量"],
    gradient: "from-amber-50 to-yellow-50",
    accentColor: "text-amber-700",
    bgAccent: "bg-amber-600",
  },
  {
    id: "iluma",
    name: "ILUMA",
    nameEn: "ILUMA Standard",
    tagline: "標準典藏，日常精選",
    description:
      "IQOS ILUMA 為台灣版標準機型，機身採用磨砂面設計，配備煙槍和充電盒，吸食 2 支後放入充電盒充電，充電盒滿電可吸食 20 支煙。搭載 SMARTCORE INDUCTION SYSTEM™ 感應加熱技術，無燃燒、無需清潔，支援 APP 智慧控制，5 色可選。",
    image: "https://media.iqos.com/is/image/DCXWAM/IQOS_ILUMA_News_ArticleContent_Default_Page5_IQOS_ILUMA_Global_Desktop_Standard?qlt=85&dpr=off",
    colors: ["#1A1A2E", "#4A6FA5", "#5B3FA0", "#E07B3A", "#4A8C5C"],
    colorNames: ["午夜黑", "微風藍", "數位紫", "烈焰橘", "墨綠"],
    specs: [
      { icon: Thermometer, label: "加熱技術", value: "SMARTCORE™ 感應加熱" },
      { icon: Battery, label: "連續使用", value: "充電盒可用 20 支" },
      { icon: Zap, label: "充電時間", value: "約 2 小時 15 分" },
      { icon: Wifi, label: "連線功能", value: "藍牙 APP 連線支援" },
    ],
    features: ["磨砂面精緻外殼", "煙槍 + 充電盒設計", "連吸 2 支", "無需清潔刀片", "APP 智慧控制", "5 種配色"],
    gradient: "from-blue-50 to-slate-50",
    accentColor: "text-blue-700",
    bgAccent: "bg-blue-600",
  },
  {
    id: "iluma-one",
    name: "ILUMA ONE",
    nameEn: "ILUMA ONE All-in-One",
    tagline: "一體輕巧，隨行隨吸",
    description:
      "IQOS ILUMA ONE 為台灣版一體式機型，無需充電盒，主機內建大容量電池，一次充電（約 1.5 小時）可連續使用 20 支，重量僅 68.5g，輕巧便攜。搭載 SMARTCORE INDUCTION SYSTEM™ 感應加熱技術，無燃燒、無需清潔，是日常外出的最佳夥伴。",
    image: "https://media.iqos.com/is/image/DCXWAM/IQOS_ILUMA_News_ArticleContent_Default_Page5_IQOS_ILUMA_ONE_Global_Desktop_Standard?qlt=85&dpr=off",
    colors: ["#1A1A2E", "#5B3FA0", "#D45A3A", "#4A9EC4", "#4A8C5C"],
    colorNames: ["午夜黑", "數位紫", "橘紅", "清風藍", "墨綠"],
    specs: [
      { icon: Thermometer, label: "加熱技術", value: "SMARTCORE™ 感應加熱" },
      { icon: Battery, label: "重量", value: "68.5g 輕巧一體" },
      { icon: Zap, label: "充電時間", value: "約 1.5 小時滿電" },
      { icon: Star, label: "連續使用", value: "一次充電使用 20 支" },
    ],
    features: ["一體成型設計", "20 支連續使用", "無需充電盒", "自動啟動", "無需清潔刀片", "5 種配色"],
    gradient: "from-teal-50 to-cyan-50",
    accentColor: "text-teal-700",
    bgAccent: "bg-teal-600",
  },
  {
    id: "iluma-i-prime",
    name: "ILUMA i PRIME",
    nameEn: "ILUMA i PRIME",
    tagline: "旗艦型，極致科技體驗",
    description:
      "旗艦款設備，搭載 OLED 觸控螢幕、智慧延長功能與可換式外殼設計。採用 Smartcore™ 感應加熱技術，無需清潔刀片，帶來最純粹、最潔淨的菸草蒸氣體驗。環保材質，科技與時尚完美融合。",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/%E3%80%90%E4%B8%BB%E5%9C%96%E3%80%91-TEREA-%E4%B8%BB%E6%A9%9F-%E5%9C%96%E7%89%87.png",
    colors: ["#0D2340", "#8B3A62", "#2E5E4E", "#4A6FA5", "#6B3FA0"],
    colorNames: ["午夜黑", "石榴紅", "白楊綠", "微風藍", "電光紫"],
    specs: [
      { icon: Thermometer, label: "加熱技術", value: "Smartcore™ 感應加熱" },
      { icon: Star, label: "控制介面", value: "OLED 觸控螢幕" },
      { icon: Zap, label: "智慧功能", value: "FlexPuff 自動延長" },
      { icon: Wifi, label: "連線功能", value: "藍牙 APP 連線支援" },
    ],
    features: ["OLED 觸控螢幕", "FlexPuff 自動延長", "FlexBattery 模式切換", "可換殼設計", "無需清潔刀片", "支援 2–3 次連吸"],
    gradient: "from-slate-100 to-purple-50",
    accentColor: "text-slate-700",
    bgAccent: "bg-slate-700",
  },
  {
    id: "iluma-i",
    name: "ILUMA i",
    nameEn: "ILUMA i Standard",
    tagline: "標準型，日常首選",
    description:
      "標準版設備，搭載觸控螢幕可顯示剩餘時間與電量。全新暫停功能、Flex Puff 多抽 4 口功能及省電模式，讓日常使用更便利。可與前一代充電盒共用，輕巧設計適合日常攜帶。",
    image: "https://terea-kim.com/wp-content/uploads/2025/05/%E3%80%905%E8%89%B2%E4%B8%BB%E6%A9%9F%E3%80%91IQO-S-TEREA%E5%9C%96%E7%89%87.png",
    colors: ["#1A1A2E", "#4A6FA5", "#5B3FA0", "#E07B3A", "#8DB84A"],
    colorNames: ["午夜黑", "微風藍", "數位紫", "烈焰橘", "青蘋果綠"],
    specs: [
      { icon: Thermometer, label: "加熱技術", value: "Smartcore™ 感應加熱" },
      { icon: Battery, label: "連續使用", value: "最高 3 支連續使用" },
      { icon: Zap, label: "充電時間", value: "單支約 1 分 50 秒" },
      { icon: Wifi, label: "連線功能", value: "藍牙 APP 連線支援" },
    ],
    features: ["觸控螢幕顯示", "暫停功能", "Flex Puff 多抽 4 口", "省電模式", "無需清潔刀片", "兼容舊款充電盒"],
    gradient: "from-blue-50 to-indigo-50",
    accentColor: "text-blue-700",
    bgAccent: "bg-blue-600",
  },
  {
    id: "tw-familymart-iluma",
    name: "台灣全家版 ILUMA",
    nameEn: "ILUMA FamilyMart Edition",
    tagline: "全家獨家聯名，台灣限定版本",
    description:
      "台灣全家便利商店獨家聯名版 IQOS ILUMA，外觀設計融入全家品牌元素，搭載 SMARTCORE INDUCTION SYSTEM™ 感應加熱技術，無燃燒、無需清潔，配備煙槍和充電盒，充電盒滿電可使用 20 支，為台灣限定特別版本。",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/5dc1a1936_IMG_8710.jpg",
    colors: ["#1A1A2E", "#C8A882", "#C4185C", "#4A8C5C", "#4A6FA5"],
    colorNames: ["午夜黑", "香檳金", "玫瑰紅", "橄欖綠", "寶石藍"],
    specs: [
      { icon: Thermometer, label: "加熱技術", value: "SMARTCORE™ 感應加熱" },
      { icon: Battery, label: "連續使用", value: "充電盒可用 20 支" },
      { icon: Star, label: "版本", value: "台灣全家限定聯名" },
      { icon: Wifi, label: "連線功能", value: "藍牙 APP 連線支援" },
    ],
    features: ["全家獨家聯名設計", "台灣限定版本", "煙槍 + 充電盒設計", "連吸 2 支", "無需清潔刀片", "APP 智慧控制"],
    gradient: "from-green-50 to-emerald-50",
    accentColor: "text-green-700",
    bgAccent: "bg-green-600",
  },
  {
    id: "tw-familymart-iluma-one",
    name: "台灣全家版 ILUMA ONE",
    nameEn: "ILUMA ONE FamilyMart Edition",
    tagline: "全家聯名一體式，輕巧隨行",
    description:
      "台灣全家便利商店獨家聯名版 IQOS ILUMA ONE，一體成型設計無需充電盒，搭載 SMARTCORE INDUCTION SYSTEM™ 感應加熱技術，一次充電可使用 20 支，重量輕巧，為台灣全家獨家限定版本，外出攜帶最佳選擇。",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/d09df6891_IMG_8195.webp",
    colors: ["#4A6FA5", "#1A1A2E", "#C8A882", "#C4185C", "#4A8C5C"],
    colorNames: ["寶石藍", "午夜黑", "香檳金", "玫瑰紅", "橄欖綠"],
    specs: [
      { icon: Thermometer, label: "加熱技術", value: "SMARTCORE™ 感應加熱" },
      { icon: Battery, label: "重量", value: "68.5g 輕巧一體" },
      { icon: Zap, label: "充電時間", value: "約 1.5 小時滿電" },
      { icon: Star, label: "版本", value: "台灣全家限定聯名" },
    ],
    features: ["全家獨家聯名設計", "台灣限定版本", "一體成型無需充電盒", "20 支連續使用", "無需清潔刀片", "自動啟動"],
    gradient: "from-green-50 to-teal-50",
    accentColor: "text-green-700",
    bgAccent: "bg-green-600",
  },
  {
    id: "iluma-one-i",
    name: "ILUMA ONE i",
    nameEn: "ILUMA ONE i All-in-One",
    tagline: "一體式，隨行自在",
    description:
      "一體成型設計，主機與電池整合，無需充電盒。內建 1728 mAh 大容量電池，充飽約 90 分鐘可連續使用 20 支煙彈，滿足一整天需求。底部防滑設計，單手操作輕鬆自在，是便利生活的最佳夥伴。",
    image: "https://terea-kim.com/wp-content/uploads/2025/12/Web-Asset-ILUMAi-One_Compare_Desktop.webp",
    colors: ["#8DB84A", "#9B8EC4", "#8ECFCF", "#3A4A5E", "#D45A3A"],
    colorNames: ["青蘋果綠", "數位紫", "清風藍", "午夜藍", "橘紅"],
    specs: [
      { icon: Thermometer, label: "加熱技術", value: "Smartcore™ 感應加熱" },
      { icon: Battery, label: "電池容量", value: "1728 mAh 一體設計" },
      { icon: Zap, label: "充電時間", value: "約 90 分鐘滿電" },
      { icon: Star, label: "連續使用", value: "一次充電使用 20 支" },
    ],
    features: ["一體成型設計", "20 支連續使用", "FlexPuff 自動延長", "自動啟動", "底部防滑", "無需清潔刀片"],
    gradient: "from-white to-white",
    accentColor: "text-teal-700",
    bgAccent: "bg-teal-600",
  },
];

function DeviceDetail({ device, onClose }) {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className={`bg-gradient-to-br ${device.gradient} flex items-center justify-center p-10 min-h-[300px]`}>
            <img src={device.image} alt={device.name} className="w-full max-w-xs object-contain" />
          </div>

          {/* Info */}
          <div className="p-8 md:p-10 flex flex-col">
            <button onClick={onClose} className="self-end mb-4 p-2 hover:bg-muted rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>

            <p className="font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-1">{device.nameEn}</p>
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-1">{device.name}</h2>
            <p className={`font-body text-sm mb-4 ${device.accentColor}`}>{device.tagline}</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{device.description}</p>

            {/* Color selector */}
            <div className="mb-6">
              <p className="font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
                顏色：{device.colorNames[selectedColor]}
              </p>
              <div className="flex gap-2">
                {device.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === i ? "border-black scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: color }}
                    aria-label={device.colorNames[i]}
                  />
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {device.specs.map((spec) => (
                <div key={spec.label} className="bg-muted/50 rounded-xl p-3">
                  <spec.icon className="w-3.5 h-3.5 text-muted-foreground mb-1.5" />
                  <p className="font-body text-[10px] text-muted-foreground tracking-wider uppercase">{spec.label}</p>
                  <p className="font-heading text-xs font-semibold mt-0.5">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {device.features.map((f) => (
                <span key={f} className="bg-black/5 text-black/70 font-body text-[10px] tracking-wider px-3 py-1.5 rounded-full">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Devices() {
  const [selectedDevice, setSelectedDevice] = useState(null);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="h-px w-16 bg-primary mb-8" />
            <p className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-3">Heating Devices</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">加熱設備</h1>
            <p className="font-body text-muted-foreground text-sm max-w-md leading-relaxed">
              ILUMA 系列搭載革命性 Smartcore™ 感應加熱技術，無燃燒、無灰燼，帶來最純粹的菸草體驗。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Device Cards */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {devices.map((device, i) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group cursor-pointer"
                onClick={() => setSelectedDevice(device)}
              >
                <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${device.gradient} border border-border/40 relative aspect-[3/4]`}>
                  <img
                    src={device.image}
                    alt={device.name}
                    className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="font-body text-[10px] tracking-widest uppercase text-white/60 mb-1">{device.nameEn}</p>
                    <h2 className="font-heading text-xl md:text-2xl font-bold tracking-tight mb-1">{device.name}</h2>
                    <p className="font-body text-xs text-white/70">{device.tagline}</p>
                  </div>
                </div>

                {/* Color dots */}
                <div className="mt-4 px-1 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {device.colors.map((color, ci) => (
                      <div
                        key={ci}
                        title={device.colorNames[ci]}
                        className="w-4 h-4 rounded-full border border-black/10 cursor-default"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="font-body text-[10px] text-muted-foreground tracking-wider">{device.colors.length} 種配色</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra panels: 限量版 + 反菸標語 */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 最新限量版 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden border border-border/40 relative"
            >
              <img
                src="https://media.base44.com/images/public/69edb64b2f0beef803a1b699/088a39156_IMG_8190.jpg"
                alt="最新限量版 ILUMA i 電光紫"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block bg-red-500 text-white font-body text-[10px] tracking-widest px-3 py-1 rounded-full mb-3 uppercase">新色登場</span>
                <h2 className="font-heading text-2xl font-bold tracking-tight mb-1">最新限量版</h2>
                <p className="font-body text-sm text-white/70">ILUMA i 電光紫・限量發售，先到先得</p>
              </div>
            </motion.div>

            {/* 反菸標語 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl overflow-hidden border border-border/40"
            >
              <img
                src="https://media.base44.com/images/public/69edb64b2f0beef803a1b699/f365327ff_roboneo_image_with_aigc.jpg"
                alt="戒菸專線 0800-636363"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDevice && (
          <DeviceDetail device={selectedDevice} onClose={() => setSelectedDevice(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}