import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Flame, Droplets, Wind } from 'lucide-react';

const TECH_IMAGE = 'https://media.base44.com/images/public/69edb64b2f0beef803a1b699/ffe0774db_generated_f3a1f086.png';

const techFeatures = [
  {
    icon: Flame,
    title: '感應加熱核心',
    description: '不鏽鋼加熱刀片從內部均勻加熱，精準控制溫度，釋放真實風味。',
  },
  {
    icon: Shield,
    title: '密封式設計',
    description: '兩端密封結構，使用後無殘留、無灰燼，維持裝置清潔。',
  },
  {
    icon: Droplets,
    title: '專利煙草配方',
    description: '特選高品質煙草，經過精密處理，呈現飽滿而純淨的風味層次。',
  },
  {
    icon: Wind,
    title: '無煙無灰',
    description: '感應加熱不產生燃燒，減少異味與殘留，帶來更潔淨的體驗。',
  },
];

export default function TechDeepDive() {
  return (
    <section id="technology" className="relative py-32 md:py-44 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Smart-Core Technology
          </p>
          <h2 className="font-heading text-3xl md:text-5xl tracking-[0.1em] uppercase text-secondary-foreground font-bold">
            核心科技
          </h2>
          <p className="font-body text-secondary-foreground/60 mt-4 max-w-lg text-sm leading-relaxed tracking-wide">
            革命性感應加熱技術，從內部加熱煙草而非燃燒。每一口都是精密工程的體現。
          </p>
        </motion.div>

        {/* Layout: image + features grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Exploded view image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={TECH_IMAGE}
                alt="TEREA 感應加熱技術分解圖"
                className="w-full h-auto object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
            </div>
            {/* Decorative rings */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-primary/10 animate-pulse-ring" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full border border-primary/10 animate-pulse-ring" style={{ animationDelay: '1s' }} />
          </motion.div>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {techFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-sm tracking-[0.1em] uppercase text-secondary-foreground font-semibold">
                  {feature.title}
                </h3>
                <p className="font-body text-xs text-secondary-foreground/50 mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}