import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSiteConfig } from '@/context/SiteConfigContext';
import collectionsImg from '@assets/Image-455_1784381276324.jpg';
import heroImg from '@assets/Image-396_1784381276324.jpg';
import processImg from '@assets/Image-970_1784381276323.jpg';

// Fallback image pool
const FALLBACK_IMAGES = [collectionsImg, heroImg, processImg, collectionsImg, heroImg, processImg, collectionsImg, heroImg, processImg];

const tagColors: Record<string, string> = {
  Bestseller: 'border-[#c9a84c]/50 text-[#c9a84c]',
  Limited:    'border-red-400/40 text-red-300',
  New:        'border-green-400/40 text-green-300',
  Signature:  'border-purple-400/40 text-purple-300',
};

const categories = ['All', 'Bars', 'Pralines', 'Truffles', 'Gifts'];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { addItem } = useCart();
  const [added, setAdded] = useState<Record<number, boolean>>({});
  const { config } = useSiteConfig();

  const visibleProducts = config.products.filter(p => p.visible);
  const filtered = activeFilter === 'All' ? visibleProducts : visibleProducts.filter(p => p.category === activeFilter);

  const handleAdd = (product: typeof visibleProducts[0], idx: number) => {
    const fallbackImg = FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
    addItem({ id: product.id, name: product.name, desc: product.desc, price: product.price, image: product.imageUrl || fallbackImg });
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1500);
  };

  return (
    <section className="py-32 bg-background relative" id="shop">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start mb-16">
          <div className="flex-1">
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Collection</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              Our Most Loved <span className="italic text-primary">Indulgences.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-foreground/60 mt-4 max-w-md leading-relaxed">
              A curated selection of our signature chocolates, crafted to melt moments into memories.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 w-full lg:w-72 shrink-0">
            <div className="text-xs text-primary tracking-widest uppercase mb-2">Gift Ideas</div>
            <h3 className="font-serif text-lg mb-2">Curated Gift Boxes</h3>
            <p className="text-sm text-foreground/50 mb-4">Thoughtfully paired. Beautifully wrapped.</p>
            <button
              onClick={() => setActiveFilter('Gifts')}
              className="text-sm text-primary hover:underline underline-offset-4 flex items-center gap-1"
            >
              Explore Gifts →
            </button>
          </motion.div>
        </div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-wrap gap-2 md:gap-3 mb-12">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all border ${
                activeFilter === cat
                  ? 'bg-primary text-black border-primary'
                  : 'border-border text-foreground/60 hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, idx) => {
              const imgSrc = product.imageUrl || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(201,168,76,0.2)]"
                >
                  {product.tag && (
                    <div className={`absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest px-3 py-1 border rounded-full font-medium bg-background/80 backdrop-blur-sm ${tagColors[product.tag] || 'border-border text-foreground/60'}`}>
                      {product.tag}
                    </div>
                  )}

                  <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#0d0502]">
                    <motion.img
                      src={imgSrc}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ objectPosition: product.objectPosition || '50% 50%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-5 relative">
                    <div className="flex justify-between items-start gap-3 mb-4">
                      <div>
                        <h3 className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                        <p className="text-xs text-foreground/40 mt-1">{product.desc}</p>
                      </div>
                      <div className="text-base font-medium text-foreground/90 shrink-0">₹{Number(product.price).toFixed(2)}</div>
                    </div>

                    <motion.button
                      onClick={() => handleAdd(product, idx)}
                      whileTap={{ scale: 0.9 }}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-300 border ${
                        added[product.id]
                          ? 'bg-green-500/20 border-green-500/40 text-green-400'
                          : 'bg-primary/10 border-primary/30 text-primary hover:bg-primary hover:text-black'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {added[product.id] ? (
                          <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Added to Cart</motion.span>
                        ) : (
                          <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            className="flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add to Cart</motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-border/40">
          {[
            { icon: '✦', title: 'Finest Ingredients',  sub: "We source the world's finest cacao." },
            { icon: '✦', title: 'Handcrafted Daily',    sub: 'Made in small batches by our master chocolatiers.' },
            { icon: '✦', title: 'Elegant Delivery',     sub: 'Premium packaging. Delivered with care.' },
          ].map(({ icon, title, sub }) => (
            <div key={title} className="flex items-start gap-4">
              <span className="text-primary text-sm mt-1">{icon}</span>
              <div>
                <h4 className="font-medium text-sm mb-1">{title}</h4>
                <p className="text-xs text-foreground/50">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
