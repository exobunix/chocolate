import React from 'react';
import { motion } from 'framer-motion';
import Process from '@/components/Process';
import Footer from '@/components/Footer';
import heroImg from '@assets/Image-396_1784381276324.jpg';
import collectionsImg from '@assets/Image-455_1784381276324.jpg';

const milestones = [
  { year: '2012', title: 'The Beginning', desc: 'Founded in a small kitchen in Paris with a single obsession: making the world\'s most honest chocolate.' },
  { year: '2016', title: 'Bean to Bar', desc: 'We established direct relationships with cacao farmers across Ecuador, Ghana, and Madagascar.' },
  { year: '2019', title: 'Gold Award', desc: 'Awarded Best Artisan Chocolatier at the International Chocolate Awards, London.' },
  { year: '2023', title: 'Velora Today', desc: 'Serving 10,000+ chocolate lovers globally, still handcrafting every piece in our original atelier.' },
];

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden border-b border-border/40">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Our story" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        <div className="container mx-auto px-6 pb-24 relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Our Process. Our Promise.</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif leading-tight max-w-2xl">
            Extraordinary <br />from <span className="italic text-primary">Bean to Bar.</span>
          </motion.h1>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-serif mb-6 leading-tight">
              Crafted with obsession, <span className="italic text-primary">shared with love.</span>
            </h2>
            <div className="space-y-5 text-foreground/65 leading-relaxed">
              <p>Velora was born from a simple, audacious belief: that chocolate could be more than a sweet. It could be an experience — a moment where time slows, senses sharpen, and the world narrows to a single, perfect square.</p>
              <p>We work directly with farmers who share our obsession with quality. From the soil composition of a cacao plantation to the exact temperature of our tempering drums, every variable is controlled, studied, and refined.</p>
              <p>Each batch is small by design. Not because we can't scale — but because we refuse to. Greatness cannot be mass-produced.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="aspect-square rounded-2xl overflow-hidden border border-border/30 relative">
            <img src={collectionsImg} alt="Our craft" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-xs tracking-widest uppercase text-primary mb-2">Since 2012</p>
              <p className="font-serif text-2xl">"Real ingredients. Thoughtful process. Remarkable chocolate."</p>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-center mb-16">
            The <span className="italic text-primary">Journey</span>
          </motion.h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-border/40 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((m, idx) => (
                <motion.div key={m.year}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-4xl font-serif text-primary/30 block mb-1">{m.year}</span>
                    <h3 className="text-xl font-medium mb-2">{m.title}</h3>
                    <p className="text-foreground/55 leading-relaxed max-w-xs">{m.desc}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background shrink-0 z-10 hidden md:block" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process section */}
      <Process />
      <Footer />
    </div>
  );
}
