import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Wind, Leaf, Sparkles, RotateCcw, ChevronRight } from "lucide-react";

const flavors = [
  {
    id: "mint",
    name: "沁涼薄荷",
    nameEn: "Arctic Mint",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/02dace3d5_generated_d47b826e.png",
    accentColor: "text-teal-600",
    bgAccent: "bg-teal-500/10",
    borderAccent: "border-teal-400/40",
    intensity: 3,
    cooling: 5,
    aroma: "menthol",
  },
  {
    id: "regular",
    name: "醇厚原味",
    nameEn: "Rich Regular",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/8dda69a42_generated_ace8fd89.png",
    accentColor: "text-amber-600",
    bgAccent: "bg-amber-500/10",
    borderAccent: "border-amber-400/40",
    intensity: 4,
    cooling: 1,
    aroma: "tobacco",
  },
  {
    id: "berry",
    name: "莓果馥郁",
    nameEn: "Berry Fusion",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/4258615b9_generated_81912564.png",
    accentColor: "text-purple-600",
    bgAccent: "bg-purple-500/10",
    borderAccent: "border-purple-400/40",
    intensity: 3,
    cooling: 2,
    aroma: "fruity",
  },
  {
    id: "citrus",
    name: "柑橘清新",
    nameEn: "Citrus Wave",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/4232866f5_generated_79373a25.png",
    accentColor: "text-orange-600",
    bgAccent: "bg-orange-500/10",
    borderAccent: "border-orange-400/40",
    intensity: 2,
    cooling: 3,
    aroma: "fruity",
  },
  {
    id: "green",
    name: "茶韻悠然",
    nameEn: "Green Harmony",
    image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/a44bfbcdb_generated_749f3ab3.png",
    accentColor: "text-green-600",
    bgAccent: "bg-green-500/10",
    borderAccent: "border-green-400/40",
    intensity: 2,
    cooling: 2,
    aroma: "herbal",
  },
];

const QUESTIONS = [
  {
    key: "intensity",
    icon: Thermometer,
    title: "您偏好的濃郁度？",
    subtitle: "菸草味的厚重程度",
    options: [
      { label: "清淡", value: [1, 2], desc: "輕盈柔和" },
      { label: "中等", value: [3], desc: "均衡適中" },
      { label: "濃烈", value: [4, 5], desc: "飽滿深沉" },
    ],
  },
  {
    key: "cooling",
    icon: Wind,
    title: "您偏好的涼感程度？",
    subtitle: "吸入時的清涼感受",
    options: [
      { label: "無涼感", value: [1, 2], desc: "溫潤不涼" },
      { label: "微涼", value: [3], desc: "輕微清涼" },
      { label: "強涼感", value: [4, 5], desc: "冰涼沁爽" },
    ],
  },
  {
    key: "aroma",
    icon: Leaf,
    title: "您偏好的香氣類型？",
    subtitle: "主要風味方向",
    options: [
      { label: "菸草原味", value: "tobacco", desc: "經典純粹" },
      { label: "薄荷涼感", value: "menthol", desc: "清新提神" },
      { label: "果香系列", value: "fruity", desc: "甜美活力" },
      { label: "草本茶韻", value: "herbal", desc: "淡雅禪靜" },
    ],
  },
];

function ScoreBar({ score }) {
  const pct = Math.round((score / 3) * 100);
  const color = pct >= 80 ? "bg-primary" : pct >= 50 ? "bg-primary/60" : "bg-primary/30";
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="font-heading text-xs text-muted-foreground w-8 text-right">{pct}%</span>
    </div>
  );
}

function computeScore(flavor, prefs) {
  let score = 0;
  // intensity match (0-1)
  const intensityMatch = prefs.intensity.includes(flavor.intensity) ? 1 : (Math.abs(flavor.intensity - (prefs.intensity[0] || 3)) <= 1 ? 0.5 : 0);
  // cooling match (0-1)
  const coolingMatch = prefs.cooling.includes(flavor.cooling) ? 1 : (Math.abs(flavor.cooling - (prefs.cooling[0] || 3)) <= 1 ? 0.5 : 0);
  // aroma match (0-1)
  const aromaMatch = flavor.aroma === prefs.aroma ? 1 : 0;
  score = intensityMatch + coolingMatch + aromaMatch;
  return { score, intensityMatch, coolingMatch, aromaMatch };
}

