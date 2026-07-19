import React from 'react';
import { motion } from 'framer-motion';
import processImage from '@assets/Image-970_1784381276323.jpg';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function Process() {
  const { config } = useSiteConfig();
  const { process } = config;

  return (
    <section className="py-32 relative bg-card/30 border-y border-border" id="story">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                {process.headline} <br/>
                <span className="italic text-primary">{process.headlineItalic}</span>
              </h2>
              <p className="text-foreground/70 max-w-md text-lg">{process.subheadline}</p>
            </motion.div>

            <div className="relative pl-8 border-l border-border/50 space-y-12">
              {process.steps.map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute -left-[37px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                  <div className="flex items-start gap-6">
                    <span className="text-primary font-serif italic text-2xl leading-none">{step.num}</span>
                    <div>
                      <h3 className="text-xl font-medium tracking-wide mb-2">{step.title}</h3>
                      <p className="text-foreground/60 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] rounded-2xl overflow-hidden relative"
            >
              <img src={processImage} alt="Chocolate crafting process" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-3">
                {process.ingredients.map((ing, idx) => (
                  <motion.div
                    key={ing}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="bg-background/80 backdrop-blur-md border border-border/50 px-4 py-2 rounded-full text-sm font-medium tracking-wide"
                  >
                    {ing}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="absolute -inset-4 border border-primary/20 rounded-2xl -z-10 transform translate-x-4 translate-y-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
