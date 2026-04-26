import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HERO_IMAGE = 'https://media.base44.com/images/public/69edb64b2f0beef803a1b699/de26b606d_generated_8a22a6fb.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary">
      {/* Induction rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: `${200 + i * 140}px`,
              height: `${200 + i * 140}px`,
            }}
            animate={{
              scale: [0.9, 1.1, 0.9],
              opacity: [0.15, 0.05, 0.15],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Product image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-64 md:w-80 lg:w-96"
      >
        <img
          src={HERO_IMAGE}
          alt="TEREA heated tobacco stick with induction glow"
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Text overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 md:pb-32 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-[0.3em] uppercase text-secondary-foreground text-center"
        >
          TEREA
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-body text-sm md:text-base tracking-[0.15em] text-secondary-foreground/60 mt-4 text-center"
        >
          感應加熱 · 純粹精準 · 品味極致
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 z-20 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-secondary-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}