export default function FlavorWizard() {
  const [step, setStep] = useState(0); // 0 = intro, 1-3 = questions, 4 = results
  const [prefs, setPrefs] = useState({ intensity: null, cooling: null, aroma: null });

  const currentQ = step >= 1 && step <= 3 ? QUESTIONS[step - 1] : null;

  const handleSelect = (key, value) => {
    const newPrefs = { ...prefs, [key]: value };
    setPrefs(newPrefs);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setPrefs({ intensity: null, cooling: null, aroma: null });
  };

  const results = useMemo(() => {
    if (step < 4) return [];
    return flavors
      .map((f) => ({ ...f, ...computeScore(f, prefs) }))
      .sort((a, b) => b.score - a.score);
  }, [step, prefs]);

  return (
    <div className="border border-border rounded-3xl overflow-hidden bg-card">
      {/* Header */}
      <div className="bg-foreground text-background px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-heading text-lg font-bold tracking-wider">風味推薦精靈</h2>
        </div>
        {step > 0 && (
          <button onClick={reset} className="flex items-center gap-1.5 font-heading text-xs tracking-wider text-background/50 hover:text-primary transition-colors">
            <RotateCcw className="w-3.5 h-3.5" />
            重新開始
          </button>
        )}
      </div>

      {/* Progress bar */}
      {step >= 1 && step <= 3 && (
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Intro */}
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="px-8 py-10 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3">找到最適合您的風味</h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              回答三個簡單問題，我們將根據您的偏好即時篩選並評分最適合的 Terea 產品。
            </p>
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 font-heading text-sm tracking-widest uppercase hover:bg-primary/90 transition-all rounded"
            >
              開始測驗
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Questions */}
        {step >= 1 && step <= 3 && currentQ && (
          <motion.div
            key={`q-${step}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="px-8 py-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <currentQ.icon className="w-5 h-5 text-primary" />
              <span className="font-heading text-xs tracking-widest uppercase text-muted-foreground">
                問題 {step} / 3
              </span>
            </div>
            <h3 className="font-heading text-xl font-bold mb-1">{currentQ.title}</h3>
            <p className="font-body text-muted-foreground text-sm mb-8">{currentQ.subtitle}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(currentQ.key, opt.value)}
                  className="group p-4 border border-border rounded-xl text-left hover:border-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <p className="font-heading text-sm font-semibold mb-1 group-hover:text-primary transition-colors">
                    {opt.label}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">{opt.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results */}
        {step === 4 && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="px-8 py-10"
          >
            <h3 className="font-heading text-xl font-bold mb-1">為您推薦</h3>
            <p className="font-body text-muted-foreground text-sm mb-8">
              根據您的偏好，以下是符合度排名：
            </p>

            <div className="space-y-4">
              {results.map((flavor, i) => (
                <motion.div
                  key={flavor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`flex gap-4 p-4 rounded-xl border transition-all ${
                    i === 0
                      ? `${flavor.borderAccent} ${flavor.bgAccent}`
                      : "border-border"
                  }`}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0 flex items-center justify-center w-8">
                    {i === 0 ? (
                      <span className="font-heading text-lg font-bold text-primary">#1</span>
                    ) : (
                      <span className="font-heading text-sm text-muted-foreground">#{i + 1}</span>
                    )}
                  </div>

                  {/* Image */}
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={flavor.image} alt={flavor.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className={`font-heading text-sm font-bold ${i === 0 ? flavor.accentColor : ''}`}>
                        {flavor.name}
                      </h4>
                      <span className="font-heading text-xs text-muted-foreground">{flavor.nameEn}</span>
                    </div>

                    {/* Score breakdown */}
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground w-10">濃郁</span>
                        <ScoreBar score={flavor.intensityMatch} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground w-10">涼感</span>
                        <ScoreBar score={flavor.coolingMatch} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Leaf className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground w-10">香氣</span>
                        <ScoreBar score={flavor.aromaMatch} />
                      </div>
                    </div>
                  </div>

                  {/* Match % */}
                  <div className="flex-shrink-0 flex flex-col items-center justify-center">
                    <span className={`font-heading text-xl font-bold ${i === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                      {Math.round((flavor.score / 3) * 100)}%
                    </span>
                    <span className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">符合度</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}