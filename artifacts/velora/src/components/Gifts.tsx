import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Gift, MapPin, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const GIFT_BOX = { id: 10, name: 'The Gold Collection Gift Box', desc: '12-Piece Assorted Chocolates', price: 64.00 };

export default function Gifts() {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(GIFT_BOX);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="gifts">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03]">
        <span className="text-[18vw] font-serif font-bold whitespace-nowrap select-none">GIFTING</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-14">

          {/* Featured gift product */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="relative bg-gradient-to-br from-card to-background border border-primary/25 rounded-3xl p-8 md:p-12 group overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 mb-8">
                <span className="text-primary font-medium tracking-[0.25em] uppercase text-xs mb-4 block">The Perfect Present</span>
                <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] mb-4">
                  Give The Gift <br />
                  <span className="italic text-primary">of Velora.</span>
                </h2>
                <p className="text-foreground/60 text-base max-w-md leading-relaxed">
                  Beautifully packaged in our signature noir boxes, finished with a golden ribbon and a personalized handwritten note.
                </p>
              </div>

              <div className="relative z-10 p-5 bg-background/60 backdrop-blur-sm border border-border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-primary/40 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-serif mb-1">{GIFT_BOX.name}</h3>
                  <p className="text-sm text-foreground/50 mb-3">{GIFT_BOX.desc}</p>
                  <div className="text-2xl font-serif text-primary">${GIFT_BOX.price.toFixed(2)}</div>
                </div>

                <motion.button
                  onClick={handleAdd}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-medium tracking-wide flex items-center justify-center gap-2 transition-all ${
                    added
                      ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                      : 'bg-primary text-black hover:bg-primary/90 shadow-[0_0_25px_rgba(201,168,76,0.3)] hover:shadow-[0_0_35px_rgba(201,168,76,0.5)]'
                  }`}
                >
                  {added ? <><Check className="w-4 h-4" /> Added!</> : 'Add To Cart'}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Feature cards */}
          <div className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
            {[
              { Icon: Truck, title: 'Same-Day Delivery', desc: 'Available for selected cities when ordered before 2 PM. Fresh to your door.' },
              { Icon: Gift, title: 'Send As A Gift', desc: 'Add a custom message and hide the price. We handle the rest.' },
              { Icon: MapPin, title: 'Track Your Order', desc: 'Real-time updates from our kitchen all the way to their door.' },
            ].map(({ Icon, title, desc }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                whileHover={{ x: 4 }}
                className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 flex items-start gap-4 hover:bg-card hover:border-primary/20 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-base mb-1.5">{title}</h4>
                  <p className="text-sm text-foreground/55 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
