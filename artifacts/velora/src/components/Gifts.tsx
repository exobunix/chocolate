import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Gift, MapPin } from 'lucide-react';

export default function Gifts() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="gifts">
      {/* Decorative large text background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5">
        <span className="text-[20vw] font-serif font-bold whitespace-nowrap">GIFTING</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Big Featured Product */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="bg-gradient-to-br from-card to-background border border-primary/20 rounded-3xl p-8 md:p-12 text-center lg:text-left relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              
              <div className="mb-8">
                <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">The Perfect Present</span>
                <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-4">
                  Give The Gift <br/>
                  <span className="italic">of Velora.</span>
                </h2>
                <p className="text-foreground/60 text-lg max-w-md mx-auto lg:mx-0">
                  Beautifully packaged in our signature noir boxes, finished with a golden ribbon and personalized note.
                </p>
              </div>

              <div className="p-6 bg-background/50 backdrop-blur-sm border border-border rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-primary/50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-serif mb-1">The Gold Collection Gift Box</h3>
                  <p className="text-sm text-foreground/50 mb-3">12-Piece Assorted Chocolates</p>
                  <div className="text-2xl font-medium">$64.00</div>
                </div>
                
                <button className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                  Add To Cart
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: Feature Cards */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {[
              { icon: Truck, title: "Same-Day Delivery", desc: "Available for selected cities when ordered before 2 PM." },
              { icon: Gift, title: "Send As A Gift", desc: "Add a custom message and hide the price on the receipt." },
              { icon: MapPin, title: "Track Your Order", desc: "Real-time updates from our kitchen to their door." }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 flex items-start gap-4 hover:bg-card transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">{feature.title}</h4>
                  <p className="text-sm text-foreground/60 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
