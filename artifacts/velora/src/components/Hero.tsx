import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import heroImage from '@assets/Image-396_1784381276324.jpg';
import FloatingChocolates from './FloatingChocolates';

// Melt animation: chocolate bar grid cells break apart frame by frame
const GRID_COLS = 3;
const GRID_ROWS = 4;
const CELL_COUNT = GRID_COLS * GRID_ROWS;

function ChocolateMeltBar() {
  const [meltStage, setMeltStage] = useState(0);
  // stages: 0=intact 1=cracking 2=breaking 3=melting 4=dripping 5=done→reset
  useEffect(() => {
    const timers = [
      setTimeout(() => setMeltStage(1), 2000),
      setTimeout(() => setMeltStage(2), 3200),
      setTimeout(() => setMeltStage(3), 4200),
      setTimeout(() => setMeltStage(4), 5000),
      setTimeout(() => setMeltStage(5), 6500),
      setTimeout(() => { setMeltStage(0); }, 7500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Re-trigger animation loop
  useEffect(() => {
    if (meltStage === 0) {
      const t = setTimeout(() => setMeltStage(1), 3000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [meltStage]);

  const cellVariants = (idx: number) => {
    const row = Math.floor(idx / GRID_COLS);
    const col = idx % GRID_COLS;
    const isBottom = row >= 2;
    const xShift = (col - 1) * 6;
    const delay = idx * 0.05;

    if (meltStage === 0) return { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 };
    if (meltStage === 1) return { x: xShift * 0.3, y: 0, rotate: 0, scale: 1, opacity: 1 };
    if (meltStage === 2) return {
      x: xShift,
      y: isBottom ? 4 : 0,
      rotate: (col - 1) * 2,
      scale: 0.98,
      opacity: 1,
    };
    if (meltStage === 3) return {
      x: (col - 1) * 18,
      y: isBottom ? 20 : row * 5,
      rotate: (col - 1) * 8 + (row % 2 === 0 ? 3 : -3),
      scale: 0.92,
      opacity: 0.85,
    };
    if (meltStage === 4) return {
      x: (col - 1) * 35 + (Math.sin(idx) * 10),
      y: row * 25 + 20,
      rotate: (col - 1) * 18,
      scale: 0.7,
      opacity: 0.5,
    };
    // stage 5: gone
    return { x: (col - 1) * 60, y: 120, rotate: (col - 1) * 30, scale: 0.3, opacity: 0 };
  };

  return (
    <div className="relative w-full h-full">
      {/* Chocolate grid */}
      <div className={`absolute inset-4 grid gap-2`} style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`, gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)` }}>
        {Array.from({ length: CELL_COUNT }).map((_, idx) => {
          const vars = cellVariants(idx);
          return (
            <motion.div
              key={idx}
              animate={vars}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: (idx * 0.04) }}
              className="relative"
              style={{ transformOrigin: 'center center' }}
            >
              <div
                className="w-full h-full bg-gradient-to-br from-[#3d1f0f] to-[#1a0a05] rounded-[4px] relative overflow-hidden"
                style={{
                  boxShadow: 'inset 1px 1px 3px rgba(255,255,255,0.06), -2px -2px 6px rgba(0,0,0,0.6)',
                }}
              >
                {/* Crack lines for stage 1+ */}
                {meltStage >= 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: meltStage >= 1 ? 0.4 : 0 }}
                    className="absolute inset-0"
                    style={{
                      background: 'repeating-linear-gradient(137deg, transparent 0px, transparent 6px, rgba(0,0,0,0.6) 6px, rgba(0,0,0,0.6) 7px)',
                    }}
                  />
                )}
                {/* Inner bevel */}
                <div className="absolute inset-[5px] border border-[#5a2e18]/40 rounded-[2px] flex items-center justify-center">
                  {(idx === 4 || idx === 7) && (
                    <span className="text-[#c9a84c] text-[9px] opacity-50 font-serif tracking-widest">V</span>
                  )}
                </div>
                {/* Melt drip effect on bottom cells */}
                {meltStage >= 3 && idx >= CELL_COUNT - GRID_COLS && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: meltStage >= 3 ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: (idx % GRID_COLS) * 0.1 }}
                    style={{ transformOrigin: 'top center', height: '20px' }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[40%] bg-gradient-to-b from-[#2a1005] to-transparent rounded-b-full"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Drip droplets — animate down when stage >= 3 */}
      {[0.2, 0.5, 0.8].map((xPct, di) => (
        <motion.div
          key={di}
          className="absolute bottom-0 w-3 rounded-full bg-gradient-to-b from-[#2a1005] to-[#1a0a03]"
          style={{ left: `${xPct * 100}%` }}
          initial={{ height: 0, opacity: 0, y: 0 }}
          animate={meltStage >= 3 ? {
            height: [0, 40, 60, 80],
            opacity: [0, 0.8, 0.9, 0.6],
            y: [0, 10, 25, 50],
          } : { height: 0, opacity: 0 }}
          transition={{ duration: 1.5, delay: di * 0.3, ease: 'easeIn' }}
        />
      ))}

      {/* Gold foil at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#c9a84c] via-[#b8860b] to-transparent"
        style={{
          clipPath: 'polygon(0 30%,10% 20%,20% 35%,30% 15%,40% 40%,50% 10%,60% 35%,70% 15%,80% 25%,90% 10%,100% 30%,100% 100%,0 100%)',
        }}
        animate={{ height: meltStage >= 2 ? ['33%', '28%'] : '33%' }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />

      {/* Glowing aura */}
      <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full -z-10" style={{ transform: 'translateZ(-50px)' }} />
    </div>
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-500, 500], [15, -15]);
  const rotateY = useTransform(mouseX, [-500, 500], [-15, 15]);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background hero image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/50 via-background/75 to-background" />

      {/* Floating real-image chocolate frames */}
      <FloatingChocolates />

      <div className="container relative z-10 mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium tracking-widest uppercase"
          >
            Extraordinary Ingredients · Timeless Indulgence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] tracking-tight mb-6"
          >
            Made To <br />
            <span className="text-primary italic">Melt</span> Your Heart.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-foreground/70 max-w-xl mx-auto lg:mx-0 mb-10 font-light leading-relaxed"
          >
            Velora chocolates are handcrafted with the world's finest cacao, crafted in small batches for unmatched richness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { const el = document.getElementById('shop'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium tracking-wide flex items-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(201,168,76,0.25)]"
            >
              Explore Collection <span className="text-xl">→</span>
            </motion.button>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {['S','M','D','P'].map((l, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-background bg-card flex items-center justify-center overflow-hidden">
                    <span className="text-[10px] text-primary font-serif">{l}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-left">
                <div className="flex text-primary tracking-wider">★★★★★</div>
                <div className="text-foreground/60">Loved by 10k+</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            {[
              { label: 'Handcrafted daily', sub: 'Made in small batches by our master chocolatiers.' },
              { label: 'Same-day delivery', sub: 'Available for orders placed before 2PM.' },
            ].map(({ label, sub }) => (
              <div key={label} className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl px-5 py-4 text-left hover:border-primary/30 transition-colors">
                <p className="text-sm font-medium text-foreground mb-1">{label}</p>
                <p className="text-xs text-foreground/50 leading-relaxed">{sub}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D melting chocolate bar */}
        <div className="flex-1 w-full max-w-sm lg:max-w-none perspective-[1000px] h-[380px] md:h-[500px] flex items-center justify-center relative">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            className="w-[260px] h-[360px] md:w-[320px] md:h-[440px] relative cursor-pointer"
          >
            <div
              className="absolute inset-0 rounded-md overflow-hidden"
              style={{
                boxShadow: '0 40px 80px -15px rgba(0,0,0,0.9), inset 0 2px 6px rgba(255,255,255,0.07)',
                background: 'linear-gradient(145deg, #2a1309, #0d0502)',
                transform: 'translateZ(20px)',
              }}
            >
              <ChocolateMeltBar />
            </div>

            {/* Side depth face */}
            <div
              className="absolute top-2 bottom-2 right-0 w-3 bg-gradient-to-r from-[#1a0a05] to-[#0a0301]"
              style={{ transform: 'translateX(11px) rotateY(90deg)', transformOrigin: 'left center' }}
            />
          </motion.div>

          {/* Ambient glow */}
          <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full -z-10 scale-75" />
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
