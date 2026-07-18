import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import Footer from '@/components/Footer';

const topics = ['Order Enquiry', 'Gift Customisation', 'Corporate Orders', 'Wholesale', 'Press & Media', 'Other'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <div className="relative py-28 border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase text-primary mb-4">We'd Love to Hear From You</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif mb-6">
            Get in <span className="italic text-primary">Touch</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-lg mx-auto leading-relaxed">
            Questions about an order, a custom gift, or wholesale? Our team responds within 24 hours.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Info */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-serif mb-8">Velora Atelier</h2>
              <div className="space-y-6">
                {[
                  { Icon: MapPin, label: 'Address', value: '12 Rue du Chocolat\nParis, France 75001' },
                  { Icon: Mail, label: 'Email', value: 'hello@velora.com' },
                  { Icon: Phone, label: 'Phone', value: '+33 1 23 45 67 89' },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-foreground/40 mb-1">{label}</p>
                      <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-card border border-border/30 rounded-2xl">
              <p className="text-xs tracking-widest uppercase text-primary mb-3">Opening Hours</p>
              <div className="space-y-2 text-sm text-foreground/60">
                <div className="flex justify-between"><span>Monday – Friday</span><span className="text-foreground">9:00 – 18:00</span></div>
                <div className="flex justify-between"><span>Saturday</span><span className="text-foreground">10:00 – 16:00</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="text-foreground/30">Closed</span></div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="sent"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-24">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}
                    className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="font-serif text-3xl mb-3">Message Sent</h3>
                  <p className="text-foreground/60 max-w-sm leading-relaxed">
                    Thank you for reaching out. We'll get back to you within 24 hours with something worth reading.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', topic: '', message: '' }); }}
                    className="mt-8 px-6 py-2.5 rounded-full border border-primary/30 text-primary text-sm hover:bg-primary/10 transition-colors">
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs tracking-widest uppercase text-foreground/40 block mb-2">Full Name *</label>
                      <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full bg-card border border-border rounded-xl py-3.5 px-4 text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest uppercase text-foreground/40 block mb-2">Email Address *</label>
                      <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full bg-card border border-border rounded-xl py-3.5 px-4 text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs tracking-widest uppercase text-foreground/40 block mb-2">Topic</label>
                    <div className="flex flex-wrap gap-2">
                      {topics.map(t => (
                        <button type="button" key={t} onClick={() => setForm(f => ({ ...f, topic: t }))}
                          className={`px-4 py-2 rounded-full text-xs border transition-all ${
                            form.topic === t ? 'bg-primary text-black border-primary' : 'border-border text-foreground/50 hover:border-primary/40'
                          }`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs tracking-widest uppercase text-foreground/40 block mb-2">Message *</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us how we can help..."
                      rows={6}
                      className="w-full bg-card border border-border rounded-xl py-3.5 px-4 text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-colors resize-none" />
                  </div>

                  <motion.button type="submit" disabled={loading}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-primary text-black font-medium py-4 rounded-full flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] disabled:opacity-60">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
