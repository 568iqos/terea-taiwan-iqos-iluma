import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import FlavorCard from './FlavorCard';

const flavors = [
  {
    name: 'Regular',
    category: '經典系列',
    description: '醇厚煙草原味，層次豐富',
    image: 'https://media.base44.com/images/public/69edb64b2f0beef803a1b699/06113e08c_generated_85859d7e.png',
    intensity: 4,
    tint: 'rgba(212, 139, 97, 0.06)',
  },
  {
    name: 'Menthol',
    category: '薄荷系列',
    description: '清涼薄荷，暢快沁心',
    image: 'https://media.base44.com/images/public/69edb64b2f0beef803a1b699/47a82367b_generated_6c18eb79.png',
    intensity: 3,
    tint: 'rgba(209, 232, 226, 0.12)',
  },
  {
    name: 'Purple Wave',
    category: '莓果系列',
    description: '紫色莓果，芬芳迷人',
    image: 'https://media.base44.com/images/public/69edb64b2f0beef803a1b699/35b8faa1c_generated_6dc704c6.png',
    intensity: 2,
    tint: 'rgba(242, 213, 229, 0.12)',
  },
  {
    name: 'Yellow',
    category: '柑橘系列',
    description: '柑橘清香，明亮活力',
    image: 'https://media.base44.com/images/public/69edb64b2f0beef803a1b699/4b6d60e9d_generated_d59bf9b1.png',
    intensity: 2,
    tint: 'rgba(242, 220, 180, 0.12)',
  },
];

export default function FlavorSpectrum() {
  const [bgTint, setBgTint] = useState(null);
  const scrollRef = useRef(null);

  return (
    <section
      id="flavors"
      className="relative py-32 md:py-44 transition-colors duration-700"
      style={{ backgroundColor: bgTint || 'transparent' }}
    >
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
            Flavor Spectrum
          </p>
          <h2 className="font-heading text-3xl md:text-5xl tracking-[0.1em] uppercase text-foreground font-bold">
            風味光譜
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed tracking-wide">
            每一種風味，都是感官的精密校準。從經典煙草到清新薄荷，探索專屬你的純粹品味。
          </p>
        </motion.div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {flavors.map((flavor, index) => (
            <div key={flavor.name} className="snap-start">
              <FlavorCard
                flavor={flavor}
                index={index}
                onHover={setBgTint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}