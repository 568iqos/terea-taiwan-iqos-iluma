import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Battery, Thermometer, Wifi } from "lucide-react";

const devices = [
  {
    id: "iluma-i",
    name: "IQOS ILUMA i",
    nameEn: "ILUMA i",
    tagline: "旗艦機型，極致體驗",
    description:
      "IQOS ILUMA i 是 IQOS 系列的旗艦設備，採用革命性 Smartcore™ 感應加熱技術，從菸草核心均勻加熱，無需清潔，無燃燒、無灰燼。搭配 TEREA 專用菸彈，帶來最純粹、最潔淨的菸草蒸氣體驗。",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/260e7c9f4_IMG_8125.jpg",
    colors: ["#8B6B9E", "#7BA3C8", "#4ECDC4", "#C8A882", "#2C2C2C"],
    colorNames: ["紫羅蘭", "天空藍", "薄荷綠", "暖沙棕", "經典黑"],
    specs: [
      { icon: Thermometer, label: "加熱技術", value: "Smartcore™ 感應加熱" },
      { icon: Battery, label: "電池容量", value: "支援連續 20 根使用" },
      { icon: Zap, label: "充電時間", value: "約 100 分鐘滿電" },
      { icon: Wifi, label: "連線功能", value: "藍牙 APP 連線支援" },
    ],
    features: ["無需清潔刀片", "自動停止功能", "防夾斷保護", "LED 電量顯示", "藍牙連線"],
    gradient: "from-purple-100 to-blue-50",
    accentColor: "text-purple-700",
    bgAccent: "bg-purple-600",
  },
  {
    id: "iluma-one-i",
    name: "IQOS ILUMA ONE i",
    nameEn: "ILUMA ONE i",
    tagline: "一體成型，隨行自在",
    description:
      "IQOS ILUMA ONE i 採用一體成型設計，無需充電盒，整機即可使用。輕巧便攜，支援連續使用多根 TEREA 菸彈，是追求簡約生活風格用戶的理想選擇。同樣搭載 Smartcore™ 感應加熱技術。",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/1cc1cf9ab_IMG_8122.png",
    colors: ["#E8C4B8", "#B8D4E8", "#C8E8C4", "#E8E4B8", "#3C3C3C"],
    colorNames: ["玫瑰粉", "冰川藍", "清草綠", "奶油黃", "深邃黑"],
    specs: [
      { icon: Thermometer, label: "加熱技術", value: "Smartcore™ 感應加熱" },
      { icon: Battery, label: "一體設計", value: "無需充電盒" },
      { icon: Zap, label: "使用次數", value: "一次充電可使用多根" },
      { icon: Wifi, label: "連線功能", value: "藍牙 APP 連線支援" },
    ],
    features: ["一體成型設計", "輕巧便攜", "無需清潔刀片", "自動停止功能", "LED 電量顯示"],
    gradient: "from-rose-100 to-teal-50",
    accentColor: "text-rose-600",
    bgAccent: "bg-rose-500",
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
            <p className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-3">Devices</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">設備系列</h1>
            <p className="font-body text-muted-foreground text-sm max-w-md leading-relaxed">
              IQOS ILUMA 系列搭載革命性 Smartcore™ 感應加熱技術，無燃燒、無灰燼，帶來最純粹的菸草體驗。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Device Cards */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {devices.map((device, i) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group cursor-pointer"
                onClick={() => setSelectedDevice(device)}
              >
                <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${device.gradient} border border-border/40 relative aspect-[4/3]`}>
                  <img
                    src={device.image}
                    alt={device.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <p className="font-body text-[10px] tracking-widest uppercase text-white/60 mb-1">{device.nameEn}</p>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-1">{device.name}</h2>
                    <p className="font-body text-sm text-white/70">{device.tagline}</p>
                  </div>
                </div>

                {/* Color dots */}
                <div className="mt-4 px-1 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {device.colors.map((color, ci) => (
                      <div key={ci} className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <p className="font-body text-[10px] text-muted-foreground tracking-wider">{device.colors.length} 種配色</p>
                </div>
              </motion.div>
            ))}
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