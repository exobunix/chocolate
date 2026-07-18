import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Gift, Truck, Star } from 'lucide-react';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import collectionsImg from '@assets/Image-455_1784381276324.jpg';
import heroImg from '@assets/Image-396_1784381276324.jpg';

const giftItems = [
  { id: 201, name: 'Gold Collection Gift Box', desc: '12-Piece Assorted Chocolates', price: 64.00, badge: 'Most Popular', image: collectionsImg },
  { id: 202, name: 'Noir Gift Box', desc: '24 Pieces — Dark & Hazelnut', price: 68.00, badge: 'Limited', image: collectionsImg },
  { id: 203, name: 'Discovery Set', desc: '6 Signature Flavors', price: 38.00, badge: '', image: heroImg },
  { id: 204, name: 'The Velora Hamper', desc: 'Bar + Truffles + Bonbons', price: 96.00, badge: 'Gift of the Year', image: collectionsImg },
];

function GiftCard({ item }: { item: typeof giftItems[0] }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, desc: item.desc, price: item.price, image: item.image });
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
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-70" />
        {item.badge && (
          <div className="absolute top-4 left-4 bg-primary text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {item.badge}
          </div>
        )}
        <div className="absolute bottom-4 right-4">
          <Gift className="w-5 h-5 text-primary/70" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-lg mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
        <p className="text-xs text-foreground/40 mb-4">{item.desc}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-serif text-primary">${item.price.toFixed(2)}</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftItems.map(item => <GiftCard key={item.id} item={item} />)}
        </div>

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
