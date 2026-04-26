import React from "react";
import { motion } from "framer-motion";
import { Flame, Droplets, Shield, Zap } from "lucide-react";

const TECH_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/6b4f5e762_generated_d51a747f.png";
const COLLECTION_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/a97b2b7bc_generated_3c7233ab.png";

const features = [
  {
    icon: Zap,
    title: "感應加熱",
    description: "不同於傳統燃燒，Smartcore™ 使用電磁感應從菸草內部均勻加熱，確保每一口都一致而精準。",
  },
  {
    icon: Flame,
    title: "350°C 恆溫控制",
    description: "精確維持在350°C的最佳溫度，低於燃燒點卻足以完整釋放菸草風味分子。",
  },
  {
    icon: Droplets,
    title: "零灰燼體驗",
    description: "不燃燒意味著沒有灰燼、沒有煙霧，只有純粹的加熱蒸氣，帶來更潔淨的使用體驗。",
  },
  {
    icon: Shield,
    title: "減害科技",
    description: "相較於傳統燃燒式產品，有害物質平均減少95%*，是更負責任的選擇。",
  },
];

const steps = [
  { number: "01", title: "插入", description: "將 Terea 菸彈輕輕插入 IQOS ILUMA 裝置" },
  { number: "02", title: "啟動", description: "Smartcore™ 感應系統自動偵測並啟動加熱" },
  { number: "03", title: "加熱", description: "電磁感應從菸草核心均勻加熱至350°C" },
  { number: "04", title: "品味", description: "純粹風味蒸氣釋出，享受約14口或6分鐘的體驗" },
];

export default function Technology() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px w-16 bg-primary mb-8" />
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Smartcore™
              <br />
              <span className="text-primary">感應加熱系統</span>
            </h1>
            <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-md">
              革命性的從內而外加熱技術，無需刀片接觸，無需清潔。感應加熱不僅更精準，更帶來全新層次的便利與衛生。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={TECH_IMAGE}
                alt="Smartcore induction heating technology"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-foreground text-background px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="h-px w-16 bg-primary mb-8" />
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
              科技亮點
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border border-background/10 rounded-2xl p-8 hover:border-primary/30 transition-colors duration-500"
              >
                <feature.icon className="w-8 h-8 text-primary mb-6" />
                <h3 className="font-heading text-xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-background/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="h-px w-16 bg-primary mb-8" />
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4">
              使用步驟
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-lg">
              簡約設計，直覺操作。四個步驟，開啟你的儀式。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                <p className="font-heading text-6xl font-bold text-primary/15 mb-4">
                  {step.number}
                </p>
                <h3 className="font-heading text-lg font-bold mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-1/2 h-px bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Image */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[3/2] rounded-2xl overflow-hidden"
          >
            <img
              src={COLLECTION_IMAGE}
              alt="Terea flavor collection"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <p className="font-heading text-xs tracking-wider text-muted-foreground mt-4">
            *與繼續吸煙相比。這並不意味著風險降低95%。Terea 菸彈並非無風險的產品。
          </p>
        </div>
      </section>
    </div>
  );
}