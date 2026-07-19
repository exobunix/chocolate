import React from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function Marquee() {
  const { config } = useSiteConfig();
  const words = config.marquee.words;
  const items = [...words, ...words, ...words, ...words];

  return (
    <div className="w-full bg-primary text-primary-foreground py-6 overflow-hidden border-y border-primary/20">
      <div className="relative flex whitespace-nowrap">
        <motion.div
          className="flex items-center space-x-12 px-6"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
        >
          {items.map((word, idx) => (
            <div key={idx} className="flex items-center space-x-12">
              <span className="text-xl md:text-2xl font-serif italic tracking-wider">{word}</span>
              <span className="w-2 h-2 rounded-full bg-primary-foreground/40" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
