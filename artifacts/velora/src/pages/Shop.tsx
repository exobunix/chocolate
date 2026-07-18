import React from 'react';
import { motion } from 'framer-motion';
import Products from '@/components/Products';
import Footer from '@/components/Footer';

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="relative py-24 border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Velora Collection</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif mb-6">
            Shop All <span className="italic text-primary">Chocolates</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-lg mx-auto leading-relaxed">
            Explore our complete collection — from signature dark bars and velvety truffles to luxury gift boxes crafted for every occasion.
          </motion.p>
        </div>
      </div>
      <Products />
      <Footer />
    </div>
  );
}
