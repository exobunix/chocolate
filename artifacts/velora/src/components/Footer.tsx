import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-background relative pt-32 pb-8 border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Massive CTA */}
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-12 tracking-tight"
          >
            Your Chocolate <br/>
            <span className="italic text-primary">Experience Awaits.</span>
          </motion.h2>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary text-primary-foreground px-10 py-5 rounded-full text-lg font-medium tracking-wide hover:bg-primary/90 transition-all hover:scale-105 inline-flex items-center gap-3 shadow-[0_0_30px_rgba(201,168,76,0.2)]"
          >
            Shop The Collection
            <span className="text-2xl leading-none">→</span>
          </motion.button>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-3xl font-serif tracking-widest text-primary mb-6 block">
              VELORA
            </Link>
            <p className="text-foreground/50 text-sm max-w-xs">
              Artisanal chocolate crafted in small batches for unmatched richness. Made to melt your heart.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium tracking-widest uppercase text-sm mb-6">Shop</h4>
            <ul className="space-y-4">
              {['All Collections', 'Dark Chocolate', 'Truffles & Pralines', 'Gift Boxes'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium tracking-widest uppercase text-sm mb-6">About</h4>
            <ul className="space-y-4">
              {['Our Story', 'Ingredients', 'Sustainability', 'Careers'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium tracking-widest uppercase text-sm mb-6">Support</h4>
            <ul className="space-y-4">
              {['Contact Us', 'FAQ', 'Shipping & Returns', 'Track Order'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/40 uppercase tracking-wider">
          <p>© 2024 VELORA. The Art of Chocolate.</p>
          <div className="flex gap-4">
            <span>Luxury Design</span>
            <span>·</span>
            <span>Ecommerce That Sells</span>
            <span>·</span>
            <span>Storytelling</span>
          </div>
        </div>

      </div>
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-[100%] pointer-events-none" />
    </footer>
  );
}
