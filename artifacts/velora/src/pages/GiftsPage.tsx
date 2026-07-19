import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Gift, Truck, Star } from 'lucide-react';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useSiteConfig } from '@/context/SiteConfigContext';
import type { Product } from '@/context/SiteConfigContext';
import collectionsImg from '@assets/Image-455_1784381276324.jpg';
import heroImg from '@assets/Image-396_1784381276324.jpg';
import processImg from '@assets/Image-970_1784381276323.jpg';

const FALLBACK_IMAGES = [collectionsImg, heroImg, processImg, collectionsImg];

function GiftCard({ product, fallbackImg }: { product: Product; fallbackImg: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const imgSrc = product.imageUrl || fallbackImg;

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, desc: product.desc, price: product.price, image: imgSrc });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-border hover:border-primary/40 rounded-2xl overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(201,168,76,0.2)]"
    >
      <div className="aspect-[4/3] overflow-hidden relative bg-[#0d0502]">
        <img src={imgSrc} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-70" />
        {product.tag && (
          <div className="absolute top-4 left-4 bg-primary text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {product.tag}
          </div>
        )}
        <div className="absolute bottom-4 right-4">
          <Gift className="w-5 h-5 text-primary/70" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-lg mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="text-xs text-foreground/40 mb-4">{product.desc}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-serif text-primary">₹{product.price.toFixed(2)}</span>
          <motion.button onClick={handleAdd} whileTap={{ scale: 0.93 }}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-widest transition-all border ${
              added ? 'bg-green-500/20 border-green-500/40 text-green-400' : 'bg-primary/10 border-primary/30 text-primary hover:bg-primary hover:text-black'
            }`}>
            {added ? <><Check className="w-3.5 h-3.5" /> Added</> : <><Plus className="w-3.5 h-3.5" /> Add to Cart</>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function GiftsPage() {
  const { config } = useSiteConfig();
  const giftProducts = config.products.filter(p => p.category === 'Gifts' && p.visible);

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero */}
      <div className="relative py-28 border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif text-primary/3 pointer-events-none select-none">GIFT</div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase text-primary mb-4">For Every Occasion</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif mb-6">
            The Gift of <span className="italic text-primary">Velora</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-lg mx-auto leading-relaxed mb-10">
            Beautifully packaged, ready to impress. Each gift box arrives in our signature noir packaging with a hand-tied golden ribbon.
          </motion.p>
          {/* Trust badges */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6">
            {[
              { Icon: Truck, label: 'Same-Day Delivery' },
              { Icon: Gift, label: 'Custom Gift Message' },
              { Icon: Star, label: '4.9 ★ Rated Gifts' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-foreground/60">
                <Icon className="w-4 h-4 text-primary" /> {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gift grid */}
      <div className="container mx-auto px-6 py-24">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl font-serif mb-12">
          Curated Gift <span className="italic text-primary">Selections</span>
        </motion.h2>

        {giftProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftProducts.map((product, i) => (
              <GiftCard key={product.id} product={product} fallbackImg={FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-foreground/30 border border-border/20 rounded-2xl">
            <Gift className="w-10 h-10 mx-auto mb-4 text-primary/20" />
            <p className="text-sm">No gift products available right now.</p>
          </div>
        )}

        {/* Custom box CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-20 p-10 md:p-16 bg-gradient-to-br from-card to-background border border-primary/20 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 relative z-10">Bespoke Gifting</p>
          <h3 className="text-3xl md:text-4xl font-serif mb-4 relative z-10">
            Build Your Own <span className="italic text-primary">Gift Box</span>
          </h3>
          <p className="text-foreground/60 max-w-md mx-auto mb-8 relative z-10">
            Choose your chocolates, your box size, add a personal message, and we'll handle the rest.
          </p>
          <button className="relative z-10 bg-primary text-black font-medium px-10 py-4 rounded-full hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] active:scale-95">
            Start Building →
          </button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
