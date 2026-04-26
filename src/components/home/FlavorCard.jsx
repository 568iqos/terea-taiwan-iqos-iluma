import React from 'react';
import { motion } from 'framer-motion';

export default function FlavorCard({ flavor, index, onHover }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => onHover(flavor.tint)}
      onMouseLeave={() => onHover(null)}
      className="group flex-shrink-0 w-72 md:w-80 cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-square bg-muted">
        <img
          src={flavor.image}
          alt={flavor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Flavor info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <p className="font-heading text-xs tracking-[0.2em] uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {flavor.category}
          </p>
          <h3 className="font-heading text-lg tracking-[0.15em] uppercase text-secondary-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
            {flavor.name}
          </h3>
        </div>
      </div>

      {/* Info below card */}
      <div className="mt-5 px-1">
        <h3 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground">
          {flavor.name}
        </h3>
        <p className="font-body text-xs text-muted-foreground mt-1 tracking-wide">
          {flavor.description}
        </p>
        {/* Intensity bar */}
        <div className="mt-3 flex items-center gap-2">
          <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">濃度</span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-1 rounded-full transition-colors ${
                  i < flavor.intensity ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}