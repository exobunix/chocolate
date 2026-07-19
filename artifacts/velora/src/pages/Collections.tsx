import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useSiteConfig } from '@/context/SiteConfigContext';
import type { Product } from '@/context/SiteConfigContext';
import heroImg from '@assets/Image-396_1784381276324.jpg';
import collectionsImg from '@assets/Image-455_1784381276324.jpg';
import processImg from '@assets/Image-970_1784381276323.jpg';

const FALLBACK_IMAGES = [heroImg, collectionsImg, processImg];

const COLLECTION_META = [
  {
    id: 'dark',
    label: 'Dark Chocolate',
    categories: ['Bars'],
    headline: 'Pure. Intense. Unforgettable.',
    sub: 'Our signature single-origin dark bars sourced from the finest cacao farms in Ecuador and Ghana.',
    color: 'from-[#1a0a05] to-[#0d0502]',
    image: heroImg,
  },
  {
    id: 'pralines',
    label: 'Pralines & Truffles',
    categories: ['Pralines', 'Truffles'],
    headline: 'Crafted with obsessive precision.',
    sub: 'Each praline is hand-rolled and finished individually by our master chocolatiers every morning.',
    color: 'from-[#2a1309] to-[#180a04]',
    image: collectionsImg,
  },
  {
    id: 'gifts',
    label: 'Gift Collections',
    categories: ['Gifts'],
    headline: 'The gift they never forget.',
    sub: 'Curated gift boxes wrapped in our signature noir packaging with a hand-tied gold ribbon.',
    color: 'from-[#c9a84c]/20 to-[#1a0a05]',
    image: processImg,
  },
];

function ProductCard({ product, fallbackImg }: { product: Product; fallbackImg: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      desc: product.desc,
      price: product.price,
      image: product.imageUrl || fallbackImg,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5 group">
      <div>
        <p className="font-medium text-sm group-hover:text-primary transition-colors">{product.name}</p>
        <p className="text-xs text-foreground/40 mt-0.5">{product.desc}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-primary">${product.price.toFixed(2)}</span>
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.9 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
            added ? 'bg-green-500/20 border-green-500/40 text-green-400' : 'border-primary/30 text-primary hover:bg-primary hover:text-black'
          }`}
        >
          {added ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </motion.button>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  const { config } = useSiteConfig();
  const [active, setActive] = useState('dark');
  const current = COLLECTION_META.find(c => c.id === active)!;

  const visibleProducts = config.products.filter(p => p.visible);
  const currentProducts = visibleProducts.filter(p => current.categories.includes(p.category));

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <div className="relative py-24 border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Curated for You</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif mb-6">
            Our <span className="italic text-primary">Collections</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-lg mx-auto">
            Three worlds of chocolate, each with its own character.
          </motion.p>
        </div>
      </div>

      {/* Collection Tabs */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-3 mb-16">
          {COLLECTION_META.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all border ${
                active === c.id ? 'bg-primary text-black border-primary' : 'border-border text-foreground/60 hover:border-primary/40'
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-border/30">
              <img src={current.image} alt={current.label} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-tr ${current.color} opacity-40`} />
              <div className="absolute bottom-8 left-8">
                <div className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-xs tracking-widest uppercase text-primary">
                  {current.label}
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">{current.headline}</h2>
              <p className="text-foreground/60 mb-10 leading-relaxed">{current.sub}</p>

              {currentProducts.length > 0 ? (
                <div className="space-y-1">
                  {currentProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} fallbackImg={FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-foreground/30 text-sm border border-border/20 rounded-xl">
                  No products in this collection yet.
                </div>
              )}

              <motion.div className="mt-10 p-5 bg-card/40 border border-border/30 rounded-2xl text-center"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <p className="text-xs text-foreground/40 tracking-widest uppercase">All pieces handcrafted daily</p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
