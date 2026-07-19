import React from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function Testimonials() {
  const { config } = useSiteConfig();
  const testimonials = config.testimonials;

  return (
    <section className="py-32 bg-card relative overflow-hidden border-t border-border">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="text-primary text-xl">★★★★★</div>
            <span className="text-sm tracking-widest font-medium">TRUSTPILOT 4.9/5</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif"
          >
            Loved By Chocolate <br className="md:hidden" />
            <span className="italic text-primary">Connoisseurs.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="bg-background border border-border/50 p-8 rounded-2xl relative"
            >
              <div className="text-primary/20 text-6xl font-serif absolute top-4 left-6 leading-none">"</div>
              <p className="text-foreground/80 leading-relaxed mb-6 relative z-10 pt-4 text-lg font-light">{test.quote}</p>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <div className="font-medium">{test.author}</div>
                  <div className="text-xs text-foreground/50">{test.role}</div>
                </div>
                <div className="text-primary text-sm">★★★★★</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
